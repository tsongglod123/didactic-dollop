<script setup>
import { ref, computed } from "vue";
import { arrowKey, arrowKeyFilled, arrowKeyCode } from "./scripts/arrow.js";

//Sound
import arrowSound from './assets/hitSound.wav';
import BGSound from './assets/BGSound.mp3';

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

const restartGame = () => { };

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
					hitSound(arrowSound);
				}
				break;
			// up
			case 38:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
					hitSound(arrowSound);
				}
				break;
			// right
			case 39:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
					hitSound(arrowSound);
				}
				break;
			// down
			case 40:
				if (inputKey.value.length <= 5) {
					inputKey.value.push(e.keyCode);
					count();
					checkScore(e.keyCode);
					hitSound(arrowSound);
				}
				break;

			default:
				break;
		}
	}
});

//Sound when hit arrow
const hitSound = (sound) => {
	const audio = new Audio(sound);
	audio.loop = false;
	audio.play();
}
//Background sound
const BG = new Audio(BGSound);
// BG.play();

</script>

<template>
	<div
		class="container mx-auto flex justify-center h-[33rem] min-w-[764px] m-20 pt-5 p-20 bg-base-300 rounded-box"
		id="background"
	>
		<div class="grid justify-items-center">
			<div id="start-game-btn" v-show="!isClick">
				<font face="verdana" size="20px" color="#F28C18">Didactic-Dollop</font>
				<div class="flex justify-center gap-4">
					<button
						class="btn btn-primary"
						type="button"
						@click.left="clickToStart(); hitSound();"
					>CLICK TO START</button>
				</div>
			</div>
		</div>
		<div v-show="isClick" class="container relative mx-auto justify-items-center justify-center">
			<!-- Prepare stage -->
			<div
				id="prepare-stage"
				style="text-align: center"
				:class="timeText"
				class="text-[200px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				v-show="!(timeCount === 0)"
			>{{ timeCount / 1e3 }}</div>
			<!-- Countdown -->
			<div
				id="countdown-play-time"
				class="flex justify-center"
				:class="playTime <= 1e4 ? timeTextAlert : timeText"
				v-show="timeCount === 0"
			>
				{{
					playTime === 0
						? "TIME OUT!"
						: (playTime / 1e3).toFixed(2) + "s"
				}}
			</div>
			<div class="grid justify-items-center" id="arrow-display">
				<div class="flex" id="arrow-key-pattern-display" v-show="timeCount === 0">
					<div v-for="pattern in patternSet.arrowIcon">
						<span v-html="pattern"></span>
					</div>
				</div>
				<div class="grid justify-items-center h-[8rem]" id="arrow-key-user-input">
					<div class="inline-grid grid-cols-6">
						<div v-for="input in inputKey">
							<span v-html="arrowKey[input]"></span>
						</div>
					</div>
				</div>
			</div>
			<!-- detail box -->
			<div v-show="timeCount === 0" id="detail-box">
				<div class="mx-auto w-[32rem] flex">
					<div class="card mx-auto m-2 px-10 py-5 bg-base-200 grid justify-center">
						<div class="text-[20px] mx-auto">Counts</div>
						<div class="text-[30px] mx-auto">{{ counts }}</div>
					</div>
					<div class="card mx-auto m-2 px-10 py-5 bg-base-200 grid justify-center">
						<div class="text-[20px] mx-auto">Scores</div>
						<div class="text-[30px] mx-auto">{{ scores }}</div>
					</div>
					<div class="card mx-auto m-2 px-10 py-5 bg-base-200 grid justify-center">
						<div class="text-[20px] mx-auto">Accuracy</div>
						<div class="text-[30px] mx-auto">
							{{
								(isNaN(accuracy)
									? 0
									: (accuracy * 100).toFixed(2)) + "%"
							}}
						</div>
					</div>
				</div>
				<div id="progress-bar">
					<progress class="progress progress-primary w-100" :value="playTime / 1e3" max="30"></progress>
				</div>
			</div>
		</div>
	</div>
</template>

<style></style>
