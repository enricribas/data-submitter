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
	<div class="float-right m-4 flex flex-row gap-4">
		<button
			on:click={() => handleNew(newEmail)}
			type="button"
			class="btn variant-filledi bg-blue-400 hover:bg-blue-300 text-white font-bold"
		>
			Create Email
		</button>
		<button
			on:click={() => handleNew(newCRM)}
			type="button"
			class="btn variant-filledi bg-blue-400 hover:bg-blue-300 text-white font-bold"
		>
			Create CRM
		</button>
	</div>
	<h3 class="mb-10 font-bold mr-5 text-2xl text-blue-500">{integrationID}</h3>

	<Accordion spacing="space-y-2">
		{#each $pointsStore as point}
			<div class="border rounded-lg">
				<AccordionItem class="min-h-20 bg-gradient-to-r from-gray-200 to-slate-200 ">
					<svelte:fragment slot="summary"><h2>{point.id || "new"}</h2></svelte:fragment>
					<svelte:fragment slot="content">
						<form on:submit={() => handleForm(point)}>
							{#if !point.name}
								<div class="m-10">
									<label
										for="id"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										name
									</label>
									<input type="text" bind:value={point.id} id="id" class="input input-form" />
								</div>
							{/if}
							<svelte:component this={options[point.type]} {point} />
						</form>
					</svelte:fragment>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>
</div>
