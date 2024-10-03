import axios from "axios";
import { states } from "../../states";
import type { ProviderData } from "./index";

const syncariURL = "https://app.syncari.com/arcade/api/v1/webhooks/botco";

export default (output: ProviderData) => {
	const { webhookID, fields } = output;
	const url = syncariURL + "?webhookIdentifier=" + webhookID;
	const request = { url, fields };

	return axios
		.post(url, { ...fields })
		.then(({ status, statusText }) => {
			const response = { status, statusText };
			return [request, response, states.complete];
		})
		.catch((error) => {
			return [request, error, states.failed];
		});
};
