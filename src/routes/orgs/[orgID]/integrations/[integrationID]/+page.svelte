<script lang="ts">
	import { page } from "$app/stores";
	import { pointsStore, subscribePointsStore } from "$lib/stores/pointsStore";

	import PointWrapper from "./pointWrapper.svelte";
	import CRM from "./crm.svelte";
	import Email from "./email.svelte";

	const options = {
		crm: CRM,
		email: Email
	};


	subscribePointsStore($page.params.integrationID);
</script>

<div class="m-3">
	{#each $pointsStore as point}
		<PointWrapper title={point.type}>
			<svelte:component this={options[point.type]} {point} />
		</PointWrapper>
	{/each}
</div>
