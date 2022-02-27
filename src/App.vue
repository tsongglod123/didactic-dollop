<script setup>
import { ref, computed } from "vue";
import { arrowKey, arrowKeyFilled, arrowKeyCode } from "./scripts/arrow.js";
//Sound
import arrowSound from "./assets/hitSound.wav";
const timeText = ref("font-mono text-4xl");
const timeTextAlert = ref("font-mono text-4xl text-red-600");
const inputKey = ref([]); // receive input from user's keyboard
const inputSet = ref([]); // Record all of user's input
const patternSet = ref({
    keyCode: [],
    arrowIcon: [],
});
const isClick = ref(false);
const PLAY_TIME = 30000;
const COUNTDOWN_ON_THREE = 3000;
const scores = ref(0);
const counts = ref(0);
const playTime = ref(PLAY_TIME);
const timeCount = ref(COUNTDOWN_ON_THREE);
const pointer = ref(0);
const accuracy = computed(() => scores.value / counts.value);
let prepareToPlay = setInterval(() => {
    if (isClick.value) {
        timeCount.value === 0
            ? clearInterval(prepareToPlay)
            : (timeCount.value -= 1000);
    }
}, 1000);
let countdown = setInterval(() => {
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
const restartGame = () => {
    resetTime();
    scores.value = 0;
    counts.value = 0;
    playTime.value = PLAY_TIME;
    timeCount.value = COUNTDOWN_ON_THREE;
    pointer.value = 0;
    randomSet();
    inputKey.value.splice(0, inputKey.value.length);
    inputSet.value.splice(0, inputSet.value.length);
};
const resetTime = () => {
    prepareToPlay = setInterval(() => {
        if (isClick.value) {
            timeCount.value === 0
                ? clearInterval(prepareToPlay)
                : (timeCount.value -= 1000);
        }
    }, 1000);
    countdown = setInterval(() => {
        if (timeCount.value === 0) {
            playTime.value === 0
                ? clearInterval(countdown)
                : (playTime.value -= 10);
        }
    }, 10);
};
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
};
</script>

<template>
    <div class="main-page mx-auto" id="background">
        <!-- main page -->
        <div class="grid justify-items-center">
            <div id="start-game-btn" v-show="!isClick">
                <div class="text-7xl project-title text-center">
                    Didactic-Dollop
                </div>
                <div class="introduction p-10">
                    <div>Introduction</div>
                    <div class="inline-grid grid-rows-2">
                        <div>Press the arrow key to "match"</div>
                        <div>Press the space key to "next pattern"</div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click.left="clickToStart"
                    >
                        CLICK TO START
                    </button>
                </div>
            </div>
        </div>
        <!-- game stage -->
        <div v-show="isClick" class="prepare-bg mx-auto">
            <!-- prepare stage -->
            <div
                id="prepare-stage"
                style="text-align: center"
                :class="[timeText, 'prepare-countdown', 'text-[200px]']"
                v-show="timeCount !== 0"
            >
                {{ timeCount / 1e3 }}
            </div>
            <!-- play time countdown -->
            <div
                id="countdown-play-time"
                :class="[
                    playTime <= 1e4 ? timeTextAlert : timeText,
                    'flex',
                    'justify-center',
                ]"
                v-show="timeCount === 0"
            >
                {{
                    playTime === 0
                        ? "TIME OUT!"
                        : (playTime / 1e3).toFixed(2) + "s"
                }}
            </div>
            <!-- arrow section -->
            <div v-show="playTime !== 0">
                <div class="grid justify-items-center" id="arrow-display">
                    <div
                        class="flex"
                        id="arrow-key-pattern-display"
                        v-show="timeCount === 0"
                    >
                        <div v-for="pattern in patternSet.arrowIcon">
                            <span v-html="pattern"></span>
                        </div>
                    </div>
                    <div
                        class="grid justify-items-center h-[8rem]"
                        id="arrow-key-user-input"
                    >
                        <div class="inline-grid grid-cols-6">
                            <div v-for="input in inputKey">
                                <span v-html="arrowKey[input]"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="playTime === 0">
                <div class="flex justify-center">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click.left="restartGame"
                    >
                        RESTART
                    </button>
                </div>
            </div>
            <!-- detail box -->
            <div v-show="timeCount === 0" id="detail-box">
                <div class="mx-auto w-[32rem] flex">
                    <div class="info-box mx-auto">
                        <div class="text-[20px] mx-auto font-bold">Counts</div>
                        <div class="text-[30px] mx-auto">{{ counts }}</div>
                    </div>
                    <div class="info-box mx-auto">
                        <div class="text-[20px] mx-auto font-bold">Scores</div>
                        <div class="text-[30px] mx-auto">{{ scores }}</div>
                    </div>
                    <div class="info-box mx-auto">
                        <div class="text-[20px] mx-auto font-bold">
                            Accuracy
                        </div>
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
                    <progress
                        class="countdown-bar"
                        :value="playTime / 1e3"
                        max="30"
                    ></progress>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap");
.project-title {
    font-family: "Libre Barcode 39 Text", cursive;
}

.introduction {
    @apply grid justify-items-center;
    @apply grid-rows-3;
    @apply grid-flow-col;
    @apply font-mono;
}

.main-page {
    @apply container;
    @apply flex justify-center;
    @apply bg-base-300 rounded-box;
    @apply m-20 pt-10 p-20;
    @apply h-[33rem] min-w-[764px];
}
.prepare-bg {
    @apply container;
    @apply relative;
    @apply justify-items-center justify-center;
}
.countdown-bar {
    @apply progress progress-primary;
    @layer w-100;
}
.info-box {
    @apply card;
    @apply m-2 px-10 py-5;
    @apply bg-base-200;
    @apply grid justify-center;
}
.prepare-countdown {
    @apply absolute top-1/2 left-1/2;
    @apply transform -translate-x-1/2 -translate-y-1/2;
}
</style>
