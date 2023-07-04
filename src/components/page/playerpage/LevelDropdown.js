import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./PlayerPage.css"

const LevelDropdown = ({ onSelect }) => {
    const [selectedLevel, setSelectedLevel] = useState("1");
    const onLevelChange = (eventlevelKey) => {
      setSelectedLevel(eventlevelKey);
      onSelect(eventlevelKey);
    };
    const levelRange = Array(10).fill(0).map((_, i) => (i + 1).toString());
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedLevel} <span className="caret"></span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "150px", overflowY: "auto" }} className="my-dropdown-menu">
              {levelRange.map((level) =>(
                <Dropdown.Item key={level} onClick={() => onLevelChange(level)} className="my-dropdown-item">
                {level}
              </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };
  export default LevelDropdown;





