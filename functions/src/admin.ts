import * as firebaseAdmin from 'firebase-admin';
import type { DocData } from './firebaseTypes';

firebaseAdmin.initializeApp();

export * as functions from 'firebase-functions';
export const admin = firebaseAdmin;
export const store = admin.firestore();

// fails locally otherwise.
export const updatedAt = () => admin.firestore.FieldValue ? admin.firestore.FieldValue.serverTimestamp() : "local"

// Takes a collection snap and returns an array with ID
export const getCol = async (snap: DocData): Promise<any[]> =>
	(await snap.get()).docs.map((doc) => ({ id: doc.id, ...doc.data() }));

// Get a document based on URL
export const docFor = async (url: string) => (await store.doc(url).get()).data();
