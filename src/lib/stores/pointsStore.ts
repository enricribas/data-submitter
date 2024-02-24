import { writable } from "svelte/store";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";

import type { Point } from "$lib/types/general";

export const pointsStore = writable<Point[]>([]);

export const subscribePointsStore = (integrationID: string) => {
	// FIXME: This is a hack to get the orgID
	const orgID = "akua";

	const url = pointURL(orgID, integrationID);
	const col = collection(db, url);
	const q = query(col);

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
