import { functions } from './admin';

export type Update = functions.Change<functions.firestore.QueryDocumentSnapshot>;
export type Create = functions.firestore.QueryDocumentSnapshot;
export type DocData = FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
