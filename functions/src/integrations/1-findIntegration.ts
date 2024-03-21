import { store, getCol, docFor } from "../admin";

import type { Create, EventContext } from "../firebaseTypes";
import type { Point } from "../types";
import { states } from "../states";
import { updateState, collectionURLS } from "../utils";

export const findIntegration = async (snap: Create, context: EventContext) => {
	const request = snap.data();
	const { requestID } = context.params;
	const { pointsURL, outputURL, providersURL, requestURL } = collectionURLS(context);

	await updateState(requestURL, states.received);

	const points = await getCol(store.collection(pointsURL(request.integrationID)));

	points.forEach(async (point: Point) => {
		const provider = await docFor(`${providersURL}/${point.providerID}`);

		// ERROR: What if no providerID in point

		const url = `${outputURL}/${requestID}-${point.id}`;

		store.doc(url).set({
			...point,
			contactID: request.contactID,
			data: request.data,
			provider,
			requestID,
		});
	});

	return updateState(requestURL, points.length ? states.found : states.notFound);
};
