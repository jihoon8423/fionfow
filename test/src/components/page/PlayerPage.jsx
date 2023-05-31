import data from '../../data/data.json';
import {  useDispatch, useSelector  } from 'react-redux';
import {selectPlayer} from '../action/Action';
import "./PlayerPage.css"
import OveralAbility from "./OveralAbility"
import Plpng from '../../images/22pla.png';
import Level from './LevelDropdown';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import DetailInfo from './DetailInfo';


function PlayerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPlayer = useSelector((state) => state.selectedPlayer) || {}; //playerdata
  const selectedPlayerId = selectedPlayer.id; 
  // data에서 해당 선수를 찾아서 가져오기
const playerData = data.find(player => player.id === selectedPlayerId);
// 선수의 이름을 가져오는 코드
const playerName = data.find(player => player.id === selectedPlayerId)?.name;
// 동일한 이름을 가진 선수들의 데이터를 가져오는 코드
const allSeasonPlayer = data.filter(player => {
  if (player.name === playerName) {
    return true;
  }
  return false;
});

const [selectedLevel, setSelectedLevel] = useState("1");
const sortallSeasonPlayer = allSeasonPlayer.sort((a, b) => b.ovr - a.ovr);
const [selectedAbility, setSelectedAbility] = useState("");
const [defaultUserId, setDefaultUserId] = useState(selectedPlayer.id);

  const onLevelChange = (eventlevelKey) => {
    setSelectedLevel(eventlevelKey === "1" ? "" : eventlevelKey);
  };
  const handleSelectSeason = (seasonId,name) => {
    setDefaultUserId(seasonId);
    navigate(`/players/${seasonId}/${name}`);
  };
  const handleMouseEnter = (seasonId) => {
    dispatch(selectPlayer(seasonId));
  };
  const handleMouseLeave = () => {
    dispatch(selectPlayer(defaultUserId));
  };

  const plusAbility = () => {
    const level = parseInt(selectedLevel);

   
    if (level === 2) {
        return 1;
    } else if (level === 3) {
        return 2;
    } else if (level === 4) {
        return 4;
    } else if (level === 5) {
        return 6;
    } else if (level === 6) {
        return 8;
    } else if (level === 7) {
        return 11;
    } else if (level === 8) {
        return 15;
    } else if (level === 9) {
        return 19;
    } else if (level === 10) {
        return 24;
    } else {
        return 0;
    }
    };

  const abilityIncrease = plusAbility();

  const getValueColorClass = (value) => {
    if (value < 60) {
    return 'light-gray';
    } else if (value >= 60 && value < 70) {
    return 'light-light-gray';
    } else if (value >= 70 && value < 80) {
    return 'dark-gray';
    } else if (value >= 80 && value < 90) {
    return 'sky-blue';
    } else if (value >= 90 && value < 100) {
    return 'blue';
    } else if (value >= 100 && value < 110) {
    return 'purple';
    } else if (value >= 110 && value < 120) {
    return 'light-purple';
    } else if (value >= 120 && value < 130) {
    return 'light-light-purple';
    } else if (value >= 130 && value < 140) {
    return 'red';
    } else if (value >= 140 && value < 150) {
    return 'mustard';
    } else if (value >= 150) {
    return 'golden';
    }
    return '';
};
const getPlayerLevel = (val) => {
  if (val <= 1){
    return 'black';
  } else if (val <= 4){
    return 'bronze';
  } else if (val <= 7){
    return 'silver';
  } else {
    return 'gold';
  }
};

  return (
    <div>
      <div className='page-top-container'>
        <div className='page-player-image'>
        {playerData.background === null ? (
                  <img className='page-card-background' src={Plpng} />
                ) : (
                  <img className='page-card-background' src={playerData.background}/>
                )}
          <img className='page-card-mugshot' src={playerData.mugshot}/>
          <div className={`page-player-level-container-${getPlayerLevel(selectedLevel)}`}>
            <a >{selectedLevel || "1"}</a>
          </div>
            <div className='page-player-ovr-pos-container'>
              <div className='page-player-ovr'>{playerData.ovr + abilityIncrease}</div>
              <div className='page-player-pos'>{playerData.sub_position}</div>
                <img className='page-player-nationality' src={playerData.nationpng}/>
                <img className='page-player-team' src={playerData.bigclass}/>
            </div>
              <div className='page-player-name-outer-container'>
                <img className='page-player-teams' src={playerData.smallclass}></img>
                <div className='page-p-name'>{playerData.name}</div>
              </div>
              <div className='page-player-pay'>{playerData.pay}</div>
        </div>
          <div className='page-info'>
            <div className='info-season'>
              <img src={playerData.smallclass}/> {playerData.name}
            </div>
            <div className='page-top-ovr'>
              <div className={`p-position-${playerData.position}`}>{playerData.sub_position}</div>
              <div className='p-ovr'>{playerData.ovr + abilityIncrease}</div>
            </div>
            <div className='page-top-pi'>
              키: {playerData.height}cm | 몸무게: {playerData.weight}kg | 체형: {playerData.bodytype} | L{playerData.leftfoot} - R{playerData.rightfoot} | 개인기: {playerData.skill}
            </div>
            <div className='level-button'>
              <div className='level-button-name'>강화</div>
              <div className='level-click'>
                <Level onSelect={onLevelChange}></Level>
              </div>
            </div>
         </div>
      </div>
      <div className='page-middle-container'>
        <div className='page-season-container'>
        {sortallSeasonPlayer.map((season) => (
            <div key={season.id}
            className="page-all-playerSeason"
            onClick={() => handleSelectSeason(season.id, season.name)}
            onMouseEnter={() => handleMouseEnter(season.id)}
            onMouseLeave={handleMouseLeave}
            >
            <img className="page-seasibn" src={season.smallclass}></img>
            </div>
            ))}
        </div>
        <OveralAbility selectedLevel={selectedLevel}/>
      </div>
      <div className='page-bottom-container'>
        <div className='page-position'>
          <div className='page-position-container'>
            <li className='page-position-default'>
              총능력치
            </li>

          </div>
          <DetailInfo selectedLevel={selectedLevel} selectedAbility={selectedAbility}/>
            </div>
        </div>
      </div>
  );
}
export default PlayerPage;