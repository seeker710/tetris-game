import React from 'react';
import { COLUMN, ROW } from '../constants/board';
import { StyledBoard } from '../styles/StyledBoard';

import Cell from './Cell';

const Board = ({ board }) => {
    return(
        <StyledBoard col={COLUMN} row={ROW}>
            {
                board.map(rowItem => rowItem.map((cell, x) => <Cell key={x} type={cell[0]} />))
            }
        </StyledBoard>
    );
}

export default Board;