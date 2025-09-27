'use client';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';

// Manually define the configuration here to ensure it's correct.
export const firebaseConfig: FirebaseOptions = {
  "apiKey": "AIzaSyD_ZEhD-4avFJc1rA4BpXhEuDvb2rAW1NU",
  "authDomain": "hrms-af28f.firebaseapp.com",
  "projectId": "hrms-af28f",
  "storageBucket": "hrms-af28f.appspot.com",
  "messagingSenderId": "924905397621",
  "appId": "1:924905397621:web:8a4b7496d8e47b26e8873c",
  "measurementId": "G-FVP0C3XG1H"
};

// Initialize Firebase app if it hasn't been already
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export { auth };