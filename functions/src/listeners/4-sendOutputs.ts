import type { Update, EventContext } from "../firebaseTypes";

import { store, docFor } from "../admin";
import { states } from "../states";
import { collectionURLS, updateState } from "../utils";
import { providers } from "../providers";

export const sendOutputs = async (snap: Update, context: EventContext) => {
	const output = snap.after.data();
	const { requestID, id } = output;
	const { outputDocFor } = collectionURLS(context, requestID);
	const outputDoc = outputDocFor(requestID, id);
	const { state } = await docFor(outputDoc);

	// Only do this once. Setting a different state at the end if successful
	if (state !== undefined) { return Promise.resolve(); }

	// change state. If something breaks, don't try again automatically
	await updateState(outputDoc, states.pending);

	// Call provider to handle the sending of request and get response
	const [request, response, newState] = await providers[output.providerID](output);

	return store.doc(outputDoc).update({ request, response, state: newState });
};
