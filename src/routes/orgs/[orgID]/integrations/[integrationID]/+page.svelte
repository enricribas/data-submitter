<script lang="ts">
	import type { Point } from "$lib/types/general";
	import { Accordion, AccordionItem, getToastStore } from "@skeletonlabs/skeleton";
	import { page } from "$app/stores";
	import { saved, deleted } from "$lib/toasts";
	import { pointsStore, subscribePointsStore } from "$lib/stores/pointsStore";
	import TrashIcon from "$lib/icons/trash.svelte";
	import { newEmail, newCRM } from "./newPoints";
	import { options } from "./pointOptions";
	import { updatePoint, deletePoint } from "$lib/commands/pointCommands";

	export const toastStore = getToastStore();

	let confirmed = false;
	$: integrationID = $page.params.integrationID;
	$: orgID = $page.params.orgID;
	$: subscribePointsStore({ orgID, integrationID });

	const savePoint = async (point: Point) => {
		await updatePoint(orgID, integrationID, point);
		toastStore.trigger(saved);
	};

	const deletePointConfirm = async (point: Point) => {
		if (confirmed) {
			await deletePoint(orgID, integrationID, point);
			toastStore.trigger(deleted);
		} else {
			setTimeout(() => {
				confirmed = false;
			}, 5000);
		}

		confirmed = !confirmed;
	};

	const setupNewPoint = (item: Point) => {
		pointsStore.update((p) => {
			p.push(item);
			return p;
		});
	};
</script>

<div class="m-3">
	<div class="flex justify-between">
		<div class="m-4 flex flex-row gap-4">
			<button
				on:click={() => setupNewPoint(newEmail)}
				type="button"
				class="btn variant-filledi bg-blue-400 hover:bg-blue-300 text-white font-bold"
			>
				Create Email
			</button>
			<button
				on:click={() => setupNewPoint(newCRM)}
				type="button"
				class="btn variant-filledi bg-blue-400 hover:bg-blue-300 text-white font-bold"
			>
				Create CRM
			</button>
		</div>
		<h3 class="mb-10 font-bold mr-5 text-2xl text-blue-500">{integrationID}</h3>
	</div>

	<Accordion spacing="space-y-2">
		{#each $pointsStore as point}
			<div class="border rounded-lg">
				<AccordionItem class="min-h-20 bg-gradient-to-r from-gray-200 to-slate-200 ">
					<svelte:fragment slot="summary"><h2>{point.id || "new"}</h2></svelte:fragment>
					<svelte:fragment slot="content">
						<form on:submit={() => savePoint(point)}>
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
							<div class="flex justify-between">
								{#if point.name}
									<a
										href=""
										on:click={() => deletePointConfirm(point)}
										class="mb-10 ml-10 flex gap-2 text-red-500 font-bold"
									>
										<TrashIcon />
										{confirmed ? "Click again to delete" : "Delete"}
									</a>
								{:else}
									<p class="text-red-400 font-light text-sm">unsaved</p>
								{/if}
								<div class="flex justify-end">
									<button type="submit" class="submit-button"> Save </button>
								</div>
							</div>
						</form>
					</svelte:fragment>
				</AccordionItem>
			</div>
		{/each}
	</Accordion>
</div>
