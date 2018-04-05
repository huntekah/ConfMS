import styled from "styled-components";

export const Container = styled.div`
    width: 80%;
    margin: 0 auto;
    display: grid;
    
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    grid-column-gap: 20px;
    
    grid-template-areas: 
        "ei el"
        ".. sb"
`;

export const EmailsInput = styled.div`
    grid-area: ei;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const EmailsTextField = styled.div`
    flex-grow: 1;
`;

export const AddButton = styled.div`
  margin: 0 5px;
`;

export const EmailList = styled.div`
    grid-area: el;
`;

export const SubmitButton = styled.div`
    grid-area: sb;
    justify-self: center;
`;
