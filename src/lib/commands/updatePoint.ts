import type { Point } from "$lib/types/general";
import { setDoc, doc } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";

export const updatePoint = (orgID: string, point: Point) => {
	const { providerID } = point;

	if (!providerID) {
		console.error("point\nis missing a providerID", "\n", point, "\n\n");
		return;
	}
	const pointDoc = doc(db, pointURL(orgID, providerID));

	return setDoc(pointDoc, point);
};
