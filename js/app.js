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

const MOVE_DIRECTIONS = {
	left: 'MOVE_LEFT',
	up: 'MOVE_UP',
	down: 'MOVE_DOWN',
	right: 'MOVE_RIGHT',
};

const GRID_SIZE = 4;
const INITIAL_TILES = 2;

let currentPage = PAGES.menu;
let gameIsRunning = false;
let gameIsOver = false;

let grid;
let baseNumberGbl;
let hasPointsGbl;
let score = 0;
let moves = 0;

// Functions

const newGame = (baseNumber, hasPoints) => {
	hideElement(navGameLink, true);
	hideElement(navMenuLink, false);
	hideElement(menuSection, true);
	hideElement(gameOverSection, true);

	currentPage = PAGES.game;
	baseNumberGbl = baseNumber;
	hasPointsGbl = hasPoints;

	setUpGame();
};

const setUpGame = () => {
	gameIsRunning = true;
	gameIsOver = false;
	grid = newGrid(GRID_SIZE);
	score = 0;
	moves = 0;

	addInitialTiles(INITIAL_TILES);
	actuateGrid();
};

const addInitialTiles = (amount) => {
	for (i = 0; i < amount; i++) {
		addRandomNumber();
	}
};

const addRandomNumber = () => {
	if (availableCells().length) {
		let randomIndex = Math.floor(Math.random() * availableCells().length);
		let randomTile = availableCells()[randomIndex];

		grid[randomTile.x][randomTile.y] =
			Math.random() > 0.1 ? baseNumberGbl : baseNumberGbl * 2;
	}
};

const gameOver = (result) => {
	hideElement(gameOverSection, false);
	currentPage = PAGES.gameOver;
	gameIsRunning = false;
	gameIsOver = true;

	if (result === GAME_RESULTS.win) {
		hideElement(gameOverKeepPlayingBtn, false);
		hideElement(gameOverPlayAgainBtn, false);
		setInnerText(gameOverResult, 'Victory Royale!');
	} else {
		hideElement(gameOverKeepPlayingBtn, true);
		hideElement(gameOverKeepPlayingBtn, true);
		setInnerText(gameOverResult, 'Game Over!');
	}
};

const actuateGrid = () => {
	gameGrid.innerHTML = '';

	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			let tileValue = grid[i][j];
			let tileClass =
				Math.log(tileValue / baseNumberGbl) / Math.log(2) + 1;

			let tileElement = document.createElement('div');

			if (tileValue !== 0) {
				tileElement.classList.add('game-grid__tile');
				tileElement.classList.add(`tile--${tileClass.toString()}`);
				tileElement.innerText = tileValue;
			}

			gameGrid.appendChild(tileElement);
		}
	}
};

// Grid Functions

const newGrid = (size) => {
	let emptyGrid = [];

	for (let i = 0; i < size; i++) {
		let row = [];

		for (let j = 0; j < size; j++) {
			row.push(0);
		}

		emptyGrid.push(row);
	}

	return emptyGrid;
};

const availableCells = () => {
	let options = [];

	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			if (grid[i][j] === 0) {
				options.push({ x: i, y: j });
			}
		}
	}

	return options;
};

// DOM Functions

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
	hideElement(gameOverSection, !gameIsOver);

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
	currentPage = PAGES.game;
	gameIsRunning = true;
	gameIsOver = false;
});

gameOverPlayAgainBtn.addEventListener('click', () => {
	hideElement(gameOverSection, true);
	currentPage = PAGES.game;

	setUpGame();
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
