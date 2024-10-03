import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";
import { baseJSON } from "./baseJSON";

export const getDashboardData = async (req, res) => {
	// Set CORS headers
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(204).send("");
	}

	if (req.method !== "POST") {
		return errorReturn(res, statuses.notFound, errors.notPost);
	}

	const { orgID, env } = req.query;
	// const { goals, dataSubmits } = req.body;

	if (!orgID || !env || !('goals' in req.body) || !('dataSubmits' in req.body)) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	const url = `orgs/${orgID}/dashboards/1/env/${env}`;
	const apiRecord = await docFor(url);

	if (!apiRecord) {
		return res.status(statuses.success).send(baseJSON);
	}


	// const response = {
	// 	...apiRecord,
	// 	goals: Array.isArray(goals) ? goals : [],
	// 	dataSubmits: Array.isArray(dataSubmits) ? dataSubmits : []
	// };

	const response = baseJSON;
	return res.status(statuses.success).send(response);
};
