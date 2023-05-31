// SearchBar.js
import React, { useState } from "react";
import "./Home.css";
import { FaSearch } from 'react-icons/fa';


const SearchBar = ({ data, setSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(true);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedIndex(-1);
    setSearchCompleted(false);
    setShowAutocomplete(true);
    };
    
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const results = data.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedResults = results.sort((a, b) => b.ovr - a.ovr);
    setSearchResult(sortedResults);
    setSearchCompleted(true);
    setShowAutocomplete(false);
    };

    const handleAutoItemClick = (value) => {
    setSearchTerm(value);
    setSelectedIndex(-1);
    setSearchCompleted(true);
    setShowAutocomplete(false);

    const result = data.filter(
      (player) => player.name.toLowerCase() === value.toLowerCase()
    );
    setSearchResult(result);
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
  
  return (
    <div className="form">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button type="submit"><FaSearch /></button>
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
      </form>
    </div>
  );
};
export default SearchBar;