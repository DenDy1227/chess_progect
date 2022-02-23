import {  samePosition,  } from "../../Constants";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export const bishopMove = (initialPosition, desiredPosition, team, boardState) => {
    for(let i = 1; i < 8; i++) {
      //Up right movement
      if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
        let passedPosition= {x: initialPosition.x + i, y: initialPosition.y + i};
        //Check if the tile is the destination tile
        if(samePosition(passedPosition, desiredPosition)) {
          //Dealing with destination tile
          if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
            return true;
          }
        } else {
          //Dealing with passing tile
          if(tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
        
      //Bottom right movement
      if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
        let passedPosition= {x: initialPosition.x + i, y: initialPosition.y - i};
        //Check if the tile is the destination tile
        if(samePosition(passedPosition, desiredPosition)) {
          //Dealing with destination tile
          if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
            return true;
          }
        } else {
          if(tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      //Bottom left movement
      if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
        let passedPosition= {x: initialPosition.x - i, y: initialPosition.y - i};
        //Check if the tile is the destination tile
        if(samePosition(passedPosition, desiredPosition)) {
          //Dealing with destination tile
          if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
            return true;
          }
        } else {
          if(tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      //Top left movement
      if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
        let passedPosition = {x: initialPosition.x - i, y: initialPosition.y+i};
        //Check if the tile is the destination tile
        if(samePosition(passedPosition, desiredPosition)) {
          //Dealing with destination tile
          if(tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
            return true;
          }
        } else {
          if(tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }