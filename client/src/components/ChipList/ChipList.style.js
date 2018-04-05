import styled from "styled-components";
import {Chip} from "material-ui";

export const Container = styled.div`
  width:100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const ChipsContainer = styled.div`
    justify-self: start;
    align-self: start;
    
    display: flex;
    flex-wrap: wrap;
`;

export const MyChip = styled(Chip)`
  margin: 5px !important;
`;

export const EmptyListMessage = styled.div`
    user-select: none;
    color: ${(props) => props.theme.palette.disabledColor};
    font-size: 20px;
`;

