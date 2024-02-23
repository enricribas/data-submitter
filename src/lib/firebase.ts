import { connectStorageEmulator, getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage();
const functions = getFunctions(app);

// Needs to run on browser only
if (typeof window !== "undefined") {
	const { hostname } = window.location;

	if (hostname == "localhost" || hostname == "127.0.0.1") {
		connectFirestoreEmulator(db, "localhost", 8080);
		connectAuthEmulator(auth, "http://localhost:9099");
		connectStorageEmulator(storage, "localhost", 9199);
		connectFunctionsEmulator(functions, "localhost", 5001);
	}
}
