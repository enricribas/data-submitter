import type { Point } from "$lib/types/general";
import { setDoc, doc } from "firebase/firestore";
import { db, pointURL } from "$lib/firebase";
import { randomUUID } from "$lib/utils";

export const updatePoint = (orgID: string, integrationID: string, point: Point) => {
	const { pointDoc, id } = getPoint(orgID, integrationID, point);

	return setDoc(pointDoc, { name: id, deleted: false, ...point }, merge);
};

export const deletePoint = (orgID: string, integrationID: string, point: Point) => {
	const { pointDoc } = getPoint(orgID, integrationID, point);

	return setDoc(pointDoc, { deleted: true }, merge);
};

const getPoint = (orgID: string, integrationID: string, point: Point) => {
	const { id } = point;
	const docURL = pointURL(orgID, integrationID, id || providerNewID(point));
	const pointDoc = doc(db, docURL);
	return { pointDoc, id };
};

const merge = { merge: true };
const providerNewID = (point: Point) => `${point.type}-${randomUUID(5)}`;
