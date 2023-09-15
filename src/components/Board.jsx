import React, { useEffect, useState } from "react";
import { createBoard } from "../util/createBoard";
import Cell from "./Cell";

const Board = () => {
  const [grid, setGrid] = useState([]);

  // монтирование компонента
  useEffect(() => {
    // создание доски
    function freshBoard() {
      const newBoard = createBoard(10, 10, 20);
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
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      alert("Мина!");
    } else {
      newGrid[x][y].revealed = true;
      setGrid(newGrid);
    }
  };

  return grid.map((singleRow, index1) => {
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
  });
};

export default Board;
