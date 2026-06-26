import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db, shouldSyncKey, saveToCloud, deleteFromCloud } from "./firebase";

let isUpdatingFromCloud = false;

// Initialize the real-time two-way synchronization bridge
export const initializeFirebaseSync = () => {
  if (typeof window === "undefined") return;

  console.log("[FirebaseSync] Initializing real-time synchronization bridge...");

  // 1. Subscribe to real-time updates from Firestore "website_config"
  const configColRef = collection(db, "website_config");
  
  onSnapshot(configColRef, (snapshot) => {
    isUpdatingFromCloud = true;
    try {
      snapshot.docChanges().forEach((change) => {
        const key = change.doc.id;
        if (!shouldSyncKey(key)) return;

        if (change.type === "removed") {
          const localValue = localStorage.getItem(key);
          if (localValue !== null) {
            console.log(`[FirebaseSync] Deleting key locally due to cloud removal: ${key}`);
            localStorage.removeItem(key);
            // Trigger storage event so React components re-render immediately
            window.dispatchEvent(new Event("storage"));
          }
        } else {
          const docData = change.doc.data();
          const cloudValue = docData?.value;
          const localValue = localStorage.getItem(key);

          if (cloudValue !== null && cloudValue !== undefined && cloudValue !== localValue) {
            console.log(`[FirebaseSync] Updating key locally from cloud: ${key}`);
            localStorage.setItem(key, cloudValue);
            // Trigger storage event so React components re-render immediately
            window.dispatchEvent(new Event("storage"));
          }
        }
      });
    } catch (err) {
      console.error("[FirebaseSync] Error during snapshot update:", err);
    } finally {
      isUpdatingFromCloud = false;
    }
  });

  // 2. Wrap Storage.prototype functions to capture local modifications and save to Firestore reliably across all browsers
  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  Storage.prototype.setItem = function (key: string, value: string) {
    // Call the original setItem to ensure local functionality remains unbroken
    originalSetItem.apply(this, [key, value]);

    // If this change didn't originate from a cloud sync, and the key is a synced key, push to cloud
    if (!isUpdatingFromCloud && shouldSyncKey(key)) {
      console.log(`[FirebaseSync] Capturing local write to cloud: ${key}`);
      saveToCloud(key, value);
    }
  };

  Storage.prototype.removeItem = function (key: string) {
    // Call the original removeItem
    originalRemoveItem.apply(this, [key]);

    // If this change didn't originate from a cloud sync, and the key is a synced key, push to cloud deletion
    if (!isUpdatingFromCloud && shouldSyncKey(key)) {
      console.log(`[FirebaseSync] Capturing local delete to cloud: ${key}`);
      deleteFromCloud(key);
    }
  };
};
