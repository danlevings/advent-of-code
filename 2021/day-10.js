const data = (type = "") => {
  return require("./input")(__filename, "\n", type).map(x => x.split(''));
};

const opens = ['(', '[', '{', '<']
const closes = [')', ']', '}', '>'];
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}
const part1 = (data) => {
  const fails = [];
  data.some(line => {
    const status = [];
    console.log('LINE:', line);
    line.forEach(l => {
      console.log('status:', status);
      if (opens.includes(l)) {
        status.push(l);
        return;
      }
      if (closes.includes(l)) {
        const closesIndex = closes.findIndex(x => x === l);
        const lastItem = status.pop();
        const opensIndex = opens.findIndex(x => x === lastItem);

        if (closesIndex !== opensIndex) {
          fails.push(l);
          return true;
        }
      }
    })
  })
  const scores = fails.map(x => points[x]);
  console.log(fails, scores);

  return scores.reduce((tot, x) => tot+x, 0);
};

const part2 = (data) => {
  const fails = [];
  const scores = data.map(line => {
    const status = [];
    let failed = false;
    line.forEach(l => {
      if (opens.includes(l)) {
        status.push(l);
        return;
      }
      if (closes.includes(l)) {
        const closesIndex = closes.findIndex(x => x === l);
        const lastItem = status.pop();
        const opensIndex = opens.findIndex(x => x === lastItem);

        if (closesIndex !== opensIndex) {
          fails.push(l);
          failed = true;
          return true;
        }
      }
    });
    if (failed) {
      return false;
    }
    const reversed = status.reverse();
    let score = 0;
    reversed.forEach((x) => {
      const point = opens.findIndex(o => o === x) + 1;
      score *= 5;
      score += point;
    })
    return score;
  }).filter(Boolean)
  const result = scores.sort((a, b) => Number(b) - Number(a))[Math.floor(scores.length / 2)];
  console.log(scores.sort((a, b) => Number(b) - Number(a)), Math.floor(scores.length / 2), result);
  return result;
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



