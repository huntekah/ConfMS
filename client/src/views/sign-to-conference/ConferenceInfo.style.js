import styled from "styled-components";
import {IconButton, Paper} from "material-ui";
import {screenMax} from "commons/media";
import {logoHideBreakpoint} from "components/Template/Template.style";

export const ConferenceInfoTile = styled(Paper).attrs({
    zDepth: 2,
})`
    width: 60%;
    height: 100%;
    display: grid;
    margin: 0 auto;

    justify-items: strech;
    align-items: strech;

    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    grid-template-rows: 80px auto 80px;
    grid-template-areas:
      "t t"
      "s e";

      ${logoHideBreakpoint`
          width: 80%;
      `};

      ${screenMax(822)`
          grid-template-columns: 1fr;
          grid-template-areas:
          "t"
          "s"
          "e";
      `};
`;

export const TileTitle = styled.div`
    grid-area: t;

    margin: 15px 20px;
    text-align: center;

    font-size: 30px;
    font-weight: bold;
    color: ${props => props.theme.palette.secondaryTextColor};
`;

export const TileStartDate = styled.div`
    grid-area: s;

    align-self: stretch;
    justify-self: stretch;
    margin: 10px 40px;
    text-align: center;
`;

export const TileEndDate = styled.div`
    grid-area: e;

    align-self: stretch;
    justify-self: stretch;
    margin: 10px 40px;
    text-align: center;
`;
