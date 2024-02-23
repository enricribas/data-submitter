import { functions } from "./admin";
import { postData } from "./endpoints/postData";
import { findIntegration } from "./listeners/1-findIntegration";
import { createContact } from "./listeners/2-createContact";
import { processJSON } from "./listeners/3-processJSON";
import { sendOutputs } from "./listeners/4-sendOutputs";

//// HTTP endpoints

// Post data to start integration process
exports.postData = functions.https.onRequest(postData);

//// Listeners to postData

const baseURL = "/orgs/{orgID}/records/{instanceID}/";
const requestDoc = "requests/{requestID}";
const outputDoc = "outputs/{outputID}";

// When a message is written to the request, get integration
exports.requestReceived = functions.firestore
	.document(baseURL + requestDoc)
	.onCreate(findIntegration);

// When a message is written to the request, Create a contact record 
exports.createContact = functions.firestore
	.document(baseURL + requestDoc)
	.onCreate(createContact);

// When output record created, process data injection
exports.processJSON = functions.firestore
	.document(baseURL + outputDoc)
	.onCreate(processJSON);

// When output record updated, send the actual integrations. 
// Note: This looks for state undefined ONLY and sets state before attempting to send.
exports.sendOutputs = functions.firestore
	.document(baseURL + outputDoc)
	.onUpdate(sendOutputs);
