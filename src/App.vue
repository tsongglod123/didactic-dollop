<script setup>
import { ref, reactive, computed } from "vue";

const arrowKey = reactive({
	37: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'/></svg>",
	38: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'/></svg>",
	39: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>",
	40: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z'/></svg>",
});

const arrowKeyFilled = reactive({
	37: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z' clip-rule='evenodd'/></svg>",
	38: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z' clip'rule='evenodd'/></svg>",
	39: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z' clip'rule='evenodd'/></svg>",
	40: "<svg xmlns='http://www.w3.org/2000/svg' class='h-36 w-36' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z' clip-rule='evenodd'/></svg>",
});

const arrowKeyCode = reactive([37, 38, 39, 40]);
const inputKey = ref([]); // receive input from user's keyboard
const inputSet = ref([]); // Record all of user's input
const patternSet = ref({
	keyCode: [],
	arrowIcon: [],
});
const isClick = ref(false);
const scores = ref(0);
const counts = ref(0);

const count = () => counts.value++;

const checkScore = (input) => {
	patternSet.value.keyCode.forEach((key, index) => {
		if (key === input[index]) {
			scores.value++;
		}
	});
};

const randomSet = () => {
	isClick.value = true;
	patternSet.value.keyCode.splice(0, patternSet.value.keyCode.length);
	patternSet.value.arrowIcon.splice(0, patternSet.value.arrowIcon.length);
	for (let i = 0; i < 6; i++) {
		let rand = Math.floor(Math.random() * 4);
		patternSet.value.keyCode.push(arrowKeyCode[rand]);
		patternSet.value.arrowIcon.push(arrowKeyFilled[arrowKeyCode[rand]]);
	}
};

document.body.addEventListener("keydown", (e) => {
	if (isClick.value) {
		switch (e.keyCode) {
			case 32:
				inputSet.value.push(
					inputKey.value.splice(0, inputKey.value.length)
				);
				checkScore(inputSet.value[inputSet.value.length - 1]);
				randomSet();
				break;
			case 37:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
				}
				break;
			case 38:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
				}
				break;
			case 39:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
				}
				break;
			case 40:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
				}
				break;

			default:
				break;
		}
	}
});
</script>

<template>
	<div class="flex justify-center">
		<img alt="Vue logo" src="./assets/logo.png" />
	</div>
	<div id="start-game" v-show="!isClick">
		<div class="flex justify-center gap-4">
			<button
				class="btn btn-primary"
				type="button"
				@click.left="randomSet"
			>
				CLICK TO START
			</button>
		</div>
	</div>
	<div id="arrow-display">
		<div class="flex justify-center" id="arrow-key-pattern-display">
			<div v-for="pattern in patternSet.arrowIcon">
				<span v-html="pattern"></span>
			</div>
		</div>
		<div class="flex justify-center" id="arrow-key-user-input">
			<div v-for="input in inputKey">
				<span v-html="arrowKey[input]"></span>
			</div>
		</div>
	</div>
	<div>Counts: {{ counts }}</div>
	<div>Score: {{ scores }}</div>
</template>

<style></style>
