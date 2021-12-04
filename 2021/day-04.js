const data = (type = "") => {
  return require("./input")(__filename, "\n", type);
};

const parseData = (data) => {
  const numbers = data[0].split(',');
  const boards = []
  let boardCount = 0;
  for(let i = 2; i < data.length; i++) {
    const line = data[i];
    if (line === '') {
      boardCount++;
      continue;
    }
    if (!boards[boardCount]) {
      boards[boardCount] = [];
    }
    boards[boardCount].push(line.split(' ').filter(Boolean))
  }

  return {
    numbers,
    boards
  }
}

const markBoard = (number, board) => {
  for(let l = 0; l < board.length; l++) {
    for(let s = 0; s < board.length; s++) {
      if (board[l][s] === number) {
        board[l][s] = '✅'
      }
    }
  }
}

const checkWin = (board) => {
  const line = board.find(line => line.filter(s => s === '✅').length === line.length);
  if (line) {
    return board;
  }
  const flippedBoard = [];
  for(let c = 0; c < board[0].length; c++) {
    if (!flippedBoard[c]) {
      flippedBoard[c] = [];
    }
    for(let r = 0; r < board.length; r++) {
      flippedBoard[c][r] = board[r][c]
    }
  }
  const col = flippedBoard.find(line => line.filter(s => s === '✅').length === line.length);
  if (col) {
    return board;
  }
}

const parseWin = (number, board) => {
  let num = 0;
  for(let l = 0; l < board.length; l++) {
    for(let s = 0; s < board.length; s++) {
        if(board[l][s] !== '✅') {
          num += Number(board[l][s]);
        }
    }
  }
  console.log(number, num);
  return Number(number) * num;
}

const part1 = (data) => {
  const { numbers, boards } = parseData(data);
  let currNumberI = 0;
  let winBoard = false;
  while (!winBoard && currNumberI <= numbers.length ) {
    const number = numbers[currNumberI];
    boards.forEach(board => {
      if (winBoard) {
        return;
      }
      markBoard(number, board);
      winBoard = checkWin(board);
    })
    console.log(currNumberI, numbers.length, numbers[currNumberI], winBoard);
    if (!winBoard) {
      currNumberI++;
    }
  }
  return parseWin(numbers[currNumberI], winBoard)
};

const part2 = (data) => {
  let { numbers, boards } = parseData(data);
  let currNumberI = 0;
  let lastBoard = false;
  while (!lastBoard && currNumberI <= numbers.length ) {
    const number = numbers[currNumberI];
    let wonBoards = [];
    boards.forEach((board, i) => {
      console.log(i, number, lastBoard);
      if (lastBoard) {
        return;
      }
      console.log('marking', number, board);
      markBoard(number, board);
      if (checkWin(board)) {
        wonBoards.push(i);
      }
    })
    const b = [];
    const won = wonBoards.map((i) => boards[i]);
    boards = boards.map((b, i) => wonBoards.includes(i) ? false : b).filter(Boolean);
    
    if (boards.length <= 0) {
      lastBoard = won.pop();
      console.log(lastBoard);
    }
    console.log(currNumberI,numbers[currNumberI], lastBoard, wonBoards, boards)
    if (!lastBoard) {
      currNumberI++;
    }
  }
  return parseWin(numbers[currNumberI], lastBoard)
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
