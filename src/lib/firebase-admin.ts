import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage, Storage } from "firebase-admin/storage";

let _storage: Storage | null = null;

export function getAdminStorage(): Storage {
  if (_storage) return _storage;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var is not set");
  }

  const serviceAccount = JSON.parse(raw);

  // Vercel env vars sometimes double-escape \n in the private key — fix it
  if (typeof serviceAccount.private_key === "string") {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
  }

  const app = getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

  _storage = getStorage(app);
  return _storage;
}
