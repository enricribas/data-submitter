<script>
	import { slide } from "svelte/transition";

	export let title;
	let open = false;
</script>

<button class="w-full flex" on:click={() => (open = !open)}>
	{title.toUpperCase()}
</button>

{#if open}
	<div transition:slide={{ y: -50 }} class="m-10">
		<slot />
	</div>
{/if}
