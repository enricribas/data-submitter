<script lang="ts">
	import { page } from "$app/stores";
	import { pointsStore, subscribePointsStore } from "$lib/stores/pointsStore";
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import CRM from "./crm.svelte";
	import Email from "./email.svelte";

	const options = {
		crm: CRM,
		email: Email
	};

	subscribePointsStore($page.params.integrationID);
</script>

<div class="m-3 ">
	<Accordion spacing="space-y-2" >
	{#each $pointsStore as point}
		<div class="border rounded-lg border-slate-400">

		<AccordionItem>
			<svelte:fragment slot="summary"> <h2>{point.type}</h2> </svelte:fragment>
			<svelte:fragment slot="content">
				<svelte:component this={options[point.type]} {point} />
			</svelte:fragment>
		</AccordionItem>
		</div>
	{/each}
	</Accordion>
</div>
