import React from "react";
import "./home/Home.css";
import FionFow from '../images/FionFow.png';
import { Link } from 'react-router-dom';
import { Fragment } from "react";
import Navigation from "./layout/MainNavigation";

type Props = {
  children?: React.ReactNode
}

const Header:React.FC<Props> = (props) => {
    return (
    <Fragment>
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
              <li>
                <Link to="/trade">유저 거래</Link>
                </li>
              <Navigation />
              <main>{props.children}</main>
            </ul>
          </nav>
        </div>
      </header>
    </Fragment>
    );
  };
  export default Header;