<script lang="ts">
	import { page } from "$app/stores";
	import { pointsStore, subscribePointsStore } from "$lib/stores/pointsStore";
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import { newEmail, newCRM } from "./newPoints";
	import type { Point } from "$lib/types/general";

	import CRM from "./crm.svelte";
	import Email from "./email.svelte";

	const options = {
		crm: CRM,
		email: Email,
	};

	const handleNew = (item: Point) => {
		pointsStore.update((p) => {
			p.push(item);
			return p;
		});
	};

	subscribePointsStore($page.params.integrationID);
</script>

<div class="m-3">
	<div class="m-4 flex flex-row gap-4">
		<button on:click={() => handleNew(newEmail)} type="button" class="btn variant-filled">
			Create Email
		</button>
		<button on:click={() => handleNew(newCRM)} type="button" class="btn variant-filled">
			Create CRM
		</button>
	</div>

	<Accordion spacing="space-y-2">
		{#each $pointsStore as point}
			<div class="border rounded-lg border-slate-400">
				<AccordionItem>
					<svelte:fragment slot="summary"><h2>{point.id || "new"}</h2></svelte:fragment>
					<svelte:fragment slot="content">
						<svelte:component this={options[point.type]} {point} />
					</svelte:fragment>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>
</div>
