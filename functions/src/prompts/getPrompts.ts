import { errorReturn, statuses, errors } from "../utils";

export const getPrompts = async (req, res) => {
	// FIXME: Remove console.log
	console.log("req.method\n", "\n", req.method, "\n\n");

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

	return res.status(statuses.success).send(mock);
};
