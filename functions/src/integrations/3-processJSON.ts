import type { Create, EventContext } from "../firebaseTypes";

import { store } from "../admin";
import { states } from "../states";
import { updateState, collectionURLS, processArray, processMap } from "../utils";
import { processors } from "./processors";

export const processJSON = async (snap: Create, context: EventContext) => {
	const request = snap.data();
	const { template, data, requestID, subject, addresses, mappings } = request;
	const { outputURL, requestURL } = collectionURLS(context, requestID);
	const { outputID } = context.params;

	// call type processors

	const processor = processors.handlebars;
	const processMappings = processMap(processor);
	const processAddresses = processArray(processor);

	// process email template, subject line, addresses, and field mappings
	const document = processor(template, data);
	const subjectDoc = processor(subject, data);
	const to = processAddresses(addresses, data);
	const fields = processMappings(mappings, data);

	// Store processed data into outputs table
	store
		.doc(`${outputURL}/${outputID}`)
		.update({ document, subject: subjectDoc, to, fields: fields.length ? fields : data });

	return updateState(requestURL, states.processed);
};
