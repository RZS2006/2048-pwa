// Selectors

const navMenuLink = document.querySelector('#nav__menu-link');
const navGameLink = document.querySelector('#nav__game-link');
const navBestScore = document.querySelector('#nav__best-score');

const menuSection = document.querySelector('#menu-section');
const menuBaseNumberSelect = document.querySelector(
	'#menu__base-number-select'
);
const menuNewGameBtn = document.querySelector('#menu__new-game-btn');

const gameOverSection = document.querySelector('#game-over-section');
const gameOverResult = document.querySelector('#game-over__result');
const gameOverScore = document.querySelector('#game-over__score');
const gameOverMoves = document.querySelector('#game-over__moves');
const gameOverKeepPlayingBtn = document.querySelector(
	'#game-over__keep-playing-btn'
);
const gameOverPlayAgainBtn = document.querySelector(
	'#game-over__play-again-btn'
);

const gameGrid = document.querySelector('#game__grid');
const gameScore = document.querySelector('#game__score');
const gameMoves = document.querySelector('#game__moves');
const gameLeftBtn = document.querySelector('#game__left-btn');
const gameUpBtn = document.querySelector('#game__up-btn');
const gameDownBtn = document.querySelector('#game__down-btn');
const gameRightBtn = document.querySelector('#game__right-btn');

// Globals

const PAGES = {
	game: 'GAME_PAGE',
	menu: 'MENU_PAGE',
	gameOver: 'GAME_OVER_PAGE',
};

const GAME_RESULTS = {
	win: 'GAME_WIN',
	loss: 'GAME_LOSS',
};

let currentPage = PAGES.menu;
let gameIsRunning = false;

// Functions

const newGame = (baseNumber, hasPoints) => {
	hideElement(navGameLink, true);
	hideElement(navMenuLink, false);
	hideElement(menuSection, true);
	hideElement(gameOverSection, true);

	currentPage = PAGES.game;
	gameIsRunning = true;

	console.log(baseNumber, `Has${hasPoints ? '' : ' no'} points`);
};

const gameOver = (result) => {
	hideElement(gameOverSection, false);
	currentPage = PAGES.gameOver;

	if (result === GAME_RESULTS.win) {
		hideElement(gameOverKeepPlayingBtn, false);
		hideElement(gameOverPlayAgainBtn, false);
		setInnerText(gameOverResult, 'Victory Royale!');
	} else {
		hideElement(gameOverKeepPlayingBtn, true);
		hideElement(gameOverKeepPlayingBtn, true);
		setInnerText(gameOverResult, 'Game Over!');
		gameIsRunning = false;
	}
};

const hideElement = (element, hidden) => {
	hidden
		? element.classList.add('hidden')
		: element.classList.remove('hidden');
};

const setInnerText = (element, text) => {
	element.innerText = text;
};

// Event Listeners

document.addEventListener('DOMContentLoaded', () => {
	// Navigate to menu
	hideElement(navMenuLink, true);
	hideElement(gameOverSection, true);
});

navGameLink.addEventListener('click', () => {
	// Navigate to game
	hideElement(navGameLink, true);
	hideElement(navMenuLink, false);
	hideElement(menuSection, true);
	hideElement(gameOverSection, true);

	currentPage = PAGES.game;
});

navMenuLink.addEventListener('click', () => {
	// Navigate to menu
	hideElement(navGameLink, false);
	hideElement(navMenuLink, true);
	hideElement(menuSection, false);
	hideElement(gameOverSection, true);

	currentPage = PAGES.menu;
});

menuNewGameBtn.addEventListener('click', () => {
	switch (menuBaseNumberSelect.value) {
		case 'base-number-2':
			newGame(2, true);
			break;
		case 'base-number-3':
			newGame(3, false);
			break;
		case 'base-number-5':
			newGame(5, false);
			break;
	}
});

gameOverKeepPlayingBtn.addEventListener('click', () => {
	hideElement(gameOverSection, true);
});

gameOverPlayAgainBtn.addEventListener('click', () => {
	hideElement(gameOverSection, true);
	newGame(2, true);
});

document.addEventListener('keyup', (e) => {
	if (currentPage !== PAGES.game || !gameIsRunning) return;

	switch (e.code) {
		case 'ArrowLeft':
		case 'KeyA':
			console.log('left');
			gameOver(GAME_RESULTS.win);
			break;
		case 'ArrowUp':
		case 'KeyW':
			console.log('up');
			gameOver(GAME_RESULTS.loss);
			break;
		case 'ArrowDown':
		case 'KeyS':
			console.log('down');
			break;
		case 'ArrowRight':
		case 'KeyD':
			console.log('right');
			break;
		default:
			return;
	}
});

gameLeftBtn.addEventListener('click', () => {
	if (currentPage !== PAGES.game || !gameIsRunning) return;
	console.log('left');
});

gameUpBtn.addEventListener('click', () => {
	if (currentPage !== PAGES.game || !gameIsRunning) return;
	console.log('up');
});

gameDownBtn.addEventListener('click', () => {
	if (currentPage !== PAGES.game || !gameIsRunning) return;
	console.log('down');
});

gameRightBtn.addEventListener('click', () => {
	if (currentPage !== PAGES.game || !gameIsRunning) return;
	console.log('right');
});
