import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const FireBaseConfig = {
  apiKey: 'AIzaSyARk_yjGtqMA38OjoMa057NXf-kVKN4Kig',
  authDomain: 'crypto-tracker-c6757.firebaseapp.com',
  projectId: 'crypto-tracker-c6757',
  storageBucket: 'crypto-tracker-c6757.appspot.com',
  messagingSenderId: '412758087124',
  appId: '1:412758087124:web:2ea51b6081edb9e4a47241'
};

const firebaseApp = initializeApp(FireBaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
