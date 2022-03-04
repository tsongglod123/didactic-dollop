export const hitSound = (sound) => {
	const audio = new Audio(sound);
	audio.loop = false;
	audio.play();
};
