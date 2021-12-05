const fs = require('fs');

const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const slope = (a, b) => (b[1] - a[1]) / (b[0] - a[0])
const intercept = (a, c) => a[1] - c * a[0]

const parseRow = (datum) => {
  const [x1y1, x2y2] = datum.split(' -> ');
  const A = x1y1.split(',');
  const B = x2y2.split(',');
  const m = slope(A, B);
  return {
    A, 
    B,
    m,
    c: intercept(A, m),
    isStraight: A[0] === B[0] || A[1] === B[1],
  }
}


const plotOnGrid = (grid, point) => {
  const { A, B, m, c } = point;
  const isVertical = !isFinite(m);
  const plots = [];
  
  if (isVertical) {
    const minY = Math.min(A[1], B[1]);
    const maxY = Math.max(A[1], B[1]);
    for(let y = minY; y <= maxY; y++) {
      plots.push([A[0], y]);
    }
  } else {
    const minX = Math.min(A[0], B[0]);
    const maxX = Math.max(A[0], B[0]);
    for(let x = minX; x <= maxX; x++) {
      const y = (m*x) + c;
      plots.push([x, y]);
    }
  }

  plots.forEach(([x, y]) => {
    if (!grid[x]) {
      grid[x] = []
    }
    if (!grid[x][y]) {
      grid[x][y] = 1
    } else {
      grid[x][y]++;
    }
  })


  console.log('plot', A, B, m, plots);
}

const part1 = (data) => {
  const points = data.map(parseRow);
  const straightOnlyPoints = points.filter(d => d.isStraight);

  const grid = [];

  straightOnlyPoints.forEach((point) => plotOnGrid(grid, point));
  const maxY = Math.max(...grid.map(row => row.length));

  // For display
  grid.forEach((row) => {
    for(let i = 0; i < maxY; i++) {
      if(!row[i]) {
        row[i] = 0;
      }
    }
  })
  fs.writeFileSync('grid.txt', grid.map((row) => row.join('')).join('\n'));

  let total = 0;
  grid.forEach(row => {
    row.forEach(x => {
      if (x > 1) {
        total++;
      }
    })
  })
  return total;
};

const part2 = (data) => {
  const points = data.map(parseRow);

  const grid = [];

  points.forEach((point) => plotOnGrid(grid, point));
  const maxY = Math.max(...grid.map(row => row.length));

  // For display
  grid.forEach((row) => {
    for(let i = 0; i < maxY; i++) {
      if(!row[i]) {
        row[i] = 0;
      }
    }
  })
  fs.writeFileSync('grid.txt', grid.map((row) => row.join('')).join('\n'));

  let total = 0;
  grid.forEach(row => {
    row.forEach(x => {
      if (x > 1) {
        total++;
      }
    })
  })
  return total;
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
