// @ts-nocheck
// linter is screwing up and saying that onDocumentCreated takes wrong arguments

import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated, onDocumentUpdated, DocumentSnapshot } from "firebase-functions/v2/firestore";
import { onObjectFinalized } from "firebase-functions/v2/storage";

/////// Integrations

import { postData } from "./integrations/postData";
import { findIntegration } from "./integrations/1-findIntegration";
import { createContact } from "./integrations/2-createContact";
import { processJSON } from "./integrations/3-processJSON";
import { sendOutputs } from "./integrations/4-sendOutputs";

//// HTTP endpoints

// Post data to start integration process
exports.postData = onRequest(postData);

//// Listeners to postData

const baseURL = "/orgs/{orgID}/records/{instanceID}/";
const requestDoc = "requests/{requestID}";
const outputDoc = "outputs/{outputID}";

// When a message is written to the request, get integration
exports.requestReceived = onDocumentCreated({
  document: baseURL + requestDoc,
  handler: findIntegration
});

// When a message is written to the request, Create a contact record
exports.createContact = onDocumentCreated({
  document: baseURL + requestDoc,
  handler: createContact
});

// When output record created, process data injection
exports.processJSON = onDocumentCreated({
  document: baseURL + outputDoc,
  handler: processJSON
});

// When output record updated, send the actual integrations.
// Note: This looks for state undefined ONLY and sets state before attempting to send.
exports.sendOutputs = onDocumentUpdated({
  document: baseURL + outputDoc,
  handler: sendOutputs
});

/////// Broadcast SMS

import { createContactsFromCSV } from "./sms/1-createContactsFromCSV";

// when a file is uploaded to storage, convert CSV to contacts table
exports.fileUpload = onObjectFinalized({
  handler: createContactsFromCSV
});

/////// Dashboard Settings

import { hideMetrics } from "./dashboard/hideMetrics";
import { getMetrics } from "./dashboard/getMetrics";

// Hide a metric from the dashboard
exports.hideMetric = onRequest(hideMetrics);

// Get metrics from the dashboard
exports.dashboardSettings = onRequest(getMetrics);

/////// PromptService - Not using this yet, using Google Sheets for now
import { getPrompts } from "./prompts/getPrompts";
import { getTagFilters } from "./prompts/getTagFilters";

exports.getPrompts = onRequest(getPrompts);
exports.getTagFilters = onRequest(getTagFilters);

/////// Dashboard 2.0

import { getDashboardData } from "./dashboard2/getDashboardData";
import { updateDashboardData } from "./dashboard2/updateDashboardData";

exports.getDashboardData = onRequest(getDashboardData);
exports.updateDashboardData = onRequest(updateDashboardData);
