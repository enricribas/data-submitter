<script>
	export let point;

	const handleForm = () => {
		// Point is cannot be edited in form
		console.log({ editCopy });
	};

	$: editCopy = Object.entries(
		point.mappings || {
			FirstName: "{{first_name}}"
		}
	);
</script>

<form on:submit={handleForm}>
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

	<div class="flex justify-end">
		<button
			type="submit"
			class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
		>
			Save
		</button>
	</div>
</form>
