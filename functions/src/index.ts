// functions/src/index.ts

import * as admin from "firebase-admin";
// ⚠️ IMPORTANT: With v2 functions, you import from specific modules.
import { onUserCreated } from "firebase-functions/v2/auth";

admin.initializeApp();

/**
 * Triggered on new user creation. Sets a custom 'Employee' role and creates a
 * Firestore profile.
 */
export const assignDefaultRole = onUserCreated(async (event) => {
  const user = event.data; // The user data from the event
  try {
    // 1. Set the custom claim for the user's role.
    await admin.auth().setCustomUserClaims(user.uid, {role: "Employee"});

    console.log(`Successfully set 'Employee' role for user: ${user.uid}`);
    
    // 2. Create a corresponding document for the user in Firestore.
    const db = admin.firestore();
    await db.collection("employees").doc(user.uid).set({
      email: user.email,
      role: "Employee",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, {merge: true});

    console.log(`Successfully created employee profile for user: ${user.uid}`);
  } catch (error) {
    // Log any errors to Cloud Logging
    console.error("Error setting custom claim or creating profile:", error);
  }
});
