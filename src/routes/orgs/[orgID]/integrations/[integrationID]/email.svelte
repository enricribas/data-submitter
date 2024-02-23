<script lang='ts'>
	import { page } from "$app/stores";
	import { updatePoint } from "$lib/commands/updatePoint";
	import { InputChip } from '@skeletonlabs/skeleton';

	export let point;

	let list: string[] = ['foo', 'bar', 'fizz', 'buzz'];

	const handleForm = () => {
		point.addresses = list;
		const { orgID, integrationID } = $page.params;
		updatePoint(orgID, integrationID, point);
	};

	function isValidEmail(value: string): boolean {
		return value.includes('@') && value.includes('.');
	}
</script>

<form on:submit={handleForm}>
	<p>Use &#123;&#123; &#125&#125 syntax for mail merge</p>
	<div class="m-10">
		<label for="addresses" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Addresses (seprated by comma and a space)
		</label>

		<InputChip bind:value={list} validation={isValidEmail} name="chips" placeholder="Enter an email address and press Enter." />
	</div>
	<div class="m-10">
		<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Subject Template
		</label>
		<input
			type="text"
			bind:value={point.subject}
			id="subject"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="John"
			required
		/>
	</div>

	<div class="m-10">
		<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Body Template
		</label>

		<textarea
			id="message"
			bind:value={point.template}
			rows="4"
			class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Write your thoughts here..."
		/>
	</div>

	<div class="flex justify-end">
		<button
			type="submit"
			class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
		>
			Save
		</button>
	</div>
</form>
