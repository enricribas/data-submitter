import type { Create, EventContext } from "../firebaseTypes";

import { store, updatedAt } from "../admin";
import { docFor } from "../admin";
import { collectionURLS, updateState } from "../utils";
import { states } from "../states";

export const createContact = async (snap: Create, context: EventContext) => {
	const request = snap.data();

	// Fetch Integration and optional table
	const { contactsURL, requestURL, integrationsURL, newTable } = collectionURLS(context);
	const integrationURL = `${integrationsURL}/${request.integrationID}`;
	const integrationDoc = await docFor(integrationURL);

	if (!integrationDoc) {
		return updateState(requestURL, states.notFound);
	}

	const { table } = integrationDoc;
	const col = table ? newTable(table) : contactsURL;
	const url = `${col}/${request.contactID}`;

	return store.doc(url).set({
		...request.data,
		updatedAt: updatedAt()
	});
};
