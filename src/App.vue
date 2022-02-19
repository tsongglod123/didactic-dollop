<script setup>
import { ref, reactive, computed } from "vue";
const arrowKey = reactive({
	37: "arrowLeft",
	38: "arrowUp",
	39: "arrowRight",
	40: "arrowDown",
});
const inputKey = ref([]);

document.body.addEventListener("keydown", (e) => {
	inputKey.value.push(e.keyCode);
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
	<div>{{ inputKey }}</div>
</template>

<style></style>
