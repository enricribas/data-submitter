import { functions } from "./admin";

/////// Integrations

import { postData } from "./integrations/postData";
import { findIntegration } from "./integrations/1-findIntegration";
import { createContact } from "./integrations/2-createContact";
import { processJSON } from "./integrations/3-processJSON";
import { sendOutputs } from "./integrations/4-sendOutputs";

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
exports.createContact = functions.firestore.document(baseURL + requestDoc).onCreate(createContact);

// When output record created, process data injection
exports.processJSON = functions.firestore.document(baseURL + outputDoc).onCreate(processJSON);

// When output record updated, send the actual integrations.
// Note: This looks for state undefined ONLY and sets state before attempting to send.
exports.sendOutputs = functions.firestore.document(baseURL + outputDoc).onUpdate(sendOutputs);

/////// Broadcast SMS

import { createContactsFromCSV } from "./sms/1-createContactsFromCSV";

// when a file is uploaded to storage, convert CSV to contacts table
// FIXME use the 2nd gen firebase storage
// FIXME this listens to all buckets
exports.fileUpload = functions.storage.object().onFinalize(createContactsFromCSV);

/////// Dashboard Settings

import { hideMetrics } from "./dashboard/hideMetrics";
import { getMetrics } from "./dashboard/getMetrics";

// Hide a metric from the dashboard
exports.hideMetric = functions.https.onRequest(hideMetrics);

// Get metrics from the dashboard
exports.dashboardSettings = functions.https.onRequest(getMetrics);
