import styled from "styled-components";
import {TableHeaderColumn, TableRowColumn} from "material-ui";

export const ParticipantsTableContainer = styled.div`
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  > * {
    margin: 0 2px!important;
  }
`;

export const StyledTableRowColumn = styled(TableRowColumn)`
  text-align: center !important;
`;


export const StyledTableHeaderColumn = styled(TableHeaderColumn)`
  text-align: center !important;
`;

