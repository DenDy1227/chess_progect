export default class Referee {
  isTileOccupied(x, y, boardState,ourFlag) {
    const occupant = boardState.find((enemy) =>
      enemy.position.x === x && enemy.position.y === y
    )
    if (occupant&&occupant.sideColor!==ourFlag) {
      return true
    } else {
      return false
    }
  }
  isValidMove(startX, startY, endX, endY, type, sideColor, boardState) {
    console.log('watching you',endX, endY, );
    if (type === 'PAWN') {



      if (startY === 1 || startY === 6) {
        if (startX === endX && (startY - endY === -1 || startY - endY === -2) || (startY - endY === 1 || startY - endY === 2)) {
          if (!this.isTileOccupied(endX, endY, boardState,sideColor)) {
            return true
          }
          console.log('valid pawn move');
          return true
        }
      } else {
            if (startX == endX && (startY - endY === -1 && sideColor === 'BLACK') || (startY - endY === 1 && sideColor === 'WHITE')) {
                if (!this.isTileOccupied(endX, endY, boardState)) {
                  return true
          }
          }
        }
         if (this.isTileOccupied((endX+1),endY,boardState,sideColor)||this.isTileOccupied((endX-1),endY,boardState) ){
          console.log('kill');
          return true
        } 
        if (this.isTileOccupied((endX+1),endY,boardState,sideColor)||this.isTileOccupied((endX-1),endY,boardState)){
          console.log('kill');
          return true
        } 
        
        


      }

      return false
    }



  }

