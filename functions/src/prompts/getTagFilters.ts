// import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";

export const getTagFilters = async (req, res) => {
	if (req.method !== "GET") return errorReturn(res, statuses.notFound, errors.notPost);

	const { orgID, chatbotID } = req.query;
	if (!orgID || !chatbotID) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	const mock = [
		{
			name: "Topics",
			values: ["Topic 1", "Topic 2", "Topic 3"],
		},
		{
			name: "Sentiment",
			values: ["Sentiment 1", "Sentiment 2", "Sentiment 3"],
		},
	];

	// const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
	// const apiRecord = await docFor(url);

	// if (!apiRecord) {
	// 	return errorReturn(res, statuses.notFound, "not found");
	// }

	return res.status(statuses.success).send(mock);
};
