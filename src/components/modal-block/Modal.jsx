import React, { useState, useEffect } from "react";
import "./modal.css";
function Modal({ restartGame }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        margin: "0 auto",
        width: "100%",
        height: "100%",
        opacity: render ? 1 : 0,
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div id="gameOverImage"></div>
      <div className="tryAgain" onClick={() => restartGame()}>
        Попробовать снова
      </div>
    </div>
  );
}
export default Modal;
