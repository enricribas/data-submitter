import { store, getCol, docFor } from "../admin";
import { DocumentSnapshot } from "firebase-functions/v2/firestore";

import type { Point } from "../types";
import { states } from "../states";
import { updateState, collectionURLS } from "../utils";

export const findIntegration = async (snap: DocumentSnapshot) => {
	const request = snap.data();
	if (!request) {
		console.error("No data in the snapshot");
		return null;
	}

	const requestID = snap.id;
	const context = {
		params: {
			orgID: snap.ref.path.split('/')[1],
			instanceID: snap.ref.path.split('/')[3],
			requestID: requestID
		}
	};

	const { pointsURL, outputURL, providersURL, requestURL } = collectionURLS(context);

	await updateState(requestURL, states.received);

	const points = await getCol(store.collection(pointsURL(request.integrationID)));

	await Promise.all(points.map(async (point: Point) => {
		if (!point.providerID) {
			console.error(`No providerID found for point ${point.id}`);
			return;
		}

		const provider = await docFor(`${providersURL}/${point.providerID}`);

		const url = `${outputURL}/${requestID}-${point.id}`;

		await store.doc(url).set({
			...point,
			contactID: request.contactID,
			data: request.data,
			provider,
			requestID,
		});
	}));

	return updateState(requestURL, points.length ? states.found : states.notFound);
};
