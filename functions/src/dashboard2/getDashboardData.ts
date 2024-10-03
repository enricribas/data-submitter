import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";
import { baseJSON } from "./baseJSON";
import { addGoalsToBaseJSON } from "./utils/addGoalsToBaseJSON";
import { mergeRecordWithOverride } from "./utils/mergeRecordWithOverride";
import { Metric } from './types';

export const getDashboardData = async (req, res) => {
	// Set CORS headers
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(204).send("");
	}

	// Ensure POST only request
	if (req.method !== "POST") {
		return errorReturn(res, statuses.notFound, errors.notPost);
	}

	const { orgID, env } = req.query;
	const { goals, dataSubmits } = req.body;

	// We require certain data or we cannot proceed
	if (!orgID || !env || !goals || !dataSubmits) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	// Create baseJSON with goals and dataSubmits
	let response: Metric[] = addGoalsToBaseJSON(baseJSON, goals, dataSubmits);

	// Fetch this org's dashboard settings
	const url = `orgs/${orgID}/dashboards/1/env/${env}`;
	const apiRecord = await docFor(url);

	// Merge the apiRecord with the response, prioritizing apiRecord data
	response = mergeRecordWithOverride(response, apiRecord);

	return res.status(statuses.success).send(response);
};
