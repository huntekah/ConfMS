import styled from "styled-components";
import {IconButton, Paper} from "material-ui";

export const TileContainer = styled(Paper).attrs({
    zDepth: 2,
})`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    
    justify-items: center;
    justify-content: space-between;
    align-items: center;

    grid-template-columns: auto;
    grid-template-rows: 80px auto 80px;
`;

export const TileTitle = styled.div`
    margin: 15px 20px;
    text-align: center;

    font-size: 30px;
    font-weight: bold;
    color: ${props => props.theme.palette.secondaryTextColor};
`;

export const TileContent = styled.div`
    margin: 10px 40px;
    align-self: center;
    width: 90%
`;

export const TileActions = styled.div`
    width: 90%;
    margin: 0 30px;
    
    padding-top: 15px;
    padding-bottom: 10px;
    border-top: 2px solid ${props => props.theme.palette.secondaryTextColor};
    
    
    display: flex;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;
