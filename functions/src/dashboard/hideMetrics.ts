import { store, docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";

const successResponse = { success: true, message: "Metric hidden." };

import * as cors from "cors";
const corsHandler = cors({ origin: true });

export const hideMetrics = async (req, res) => {
	corsHandler(req, res, async () => {
		if (req.method !== "POST") return errorReturn(res, statuses.notFound, errors.notPost);

		const { orgID, chatbotID, env, metric } = req.body;
		if (!orgID || !chatbotID || !env || !metric) {
			return errorReturn(res, statuses.notFound, errors.missingFields);
		}

		const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
		const apiRecord = await docFor(url);
		const hiddenMetrics = apiRecord ? [...new Set([...apiRecord.hiddenMetrics, metric])] : [metric];

		await store.doc(url).set({ hiddenMetrics }, { merge: true });

		return res.status(statuses.success).send(successResponse);
	});
};
