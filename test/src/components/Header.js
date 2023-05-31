import React from "react";
import "./home/Home.css";
import FionFow from '../images/FionFow.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header>
        <div id="container">
          <nav>
            <ul>
              <Link to = "/">
              <img src={FionFow} alt="FionFow" />
              </Link>
              <li>
                <Link to="/">선수 검색</Link>
              </li>
              <li>
                <Link to="/statics">선수 티어</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };
  export default Header;