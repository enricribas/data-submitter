// TODO: Share this with functions subfolder
//   simple, create symbolic link for types?
export type Point = {
	id: string;
	type: string;
	integrationID: string;
	addresses?: string[];
	template?: string;
	subject?: string;
	providerID?: string;
	webhookID?: string;
	mappings?: Mappings;
};

interface Mappings {
	[key: string]: string;
}
