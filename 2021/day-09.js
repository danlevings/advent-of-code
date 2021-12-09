const data = (type = "") => {
  return require("./input")(__filename, "\n", type).map(x => x.split(''));
};

const getPoint = (data, x, y) => {
  if (!data[x]) {
    return undefined;
  }
  if (!data[x][y]) {
    return undefined;
  }
  return Number(data[x][y]);
}

const part1 = (data) => {
  const lowRisk = [];
  
  for(let x = 0; x < data.length; x++) {
    for(let y = 0; y < data[x].length; y++) {
      // console.log(x, y);
      const num = getPoint(data, x, y);
      getPoint(data, x - 1, y)
      const compare = [getPoint(data, x - 1, y),getPoint(data, x + 1, y),getPoint(data, x, y-1),getPoint(data, x, y+1)].filter(x => x !== undefined);
      if(compare.every(x => Number(x) > Number(num))) {
        lowRisk.push(Number(num));
      }
    }
  }

  return lowRisk.reduce((tot, x) => tot + x + 1, 0);
};
let history = {};
const checkPoint = (data, x, y, len = 0) => {
  const core = getPoint(data, x, y);
  const compare = [getPoint(data, x - 1, y),getPoint(data, x + 1, y),getPoint(data, x, y-1),getPoint(data, x, y+1)]
  const nextPoints = [];
  console.log('checking', x, y, core, compare);
  if (compare[0] > core && compare[0] !== 9) {
    nextPoints.push([x - 1, y]);
  }
  if (compare[1] > core && compare[1] !== 9) {
    nextPoints.push([x + 1, y]);
  }
  if (compare[2] > core && compare[2] !== 9) {
    nextPoints.push([x, y - 1]);
  }
  if (compare[3] > core && compare[3] !== 9) {
    nextPoints.push([x, y + 1]);
  }
  if (nextPoints.length > 0) {
    console.log('next', nextPoints, history);
    return nextPoints.reduce((tot, coord) => {
      if (history[`${coord[0]}-${coord[1]}`]) {
        return tot;
      }
      history[`${coord[0]}-${coord[1]}`] = true;
      return tot + checkPoint(data, coord[0], coord[1]
      , nextPoints.length, )
    }, len)
  }
  history[`${x}-${y}`] = true;
  return len;
}

const part2 = (data) => {
  const lowRisk = [];
  
  for(let x = 0; x < data.length; x++) {
    for(let y = 0; y < data[x].length; y++) {
      const num = getPoint(data, x, y);
      const compare = [getPoint(data, x - 1, y),getPoint(data, x + 1, y),getPoint(data, x, y-1),getPoint(data, x, y+1)].filter(x => x !== undefined);
      if(compare.every(x => Number(x) > Number(num))) {
        lowRisk.push([x,y]);
      }
    }
  }

  const allSizes = lowRisk.map(coord => {
    const [x,y] = coord;
    history = {};
    const basinSize = checkPoint(data, x, y);
    
    return Object.values(history).length + 1;
  })
  let largest = [];
  allSizes.forEach((x) => {
    if (largest.length < 3) {
      largest.push(x);
      largest.sort();
      return;
    }
    if (largest[0] < x) {
      largest[0] = x;
      largest.sort();
    }
  })
  
  
  return largest.reduce((tot, x) => tot * x, 1);
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



