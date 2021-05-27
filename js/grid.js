export const newGrid = (size) => {
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

export const copyGrid = (grid) => {
	let copiedGrid = [];

	for (let i = 0; i < grid.length; i++) {
		copiedGrid.push([...grid[i]]);
	}

	return copiedGrid;
};

export const equalGrids = (gridA, gridB) => {
	for (let i = 0; i < gridA.length; i++) {
		for (let j = 0; j < gridA.length; j++) {
			if (gridA[i][j] !== gridB[i][j]) {
				return false;
			}
		}
	}

	return true;
};

export const flipGrid = (grid) => {
	for (let i = 0; i < grid.length; i++) {
		grid[i].reverse();
	}

	return grid;
};

export const transposeGrid = (grid) => {
	let transposedGrid = newGrid(grid.length);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			transposedGrid[i][j] = grid[j][i];
		}
	}

	return transposedGrid;
};
