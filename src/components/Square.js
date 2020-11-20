import React from 'react';
import '.././css/square.css';


function Square(prop) {

  const mystyle = (prop.obj.team === 1 ?{color: "red"} : {color: "blue"});
  mystyle.background = prop.background(prop.obj.x, prop.obj.y);

  return (
    <div
      className="square"
      onClick={() => prop.clickSquare(prop)}
      style={mystyle}
      >
    {prop.obj.piece}
    </div>
  );
}

export default Square;
