import { writable } from "svelte/store";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "$lib/firebase";

import type { Point } from "$lib/types/general";

export const pointsStore = writable<Point[]>([]);

export const subscribePointsStore = (integrationID: string) => {
	const orgID = "akua";
	const url = `orgs/${orgID}/points`;
	const col = collection(db, url);
	const queryParams = [where("integrationID", "==", integrationID)];
	const q = query(col, ...queryParams);

	return onSnapshot(q, (snap) => {
		const data = snap.docs.map((d) => d.data()) as Point[];

		pointsStore.update(() => data);
	});
};
