import styled from "styled-components";

export const Div = styled.div`
  text-align: center;  
`;

export const HelloText = styled.h2`
  color: ${props => props.error ? 'red' : 'black'}
`;
