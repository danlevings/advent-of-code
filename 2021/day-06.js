const fs = require('fs');

const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const calc = (fishes, no) => {
  console.log(`Day 0: `, fishes);
  for(let i = 1; i < no + 1; i++){
    const newFishes = [];
    fishes = fishes.map(fish => {
      let next = fish - 1;
      if (next === -1) {
        next = 6
        newFishes.push(8)
      }
      return next;
    });
    fishes = [...fishes, ...newFishes];
    console.log(`Day ${i}: ${fishes.length}`)
  }
  return fishes.length;
}

const betterCalc = (fishes, no) => {
  let object = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }
  fishes.forEach(fish => {
    object[fish]++;
  })
  for(let i = 1; i < no + 1; i++){
    const newFish = object[0];
    object[0] = object[1];
    object[1] = object[2];
    object[2] = object[3];
    object[3] = object[4];
    object[4] = object[5];
    object[5] = object[6];
    object[6] = object[7];
    object[7] = object[8];
    object[8] = newFish;
    object[6] += newFish;
    
    console.log(`Day ${i}: `, object)
  }
  return Object.values(object).reduce((total, x) => total + x, 0);
}

const part1 = (data) => {
  let fishes = data[0].split(',');
  return calc(fishes, 80);
};

const part2 = (data) => {
  let fishes = data[0].split(',');
  return betterCalc(fishes, 256);
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
