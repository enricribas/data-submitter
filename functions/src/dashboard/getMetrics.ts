import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";

export const getMetrics = async (req, res) => {
	// Set CORS headers
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(204).send("");
	}

	if (req.method !== "GET") {
		return errorReturn(res, statuses.notFound, errors.notPost);
	}

	const { orgID, chatbotID, env } = req.query;
	if (!orgID || !chatbotID || !env) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
	const apiRecord = await docFor(url);

	if (!apiRecord) {
		return errorReturn(res, statuses.notFound, { url, orgID, chatbotID, env });
	}

	return res.status(statuses.success).send(apiRecord);
};
