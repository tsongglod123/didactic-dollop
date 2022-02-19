<script setup>
import { ref, reactive } from "vue";

const arrowKey = reactive({
	37: "arrowLeft",
	38: "arrowUp",
	39: "arrowRight",
	40: "arrowDown",
});
const inputKey = ref([]);

// Record all of user inputs
const inputSet = ref([]);

document.body.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 32:
			inputKey.value.push(e.keyCode);
			inputSet.value.push(
				inputKey.value.splice(0, inputKey.value.length)
			);
			break;
		case 37:
			inputKey.value.push(e.keyCode);
			break;
		case 38:
			inputKey.value.push(e.keyCode);
			break;
		case 39:
			inputKey.value.push(e.keyCode);
			break;
		case 40:
			inputKey.value.push(e.keyCode);
			break;

		default:
			break;
	}
});
</script>

<template>
	<div class="flex justify-center">
		<img alt="Vue logo" src="./assets/logo.png" />
	</div>
	<div>
		<div v-for="(arrow, code) in arrowKey" :key="code">
			{{ code }}: {{ arrow }}
		</div>
	</div>
	<div>user input: {{ inputKey }}</div>
	<div>record: {{ inputSet }}</div>
	<ul>
		<li v-for="(keySet, index) in inputSet" :key="index">
			{{ keySet }}
		</li>
	</ul>
</template>

<style></style>
