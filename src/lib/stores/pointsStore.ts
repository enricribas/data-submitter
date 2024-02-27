import { writable } from "svelte/store";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";

import type { Point } from "$lib/types/general";

export const pointsStore = writable<Point[]>([]);

type subscribePointsStoreRequest = { integrationID: string; orgID: string };
export const subscribePointsStore = ({ integrationID, orgID }: subscribePointsStoreRequest) => {
	const url = pointURL(orgID, integrationID);
	const col = collection(db, url);
	const q = query(col, where("deleted", "==", false));

	return onSnapshot(q, (snap) => {
		const data = snap.docs.map((d) => {
			return {
				id: d.id,
				...d.data(),
			};
		}) as Point[];

		pointsStore.update(() => data);
	});
};
