const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const parseData = (data) => {
  const points = data;
  const folds = points.splice(points.findIndex(x => x === '')).filter(x => x !== '')
  return [points.map(x => x.split(',')), folds.map(x => x.split('='))];
}

const prettyPrint = (grid) => {
  const xs = Object.keys(grid).map(x => x.split(',')[0]).sort((a, b) => a - b);
  const ys = Object.keys(grid).map(x => x.split(',')[1]).sort((a, b) => a - b);
  const minX = xs[0];
  const maxX = xs[xs.length - 1];
  const minY = ys[0];
  const maxY = ys[ys.length - 1];
  const gridWidth = maxX - minX + 1;
  const gridHeight = maxY - minY + 1;
  const newGrid = [];
  for (let y = 0; y < gridHeight; y++) {
    const row = [];
    for (let x = 0; x < gridWidth; x++) {
      row.push(grid[`${x},${y}`] ? '#' : '.');
    }
    newGrid.push(row.join(''));
  }
  console.log(newGrid.join('\n'));
}

const part1 = (data) => {
  const [points, folds] = parseData(data);
  const grid = {};
  points.forEach(([x, y]) => {
    grid[`${x},${y}`] = true
  });
  folds.forEach(([dir, val]) => {
    console.log(dir, val)
    Object.keys(grid).forEach(point => {
      const [x, y] = point.split(',');
      if (dir === 'fold along x') {
        if (Number(x) > Number(val)) {
          delete grid[point];
          const newX = val - (x - val)
          grid[`${newX},${y}`] = true;
        }
      }
      if (dir === 'fold along y') {
        console.log(y, val);
        if (Number(y) > Number(val)) {
          console.log('fold');
          delete grid[point];
          const newY = val - (y - val)
          grid[`${x},${newY}`] = true;
        }
      }
    })
  })
  prettyPrint(grid)
  return Object.keys(grid).length;
};

const part2 = (data) => {
  part1(data)
};


/* istanbul ignore next */
if (process.argv.includes(__filename.replace(/\.[jt]s$/, ""))) {
  console.log(`Part 1:`, part1(data(process.argv[2] || "")));
  console.log(`Part 2:`, part2(data(process.argv[2] || "")));
}

module.exports = {
  data,
  part1,
  part2,
};



