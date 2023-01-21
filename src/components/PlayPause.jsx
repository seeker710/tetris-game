import React from "react";
import { StyledPlayPause } from '../styles/StyledPlayPause';

const customStyle = {
    width: "0",
    height: "0",
    borderTop: "0.5em solid transparent",
	borderLeft: "1em solid white",
	borderBottom: "0.5em solid transparent",
    margin: "auto"
};

const PlayPause = ({ callBack, play }) => {
    return(
        <StyledPlayPause onClick={callBack}>{play ? <div style={customStyle}></div> : "| |"}</StyledPlayPause>
    );
}

export default PlayPause;