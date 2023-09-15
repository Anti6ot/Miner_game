import React from "react";

const Cell = ({ details, updateFlag, revealCell }) => {
  const style = {
    cellStyle: {
      width: 40,
      height: 40,
      background: "grey",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid black",
      cursor: "pointer",
    },
  };
  return (
    <div
      onClick={() => {
        revealCell(details.x, details.y);
      }}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      style={style.cellStyle}
    >
      {/* логика скрытия ячеек */}
      {details.revealed ? details.value : ""}
    </div>
  );
};

export default Cell;
