import { useState, useEffect } from "react";
import { COLUMN, createBoard } from "../constants/board";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createBoard());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(()=> {
        setRowsCleared(0);
        const clearRows = (newStage) => {
            const stage = [];
            for(var y=0; y<newStage.length; ++y) {
                var clear = true;
                for(var x=0; x<newStage[y].length; ++x) {
                    if(newStage[y][x][0] === 0) {
                        clear = false;
                        break;
                    }
                }
                if(!clear) {
                    stage.push(newStage[y]);
                }
                else {
                    stage.unshift(new Array(COLUMN).fill([0, 'clear']));
                    setRowsCleared(prev => (prev+1));
                }
            }
            return stage;
        }

        const updateStage = prevStage => {
            const newStage = prevStage.map(row => row.map(cell => (cell[1]==='clear' ? [0, 'clear'] : cell)));
            
            player.tetromino.forEach((row, y) => {   //here we are checking TETROMINOES array
                row.forEach((value, x) => {
                    if(value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ]
                    }
                })
            });
            if(player.collided) {
                resetPlayer();
                return clearRows(newStage);
            }
            return newStage;
        }

        setStage(prevStage => updateStage(prevStage));
    }, [player.collided,
        player.pos.x,
        player.pos.y,
        player.tetromino,
        resetPlayer,
        rowsCleared])

    return[stage, setStage, rowsCleared/2];
}