import React, { useEffect, useState } from "react";

const Timer = ({ isLoading, setLoading, setGameOver, time, gameOver }) => {
  let [timer, setTimer] = useState(time);
  const decrementTime = setTimeout(() => {
    console.log("timer");
    if (timer > 0) {
      let newTime = timer - 1;
      setTimer(newTime);
    }
  }, 1000);

  useEffect(() => {
    clearTimeout(decrementTime);
    setTimer(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  if (timer === 0 || gameOver || isLoading) {
    clearTimeout(decrementTime);
  }

  const stopedGame = () => {
    setGameOver(true);
    setLoading(false);
    clearTimeout(decrementTime);
  };

  return (
    <div style={{ color: "black", fontSize: 20, background: "maroon" }}>
      <button onClick={() => stopedGame()}>Сдаюсь</button>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {typeof timer === "number" ? Math.floor(timer) : ""}
    </div>
  );
};
export default Timer;
