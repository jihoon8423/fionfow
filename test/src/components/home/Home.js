import FionFow from '../../images/FionFow.png';
import Plpng from '../../images/22pla.png';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import data from "../../data/data.json";
import { selectPlayer } from "../action/Action.js";
//import ad1 from "../../images/ad1.gif";
//import ad2 from "../../images/ad2.gif";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSelectPlayer = (id, name) => {
    dispatch(selectPlayer(id));
    navigate(`/players/${id}/${name}`);
  }
  return (
    <div style={{ backgroundColor: 'green', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div id="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div id="logo" style={{ width: '300px', height: '100px', backgroundImage: `url(${FionFow})`, backgroundSize: 'cover', marginRight: '40px' }}>
        </div>
      </div>
      <div className="home-container" style={{ overflowY: 'scroll', height: '100%', backgroundColor: 'green'}}>
        
        <SearchBar data={data} setSearchResult={setSearchResults} handleSelectPlayer={handleSelectPlayer}/>
        {searchResults.map((player) => (
          <div key={player.id} onClick={() => handleSelectPlayer(player.id, player.name)}>
            <div className='player-card-container'>
              {player.background === null ? (
                <img className='card-background' src={Plpng} />
              ) : (
                <img className='card-background' src={player.background}/>
              )}
              <img className='card-mugshot' src={player.mugshot}></img>
              <div className='player-ovr-pos-container'>
                <div className='player-ovr'>{player.ovr}</div>
                <div className='player-pos'>{player.sub_position}</div>
                <img className='player-nationality' src={player.nationpng}></img>
                <img className='player-team' src={player.bigclass}></img>
              </div>
              <div className='player-name-outer-container'>
                <img className='player-teams' src={player.smallclass}></img>
                <div className='p-name'>{player.name}</div>
              </div>
              <div className='player-pay'>{player.pay}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;