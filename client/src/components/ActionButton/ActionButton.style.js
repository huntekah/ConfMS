import styled from "styled-components";
import {IconButton} from "material-ui";

export const StyledIconButton = styled(IconButton)
    .attrs({iconStyle: {color: ""}})`
    border: 1px solid black;
    border-radius: 50%;

    color: ${props => props.theme.palette.secondaryTextColor};
    background-color: ${props => props.theme.palette.primary1Color} !important;

     &:hover{
        background-color: ${props => props.theme.palette.accent3Color} !important;
     }
`;
