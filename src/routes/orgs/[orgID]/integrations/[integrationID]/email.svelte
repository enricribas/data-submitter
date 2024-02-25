<script lang="ts">
	import { InputChip } from "@skeletonlabs/skeleton";
	import type { Point } from "$lib/types/general";

	export let point: Point;

	function isValidEmail(value: string): boolean {
		return value.includes("@") && value.includes(".");
	}
</script>

<div class="grid w-full">
	<aside class="justify-self-end alert variant-outline-success bg-purple-200 w-96">
		<h5 class="h5">
			Use <em class="font-bold">&#123;&#123;attribute_name&#125&#125</em> to inject attributes
		</h5>
	</aside>
</div>

<div class="m-10">
	<label for="addresses" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
		Addresses
	</label>

	<InputChip
		padding="p-4"
		bind:value={point.addresses}
		validation={isValidEmail}
		name="chips"
		placeholder="Enter an email address and press Enter."
		required
	/>
</div>
<div class="m-10">
	<label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
		Subject Template
	</label>
	<input
		type="text"
		bind:value={point.subject}
		id="subject"
		class="form-input input w-full"
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
		class="form-textarea input w-full rounded-lg"
		placeholder="Write your thoughts here..."
		required
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
