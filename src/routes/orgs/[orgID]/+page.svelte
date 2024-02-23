<script lang="ts">
	import { page } from "$app/stores";
	import { userStore } from "$lib/stores/userStore";

	$: console.log("$userStore\n", "\n", $userStore?.uid, "\n\n");
</script>

<div class="m-3">
	<h1 class="text-3xl font-bold text-red-500">
		orgID : {$page.params.orgID}
	</h1>

	Use
	<p>
		/orgs/{$page.params.orgID}/integrations/ + integrationID
	</p>
</div>
