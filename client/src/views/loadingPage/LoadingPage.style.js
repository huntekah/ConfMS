import styled, {keyframes} from "styled-components";
import  { BaseAnimation } from 'animate-css-styled-components';
import {screenMax} from "../../commons/media";

const RotateAnimation = keyframes`
    0%{ opacity: 0.0; }
    15% { 
     opacity: 0.65;
    }
    70%{ 
    opacity: 1;
    transform: rotate(360deg); 
    }
    100%{
    opacity: 0.0;    
    transform: rotate(345deg);
    }
`;

export const Rotate = styled(BaseAnimation)`
animation-name:${RotateAnimation};
`;

export const LoadingPageBlock = styled.div`
    margin: 0 auto;

    display: grid;
    justify-items: center;
    align-items: center;

    ${screenMax(1113)`
        width: 70%;
    `};

    ${screenMax(982)`
        grid-template-columns: 100%;
        grid-template-rows: auto;
        grid-template-areas:
            "cn"
            "sd"
            "ed"
            "ge"
            "sb";
    `};
    `;

export const RoundSquare = styled.span`
    display: inline-block;
	padding: 25px;
	-webkit-border-radius: 15%;
	-moz-border-radius: 15%;
	-ms-border-radius: 15%;
	-o-border-radius: 15%;
	border-radius: 15%; 
    font-size: 200%;
    
 `;



