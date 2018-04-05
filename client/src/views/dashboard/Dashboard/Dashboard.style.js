import styled from "styled-components";
import {logoHideBreakpoint} from "components/Template/Template.style"
import {screenMax} from "commons/media";

export const DashboardContainer = styled.div`
    width: 85%;
    margin: 0  auto;
  
    display: grid;
    
    align-content: center;
    justify-items: stretch;
    align-items: stretch;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    
    grid-template-areas: 
        "co o  .."
        "co pa m3"
    ;
    
    ${screenMax(1600)`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 150px repeat(2, auto);
        grid-template-areas: 
            "co .."
            "co o "
            "pa m3"
        ;
    `};
    
    ${logoHideBreakpoint`
        grid-template-rows: repeat(3, auto);
        grid-template-areas: 
            "co o "
            "co pa"
            "m3 .."
        ;
    `};
`;

export const ConferenceTileContainer = styled.div`
    grid-area: co;
`;

export const OrganizersTileContainer = styled.div`
    grid-area: o;
`;

export const ParticipantsTileContainer = styled.div`
    grid-area: pa;
`;

export const MockTileContainer3 = styled.div`
    grid-area: m3;
`;
