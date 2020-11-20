

  //let firstline =

  /*function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }*/

  function ObjSquare(x1, y1) { // Square property
    this.x =  x1,
    this.y = y1,
    this.piece = null,
    this.team = null
  }

  function initiateAxis() {

    let x = new Array(8).fill(0);                // dimension 1 => x axis
    let squares = x.map((x1, i) => {
      x1 = new Array(8).fill(1);                 // dimension 2 => y axis
      let y = x1.map((y1, j) => {
        let obj = new ObjSquare(i, j);
        y1 = obj;
        return y1;
      })
      return y;
    });
    //console.log(squares);
    return squares;
  }

  function columnFill(y,position, arrayValue, prop) {
    for (let i = 0; i < 8; i++) {
        position[i][y].[prop] = arrayValue[i];
    }
    return position;
  }

  function initiateBoard() {
    let squares = initiateAxis();
    let backPiecesName = ['rook','knight','bishop','queen','king','bishop','knight','rook'];
    let frontPiecesName = new Array(8).fill('pawn');
    let team1 = new Array(8).fill(1);
    let team2 = new Array(8).fill(2);

    squares = columnFill(0, initiateAxis() , backPiecesName, 'piece');
    squares = columnFill(0, squares , team1, 'team');

    squares = columnFill(7, squares , backPiecesName, 'piece');
    squares = columnFill(7, squares , team2, 'team');

    squares = columnFill(1, squares , frontPiecesName, 'piece');
    squares = columnFill(1, squares , team1, 'team');

    squares = columnFill(6, squares , frontPiecesName, 'piece');
    squares = columnFill(6, squares , team2, 'team');

    return squares;

  }


export {initiateBoard, ObjSquare};
