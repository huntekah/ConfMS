import styled from "styled-components";
import {red500} from "material-ui/styles/colors";
import {logoHideBreakpoint} from "components/Template/Template.style";

export const Container = styled.div`
    margin: 0 auto;
    width: 40%;
    
    display: grid;
    justify-items: center;
    align-items: center;

    grid-template-columns: 100%;
    grid-template-rows: auto;
    
    grid-template-areas: 
        "title"
        "name"
        "surname"
        "affiliation"
        "email"
        "password"
        "passwordConfirm"
        "optionalText"
        "address"
        "phoneNumber"
        "submitButton"
        "globalErrorMessage";
        
    ${logoHideBreakpoint`
        width: 70%;
    `};
`;

export const Title = styled.div`
    grid-area: title;
    width: 100%;
`;

export const Name = styled.div`
    grid-area: name;
    width: 100%;
`;

export const Surname = styled.div`
    grid-area: surname;
    width: 100%;
`;

export const Affiliation = styled.div`
    grid-area: affiliation;
    width: 100%;
`;

export const Email = styled.div`
    grid-area: email;
    width: 100%;
`;

export const Password = styled.div`
    grid-area: password;
    width: 100%;
`;

export const PasswordConfirm = styled.div`
    grid-area: passwordConfirm;
    width: 100%;
`;

// export const OptionalText = styled.div`
//     grid-area: optionalText;
//     margin-top: 30px;
// `;

// export const Address = styled.div`
//     grid-area: address ;
//     width: 100%;
// `;
//
// export const PhoneNumber = styled.div`
//     grid-area: phoneNumber ;
//     width: 100%;
// `;

export const SubmitButton = styled.div`
    grid-area: submitButton;
`;

export const GlobalErrorMessage = styled.div`
    grid-area: globalErrorMessage;
    
    margin: 30px 0;

    font-size: 15px;
    color: ${red500};
`;
