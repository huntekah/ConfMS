import styled from "styled-components";
import {logoHideBreakpoint} from "../../components/Template/Template.style";

export const LogInContainer = styled.div`
    margin: 0 auto;
    width: 40%;
    
    display: grid;
    justify-items: center;
    align-items: center;

    grid-template-columns: 100%;
    grid-template-rows: auto;
    
    grid-template-areas: 
    "Email"
    "Password"
    "LoginButton"
    "InvalidCredentialsMessage"
    "SignUpMessage";
    
    ${logoHideBreakpoint`
        width: 70%;
    `};
`;

export const Email = styled.div`
    grid-area: Email;
    width: 100%;
`;

export const Password = styled.div`
    grid-area: Password;
    width: 100%;
`;

export const LoginButton = styled.div`
    grid-area: LoginButton;
`;

export const SignUpMessage = styled.div`
    margin-top: 30px;
    grid-area: SignUpMessage;
    width: 100%;
`;

export const InvalidCredentialsMessage = styled.div`
    margin-top: 15px;
    grid-area: InvalidCredentialsMessage ;
    color: red;
`;

