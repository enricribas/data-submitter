require('dotenv').config();
const pbMail = require("paubox-node");
const service = pbMail.emailService();
import { states } from "../states";
import type { ProviderData } from "./index";

type PauboxResponse = {
    data: string;
    sourceTrackingId: string;
}

export default (data: ProviderData) => {
	const request = {
		from: "no-reply@botco.ai",
		to: data.to,
		subject: data.subject,
		text_content: data.document,
		html_content: data.document
	};

	const message = pbMail.message(request);

    // Note: the response on success should have the ID for checking status
	return service
		.sendMessage(message)
		.then((response: PauboxResponse) => {
            return [request, response, states.complete]
		})
		.catch((error) => {
            return [request, error, states.failed]
		});
};
