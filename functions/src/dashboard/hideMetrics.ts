import { store, docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";
import * as cors from "cors";

const successResponse = { success: true, message: "Metric hidden." };

const corsHandler = cors({ origin: true });

export const hideMetrics = async (req, res) => {
	// Apply CORS middleware
	corsHandler(req, res, async () => {
		// Check if the request method is POST
		if (req.method !== "POST") {
			return errorReturn(res, statuses.notFound, errors.notPost);
		}

		// Destructure and validate request body
		const { orgID, chatbotID, env, metric } = req.body;
		if (!orgID || !chatbotID || !env || !metric) {
			return errorReturn(res, statuses.notFound, errors.missingFields);
		}

		// Construct the document URL
		const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
		const apiRecord = await docFor(url);

		// Update hidden metrics
		const hiddenMetrics = apiRecord?.hiddenMetrics
			? [...new Set([...apiRecord.hiddenMetrics, metric])]
			: [metric];

		await store.doc(url).set({ hiddenMetrics }, { merge: true });

		// Send success response
		return res.status(statuses.success).send(successResponse);
	});
};
