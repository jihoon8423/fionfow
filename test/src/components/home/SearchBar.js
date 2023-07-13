// SearchBar.js
import React, { useState } from "react";
import "./Home.css";
import { FaSearch } from 'react-icons/fa';


const SearchBar = ({ data, setSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedNation, setSelectedNation] = useState("");
  const [selectedTeamcolor, setSelectedTeamcolor] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedIndex(-1);
    setShowAutocomplete(true);
    };
    
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerms = searchTerm.split(",").map(term => term.trim());
    const results = data.filter(
      (player) => {const nameMatch = searchTerms.some((term) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const classMatch = selectedClasses.length === 0 || selectedClasses.includes(player.smallclass);
    const positionMatch = selectedPosition ? player.position === selectedPosition : true;
    const nationMatch = selectedNation ? player.nation === selectedNation : true;
    const teamcolors = player.teamcolor ? player.teamcolor.split(',').map((color) => color.trim().toLowerCase()) : [];
    const teamcolorMatch = selectedTeamcolor ? teamcolors.includes(selectedTeamcolor) : true;

    return nameMatch && classMatch && positionMatch && nationMatch && teamcolorMatch;
    });

    const sortedResults = results.sort((a, b) => b.ovr - a.ovr);
    setSearchResult(sortedResults);
    setShowAutocomplete(false);
    setShowSearchBar(false);
    };

    const handleAutoItemClick = (value) => {
    setSearchTerm(value);
    setSelectedIndex(-1);
    setShowAutocomplete(false);

    const result = data.filter(
      (player) => player.name.toLowerCase() === value.toLowerCase()
    );
    setSearchResult(result);
    };
    const handleResetOptions = () => {
     setSelectedClasses([]);
     setSelectedPosition("");
     setSelectedNation("");
     setSelectedTeamcolor("");
     setSearchTerm("");
     setSelectedIndex(-1);
     setShowAutocomplete(false);
     setSearchResult([]);
    };
  
  let autocomplete = [];

  if (searchTerm !== "") {
    autocomplete = [
      ...new Set(
        data
          .filter((player) =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((player) => player.name)
      ),
    ].slice(0, 10);
  }
  
  const uniqueClasses = [...new Set(data.map(player => player.smallclass))];
  const uniquePositions = [...new Set(data.map(player => player.position))];
  const uniqueNations = [...new Set(data.map(player => player.nation))];
  const uniqueTeamcolors = new Set();
  data.forEach((player) => {
    if (player.teamcolor) {
      const colors = player.teamcolor.split(',').map((color) => color.trim().toLowerCase());
      colors.forEach((color) => uniqueTeamcolors.add(color));
    }
  });
  const teamcolorOptions = Array.from(uniqueTeamcolors);
  const dropdownOptions = teamcolorOptions.map((option) => ({
   value: option,
   label: option,
 }));

  const handleClassClick = (classVal) => {
  const isSelected = selectedClasses.includes(classVal);
      if (isSelected) {
       setSelectedClasses(selectedClasses.filter(item => item !== classVal));
    } else {
       setSelectedClasses([...selectedClasses, classVal]);
    }
   };

   const handleNationChange = (event) => {
    console.log(uniqueTeamcolors);
    setSelectedNation(event.target.value);
    setSelectedIndex(-1);
    setShowAutocomplete(true);
    };
  const handleNationItemClick = (value) => {
    setSelectedNation(value);
    setSelectedIndex(-1);
    setShowAutocomplete(false);
    };
  const handleTeamcolorChange = (event) => {
    setSelectedTeamcolor(event.target.value);
    setSelectedIndex(-1);
    setShowAutocomplete(true);
    };
  const handleTeamcolorItemClick = (teamcolor) => {
    setSelectedTeamcolor(teamcolor);
    setSelectedIndex(-1);
    setShowAutocomplete(true);
    };

  return (
    <div className="form">
      <form onSubmit={handleSearchSubmit}>
        
      <div className="option-class-image">
    <span className="option-label">클래스:</span>
    <div className="option-values">
      {uniqueClasses.map((classVal) => (
        <img
          key={classVal}
          className={`class-image ${selectedClasses.includes(classVal) ? "selected" : ""}`}
          src={classVal}
          alt={classVal}
          onClick={() => handleClassClick(classVal)}
        />
      ))}
    </div>
  </div>
  
        <div className="search-inputs">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="name-input"
        />
         <button type="submit"><FaSearch /></button>
        </div>
        {showAutocomplete && autocomplete.length > 0 && (
          <ul className="autocomplete">
            {autocomplete.map((term, index) => (
              <li
                key={term}
                className={index === selectedIndex ? "selected" : ""}
                onClick={() => handleAutoItemClick(term)}
              >
                {term}
              </li>
            ))}
          </ul>
        )}
        
    
<div className="filter-options">
  

  <div className="option-position">
    <span className="option-label">포지션:</span>
    <select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
      <option value="">Select Position</option>
      {uniquePositions.map((positionVal) => (
        <option key={positionVal} value={positionVal}>{positionVal}</option>
      ))}
    </select>
  </div>

  <div className="option">
    <span className="option-label">국적:</span>
    <input
              type="text"
              value={selectedNation}
              onChange={handleNationChange}
              placeholder="Enter Nation"
              className="nation-input"
            />
            {showAutocomplete && selectedNation !== "" && (
              <ul className="autocomplete-na">
                {uniqueNations
                  .filter(nation => nation.toLowerCase().includes(selectedNation.toLowerCase()))
                  .map((nation, index) => (
                    <li
                      key={nation}
                      className={index === selectedIndex ? "selected" : ""}
                      onClick={() => handleNationItemClick(nation)}
                    >
                      {nation}
                    </li>
                  ))}
              </ul>
            )}
  </div>

  <div className="option">
    <span className="option-label">팀컬러:</span>
    <input
              type="text"
              value={selectedTeamcolor}
              onChange={handleTeamcolorChange}
              placeholder="Enter Teamcolor"
              className="team-input"
            />
            {showAutocomplete && selectedTeamcolor !== "" && (
              <ul className="autocomplete-tc">
                {teamcolorOptions
                  .filter((teamcolor) => teamcolor.includes(selectedTeamcolor.toLowerCase()))
                  .map((item, index) => (
                    <li
                      key={item}
                      className={index === selectedIndex ? "selected" : ""}
                      onClick={() => handleTeamcolorItemClick(item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            )}
  </div>
<button type="button" onClick={handleResetOptions}>초기화</button>
</div>

      </form>
    </div>    
  );
};
export default SearchBar;