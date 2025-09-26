import * as admin from "firebase-admin";
import * as functionsV1 from "firebase-functions/v1";

admin.initializeApp();

export const assignDefaultRole = functionsV1
  .region("us-central1")
  .auth
  .user()
  .onCreate(async (user) => {
    try {
      await admin.auth().setCustomUserClaims(user.uid, {role: "Employee"});
      const db = admin.firestore();
      await db.collection("employees").doc(user.uid).set(
        {
          email: user.email,
          role: "Employee",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true}
      );
    } catch (err) {
      console.error("Error setting custom claim or creating profile:", err);
    }
  });
