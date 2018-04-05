import React, {Component} from 'react';
import {ConferenceTileContainer, DashboardContainer, MockTileContainer3, OrganizersTileContainer, ParticipantsTileContainer} from "./Dashboard.style";
import Template from "components/Template/Template";
import ConferenceTile from "views/dashboard/ConferenceTile/ConferenceTile";
import MockTile from "views/dashboard/MockTile/MockTile";
import OrganizersTile from "views/dashboard/OrganizersTile/OrganizersTile";
import PropTypes from 'prop-types';
import ParticipantsTile from "../ParticipantsTile/ParticipantsTile";


class DashboardView extends Component {
    render() {
        return (
            <Template title={"Dashboard"} indented withLogout withoutBackButton>
                <DashboardContainer>
                    <ConferenceTileContainer>
                        <ConferenceTile conference={this.props.conference}/>
                    </ConferenceTileContainer>
                    <OrganizersTileContainer>
                        <OrganizersTile/>
                    </OrganizersTileContainer>
                    <ParticipantsTileContainer>
                        <ParticipantsTile/>
                    </ParticipantsTileContainer>
                    <MockTileContainer3>
                        <MockTile/>
                    </MockTileContainer3>
                </DashboardContainer>
            </Template>
        );
    }
}

DashboardView.propTypes = {
    conference: PropTypes.object.isRequired
};
DashboardView.defaultProps = {};

export default DashboardView;
