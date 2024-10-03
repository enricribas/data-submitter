import { Change, DocumentSnapshot } from "firebase-functions/v2/firestore";

import { store, docFor } from "../admin";
import { states } from "../states";
import { collectionURLS, updateState } from "../utils";
import { providers } from "./providers";

export const sendOutputs = async (change: Change<DocumentSnapshot>) => {
	const output = change.after.data();
	if (!output) {
		console.error("No data in the snapshot");
		return null;
	}

	const { requestID, id } = output;
	const context = {
		params: {
			orgID: change.after.ref.path.split('/')[1],
			instanceID: change.after.ref.path.split('/')[3],
			requestID: requestID
		}
	};

	const { outputDocFor } = collectionURLS(context, requestID);
	const outputDoc = outputDocFor(requestID, id);
	const stateDoc = await docFor(outputDoc);
	const state = stateDoc?.state;

	// Only do this once. Setting a different state at the end if successful
	if (state !== undefined) {
		return null;
	}

	// change state. If something breaks, don't try again automatically
	await updateState(outputDoc, states.pending);

	// Call provider to handle the sending of request and get response
	const [request, response, newState] = await providers[output.providerID](output);

	return store.doc(outputDoc).update({ request, response, state: newState });
};
