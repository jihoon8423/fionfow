import React from "react";
import Button from 'react-bootstrap/Button';

const PositionButton = ({ position, onClick }) => {
  return (
    <Button variant="outline-primary" className="position-click" onClick={() => onClick(position)}>
      {position}
    </Button>
  );
};  

export default PositionButton;
