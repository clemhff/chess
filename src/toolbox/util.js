

  //let firstline =

  /*function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }*/

  let pawn_white = '/pawn_white.png';
  let rook_white = '/rook_white.png';
  let knight_white = '/knight_white.png';
  let bishop_white = '/bishop_white.png';
  let king_white = '/king_white.png';
  let queen_white = '/queen_white.png';

  let pawn_black = '/pawn_black.png';
  let rook_black = '/rook_black.png';
  let knight_black = '/knight_black.png';
  let bishop_black = '/bishop_black.png';
  let king_black = '/king_black.png';
  let queen_black = '/queen_black.png';


  function ObjSquare(x1, y1) { // Square property
    this.x =  x1,
    this.y = y1,
    this.piece = null,
    this.team = null,
    this.src = null
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

    let backPieceImgWhite = [rook_white, knight_white, bishop_white, queen_white, king_white, bishop_white, knight_white, rook_white]
    let backPieceImgBlack = [rook_black, knight_black, bishop_black, queen_black, king_black, bishop_black, knight_black, rook_black]

    let pawn_white_img = new Array(8).fill(pawn_white);
    let pawn_black_img = new Array(8).fill(pawn_black);

    let frontPiecesName = new Array(8).fill('pawn');
    let team1 = new Array(8).fill(1);
    let team2 = new Array(8).fill(2);

    squares = columnFill(0, initiateAxis() , backPiecesName, 'piece');
    squares = columnFill(0, squares , team1, 'team');
    squares = columnFill(0, squares , backPieceImgWhite, 'src');

    squares = columnFill(7, squares , backPiecesName, 'piece');
    squares = columnFill(7, squares , team2, 'team');
    squares = columnFill(7, squares , backPieceImgBlack, 'src');

    squares = columnFill(1, squares , frontPiecesName, 'piece');
    squares = columnFill(1, squares , team1, 'team');
    squares = columnFill(1, squares , pawn_white_img, 'src');

    squares = columnFill(6, squares , frontPiecesName, 'piece');
    squares = columnFill(6, squares , team2, 'team');
    squares = columnFill(6, squares , pawn_black_img, 'src');

    return squares;

  }


export {initiateBoard, ObjSquare};
