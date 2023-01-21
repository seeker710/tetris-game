import styled from "styled-components";

export const StyledBoard = styled.div`
    background: black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: grid;
    grid-template-columns: repeat(${props => props.col}, 1fr);
    grid-template-rows: repeat(${props => props.row}, 1fr);
    width: 85%;
    height: 85vh;
    outline: 1px solid white;
`;