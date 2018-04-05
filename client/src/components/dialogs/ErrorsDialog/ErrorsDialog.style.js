import styled from "styled-components";

export const ErrorsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;

    grid-template-areas: 
      "g"
      "f"
    
`;

export const GlobalErrors = styled.div`
  grid-area: g;
  align-self: center;
  justify-self: center;

  margin: 10px;
`;

export const GlobalError = styled.div`
`;

export const FieldErrors = styled.div`
  grid-area: f;
  align-self: start;
  justify-self: start;

  margin: 10px;
`;


export const FieldHeader = styled.div`
    
    font-size: 18px;
    font-weight: bold;
    margin: 3px 0;
    
    &::after {
      content: ":"
    }
    
`;

export const FieldError = styled.div`
  align-self: center;
  justify-self: center;
  
  margin-left: 10px;
`;
