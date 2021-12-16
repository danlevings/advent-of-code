const data = (type = "") => {
  return require("./input")(__filename, "\n", type).map(x => x.split(''));
};

const p = (x, y) => `${x},${y}`;

const graph = {};

const exists = (data, x, y) => {
  return data[x] && data[x][y];
}

const walk = (data) => {
  for(let x =0; x < data.length; x++) {
    for(let y =0; y < data[x].length; y++) {
      graph[p(x,y)] = {}
      if (exists(data, x - 1, y)) {
        graph[p(x,y)][p(x-1, y)] = Number(data[x-1][y]);
      }
      if (exists(data, x + 1, y)) {
        graph[p(x,y)][p(x+1, y)] = Number(data[x+1][y]);
      }
      if (exists(data, x, y - 1)) {
        graph[p(x,y)][p(x, y-1)] = Number(data[x][y-1]);
      }
      if (exists(data, x, y + 1)) {
        graph[p(x,y)][p(x, y+1)] = Number(data[x][y+1]);
      }
    }
  }
}

const distance = (graph, start, end) => {
  return graph[start][end];
}

const algo = (graph, start) => {
  const queue = [start];
  const visited = { [start]: 1 };
  const done = {};
  while (queue.length > 0) {
    const node = queue.sort((a, b) => visited[a] - visited[b]).shift();
    // console.log('step', node);
    const connectedNodes = Object.keys(graph[node]);
    done[node] = true;
    connectedNodes.filter(x => !done[x]).forEach(key => {
      const risk = distance(graph, node, key);
      
      // console.log('----', key, visited[key], Number(risk), Number(visited[node]))
      if (!visited[key]) {
        // console.log('-------- unvisited', key, '=>', Number(risk) + Number(visited[node]))
        visited[key] = Number(risk) + Number(visited[node]);
        queue.push(key);
        return;
      }
      // console.log('-------- visited already, current', Number(visited[node]), '?', Number(risk) + Number(visited[node]))
      if (visited[key] > risk + visited[node]) {
        // console.log('better! set',key,'->',Number(risk) + Number(visited[node]));
        visited[key] = Number(risk) + Number(visited[node]);
      }
      
    });
  }
  return visited;
}
const part1 = (data) => {
  console.log(data)
  walk(data, 0, 0);
  console.log(graph);
  console.log(algo(graph, p(0, 0)));
  return undefined;
};

const add = (data, no) => data.map(x => Number(x) + no > 9 ? Number(x) + no - 9 : Number(x) + no);
const part2 = (data) => {
  for(let i = 0; i < data.length; i++) {
    data[i] = [...data[i], ...add(data[i], 1), ...add(data[i], 2), ...add(data[i], 3), ...add(data[i], 4)]
  }
  data = [...data, ...data.map(x => add(x, 1)),...data.map(x => add(x, 2)),...data.map(x => add(x, 3)),...data.map(x => add(x, 4))]
  console.log(data);

  walk(data, 0, 0);
  console.log(graph);
  console.log(algo(graph, p(0, 0)));
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



