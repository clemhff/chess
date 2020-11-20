import React from 'react';
import '.././css/square.css';


function Square(prop) {
  return (
    <div
      className="square"
      onClick={() => prop.clickSquare(prop)}
      style={(prop.obj.team === 1 ?{color: "red"} : {color: "blue"})}
      >
    {prop.obj.piece}
    </div>
  );
}

export default Square;
