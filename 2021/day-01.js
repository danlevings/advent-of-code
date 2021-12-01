const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const part1 = (data) => {
  return data.reduce((total, num, i) => {
    const prevNum = data[i - 1];
    if (!prevNum) {
      return total;
    }
    
    if (num > prevNum) {
      return total + 1;
    }
    return total;
  }, 0);
};

const part2 = (data) => {

  return data.reduce((total, num, i) => {
    if ([0,1].includes(i)) {
      return total;
    }
    const currWindowSum = Number(data[i]) + Number(data[i - 1]) + Number(data[i - 2]);
    const prevWindowSum = Number(data[i - 1]) + Number(data[i - 2]) + Number(data[i - 3]);
    
    if (currWindowSum > prevWindowSum) {
      return total + 1;
    }
    return total;
  }, 0);
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
