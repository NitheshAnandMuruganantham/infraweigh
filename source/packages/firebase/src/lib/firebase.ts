import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = JSON.parse(process.env['NX_BASE_FIREBASE'] || '{}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export {
  app,
  auth,
  firestore,
  storage,
  functions,
  GoogleAuthProvider,
  EmailAuthProvider,
};
