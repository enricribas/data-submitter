import { files, store, updatedAt } from "../admin";
import * as csv from "csvtojson";

export const createContactsFromCSV = async (event) => {
	const fileBucket = event.bucket;
	const filePath = event.name;
	const file = files.bucket(fileBucket).file(filePath);
	const [buffer] = await file.download();
	const data = await csv().fromString(buffer.toString());

	// log data for each row of the CSV
	for (let index = 0; index < data.length; index++) {
		const row = data[index];
		const url = `test/${index + 1}`;

		await store.doc(url).set({
			...row,
			updatedAt: updatedAt(),
		});
	}
};
