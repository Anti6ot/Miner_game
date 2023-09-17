import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav>
      <div>
        <ul className="ul-list">
          <li>
            <Link className="li-list" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="li-list" to="/raiting">
              Raiting
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
