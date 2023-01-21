import React, { useState } from 'react';
import { StyledTetris } from '../styles/StyledTetris';

// components
import Board from './Board';
import PlayPause from './PlayPause';
import Stats from './Stats';
import StartGame from './StartGame';

// custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useStats } from '../hooks/useStats';
import { createBoard, checkCollision } from '../constants/board';

const Tetris = () => {
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useStats(rowsCleared);

    const [gameOver, setGameover] = useState(false);
    const [dropTime, setDropTime] = useState(null);
    const [playGame, setPlayGame] = useState(false);

    const startGame = () => {
        setStage(createBoard());
        setDropTime(1000);
        setScore(0);
        setRows(0);
        setLevel(0);
        resetPlayer();
        setGameover(false);
        setPlayGame(false);
    }

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({x: dir, y: 0});
        }
    }

    const drop = () => {
        if(gameOver) setDropTime(null);

        if(rows > (level + 1)*10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 - 100*level);
        }

        if(!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        }else {
            if(player.pos.y<1) {
                setGameover(true);
            }
            updatePlayerPos({x: 0, y: 0, collided: true})
        }
    }

    const move = ({keyCode}) => {
        if(!gameOver) {
            switch(keyCode) {
                case 37:
                    movePlayer(-1);
                    break;
                case 39:
                    movePlayer(1);
                    break;
                case 40:
                    drop();
                    break;
                case 38:
                    rotatePlayer(stage, 1);
                    break;
                default:
                    break;
            }
        }
    }

    useInterval(() => drop(), dropTime)

    const playPauseGame = () => {
        if(!playGame)
            setDropTime(null);
        else
            setDropTime(1000);
        setPlayGame(!playGame);
    }

    return(
        <StyledTetris role="button" tabIndex="0" onKeyDown={event => move(event)}>
            <PlayPause callBack={playPauseGame} play={playGame} />
            <Board board={stage} />
            <div>
                {!gameOver ?
                    <>
                        <Stats text={`SCORE: ${score}`} />
                        <Stats text={`ROWS: ${rows}`} />
                        <Stats text={`LEVEL: ${level}`} />
                    </> :
                    <>
                        <Stats text={`GAME OVER`} finish />
                    </>
                }
                <StartGame callBack={startGame} />
            </div>
        </StyledTetris>
    );
}

export default Tetris;