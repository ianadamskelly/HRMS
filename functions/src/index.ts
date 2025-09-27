import * as admin from "firebase-admin";
import * as functionsV1 from "firebase-functions/v1";
import {onCall} from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

export const assignDefaultRole = functionsV1
  .region("us-central1")
  .auth.user()
  .onCreate(async (user) => {
    // Check if this is the first user
    const userList = await admin.auth().listUsers(1);
    let role = "Employee"; // Default role

    if (userList.users.length === 1) {
      // This is the first user, make them an Admin
      role = "Admin";
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
        },
        {merge: true}
      );
    } catch (err) {
      console.error("Error setting custom claim or creating profile:", err);
    }
  });

export const setUserRole = onCall(async (request) => {
  // Check if the caller is an Admin
  if (request.auth?.token.role !== "Admin") {
    return {
      error: "Permission denied. Only admins can set user roles.",
    };
  }

  const {uid, role} = request.data;
  if (!uid || !role) {
    return {error: "Missing uid or role in request."};
  }

  try {
    // Set custom claim for the target user
    await admin.auth().setCustomUserClaims(uid, {role});

    // Update the role in the user's Firestore profile
    await db.collection("employees").doc(uid).set(
      {
        role: role,
      },
      {merge: true}
    );

    return {success: `User ${uid} has been assigned the role: ${role}`};
  } catch (error) {
    console.error("Error setting user role:", error);
    return {error: "Failed to set user role."};
  }
});
