import { store, docFor } from "../admin";
import { errorReturn, statuses, errors, requestURLFor } from "../utils";
import { Request } from "../firebaseTypes";

type PostDataRecord = {
	contactID: string;
	requestID: string;
	integrationID: string;
	data: any;
};

const successResponse = {
	success: true,
	message: "Request accepted. Check request records for processing status.",
};

export const test = async (_req: Request, res) => {
	return res.status(statuses.success).send(successResponse);
};

export const postData = async (req: Request, res) => {
	const { apiKey, body, method, instanceID } = getVars(req);

	if (method !== "POST") return errorReturn(res, statuses.notFound, errors.notPost);
	if (!apiKey) return errorReturn(res, statuses.notFound, errors.apiKey);

	const apiRecord = await docFor(`/apikeys/${apiKey}`);
	if (!apiRecord) return errorReturn(res, statuses.notFound, errors.apiKeyMissing);

	const { orgID } = apiRecord;

	try {
		const success = createRequest(body, orgID, instanceID);

		if (!success) return errorReturn(res, statuses.exists, errors.requestIDExists);

		return res.status(statuses.success).send(successResponse);
	} catch (error) {
		return errorReturn(res, statuses.somethingWrong, errors.missingFields);
	}
};

const getVars = (req: Request) => ({
	apiKey: req.query.apiKey,
	instanceID: req.query.instanceID || "default",
	body: req.body as PostDataRecord,
	method: req.method,
});

const createRequest = async (body: any, orgID: string, instanceID: any) => {
	const { contactID, requestID, integrationID, data } = body;

	const requestURL = requestURLFor(orgID, instanceID, requestID);
	const requestIDRecord = await docFor(requestURL);

	if (requestIDRecord) return false;

	await store.doc(requestURL).set({ contactID, integrationID, data });

	return true;
};
