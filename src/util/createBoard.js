export const createBoard = (row, col, bombs) => {
  let board = [];
  let mineLocation = [];
  // Создание пустой доски

  // x = column
  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  // рандомное расположение бомб
  let bombsCount = 0;
  while (bombsCount < bombs) {
    let x = randomNum(0, row - 1);
    let y = randomNum(0, col - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      bombsCount++;
    }
  }

  // добавление номера ячейки
  for (let roww = 0; roww < row; roww++) {
    for (let coll = 0; coll < col; coll++) {
      if (board[roww][coll].value === "X") {
        continue;
      }

      // верхняя
      if (roww > 0 && board[roww - 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      // верхняя правая
      if (
        roww > 0 &&
        coll < col - 1 &&
        board[roww - 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // правая
      if (coll < col - 1 && board[roww][coll + 1].value === "X") {
        board[roww][coll].value++;
      }

      // нижняя правая
      if (
        roww < row - 1 &&
        coll < col - 1 &&
        board[roww + 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // нижняя
      if (roww < row - 1 && board[roww + 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      // нижняя левая
      if (
        roww < row - 1 &&
        coll > 0 &&
        board[roww + 1][coll - 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // левая
      if (coll > 0 && board[roww][coll - 1].value === "X") {
        board[roww][coll].value++;
      }

      // верхняя левая
      if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
        board[roww][coll].value++;
      }
    }
  }
  return { board, mineLocation };
};

function randomNum(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
