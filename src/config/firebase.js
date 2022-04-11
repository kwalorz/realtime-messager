import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAH-_1bdA_pFvelasKhlf5Te57PujjoFUg',
  authDomain: 'realtime-chat-fbf2d.firebaseapp.com',
  projectId: 'realtime-chat-fbf2d',
  storageBucket: 'realtime-chat-fbf2d.appspot.com',
  messagingSenderId: '87851297529',
  appId: '1:87851297529:web:f1940609f3683b473b1028',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export default db;
