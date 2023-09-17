import React, { useState } from "react";
import "./loginIn.css";
import localStorageService from "../../services/localStorage.service";

function LoginIn({ render, setRender }) {
  const [userName, setUserName] = useState("");

  const handleChange = ({ target }) => {
    setUserName(target.value);
  };
  const handleSubmit = () => {
    localStorageService.setTokens(userName);
    setRender(false);
  };

  return (
    <div className="login_wrapper">
      <div className="loginIn">
        <input
          // className={"form-control " + formClassname()}
          // placeholder={name}
          // id={name}
          name="text"
          type="text"
          value={userName}
          onChange={handleChange}
        />
        <div className="tryAgain" onClick={() => handleSubmit()}>
          отправить
        </div>
      </div>
    </div>
  );
}
export default LoginIn;
