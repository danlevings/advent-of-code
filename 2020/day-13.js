const data = (type = "") => {
  const lines = require("./input")(__filename, "\n", type);
  return lines;
};

const part1 = (lines) => {
  // TODO
};

const part2 = (lines) => {
  // TODO
};

if (process.argv.includes(__filename.replace(/\.[jt]s$/, ""))) {
  console.log(`Part 1:`, part1(data(process.argv[2] || "")));
  console.log(`Part 2:`, part2(data(process.argv[2] || "")));
}

module.exports = {
  data,
  part1,
  part2,
};
