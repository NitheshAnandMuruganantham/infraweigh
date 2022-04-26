import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBpoRyq3jdK2QkmzUte5oF2g8q-QUVq9vA',
  authDomain: 'infra-weigh.firebaseapp.com',
  databaseURL:
    'https://infra-weigh-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'infra-weigh',
  storageBucket: 'infra-weigh.appspot.com',
  messagingSenderId: '48414145939',
  appId: '1:48414145939:web:f16f10aa3d1ab22a3fbc66',
};

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
