<script setup>
import { ref, computed } from "vue";
import { arrowKey, arrowKeyFilled, arrowKeyCode } from "./scripts/arrow.js";

const timeText = ref("font-mono text-4xl");
const timeTextAlert = ref("font-mono text-4xl text-red-600");

const inputKey = ref([]); // receive input from user's keyboard
const inputSet = ref([]); // Record all of user's input
const patternSet = ref({
	keyCode: [],
	arrowIcon: [],
});

const isClick = ref(false);

const scores = ref(0);
const counts = ref(0);
const playTime = ref(30000);
const timeCount = ref(3000);
const pointer = ref(0);

const accuracy = computed(() => scores.value / counts.value);

const prepareToPlay = setInterval(() => {
	if (isClick.value) {
		timeCount.value === 0
			? clearInterval(prepareToPlay)
			: (timeCount.value -= 1000);
	}
}, 1000);

const countdown = setInterval(() => {
	if (timeCount.value === 0) {
		playTime.value === 0
			? clearInterval(countdown)
			: (playTime.value -= 10);
	}
}, 10);

const count = () => counts.value++;

const checkScore = (keyCode) => {
	if (keyCode === 32) pointer.value = -1;
	if (patternSet.value.keyCode[pointer.value] === keyCode) {
		scores.value++;
	}
	pointer.value++;
};

const clickToStart = () => {
	isClick.value = true;
	randomSet();
};

const restartGame = () => {};

const randomSet = () => {
	patternSet.value.keyCode.splice(0, patternSet.value.keyCode.length);
	patternSet.value.arrowIcon.splice(0, patternSet.value.arrowIcon.length);
	for (let i = 0; i < 6; i++) {
		let rand = Math.floor(Math.random() * 4);
		patternSet.value.keyCode.push(arrowKeyCode[rand]);
		patternSet.value.arrowIcon.push(arrowKeyFilled[arrowKeyCode[rand]]);
	}
};

document.body.addEventListener("keydown", (e) => {
	if (timeCount.value === 0 && playTime.value !== 0) {
		switch (e.keyCode) {
			// space
			case 32:
				inputSet.value.push(
					inputKey.value.splice(0, inputKey.value.length)
				);
				checkScore(e.keyCode);
				randomSet();
				break;
			// left
			case 37:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
				}
				break;
			// up
			case 38:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
				}
				break;
			// right
			case 39:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
				}
				break;
			// down
			case 40:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
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
		<img src="./assets/logo.png" alt="vue logo" />
	</div>
	<div id="start-game" v-show="!isClick">
		<div class="flex justify-center gap-4">
			<button
				class="btn btn-primary"
				type="button"
				@click.left="clickToStart"
			>
				CLICK TO START
			</button>
		</div>
	</div>
	<!-- Prepare stage -->
	<div style="text-align: center" v-show="isClick" :class="timeText">
		{{ timeCount / 1e3 }}
	</div>
	<!-- Countdown -->
	<div
		style="text-align: center"
		:class="playTime <= 1e4 ? timeTextAlert : timeText"
		v-show="timeCount === 0"
	>
		{{ playTime === 0 ? "TIME OUT!" : (playTime / 1e3).toFixed(2) + "s" }}
	</div>
	<div id="arrow-display">
		<div
			class="flex justify-center"
			id="arrow-key-pattern-display"
			v-show="timeCount === 0"
		>
			<div v-for="pattern in patternSet.arrowIcon">
				<span v-html="pattern"></span>
			</div>
		</div>
		<div class="grid justify-items-center" id="arrow-key-user-input">
			<div class="inline-grid grid-cols-6">
				<div v-for="input in inputKey">
					<span v-html="arrowKey[input]"></span>
				</div>
			</div>
		</div>
	</div>
	<div>Counts: {{ counts }}</div>
	<div>Scores: {{ scores }}</div>
	<div>Pointer: {{ pointer }}</div>
	<div>
		Accuracy:
		{{ (isNaN(accuracy) ? 0 : (accuracy * 100).toFixed(2)) + "%" }}
	</div>
</template>

<style></style>
