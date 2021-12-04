const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const mode = (arr) => {
  return arr.sort((a,b) =>
        arr.filter(v => v===a).length
      - arr.filter(v => v===b).length
  ).pop();
}

const part1 = (binaries) => {
  const max = [];
  const min = [];
  const lengthOfBinaries = binaries[0].length - 1;
  for(let i = 0; i <= lengthOfBinaries; i++) {
    const nums = binaries.map(b => b[i]);
    const m = Number(mode(nums));
    max.push(m);
    min.push(m === 1 ? 0 : 1);
  }
  const gamma = parseInt(max.join(''), 2);
  const epsilon = parseInt(min.join(''), 2);

  return gamma * epsilon;

};

const part2 = (binaries) => {
  let oxyBinaries = [...binaries];
  let co2Binaries = [...binaries];
  const lengthOfBinaries = binaries[0].length - 1;
  for(let i = 0; i <= lengthOfBinaries; i++) {
    if (oxyBinaries.length === 1) {
      continue;
    }
    
    let m = 1;
    const nums = oxyBinaries.map(b => b[i]);
    const ones = nums.filter(n => n === '1');
    const zeros = nums.filter(n => n === '0');
    if (ones.length < zeros.length) {
      m = 0;
    }

    oxyBinaries = oxyBinaries.filter(b => Number(b[i]) === m);
  }
  for(let i = 0; i <= lengthOfBinaries; i++) {
    if (co2Binaries.length === 1) {
      continue;
    }
    let m = 0;
    const nums = co2Binaries.map(b => b[i]);
    const ones = nums.filter(n => n === '1');
    const zeros = nums.filter(n => n === '0');
    if (ones.length < zeros.length) {
      m = 1;
    }

    co2Binaries = co2Binaries.filter(b => Number(b[i]) === m);
  }
  console.log(oxyBinaries, co2Binaries);
  const oxygen = parseInt(oxyBinaries[0], 2);
  const co2 = parseInt(co2Binaries[0], 2);
  console.log(oxygen, co2);

  return oxygen * co2;
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
