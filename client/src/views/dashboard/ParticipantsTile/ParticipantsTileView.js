import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tile from "../../../components/Tile/Tile";
import muiThemeable from 'material-ui/styles/muiThemeable';
import styled from "styled-components";
import {Badge} from "material-ui";

class ParticipantsTileView extends Component {
    render() {
        let pendingParticipants = this.props.participants.filter(participant => participant.state === 'pending');
        let acceptedParticipants = this.props.participants.filter(participant => participant.state === 'accepted');
        let declinedParticipants = this.props.participants.filter(participant => participant.state === 'declined');

        let theme = this.props.muiTheme;
        return (
            <Tile
                title={"Participation requests"}
                actions={[
                    {
                        type: "more",
                        onClick: this.props.moreOnClick
                    },
                ]}>
                <Container theme={theme}>
                    <Badge
                        badgeContent={pendingParticipants.length}
                        primary={pendingParticipants.length === 0}
                        secondary={pendingParticipants.length > 0}
                        badgeStyle={{top: 10, right: 2}}
                    >
                        Pending
                    </Badge>
                    <Badge
                        badgeContent={acceptedParticipants.length}
                        primary={true}
                        badgeStyle={{top: 10, right: 2}}
                    >
                        Accepted
                    </Badge>
                    <Badge
                        badgeContent={declinedParticipants.length}
                        primary={true}
                        badgeStyle={{top: 10, right: 2}}
                    >
                        Declined
                    </Badge>
                </Container>
            </Tile>
        );
    }
}

ParticipantsTileView.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.object).isRequired,
    moreOnClick: PropTypes.func.isRequired,
};
ParticipantsTileView.defaultProps = {};

export default muiThemeable()(ParticipantsTileView);

export const Container = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    color: ${props => props.theme.palette.primary1Color}
`;

