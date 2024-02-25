<script lang="ts">
	import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import { getToastStore } from "@skeletonlabs/skeleton";

	import { page } from "$app/stores";
	import { pointsStore, subscribePointsStore } from "$lib/stores/pointsStore";
	import { newEmail, newCRM } from "./newPoints";
	import { options } from "./pointOptions";
	import type { Point } from "$lib/types/general";
	import { updatePoint } from "$lib/commands/updatePoint";

	const toastStore = getToastStore();
	const saved: ToastSettings = {
		message: "Saved successfully",
	};

	const handleForm = async (point: Point) => {
		const { orgID } = $page.params;
		await updatePoint(orgID, integrationID, point);
		toastStore.trigger(saved);
	};

	$: integrationID = $page.params.integrationID;

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
						<form on:submit={() => handleForm(point)}>
							<svelte:component this={options[point.type]} {point} />
						</form>
					</svelte:fragment>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>
</div>
