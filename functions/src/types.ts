export type Point = {
	id?: string;
	type: string;
	integrationID: string;
	addresses?: string[];
	template?: string;
	subject?: string;
	webhookID?: string;
	providerID?: string;
};

// Providers

export type MailgunProviderConfig = {
	apiKey: string;
	domain: string;
	from: string;
};
