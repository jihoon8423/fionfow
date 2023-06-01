import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import data from "../../data/data.json";


const CountryDropdown = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const countries = Array.from(new Set(data.map((player) => player.nation)));

  const onCountryChange = (eventKey) => {
    setSelectedCountry(eventKey);
    onSelect(eventKey);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCountry} <span className="caret"></span>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "250px", overflowY: "auto" }}>
          <Dropdown.Item onClick={() => onCountryChange("All")}>All</Dropdown.Item>
          {countries.map((country) => (
            <Dropdown.Item key={country} onClick={() => onCountryChange(country)}>
              {country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};


export default CountryDropdown;
