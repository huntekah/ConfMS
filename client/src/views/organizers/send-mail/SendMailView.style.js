import styled from "styled-components";
import {Paper} from "material-ui";
import {screenMax} from "commons/media"

export const OuterCard = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 0 10px 10px 10px;
    border: solid;
    border-color: rgb(245, 249, 255);

    display: grid;

    align-content: center;
    justify-items: stretch;
    align-items: stretch;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 30px;
    grid-row-gap: 30px;


    grid-template-areas:
        "eh eh .."
        "eb eb eb"
        "bs bs bs";

        ${screenMax(1600)`
          grid-template-columns: 1fr;
            grid-template-areas:
                "eh"
                "eb"
                "bs";
        `};
`;

export const EmailHeaders = styled(Paper)`

    padding: 0 10px 10px 10px;
    grid-area: eh;

`;

export const EmailBody = styled(Paper)`



    grid-area: eb;
`;

export const ButtonsContainer = styled.div`
    grid-area: bs;
    float: right;
    width: 100%;
    align-content: right;
`;

export const ButtonSubmit = styled.div`
    float: right;
  margin: 15px 15px 15px 15px;
  grid-area: b1;
`;

export const ButtonClear = styled.div`
  margin: 15px 15px 15px 15px;
  grid-area: b2;
  float: left;
`;
