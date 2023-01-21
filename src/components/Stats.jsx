import React from 'react';
import { StyledStats } from '../styles/StyledStats';

const Stats = ({ text, finish }) => {
    return (
        !finish ? <StyledStats>{text}</StyledStats> : <StyledStats finish>{text}</StyledStats>
    );
}

export default Stats;