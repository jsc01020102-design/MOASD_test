import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  collection, 
  onSnapshot 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyClbO1y7NBc86zjiSihvxWgDVitUxagksU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lunar-phantasmata-0pnh2.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lunar-phantasmata-0pnh2",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lunar-phantasmata-0pnh2.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "956019912231",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:956019912231:web:0218bcb807f0a6a0e5a802"
};

const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app, import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || "ai-studio-moasdportfolio-44251b3f-01a3-431e-b5ed-3f99662755a4");


// Keys to sync between localStorage and Firestore
export const SYNC_KEYS = [
  "moasd_partner_images",
  "moasd_custom_business_images",
  "moasd_custom_services",
  "moasd_media_center_videos",
  "moasd_support_notices",
  "moasd_support_inquiries",
  "moasd_support_materials",
  "moasd_member_list",
  "moasd_sub_admins",
  "moasd_user_passwords"
];

// Helper to check if a key should be synced
export const shouldSyncKey = (key: string): boolean => {
  return SYNC_KEYS.includes(key);
};

// Firestore helper functions
export const saveToCloud = async (key: string, value: string) => {
  try {
    const docRef = doc(db, "website_config", key);
    await setDoc(docRef, { value, updatedAt: Date.now() });
  } catch (err) {
    console.error(`[Firebase] Error saving key ${key} to cloud:`, err);
  }
};

export const deleteFromCloud = async (key: string) => {
  try {
    const docRef = doc(db, "website_config", key);
    await deleteDoc(docRef);
  } catch (err) {
    console.error(`[Firebase] Error deleting key ${key} from cloud:`, err);
  }
};
