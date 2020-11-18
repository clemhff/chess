import React from 'react';
import '.././css/square.css';


function Square(prop) {
  return (
    <div className="square">
    {prop.obj.piece}
    </div>
  );
}

export default Square;
