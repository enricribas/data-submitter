// import { docFor } from "../admin";
import { errorReturn, statuses, errors } from "../utils";

export const getPrompts = async (req, res) => {
	if (req.method !== "GET") return errorReturn(res, statuses.notFound, errors.notPost);

	const { orgID, chatbotID } = req.query;
	if (!orgID || !chatbotID) {
		return errorReturn(res, statuses.notFound, errors.missingFields);
	}

	const mock = [
		{
			name: "Topics",
			prompt: "this is the prompt for LLM for Topics",
			index: 0, // order on contact list
			showOnList: true,
			showOnContact: true,
		},
		{
			name: "Sentiment",
			prompt: "this is the prompt for LLM for Sentiment",
			index: 1, // order on contact list
			showOnList: true,
			showOnContact: true,
		},
	];
	// const url = `orgs/${orgID}/chatbots/${chatbotID}/env/${env}`;
	// const apiRecord = await docFor(url);

	// if (!apiRecord) {
	// 	return errorReturn(res, statuses.notFound, "not found");
	// }

	return res.status(statuses.success).send(mock);
};
