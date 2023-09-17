import React from "react";
import "./cell.css";
import { mineColor } from "../../util/mineColors";

const Cell = ({ details, updateFlag, revealCell }) => {
  // определяет стиль клеток с помощью утилит
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? mineColor()
        : bombChexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
    color: numColorCode(details.value),
  };

  // ниже 3 функции определяют стили поля и цифр не более того
  function bombChexPattern(x, y) {
    if (x % 2 === 0 && y % 2 === 0) {
      return "rgb(225, 184, 96)";
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return "rgb(209, 172, 127)";
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return "rgb(209, 172, 127)";
    } else {
      return "rgb(225, 184, 96)";
    }
  }
  function chexPattern(x, y) {
    if (x % 2 === 0 && y % 2 === 0) {
      return "rgb(217, 205, 68)";
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return "rgb(252, 234, 37)";
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return "rgb(252, 234, 37)";
    } else {
      return "rgb(217, 205, 68)";
    }
  }
  function numColorCode(num) {
    if (num === 1) {
      return "#1976d2";
    } else if (num === 2) {
      return "#388d3c";
    } else if (num === 3) {
      return "#d33030";
    } else if (num === 4) {
      return "#7c21a2";
    } else if (num === 5) {
      return "#1976d2";
    } else if (num === 6) {
      return "#1976d2";
    } else {
      return "white";
    }
  }
  return (
    <div
      onClick={() => {
        revealCell(details.x, details.y);
      }}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      style={cellstyle}
      className="cellStyle"
    >
      {/* логика скрытия ячеек */}
      {!details.revealed && details.flagged
        ? "?"
        : details.revealed && details.value !== 0
        ? details.value === "X"
          ? "B"
          : details.value
        : ""}
    </div>
  );
};

export default Cell;
