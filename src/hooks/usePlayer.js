import { useCallback, useState } from 'react';
import { COLUMN, checkCollision, randomTetromino, TETROMINOES } from '../constants/board';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOES[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            pos: {x: (prev.pos.x+x), y: (prev.pos.y+y)},
            tetromino: prev.tetromino,
            collided: collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: COLUMN/2 -1, y: 0},
            tetromino: randomTetromino().shape,
            collided: false,
        })}, []);

    const rotate = (matrix, dir) => {
        for(var y=0; y<matrix.length; ++y) {
            for(var x=0; x<matrix[y].length; ++x) {
                if(y<x)
                    [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
            }
        }
        if(dir>0) return matrix.forEach(element => element.reverse());
        return matrix.reverse();
    }
    const rotatePlayer = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    }

    return [player, updatePlayerPos, resetPlayer, rotatePlayer];
}
