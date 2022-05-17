import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

const app = initializeApp(JSON.parse(process.env['NX_BASE_FIREBASE'] || '{}'));
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFirestoreEmulator(firestore, 'localhost', 8081);
}
export {
  app,
  auth,
  firestore,
  storage,
  functions,
  GoogleAuthProvider,
  EmailAuthProvider,
};
