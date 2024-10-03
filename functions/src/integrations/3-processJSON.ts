import { DocumentSnapshot } from "firebase-functions/v2/firestore";

import { store } from "../admin";
import { states } from "../states";
import { updateState, collectionURLS, processArray, processMap } from "../utils";
import { processors } from "./processors";

export const processJSON = async (snap: DocumentSnapshot) => {
	const request = snap.data();
	if (!request) {
		console.error("No data in the snapshot");
		return null;
	}

	const { template, data, subject, addresses, mappings } = request;
	const requestID = snap.id;
	const context = {
		params: {
			orgID: snap.ref.path.split('/')[1],
			instanceID: snap.ref.path.split('/')[3],
			requestID: requestID
		}
	};

	const { outputURL, requestURL } = collectionURLS(context, requestID);
	const outputID = `${requestID}-${snap.ref.path.split('/').pop()}`;

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
	await store
		.doc(`${outputURL}/${outputID}`)
		.update({ document, subject: subjectDoc, to, fields: fields.length ? fields : data });

	return updateState(requestURL, states.processed);
};
