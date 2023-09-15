import React from "react";
import Board from "./components/Board";
import "./styles/cell.css";
function App() {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div>Minesweete</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Board />
      </div>
    </div>
  );
}

export default App;
