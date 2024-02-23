<script lang='ts'>
	import { page } from "$app/stores";
	import { updatePoint } from "$lib/commands/updatePoint";
	import { InputChip } from '@skeletonlabs/skeleton';
	import type { Point } from "$lib/types/general";

	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const saved: ToastSettings = {
		message: 'Saved successfully',
	};

	export let point: Point;

	const handleForm = async () => {
		const { orgID } = $page.params;
		await updatePoint(orgID, point);
		toastStore.trigger(saved);
	};

	function isValidEmail(value: string): boolean {
		return value.includes('@') && value.includes('.');
	}
</script>

<form on:submit={handleForm}>
	<p class="border text-center p-2 rounded-full">Use &#123;&#123; &#125&#125 to inject attributes</p>
	<div class="m-10">
		<label for="addresses" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Addresses
		</label>

<InputChip class=" border-red-400 border-2" padding="p-4" bind:value={point.addresses} validation={isValidEmail} name="chips" placeholder="Enter an email address and press Enter." />
	</div>
	<div class="m-10">
		<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Subject Template
		</label>
		<input
			type="text"
			bind:value={point.subject}
			id="subject"
			class="form-input input w-full px-4 py-3 rounded-lg"
			placeholder="Subject"
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
			class="form-textarea input  w-full rounded-lg"
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
