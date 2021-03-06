import { reactive } from "vue";

// 37 = left
// 38 = up
// 39 = right
// 40 = down

export const arrowKey = reactive({
	37: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'/></svg>",
	38: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'/></svg>",
	39: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>",
	40: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z'/></svg>",
});

export const arrowKeyFilled = reactive({
	37: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z' clip-rule='evenodd'/></svg>",
	38: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z' clip'rule='evenodd'/></svg>",
	39: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z' clip'rule='evenodd'/></svg>",
	40: "<svg xmlns='http://www.w3.org/2000/svg' class='h-24 w-24' viewBox='0 0 20 20' fill='currentColor'><path fill-rule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z' clip-rule='evenodd'/></svg>",
});

export const arrowKeyCode = reactive([37, 38, 39, 40]);
