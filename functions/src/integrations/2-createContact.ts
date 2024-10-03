import { DocumentSnapshot } from "firebase-functions/v2/firestore";

import { store, updatedAt } from "../admin";
import { docFor } from "../admin";
import { collectionURLS, updateState } from "../utils";
import { states } from "../states";

export const createContact = async (snap: DocumentSnapshot) => {
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

	await store.doc(url).set({
		...request.data,
		updatedAt: updatedAt()
	});

	// state is probably wrong here
	return updateState(requestURL, states.pending);
};          
