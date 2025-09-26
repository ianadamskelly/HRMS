
import * as admin from "firebase-admin";
// ⚠️ IMPORTANT: Authentication triggers must use the v1 import
import * as functionsV1 from "firebase-functions/v1";

admin.initializeApp();

/**
 * Triggered on new user creation. Sets a custom 'Employee' role and creates a
 * Firestore profile.
 */
export const assignDefaultRole = functionsV1.auth.user().onCreate(
  async (user) => {
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
      console.log(
        `Successfully created employee profile for user: ${user.uid}`
      );
    } catch (error) {
      // Log any errors to Cloud Logging
      console.error("Error setting custom claim or creating profile:", error);
    }
  });
