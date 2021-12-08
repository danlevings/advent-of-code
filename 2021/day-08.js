const fs = require("fs");

const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const parseCombo = (datum) => {
  const [displays, output] = datum.split(" | ");
  return {
    displays: displays.split(" "),
    output: output.split(" "),
  };
};

const part1 = (data) => {
  const combos = data.map(parseCombo);
  const relevantNumbers = combos.map((combo) => {
    return combo.output.filter(
      (x) =>
        x.length === 2 || x.length === 4 || x.length === 3 || x.length === 7
    ).length;
  });
  console.log(relevantNumbers);

  return relevantNumbers.reduce((tot, x) => tot + x, 0);
};

const part2 = (data) => {
  const combos = data.map(parseCombo);
  let total = 0;
  // easy combos
  combos.forEach((combo) => {
    const links = {};
    combo.displays.forEach((display) => {
      if (display.length === 2) {
        links[1] = display.split("");
      }
      if (display.length === 4) {
        links[4] = display.split("");
      }
      if (display.length === 3) {
        links[7] = display.split("");
      }
      if (display.length === 7) {
        links[8] = display.split("");
      }
    });
    const top = links[7].filter((a) => !links[1].includes(a))[0];
    const sixLengths = combo.displays.filter((x) => x.length === 6);
    const diffsBetween6 = [
      sixLengths[0]
        .split("")
        .filter((a) => !sixLengths[1].split("").includes(a))[0],
      sixLengths[1]
        .split("")
        .filter((a) => !sixLengths[2].split("").includes(a))[0],
      sixLengths[2]
        .split("")
        .filter((a) => !sixLengths[0].split("").includes(a))[0],
    ];
    const topRight = diffsBetween6.find(x => links[1].includes(x));
    const middle = diffsBetween6.filter(x => x !== topRight).find(x => links[4].includes(x));
    const bottomLeft = diffsBetween6.filter(x => x !== topRight && x !== middle)[0];
    const bottomRight = links[1].filter(x => x !== topRight)[0];
    const topLeft = links[4].filter(x => x !== topRight && x !== middle && x !== bottomRight)[0];
    const bottom = ['a', 'b','c','d','e','f','g'].filter(x => ![top, topRight, middle, bottomLeft, bottomRight, topLeft].includes(x))[0];

    const values = [
      [top, topLeft, topRight, bottom, bottomLeft, bottomRight],
      [topRight, bottomRight],
      [top, topRight, middle, bottomLeft, bottom],
      [top, topRight, bottom, bottomRight, bottom],
      [topLeft, topRight, middle, bottomRight],
      [top, topLeft, middle, bottomRight, bottom],
      [top, topLeft, middle, bottomLeft, bottomRight, bottom],
      [top, topRight,bottomRight],
      [top, topRight, topLeft, middle, bottomLeft, bottomRight, bottom],
      [top, topRight, topLeft, middle, bottomRight, bottom],
    ]
    console.log(combo.output);
    const pin = combo.output.map(pattern => {
      const letters = pattern.split('');
      return values.findIndex(v => v.every(x => letters.includes(x)) && letters.length === v.length);
    }).join('')
    console.log(pin);
    total += Number(pin);
  });
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
