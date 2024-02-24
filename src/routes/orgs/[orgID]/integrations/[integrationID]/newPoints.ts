export const newCRM = (integrationID: string) => ({
	integrationID,
	providerID: "syncari",
	type: "crm",
});

export const newEmail = (integrationID: string) => ({
	integrationID,
	providerID: "paubox",
	type: "email",
	addresses: [],
	subject: "",
	body: "",
});
