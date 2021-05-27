// Imports

import { PAGES, GAME_RESULTS, MOVE_DIRECTIONS } from './constants.js';
import { hideElement, setInnerText } from './dom.js';
import {
	newGrid,
	copyGrid,
	equalGrids,
	flipGrid,
	transposeGrid,
} from './grid.js';

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

	setInnerText(gameScore, score);
	setInnerText(gameMoves, moves);

	addInitialTiles(INITIAL_TILES);
	actuateGrid();
};

const addInitialTiles = (amount) => {
	for (let i = 0; i < amount; i++) {
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

const gameMove = (direction) => {
	let previousGrid = copyGrid(grid);

	switch (direction) {
		case MOVE_DIRECTIONS.left:
			grid = flipGrid(grid);
			break;
		case MOVE_DIRECTIONS.up:
			grid = transposeGrid(grid);
			grid = flipGrid(grid);
			break;
		case MOVE_DIRECTIONS.down:
			grid = transposeGrid(grid);
			break;
		case MOVE_DIRECTIONS.right:
			break;
	}

	for (let i = 0; i < grid.length; i++) {
		grid[i] = operateMove(grid[i]);
	}

	switch (direction) {
		case MOVE_DIRECTIONS.left:
			grid = flipGrid(grid);
			break;
		case MOVE_DIRECTIONS.up:
			grid = flipGrid(grid);
			grid = transposeGrid(grid);
			break;
		case MOVE_DIRECTIONS.down:
			grid = transposeGrid(grid);
			break;
		case MOVE_DIRECTIONS.right:
			break;
	}

	if (!equalGrids(previousGrid, grid)) {
		moves += 1;
		addRandomNumber();
	}

	setInnerText(gameScore, score);
	setInnerText(gameMoves, moves);

	actuateGrid();

	if (checkGameWin(grid)) {
		gameOver(GAME_RESULTS.win);
	}

	if (checkGameLoss(grid)) {
		gameOver(GAME_RESULTS.loss);
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

	setInnerText(gameOverScore, score);
	setInnerText(gameOverMoves, moves);
};

const operateMove = (row) => {
	row = slideRow(row);
	row = combineRow(row);
	row = slideRow(row);
	return row;
};

const slideRow = (row) => {
	let filteredRow = row.filter((tile) => tile !== 0);
	let zeroRow = Array(row.length - filteredRow.length).fill(0);
	let newRow = zeroRow.concat(filteredRow);
	return newRow;
};

const combineRow = (row) => {
	for (let i = row.length - 1; i >= 1; i--) {
		let tileA = row[i];
		let tileB = row[i - 1];

		if (tileA === tileB) {
			let combinedTotal = tileA + tileB;
			row[i] = combinedTotal;
			row[i - 1] = 0;

			score += combinedTotal;
		}
	}
	return row;
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
				tileElement.classList.add(
					`tile--${tileValue < 2048 ? tileClass.toString() : 'over'}`
				);
				tileElement.innerText = tileValue;
			}

			gameGrid.appendChild(tileElement);
		}
	}
};

const checkGameWin = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === Math.pow(baseNumberGbl, 11)) {
				return true;
			}
		}
	}

	return false;
};

const checkGameLoss = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			let tile = grid[i][j];

			if (tile === 0) return false;
			if (i !== grid.length - 1 && tile === grid[i + 1][j]) return false;
			if (j !== grid.length - 1 && tile === grid[i][j + 1]) return false;
		}
	}

	return true;
};

// Grid Functions

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
			gameMove(MOVE_DIRECTIONS.left);
			break;
		case 'ArrowUp':
		case 'KeyW':
			gameMove(MOVE_DIRECTIONS.up);
			break;
		case 'ArrowDown':
		case 'KeyS':
			gameMove(MOVE_DIRECTIONS.down);
			break;
		case 'ArrowRight':
		case 'KeyD':
			gameMove(MOVE_DIRECTIONS.right);
			break;
		default:
			return;
	}
});

gameLeftBtn.addEventListener('click', () => {
	if (!gameIsRunning) return;
	gameMove(MOVE_DIRECTIONS.left);
});

gameUpBtn.addEventListener('click', () => {
	if (!gameIsRunning) return;
	gameMove(MOVE_DIRECTIONS.up);
});

gameDownBtn.addEventListener('click', () => {
	if (!gameIsRunning) return;
	gameMove(MOVE_DIRECTIONS.down);
});

gameRightBtn.addEventListener('click', () => {
	if (!gameIsRunning) return;
	gameMove(MOVE_DIRECTIONS.right);
});
