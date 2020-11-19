import React from 'react';
import '.././css/square.css';


function Square(prop) {
  return (
    <div className="square" onClick={() => prop.clickSquare(prop)}>
    {prop.obj.piece}
    </div>
  );
}

export default Square;
