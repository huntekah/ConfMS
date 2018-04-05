import styled from "styled-components";
import {screenMax} from "../../commons/media";

export const logoHideBreakpoint = screenMax(1300);

export const TemplateContainer = styled.div`
`;

export const Header = styled.div`
   display: flex;
   justify-content: space-between;

   margin-bottom: ${(props) => props.indented ? "-80px" : 0};

    ${logoHideBreakpoint`
        margin-bottom: 0px;
        justify-content: center;
    `};
`;

export const Title = styled.h1`
    order: 1;
    align-self: center;
    margin-left: 200px;

    color: ${props => props.theme.palette.primary1Color};
    font-size: 80px;

    ${screenMax(1430)`
        margin-left: 100px;
    `};

    ${logoHideBreakpoint`
        left: 0px;
        margin-left: 0px;
    `};
`;

export const Logo = styled.div`
    order: 2;

    width: 350px;
    height: 350px;
    background: #117300;

    border: 0px;
    border-radius: 0 0 0 350px;
    background: url('${require('./img/logo.png')}') no-repeat top right;


    ${logoHideBreakpoint`
        display: none;
    `};
`;

export const LogoutButton = styled.div`
    position: absolute;
    top: 10px;
    left: 110px;
`;
export const BackButton = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`;
