import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import data from "../../data/rankerdata.json";


const CountryDropdown = ({ onSelect }) => {
  const [selectedTeam, setSelectedTeam] = useState("All");
  //const teamList = Array.from(new Set(rankerdata.map((player) => player.team)));
  const teamList = ["레알마드리드", "바이에른뮌헨","대한민국","맨체스터유나이티드","잉글랜드","첼시","프랑스","인테르","유벤투스","네덜란드","아스널","맨체스터시티","리버풀","토트넘홋스퍼","파리생제르맹","AC밀란"];
  teamList.sort((a, b) => a.localeCompare(b));
  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    onSelect(team);
  };
  console.log(teamList)
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedTeam} <span className="caret"></span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
          <Dropdown.Item onClick={() => handleTeamChange("All")}>All</Dropdown.Item>
          {teamList.map((team) => (
            <Dropdown.Item key={team} onClick={() => handleTeamChange(team)}>
              {team}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};



export default CountryDropdown;
