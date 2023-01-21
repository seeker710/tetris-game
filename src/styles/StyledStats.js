import styled from "styled-components";

export const StyledStats = styled.div`
    background: black;
    border-radius: .8em;
    box-sizing: border-box;
    color: ${props => props.finish ? "red" : "white"};
    font-family: Pixel, Arial, Helvetica, sans-serif;
    margin-bottom: 1.8em;
    outline: 1px solid white;
    padding: 1.4em;
    text-align: ${props => props.finish ? "center" : "none"};
    width: 100%;
`;