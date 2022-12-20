import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2SjEISN-3ou7ZiV2uT8xbhmbWHFlrago",
  authDomain: "upload-image-capstone.firebaseapp.com",
  projectId: "upload-image-capstone",
  storageBucket: "upload-image-capstone.appspot.com",
  messagingSenderId: "884131416389",
  appId: "1:884131416389:web:8d7c66c00ffea18be2962c",
  measurementId: "G-6DMT3R3K5H",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
