const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const parseTree = (lines) => {
  const tree = {};
  lines.forEach((line) => {
    const [parent, child] = line.split("-");
    tree[parent] = { ...tree[parent] || {}, [child]: true};

    tree[child] = { ...tree[child] || {}, [parent]: true};
  });
  return tree;
}

const paths = [];

const w = (tree, node, path = []) => {
  const children = Object.keys(tree[node]).filter(x => x !== 'start');
  children.forEach((child) => {
    if(child === 'end') {
      paths.push([...path, child]);
      return;
    }
    if (path.includes(child) && child === child.toLowerCase()) {
      return;
    }
    w(tree, child, [...path, child])
  });
}

// get count of items in array
const count = (arr) => {
  return arr.filter(x => x === x.toLowerCase()).reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}

const w2 = (tree, node, path = []) => {
  const children = Object.keys(tree[node]).filter(x => x !== 'start');
  children.forEach((child) => {
    if(child === 'end') {
      paths.push([...path, child]);
      return;
    }
    const c = count(path);
    if ((Object.values(c).includes(2) && c[child] === 1) || c[child] === 2) {
      return;
    }
    w2(tree, child, [...path, child])
  });
}
// []
// [[A]]
// [[A], [A, c], [A,end], [A, b]]

// [ 'b', 'A', 'c', 'A', 'b', 'end' ],
//       [ 'b', 'A', 'c', 'A', 'end' ],
//       [ 'b', 'A', 'b', 'A', 'end' ],
//       [ 'b', 'A', 'b', 'end' ],
//       [ 'b', 'A', 'end' ],
//       [ 'b', 'd', 'b', 'A', 'end' ],
//       [ 'b', 'd', 'b', 'end' ],
//       [ 'b', 'end' ]
//       start,b,A,c,A,b,end
// start,b,A,c,A,c,A,end
// start,b,A,c,A,end
// start,b,A,end
// start,b,d,b,A,c,A,end


const part1 = (data) => {
  const tree = parseTree(data);
  console.log(tree);
  w(tree, 'start');
  console.log('paths', paths);
  return paths.length;
};

const part2 = (data) => {
  const tree = parseTree(data);
  console.log(tree);
  w2(tree, 'start');
  console.log('paths', paths, 2);
  return paths.length;
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



