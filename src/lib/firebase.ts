
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// To use other Firebase services, import them here, e.g.:
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
// These environment variables will be read from your .env file
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional: for Firebase Analytics
};

// Initialize Firebase
let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Example: Initialize Analytics (optional)
// let analytics;
// if (typeof window !== 'undefined') {
//   analytics = getAnalytics(app);
// }

// Export Firebase services you want to use
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export { analytics };

export { app as firebaseApp }; // Export the initialized Firebase app instance

// You can add a log here to confirm config is loaded, but remove for production
// console.log('Firebase Config Loaded:', {
//   apiKeyExists: !!firebaseConfig.apiKey,
//   projectId: firebaseConfig.projectId,
// });
