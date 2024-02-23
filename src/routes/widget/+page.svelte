<script>
	import "./iframe.css";
	import { onMount } from "svelte";

	onMount(() => {
		let v = document.createElement("script");
		v.onload = function () {
			window.voiceflow.chat.load({
				verify: { projectID: "65131a437c01990007282c08" },
				url: "https://general-runtime.voiceflow.com",
				versionID: "production"
			});
			let intervalId = setInterval(() => {
				let element = document.getElementsByClassName("vfrc-launcher");
				if (element) {
					element[0].click();
					clearInterval(intervalId); // Stop the timer
				}
			}, 100);
		};
		v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
		v.type = "text/javascript";
		let s = document.getElementById("scriptPlace");
		s.parentNode.insertBefore(v, s);
	});
</script>

<div id="scriptPlace" />
<h3>InsuranceGPT</h3>
Ask me anything!

<style>
	:global(.vfrc-widget--chat) {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		left: 0;
		right: 0;
	}
</style>
