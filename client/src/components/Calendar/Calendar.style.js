import styled from "styled-components";
import {red500} from "material-ui/styles/colors"

export const CalendarContainer = styled.div`
    margin-top: 14px;
    position: relative;
`;

export const Label = styled.div`
    color: ${props => !props.error ? props.theme.palette.disabledColor : red500};
    font-size: 16px;
    margin-bottom: 4px;
`;

export const ErrorMessage = styled.div`
    position: relative;
    min-height: 14px;
    font-size: 12px;
    color: ${red500};
`;
