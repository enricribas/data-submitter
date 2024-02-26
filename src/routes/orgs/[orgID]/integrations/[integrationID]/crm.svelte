<script lang="ts">
	import type { Point } from "$lib/types/general";

	export let point: Point;

	$: editCopy = Object.entries(
		point.mappings || {
			FirstName: "{{first_name}}",
		},
	);
</script>

<div class="m-10">
	<label for="webhookID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
		webhookID
	</label>
	<input
		type="text"
		required
		bind:value={point.webhookID}
		id="webhookID"
		class="input input-form"
	/>
</div>

{#if point.mappings}
	<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
		Map fields
	</label>

	<div class="flex space-x-2 mb-3">
		<p class="w-full">Incoming</p>
		<p class="w-full">Outgoing</p>
	</div>
	{#each editCopy as row, i}
		<div class="flex space-x-2 mb-3">
			<input
				bind:value={row[0]}
				class="block h-8 p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				type="text"
			/>
			<input
				bind:value={row[1]}
				class="block h-8 p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				type="text"
			/>
		</div>
	{/each}
{/if}
