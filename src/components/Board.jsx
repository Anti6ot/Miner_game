import React, { useEffect, useState } from "react";
import { createBoard } from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";

const Board = () => {
  //
  const [grid, setGrid] = useState([]);
  // колличество свободных ячеек от мин
  const [nonMineCount, setNonMineCount] = useState(0);
  //расположение мин
  const [mineLocations, setMineLocations] = useState([]);
  //
  const [gameOver, setGameOver] = useState(false);

  // монтирование компонента
  useEffect(() => {
    // создание доски
    // задача ! создать функцию которая генерирует размер  поля по указанным значениям (кнопки)
    function freshBoard() {
      const newBoard = createBoard(10, 10, 15);
      setNonMineCount(10 * 10 - 15);
      setMineLocations(newBoard.mineLocation);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  // правый клик (флажок)
  const updateFlag = (e, x, y) => {
    // убираем меню (на пкм)
    e.preventDefault();
    // копирование state (grid)
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
    console.log("right upd", newGrid);
  };

  if (!grid) {
    return <div>Loading</div>;
  }

  // функц раскрытия ячейки
  const revealCell = (x, y) => {
    // при нажатии на открытую ячейку код крашился из за того что grid[x][y].revealed был равет true поэтому сделал уловие
    //  или gameOver
    if (grid[x][y].revealed || gameOver) {
      return;
    }

    //
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      alert("Мина!");
      // цикл который расскрывает все ячейки с минами
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      // после цикла обязательно сохранить новую сетку
      setGrid(newGrid);
      setGameOver(true);
    } else {
      // есл в ячейки нет мин то тогда запускаем утилиту поиска свободных ячеек в сетке
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      // newGrid[x][y].revealed = true;
      // сохраняем новую сетку и свободные ячеки (колличество)
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
  };
  return (
    <div>
      <p>{nonMineCount}</p>
      <div>
        {grid.map((singleRow, index1) => {
          return (
            <div key={index1} style={{ display: "flex" }}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    key={index2}
                    details={singleBlock}
                    revealCell={revealCell}
                    updateFlag={updateFlag}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
