import { functions } from './admin';

export type Update = functions.Change<functions.firestore.QueryDocumentSnapshot>;
export type Create = functions.firestore.QueryDocumentSnapshot;
export type { EventContext } from 'firebase-functions';
export type DocData = FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
export type Request = functions.Request;
export type Response = functions.Response;
