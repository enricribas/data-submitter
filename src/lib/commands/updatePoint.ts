import type { Point } from "$lib/types/general";
import { setDoc, doc } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";
import { randomUUID } from "$lib/utils";

export const updatePoint = (orgID: string, integrationID: string, point: Point) => {
	// FIXME: Remove console.log
	console.log("orgID, integrationID, \n", "\n", orgID, integrationID, "\n\n");

	// FIXME: Remove console.log
	console.log("point\n", "\n", point, "\n\n");

	const { id } = point;
	const docURL = pointURL(orgID, integrationID, id || providerNewID(point));
	const pointDoc = doc(db, docURL);

	return setDoc(pointDoc, { name: id, ...point });
};

const providerNewID = (point: Point) => `${point.type}-${randomUUID(5)}`;
