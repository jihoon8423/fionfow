import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown.js";
import PositionButton from "./PositionButton.js";
import data from "../../data/data.json";
import "./Statics.css";
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPlayer } from "../action/Action.js";

const Statics = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const onCountryChange = (eventKey) => {
    setSelectedCountry(eventKey === "All" ? "" : eventKey);
  };
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectPlayer = (id, name) => {
    dispatch(selectPlayer(id));
    navigate(`/players/${id}/${name}`);
  }
  
  const handlePositionClick = (position) => {
    setSelectedPosition(position === "All" ? '' : position);
  };

  // data.json에서 국가 목록 가져오기
  const countryList = [...new Set(data.map((player) => player.nation))];


  const filteredPlayers = data.filter((player) => {
    if (selectedCountry !== "" && player.nation !== selectedCountry) {
      return false;
    }
    if (selectedPosition !== "" && player.position !== selectedPosition) {
      return false;
    }
    return true;
  }).slice(0,16);

  // console.log(filteredPlayers);


  return (
    <div className="Statics">
      <div className="content-container">
        <nav className="nation-click">
        <CountryDropdown onSelect={onCountryChange}>
        </CountryDropdown>
        </nav>
        <nav className="position-click-bar">
          <PositionButton position="All" onClick={() => handlePositionClick("All")} />
          <PositionButton position="FW" onClick={() => handlePositionClick("FW")} />
          <PositionButton position="MF" onClick={() => handlePositionClick("MF")} />
          <PositionButton position="DF" onClick={() => handlePositionClick("DF")} />
          <PositionButton position="GK" onClick={() => handlePositionClick("GK")} />
        </nav>
      </div>
      <div className="body-container">
        <main>
          <div>
            <Table striped="columns">
            <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "35%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "17.5%" }} />
                <col style={{ width: "17.5%" }} />
            </colgroup>

              <thead>
                <tr>
                  <th>순위</th>
                  <th>선수이름</th>
                  <th>급여</th>
                  <th>OVR</th>
                  <th>티어</th>
                  <th>빈도</th>
                </tr>
              </thead>
                <tbody>
                    {filteredPlayers.map((player, index) => (
                        <tr key={player.id} className="static-player-tr">
                        <td>{index + 1}</td>
                        <td className="player-name" onClick={() => handleSelectPlayer(player.id,player.name)}>
                          <span className={`position-${player.position}`}>{player.sub_position}</span>
                          <img className="statics-mugshot" src={player.mugshot}></img>
                          <img className="statics-img" src={player.smallclass} />
                          {player.name}
                        </td>
                        <td className="statics-player-pay">{player.pay}</td>
                        <td>{player.ovr}</td>
                        <td></td>
                        <td>{player.pickRate}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Statics;