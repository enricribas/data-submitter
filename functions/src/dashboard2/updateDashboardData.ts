import { errorReturn, statuses, errors } from "../utils";
import { firestore } from 'firebase-admin';

export const updateDashboardData = async (req, res) => {
	// Set CORS headers
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		return res.status(204).send("");
	}

	// Ensure POST only request
	if (req.method !== "POST") {
		return errorReturn(res, statuses.notFound, errors.notPost);
	}

	// Get data needed from the request
	const { orgID, env } = req.query;
	const { dashboardSettings } = req.body;

	// We require certain data or we cannot proceed
	if (!orgID || !env || !dashboardSettings) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	// Construct the document reference
	const url = `orgs/${orgID}/dashboards/1/env/${env}`;
	const docRef = firestore().doc(url);

	try {
		// Write the dashboardSettings overriding everything that is there!
		await docRef.set({ dashboardSettings }, { merge: true });

		return res.status(statuses.success).send({
			success: true,
			message: "Dashboard data updated successfully"
		});
	} catch (error) {
		console.error("Error updating dashboard data:", error);
		return errorReturn(res, statuses.somethingWrong, "Failed to update dashboard data");
	}
};
