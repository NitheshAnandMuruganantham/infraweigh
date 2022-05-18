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

const config = {
  apiKey: 'AIzaSyBpoRyq3jdK2QkmzUte5oF2g8q-QUVq9vA',
  authDomain: 'infra-weigh.firebaseapp.com',
  databaseURL:
    'https://infra-weigh-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'infra-weigh',
  storageBucket: 'infra-weigh.appspot.com',
  messagingSenderId: '48414145939',
  appId: '1:48414145939:web:f16f10aa3d1ab22a3fbc66',
  measurementId: 'G-YLJRZGV3ST',
};

const envConfig: any = process.env['NX_BASE_FIREBASE'];
const app = initializeApp(envConfig ? JSON.parse(envConfig) : config);
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
