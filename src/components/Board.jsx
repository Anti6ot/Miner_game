import React, { useEffect, useState } from "react";
import Select from "react-select";
import { createBoard } from "../util/createBoard";
import Cell from "./cell-block/Cell";
import { revealed } from "../util/reveal";
import Modal from "./modal-block/Modal";
import Timer from "./Timer";
import localStorageService from "../services/localStorage.service";
import { useDispatch } from "react-redux";
import { setTabRecord } from "../store/tabRecord";

const Board = () => {
  // сохраняем в стэйт
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTabRecord());
  });
  //сетка
  const [grid, setGrid] = useState([]);
  // колличество свободных ячеек от мин
  const [nonMineCount, setNonMineCount] = useState(0);
  //расположение мин
  const [mineLocations, setMineLocations] = useState([]);
  //
  const [gameOver, setGameOver] = useState(false);
  //очищает таймер и передается в Timer
  const [isLoading, setLoading] = useState(false);

  const userName = localStorageService.getUserName();
  const options = [
    { value: 10 * 60, label: "Лёгкий", sizeA: "8", sizeB: "8", mines: "5" },
    { value: 30 * 60, label: "Средний", sizeA: "16", sizeB: "16", mines: "32" },
    { value: 60 * 60, label: "Сложный", sizeA: "32", sizeB: "16", mines: "45" },
  ];
  // монтирование компонента
  useEffect(() => {
    freshBoard(options[0]);
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Таймер
  let [time, setTime] = useState(options[0].value);

  // селектор
  const [currentLvl, setCurrentLvl] = useState(options[0].value);

  // функция изменения селектора
  const handleChangeLvl = (newValue) => {
    setCurrentLvl(newValue);
    freshBoard(newValue);
    setLoading(false);
  };

  const getValue = () => {
    return currentLvl ? options.find((c) => c.value === currentLvl) : "";
  };

  // создание доски
  // задача ! создать функцию которая генерирует размер  поля по указанным значениям (кнопки)
  function freshBoard({ value, sizeA, sizeB, mines }) {
    const newBoard = createBoard(sizeA, sizeB, mines);
    setTime(value);
    setNonMineCount(sizeA * sizeB - mines);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  }

  const restartGame = () => {
    freshBoard(currentLvl);
    setGameOver(false);
  };

  // правый клик (флажок)
  const updateFlag = (e, x, y) => {
    // убираем меню (на пкм)
    e.preventDefault();
    // копирование state (grid)
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };
  // лоадер
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

    //создаем новую сетку паросом предыдущей сетки
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      // после цикла обязательно сохранить новую сетку
      setGrid(newGrid);
      setGameOver(true);
      localStorageService.setTokens(userName, nonMineCount);
    } else {
      // есл в ячейки нет мин то тогда запускаем утилиту поиска свободных ячеек в сетке
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      // сохраняем новую сетку и свободные ячеки (колличество)
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        localStorageService.setTokens(userName, nonMineCount);
        setGameOver(true);
      }
    }
  };
  return (
    <div>
      <Timer
        isLoading={isLoading}
        setLoading={setLoading}
        gameOver={gameOver}
        time={time}
        setGameOver={setGameOver}
      />
      <div>
        <div>
          <p>{userName}</p>
          <p>Уровень сложности</p>
          <Select
            onChange={handleChangeLvl}
            value={getValue()}
            options={options}
          />
        </div>
        {gameOver && (
          <div>
            <Modal restartGame={restartGame} />
          </div>
        )}
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
