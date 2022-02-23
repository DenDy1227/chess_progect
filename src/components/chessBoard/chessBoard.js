import React, { useRef, useState } from 'react'
import { Tile } from '../tile/tile'
import  './chessBoard.css'

import {
    VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  PieceType,
  TeamType,
  initialBoardState,
  
  } from "../constants";
import Referee from '../../referee/rules/Referee';

  export default function Chessboard() {
      const [pice,SetPieces] = useState(initialBoardState);//все фигуры
      const [activePiece, setActivePiece] = useState(null); //активная фигура
      const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1}) 
      const ref = useRef(null);
      const refery = new Referee()
      
      
     const GRID_SIZE = 100;

    //  фиксация положения при клике х,у  в grabPosition
    function grabPiece(e){
        const elem = e.target

        
        const chessboard = ref.current;
        if(elem.classList.contains("chess-piece")   && chessboard ){
            
            const grabX = Math.floor((e.pageX - chessboard.offsetLeft) / 100);
            const grabY = Math.abs(
        Math.ceil((e.pageY - chessboard.offsetTop - 800) / 100)
        
      );
      
            
      const x = e.clientX - 50
      const y = e.clientY - 50
      e.target.style.position = "absolute";
      
      e.target.style.left = `${x}px`;
      e.target.style.top = `${y}px`;
      // console.log(e,x,y);
      setActivePiece(elem);
      setGrabPosition({ x: grabX, y: grabY });
      // console.log('grab',x,y); 
        }
          
    }
    function movePiece(e){
        const chessboard = ref.current
        if(activePiece && chessboard ){
            // console.log(e,grabPosition);
            const minX = chessboard.offsetLeft - 25
            const minY = chessboard.offsetTop - 25
            const maxX = chessboard.offsetLeft + chessboard.clientWidth -75
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75
            const x = e.clientX - 50
            const y = e.clientY - 50
            activePiece.style.position='absolute';
            // activePiece.style.left=`${x}px`;
            // activePiece.style.top=`${y}px`;
            // console.log('move',grabPosition);
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
              }
              
              else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
              }
              
              else {
                activePiece.style.left = `${x}px`;
              }
        
              
              if (y < minY) {
                activePiece.style.top = `${minY}px`;
              }
              
              else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
              }
              
              else {
                activePiece.style.top = `${y}px`;
              }
        }
    }

    //обновление стейта при mouseUp - error Uncaught TypeError: Cannot read properties of undefined (reading 'position') на строке 105
    function dropPiece(e){
        const chessboard = ref.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft ) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE))
        // setGrabPosition({ x: x, y: y });
        // const currentPiece = pice.find((p) => p.position.x === grabPosition.x && p.position.y === grabPosition.y)
        // const attakedPiece = pice.find((p) => p.position.x === x && p.position.y === y)
        // console.log(currentPiece,attakedPiece);
      SetPieces((value) => {
        let piece = value.map((p) => {
           if(p.position.x === grabPosition.x && p.position.y === grabPosition.y){
            const valid= refery.isValidMove(grabPosition.x,grabPosition.y,x,y,p.tupe,p.team,p) 
            if(valid){
              
            p.position.x = x;
            p.position.y = y;
            } else{
              activePiece.style.position = 'relative';
              activePiece.style.removeProperty('left')
              activePiece.style.removeProperty('top')

            }
            return p 
           }
        })
        
        return piece
      })
      console.log(pice);
    setActivePiece(null);
     }
    }
    
    let board =[];
    
    
      for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
          const number = j + i + 2;
          let image
          initialBoardState.forEach((p) =>
           {
               if(p.position.x == i && p.position.y == j){
                image = p.image 
                
               }})
          board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
        }
      }
      return(
            <div ref={ref} 
            onMouseUp={(e) => dropPiece(e) }
             onMouseMove={ (e) => movePiece(e)} 
             onMouseDown={(e) =>  grabPiece(e)} 
             id='chessboard' >
                {board}
            </div>   
             );
        }
    