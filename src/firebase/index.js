import * as firebase from "firebase/app";
import { firebaseConfig } from "firebase/config";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore();

export default app;
