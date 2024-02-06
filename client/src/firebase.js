// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'urban-estate-1e523.firebaseapp.com',
  projectId: 'urban-estate-1e523',
  storageBucket: 'urban-estate-1e523.appspot.com',
  messagingSenderId: '719611576785',
  appId: '1:719611576785:web:b4acd21c40ec757be0a0f0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
