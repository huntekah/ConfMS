import styled from "styled-components";
import {screenMax} from "commons/media";

export const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    display: grid;

    grid-template-columns: 50% 50%;
    grid-template-rows: auto;

    grid-template-areas:
        "ul ul .."
        "db db db";

        ${screenMax(1600)`
            width: 80%
            grid-template-areas:
            "ul ul"
            "db db";
        `};
        ${screenMax(1200)`
            width: 90%;
        `};
        ${screenMax(800)`
            width: 100%;
        `};
`;

export const OrganizerList = styled.div`
    grid-area: ul;
    justify-content: space-between;
    align-items: center;
`;


export const DeleteButton = styled.div`
grid-area: db;
`;
