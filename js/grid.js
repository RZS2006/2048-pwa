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
