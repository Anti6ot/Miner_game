import React, { useState } from "react";
import Board from "./components/Board";
import { Redirect, Route, Switch } from "react-router-dom";
import Raiting from "./components/Raiting";
import LoginIn from "./components/loginIn-block/LoginIn";
import NavBar from "./components/navBar-block/NavBar";

function App() {
  const [render, setRender] = useState(true);

  return (
    <div>
      <NavBar />

      {render ? <LoginIn render={render} setRender={setRender} /> : ""}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>Сапёр</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Switch>
            <Route path="/raiting" component={Raiting} />
            <Route path="/" exact component={Board} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
