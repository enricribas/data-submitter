import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";

export const getMetrics = async (req, res) => {
	if (req.method !== "GET") return errorReturn(res, statuses.notFound, errors.notPost);

	const { orgID, chatbotID, env } = req.query;
	if (!orgID || !chatbotID || !env) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
	const apiRecord = await docFor(url);

	return res.status(statuses.success).send(apiRecord);
};
