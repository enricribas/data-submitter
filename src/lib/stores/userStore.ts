import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";
import { writable } from "svelte/store";

import { auth } from "$lib/firebase";

export const userStore = writable<User | null>(null);

// Login anonymous user if we don't already have an account
const loginAnon = async () => {
	try {
		await signInAnonymously(auth);
	} catch (e) {
		console.error("Could not sign in anonymous user", e);
	}
};

onAuthStateChanged(auth, (newUser) => {
	if (newUser) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User

		console.info("newUser\n", newUser, "\n\n");

		userStore.update(() => newUser);
	} else {
		// User is new
		loginAnon();

		// why? I think that this function will get recalled, so not really needed
		userStore.update(() => null);
	}
});
