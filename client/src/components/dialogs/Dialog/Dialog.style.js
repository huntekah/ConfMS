import styled from "styled-components";
import {ActionInfo, AlertError, AlertWarning} from 'material-ui/svg-icons'
import {blue500, red500, yellow500} from 'material-ui/styles/colors'


const colors = {
    'info': blue500,
    'warning': yellow500,
    'error': red500
};

function getColor(type, theme) {
    if (type==='none'){
        return theme.palette.primary1Color;
    }
    return colors[type];
}

export const InfoIcon = styled(ActionInfo)`
  color: ${colors.info} !important;
`;

export const WarningIcon = styled(AlertWarning)`
  color: ${colors.warning} !important;
`;

export const ErrorIcon = styled(AlertError)`
  color: ${colors.error} !important;
`;

export const DialogTitle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const TitleIcon = styled.div`
  order: 1;
  margin: 0 10px;
`;

export const TitleText = styled.div`
  order: 2;
  color: ${props => getColor(props.type, props.theme)};
`;


export const DialogContent = styled.div`
  width: 100%;
`;
