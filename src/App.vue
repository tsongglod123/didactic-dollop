<script setup>
import { ref } from "vue";
const checked = ref(false);

const testClick = () => (checked.value = checked.value ? false : true);
</script>

<template>
	<div class="flex justify-center">
		<img alt="Vue logo" src="./assets/logo.png" />
	</div>
	<h1 class="text-3xl font-bold tracking-wide">Hello Tailwind!</h1>
	<h1 class="text-xl font-semibold">Test DaisyUI plugin</h1>
	<div>
		<button class="btn btn-primary" @click="testClick">
			Hello DaisyUI!
		</button>
		<input type="checkbox" class="checkbox" v-model="checked" />
		<input type="checkbox" class="toggle" />
		<div class="alert alert-success">Message sent successfully</div>
	</div>
	<div class="flex justify-center">
		<article class="prose lg:prose-xl">
			<h1>Test Typography plugin (Tailwind)</h1>
			<h2>Garlic bread with cheese: What the science tells us</h2>
			<div class="text-justify">
				<p>
					For years parents have espoused the health benefits of
					eating garlic bread with cheese to their children, with the
					food earning such an iconic status in our culture that kids
					will often dress up as warm, cheesy loaf for Halloween.
				</p>
				<p>
					But a recent study shows that the celebrated appetizer may
					be linked to a series of rabies cases springing up around
					the country.
				</p>
			</div>
			<!-- ... -->
		</article>
	</div>
</template>

<style></style>
