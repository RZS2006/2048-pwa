export const hideElement = (element, hidden) => {
	hidden
		? element.classList.add('hidden')
		: element.classList.remove('hidden');
};

export const setInnerText = (element, text) => {
	element.innerText = text;
};
