import styled from "styled-components";
import {red500} from "material-ui/styles/colors";
import {screenMax} from "../../../commons/media";


export const FormContainer = styled.div`
    margin: 0 auto;
    
    display: grid;
    justify-items: center;
    align-items: center;
    
    width: 40%;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;
    grid-template-areas: 
        "cn cn cn sb"
        "pr pr pr pr"
        "sd sd ed ed"
        "ge ge ge ge";
        
    ${screenMax(1753)`
        width: 50%;
    `};
    
    ${screenMax(1393)`
        width: 60%;
    `};
    
    ${screenMax(1113)`
        width: 70%;
    `};
    
    ${screenMax(982)`
        grid-template-columns: 100%;
        grid-template-rows: auto;
        grid-template-areas:
            "cn"
            "pr"
            "sd"
            "ed"
            "ge"
            "sb";
    `};
`;

export const ConferenceName = styled.div`
    grid-area: cn;
    width: 100%;
`;

export const Price = styled.div`
    grid-area: pr;
    width: 100%;
`;
export const StartDate = styled.div`
    grid-area: sd;
`;
export const EndDate = styled.div`
    grid-area: ed;
`;

export const SubmitButton = styled.div`
    grid-area: sb;
`;

export const GlobalErrorMessage = styled.div`
    grid-area: ge;
    
    margin: 30px 0;

    font-size: 15px;
    color: ${red500};
}
`;
