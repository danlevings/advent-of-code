const fs = require('fs');

const data = (type = "") => {
  return require("./input")(__filename, "\n", type)[0].split(',').map(Number);
};


const part1 = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  let minFuel = Number.MAX_SAFE_INTEGER;
  for(let i = min; i <= max; i++) {
    let fuel = data.map((pos) => Math.abs(pos - i)).reduce((tot, x) => tot + x, 0);
    console.log(i, fuel);
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
};

const addAll = (x) => {
  let sum = 0;
  for(let i = 0; i <= x; i++){
    sum += i;
  }
  return sum;
}

const part2 = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  let minFuel = Number.MAX_SAFE_INTEGER;
  for(let i = min; i <= max; i++) {
    let fuel = data.map((pos) => addAll(Math.abs(pos - i))).reduce((tot, x) => tot + x, 0);
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  return minFuel;
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
