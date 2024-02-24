export const randomUUID = (length = 32) => {
	let uuid = "";
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		uuid += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return uuid;
};
