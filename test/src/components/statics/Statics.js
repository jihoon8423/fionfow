import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown.js";
import PositionButton from "./PositionButton.js";
import data from "../../data/data.json";
import rankerdata from "../../data/rankerdata.json";
import "./Statics.css";
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPlayer } from "../action/Action.js";

const Statics = () => {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");

  const onSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
  };

  const calculateTier = (rank, pickRate) => {
    const totalRank = Math.min(16, rank);
    if (pickRate === 1 && totalRank < 16) {
      // 다른 로직 적용
      return totalRank;
    } else {
      // 현재 로직 적용
      const tierCount = Math.ceil(totalRank / 4);
      const remainingCount = totalRank % 4;
      if (pickRate === 1 && rank <= totalRank) {
        return tierCount;
      } else {
        const tier = tierCount - Math.ceil(remainingCount / 4) + 1;
        return tier > 0 ? tier : 1;
      }
    }
  };

  const filteredPlayers = rankerdata
  .map((ranker) => {
    const player = data.find((p) => p.id === ranker.id);
    return {
      id: ranker.id,
      name: player.name,
      position: ranker.position,
      mugshot: player.mugshot,
      smallclass: player.smallclass,
      pay: player.pay,
      ovr: player.ovr,
      pickRate: ranker.count,
      team: ranker.team, // 플레이어의 팀 정보 추가
    };
  })
  .filter((player, index, self) => {
    if (selectedTeam !== "All" && player.team !== selectedTeam) {
      return false;
    }
    if (selectedPosition !== "All" && player.position !== selectedPosition) {
      return false;
    }
    // 중복 항목 제거
    return index === self.findIndex((p) => p.id === player.id);
  })
  .sort((a, b) => b.pickRate - a.pickRate)
  .map((player, index) => ({
    ...player,
    rank: index + 1,
    tier: calculateTier(index + 1),
  }))
  .slice(0, 16);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSelectPlayer = (id, name) => {
    dispatch(selectPlayer(id));
    navigate(`/players/${id}/${name}`);
  };
  const sortedPlayers = filteredPlayers
  .sort((a, b) => b.pickRate - a.pickRate)
  .slice(0, 16);

  // console.log(filteredPlayers);
  return (
    <div className="Statics">
      <div className="content-container">
        <nav className="nation-click">
        <CountryDropdown onSelect={handleTeamChange}/>
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
            <Table striped>
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
                {sortedPlayers.map((player, index) => (
                  <tr key={player.id} className="static-player-tr">
                    <td>{player.rank}</td>
                        <td className="player-name" onClick={() => handleSelectPlayer(player.id,player.name)}>
                          <span className={`position-${player.position}`}>{player.position}</span>
                          <img className="statics-mugshot" src={player.mugshot} alt="" />
                          <img className="statics-img" src={player.smallclass} alt="" />
                          {player.name}
                        </td>
                        <td className="statics-player-pay">{player.pay}</td>
                        <td>{player.ovr}</td>
                        <td>{player.tier}</td>
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