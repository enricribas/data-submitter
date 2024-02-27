<script lang="ts">
	import type { Point } from "$lib/types/general";

	export let point: Point;
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
