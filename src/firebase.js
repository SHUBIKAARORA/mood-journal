import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyC2JCp5CWFm_HyiZOQOVpnxZFddzWpaMv0",
  authDomain: "mood-journal-974cb.firebaseapp.com",
  projectId: "mood-journal-974cb",
  storageBucket: "mood-journal-974cb.firebasestorage.app",
  messagingSenderId: "837765762938",
  appId: "1:837765762938:web:b96576adba84622bce90c3",
  measurementId: "G-LTE8C45T8G"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db = getFirestore(app);
export {auth,db};
