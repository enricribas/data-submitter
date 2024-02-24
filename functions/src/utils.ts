import type { EventContext, Request } from "./firebaseTypes";

import { store } from "./admin";

// Ensure that all URLs are prefaced with orgID
const urlFor = (context: EventContext) => {
	const { orgID } = context.params;
	return (url: string) => `/orgs/${orgID}${url}`;
};

// Update the state of the request
export const updateState = (requestURL: string, state: string) =>
	store.doc(requestURL).update({ state });

// standard response statuses
export const statuses = {
	notFound: 404,
	somethingWrong: 422,
	exists: 409,
	success: 200,
};

// Common error messages
export const errors = {
	apiKey: "ApiKey is required",
	notPost: "Must be a POST request",
	apiKeyMissing: "ApiKey is invalid",
	requestIDExists: "Duplicate RequestID. Record already exists",
	missingFields: "Some data is missing or invalid",
};

// A util that returns common URLs based on context
export const collectionURLS = (context: EventContext, _requestID?: string) => {
	const orgify = urlFor(context);
	const { requestID, orgID, instanceID } = context.params;
	const outputURL = orgify(`/records/${instanceID}/outputs`);

	return {
		newTable: (table) => orgify(`/${table}`),
		outputURL,
		outputDocFor: (requestID: string, id: string) => `${outputURL}/${requestID}-${id}`,
		integrationsURL: orgify(`/integrations`),
		contactsURL: orgify(`/records/${instanceID}/contacts`),
		providersURL: orgify("/providers"),
		pointsURL: (integrationID: string) => orgify(`/integrations/${integrationID}/points`),
		requestURL: requestURLFor(orgID, instanceID, _requestID || requestID),
	};
};

export const requestURLFor = (orgID: string, instanceID: string, requestID: string) =>
	`/orgs/${orgID}/records/${instanceID}/requests/${requestID}`;

// Iterate over Object and process the value and return processed Object
export const processMap = (processor) => (mappings, data) => {
	return Object.fromEntries(
		Object.entries(mappings || {}).map(([field, value]: [string, string]) => {
			const processed = processor(value, data);

			return [field, processed];
		}),
	);
};

// Iterate over Array and process the value and return array
export const processArray = (processor) => (array: string[], data) => {
	return (array || []).map((a: string) => processor(a, data));
};

// standard error return
export const errorReturn = (res, status, error) => res.status(status).send({ error });

// Get IP address or default
export const getIp = (req: Request) =>
	req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip || "no ip";

// Monthly Fragment for things that reset monthly
export const yearmon = () => {
	const today = new Date();
	return `${today.getFullYear()}-${today.getMonth() + 1}`;
};
