const data = (type = "") => {
  return require("./input")(__filename, "\n", type).map(x => x.split('').map(Number));
};
let flashed = {};
const flash = (data, row, col) => {
  flashed[`${row},${col}`] = true;
  data[row][col] = 0;
  up(data, row - 1, col);
  up(data, row + 1, col);
  up(data, row, col - 1);
  up(data, row, col + 1);
  up(data, row - 1, col - 1);
  up(data, row + 1, col + 1);
  up(data, row - 1, col + 1);
  up(data, row + 1, col - 1);
}

const up = (data, row, col) => {
  let cell = (data[row] || [])[col];
  if (!cell ){
    return;
  }
  data[row][col] += 1;
  
  if (data[row][col] > 9 && !flashed[`${row},${col}`]) {
    flash(data, row, col);
    return;
  }
}

const step = (data) => {
  for(let row = 0; row < data.length; row++) {
    for(let col = 0; col < data[row].length; col++) {
      data[row][col] += 1;
    }
  }
  for(let row = 0; row < data.length; row++) {
    for(let col = 0; col < data[row].length; col++) {
      if (data[row][col] > 9) {
        flash(data, row, col)
      }
    }
  }
  // Object.keys(flashed).forEach(key => {
  //   let [row, col] = key.split(',').map(Number);
  //   data[row][col] = 0;
  // });
}

const print = (data) => {
  console.log(data.map(x => x.join('')).join('\n'));
}

const part1 = (data) => {
  let flashCount = 0;
  for(let i = 0; i < 100; i++) {
    console.log(i);
    step(data);
    print(data);
    flashCount += Object.values(flashed).length;
    flashed = {};
  }

  return flashCount;
};

const part2 = (data) => {
  let found = false;
  let count = 0;
  while(!found) {
    count++;
    step(data);
    let flashCount = Object.values(flashed).length;
    flashed = {};
    if (flashCount === 100) {
      found = true;
    }
  }

  return count;
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



