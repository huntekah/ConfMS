import styled from "styled-components";
import {IconButton, Paper} from "material-ui";
import {screenMax} from "commons/media";


export const Outer = styled.div`
    display: table;
    position: absolute;
    height: 100%;
    width: 100%;
`;
export const Middle = styled.div`
    display: table-cell;
    vertical-align: middle;
`;
export const Inner = styled(Paper).attrs({
    zDepth: 2,
})`

    padding: 50px 50px auto;
    width: 70%;
    height: 30%;

    margin-left: auto;
    margin-right: auto;
`;

export const Content = styled.div`
height: 40%;
margin: 20px 50px;
padding: 50px 50px;
text-align: center;

font-size: 25px;
font-weight: bold;
color: ${props => props.theme.palette.secondaryTextColor};
`;
