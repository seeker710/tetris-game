import styled from "styled-components";
import bgImage from "../assets/bg.png";

export const StyledTetris = styled.div`
    background: url(${bgImage});
    background-size: cover;
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 7vw 25vw 18vw;
    ${'' /* grid-column-gap: 2em; */}
    height: 100vh;
    width: 100vw;
`;