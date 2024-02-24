import type { Point } from "$lib/types/general";
import { setDoc, doc } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";
import { randomUUID } from "$lib/utils";

export const updatePoint = (orgID: string, integrationID: string, point: Point) => {
	const { providerID } = point;
	const docURL = pointURL(orgID, integrationID, providerID || providerNewID(point));
	const pointDoc = doc(db, docURL);

	return setDoc(pointDoc, point);
};

const providerNewID = (point: Point) => `${point.type}-${randomUUID(5)}`;
