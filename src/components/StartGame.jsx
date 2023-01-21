import React from "react";
import { StyledGameButton } from "../styles/StyledStartGame";

const StartGame = ({callBack}) => {
    return(
        <StyledGameButton onClick={callBack}>START GAME</StyledGameButton>
    );
}

export default StartGame;