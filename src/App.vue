<script setup>
import { ref, reactive } from "vue";

const arrowKey = reactive({
	37: "arrowLeft",
	38: "arrowUp",
	39: "arrowRight",
	40: "arrowDown",
});

const arrowKeyCode = reactive([37, 38, 39, 40]);
const inputKey = ref([]);
const inputSet = ref([]); // Record all of user inputs
const patternSet = ref([]);
const isClick = ref(false);

function randomSet() {
	isClick.value = true;
	patternSet.value.splice(0, patternSet.value.length);
	for (let i = 0; i < 6; i++) {
		let rand = Math.floor(Math.random() * 4);
		patternSet.value.push(arrowKey[arrowKeyCode[rand]]);
	}
}

document.body.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 13:
			randomSet();
			break;
		case 32:
			if (isClick.value) {
				inputSet.value.push(
					inputKey.value.splice(0, inputKey.value.length)
				);
				randomSet();
			}
			break;
		case 37:
			if (inputKey.value.length <= 5) {
				inputKey.value.push(e.keyCode);
			}
			break;
		case 38:
			if (inputKey.value.length <= 5) {
				inputKey.value.push(e.keyCode);
			}
			break;
		case 39:
			if (inputKey.value.length <= 5) {
				inputKey.value.push(e.keyCode);
			}
			break;
		case 40:
			if (inputKey.value.length <= 5) {
				inputKey.value.push(e.keyCode);
			}
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
	<div class="flex justify-center gap-4">
		<button
			class="btn btn-primary"
			type="button"
			@click.left="randomSet"
			:disabled="isClick"
		>
			CLICK TO START
		</button>
		<p
			class="self-center font-semibold uppercase"
			:class="isClick ? 'text-slate-400' : ''"
		>
			or press enter
		</p>
	</div>
	<div>{{ patternSet }}</div>
	<div>User input: {{ inputKey }}</div>
	<div>Record</div>
	<ul>
		<li v-for="(keySet, index) in inputSet" :key="index">
			{{ index + 1 }}: {{ keySet }}
		</li>
	</ul>
</template>

<style></style>
