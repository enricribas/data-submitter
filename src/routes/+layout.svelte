<script lang="ts">
	import "../app.postcss";
	import { initializeStores, Toast } from "@skeletonlabs/skeleton";

	initializeStores();
</script>

<Toast position="t" />

<div class="container mx-auto">
	<slot />
</div>
