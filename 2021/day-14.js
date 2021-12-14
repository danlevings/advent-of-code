const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const parse = (data) => {
  const [pattern, _, ...links] = data;
  return [pattern.split(''), links];
}

const step = (pattern, links) => {
  let nextPattern = [...pattern];
  let toAdd = []
  for(let i = 0; i < pattern.length - 1; i++) {
    const A = pattern[i];
    const B = pattern[i + 1];
    links.forEach(link => {
      const [pat, res] = link.split(' -> ');
      if(pat[0] === A && pat[1] === B) {
        toAdd.push([i+1, res]);
      }
    });
  }
  toAdd.sort((a, b) => a[0] - b[0]).reverse().forEach(pair => {
    nextPattern.splice(pair[0], 0, pair[1]);
  })
  return nextPattern;
}


const part1 = (data) => {
  const [pattern, links] = parse(data);
  let res = [...pattern];
  console.log('start', pattern);
  for(let i = 0; i < 40; i++) {
    res = step(res, links);
    console.log('step', i + 1, res);
  }
  const count = {};
  res.forEach(c => count[c] = (count[c] || 0) + 1);
  console.log(count);

  return Math.max(...Object.values(count)) - Math.min(...Object.values(count));
};

const betterStep = (pairs, links) => {
  const nextPairs = { ...pairs };
  Object.keys(pairs).forEach(pair => {
    links.forEach(link => {
      const [pat, res] = link.split(' -> ');
      if(pat === pair) {
        nextPairs[`${pair[0]}${res}`]=(nextPairs[`${pair[0]}${res}`] || 0) + pairs[pair];
        nextPairs[`${res}${pair[1]}`]=(nextPairs[`${res}${pair[1]}`] || 0) + pairs[pair];
        nextPairs[pair] -= pairs[pair];
        if (nextPairs[pair] <= 0) {
          delete nextPairs[pair];
        }
        console.log('found', pair, res, nextPairs);
      }
    });
  });
  return nextPairs
}

// NBCCNBBBCBHCB

const part2 = (data) => {
  const [pattern, links] = parse(data);
  let pairs = {};
  for(let i = 0; i < pattern.length - 1; i++) {
    const A = pattern[i];
    const B = pattern[i + 1];
    pairs[`${A}${B}`] = (pairs[`${A}${B}`] || 0) + 1;     
  }
  console.log(pairs);
  for(let i = 0; i < 40; i++) {
    pairs = betterStep(pairs, links);
    console.log('step', i + 1, pairs);
  }
  // NNCB - NCNCB -  NCNBCB
  // 1, NCNBCHB
  // Step 2, NBCCNBBBCBHCB
  const countFirst = {};
  const countSecond = {};
  Object.keys(pairs).forEach(pair => {
    countFirst[pair[0]] = (countFirst[pair[0]] || 0) + pairs[pair];
    countSecond[pair[1]] = (countSecond[pair[1]] || 0) + pairs[pair];
  });
  Object.keys(countFirst).forEach(letter => {
      if (countFirst[letter] !== countSecond[letter]) {
        countFirst[letter] = Math.max(countFirst[letter], countSecond[letter]);
      }
  })
  // NBBBCNCCNBBNBNBBCHBHHBCHB
  console.log(countFirst);
  console.log(Object.values(countFirst).reduce((tot, val) => tot + val, 0));

  return Math.max(...Object.values(countFirst)) - Math.min(...Object.values(countFirst));
  return undefined;
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



