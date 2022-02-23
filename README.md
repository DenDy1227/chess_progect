components => основная компонента в которойЖ
  chessboard => рендер доски
  tile => поля доски
  
  в chessBoard основные функции 
    grabPiece => mouseDown
    movePiece
    dropPiece => mouseUp => здесь прикреплена валидация хода
    
    ошибка при попытке обновить положение фигуры в стейт SetPieces()
