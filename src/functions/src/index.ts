
import * as admin from "firebase-admin";
import * as functionsV1 from "firebase-functions/v1";
import {onCall} from "firebase-functions/v2/https";
import {HttpsError} from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

// This function hardcodes your user ID as an Admin for development purposes.
export const assignDefaultRole = functionsV1
  .region("us-central1")
  .auth.user()
  .onCreate(async (user) => {
    let role = "Employee"; // Default role

    // Super Admin check for development
    if (user.uid === "7MagliZcSqQfcxAHRwg7QIGNetw2") {
      role = "Admin";
    } else {
      // Check if this is the first user
      const userList = await admin.auth().listUsers(1);
      if (userList.users.length === 1) {
        // This is the first user, make them an Admin
        role = "Admin";
      }
    }

    try {
      // Set the custom claim
      await admin.auth().setCustomUserClaims(user.uid, {role});

      // Create the user's profile in Firestore
      await db.collection("employees").doc(user.uid).set(
        {
          email: user.email,
          role: role,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "Active",
        },
        {merge: true}
      );
    } catch (err) {
      console.error("Error setting custom claim or creating profile:", err);
    }
  });


export const setUserRole = onCall(async (request) => {
  if (request.auth?.token.role !== "Admin") {
    throw new HttpsError("permission-denied", "Only admins can set user roles.");
  }

  const {uid, role} = request.data;
  if (!uid || !role) {
    throw new HttpsError("invalid-argument", "Missing uid or role in request.");
  }

  try {
    await admin.auth().setCustomUserClaims(uid, {role});
    await db.collection("employees").doc(uid).set({role}, {merge: true});
    return {success: `User ${uid} has been assigned the role: ${role}`};
  } catch (error) {
    console.error("Error setting user role:", error);
    throw new HttpsError("internal", "Failed to set user role.");
  }
});


export const createNewUser = onCall(async (request) => {
  if (request.auth?.token.role !== "Admin") {
    throw new HttpsError(
      "permission-denied",
      "Only admins can create new users."
    );
  }

  const {email, fullName, role, ...employeeData} = request.data;

  if (!email || !fullName || !role) {
    throw new HttpsError(
      "invalid-argument",
      "Missing email, fullName, or role."
    );
  }

  try {
    // 1. Create user in Firebase Auth
    const tempPassword = Math.random().toString(36).slice(-8);
    const userRecord = await admin.auth().createUser({
      email,
      password: tempPassword,
      displayName: fullName,
    });

    // 2. Set custom claim for the new user
    await admin.auth().setCustomUserClaims(userRecord.uid, {role});

    // 3. Create employee profile in Firestore
    await db.collection("employees").doc(userRecord.uid).set({
      ...employeeData,
      email,
      fullName,
      role,
      uid: userRecord.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "Active",
    });
    
    // 4. Return the temporary password to the client
    return {
      success: true,
      message: `Successfully created user ${fullName} (${email}).`,
      uid: userRecord.uid,
      tempPassword: tempPassword,
    };
  } catch (error: any) {
    console.error("Error creating new user:", error);
    throw new HttpsError("internal", error.message);
  }
});
