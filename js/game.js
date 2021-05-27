export const checkGameWin = (grid, baseNumber) => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === Math.pow(baseNumber, 11)) {
				return true;
			}
		}
	}

	return false;
};

export const checkGameLoss = (grid) => {
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
