import { states } from "../states";
import paubox from "./paubox";
import syncari from "./syncari";

const noopProvider = () => [{ provider: "noop" }, { provider: "noop" }, states.complete];

export const providers = {
	mailgun: noopProvider,
	sendgrid: noopProvider,
	salesforce: noopProvider,
	syncari,
	paubox
};

export type ProviderData = {
	webhookID: string;
	data: any;
	contactID: string;
	provider: any;
	providerID: string;
	requestID: string;
	integrationID: string;
	id: string;
	fields: any;
	type?: string;
	subject?: string;
	document?: string;
	to?: string[];
};
