import React from 'react';
import { TETROMINOES } from '../constants/board';
import { StyledCell } from '../styles/StyledCell';

const Cell = ({ type }) => {
    return(
        <StyledCell type={type} color={TETROMINOES[type].color} />
    );
}

export default Cell;