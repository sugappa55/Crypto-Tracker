import { FireBaseConfig } from "./config/firebase.config";
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
const firebaseApp=initializeApp(FireBaseConfig)

 export const auth=getAuth(firebaseApp)
export const db=getFirestore(firebaseApp)
