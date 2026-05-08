import * as admin from "firebase-admin";

function initApp(): admin.app.App {
  if (admin.apps.length > 0) return admin.app();

  const serviceAccount = JSON.parse(
    Buffer.from(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY!,
      "base64"
    ).toString("utf-8")
  );

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export function getAdminDb(): admin.database.Database {
  return initApp().database();
}
