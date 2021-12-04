const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const part1 = (movements) => {
  let x = 0;
  let depth = 0;
  movements.forEach(movement => {
    const [direction, value] = movement.split(' ');
    switch(direction) {
      case 'forward':
        x += Number(value);
        break
      case 'down':
        depth += Number(value);
        break
      case 'up':
        depth -= Number(value);
        break
    }
  });

  return x * depth;
};

const part2 = (movements) => {
  let x = 0;
  let depth = 0;
  let aim = 0;
  movements.forEach(movement => {
    const [direction, value] = movement.split(' ');
    switch(direction) {
      case 'forward':
        x += Number(value);
        depth += aim * Number(value);
        break
      case 'down':
        aim += Number(value);
        break
      case 'up':
        aim -= Number(value);
        break
    }
  });

  return x * depth;
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
