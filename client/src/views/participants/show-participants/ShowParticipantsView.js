import React, {Component} from 'react';
import {ShowParticipantsContainer} from "./ShowParticipants.styles";
import Template from "components/Template/Template";
import {Tab, Tabs} from "material-ui";
import PropTypes from 'prop-types';
import ParticipantsTable from "../../../components/participantsTable/ParticipantsTable";


class ShowParticipantsView extends Component {
    render() {
        let pendingParticipants = this.props.participants.filter(participant => participant.state === 'pending');
        let acceptedParticipants = this.props.participants.filter(participant => participant.state === 'accepted');
        let declinedParticipants = this.props.participants.filter(participant => participant.state === 'declined');
        return (
            <Template title={"Participants"} withLogout>
                <ShowParticipantsContainer>
                    <Tabs>
                        <Tab label={`Pending requests (${pendingParticipants.length})`}>
                            <ParticipantsTable
                                participants={pendingParticipants}
                                onAccept={this.props.onAccept}
                                onDecline={this.props.onDecline}
                            />
                        </Tab>
                        <Tab label={`Accepted  requests (${acceptedParticipants.length})`}>
                            <ParticipantsTable
                                participants={acceptedParticipants}
                                onAccept={this.props.onAccept}
                                onDecline={this.props.onDecline}
                            />
                        </Tab>
                        <Tab label={`Declined  requests (${declinedParticipants.length})`}>
                            <ParticipantsTable
                                participants={declinedParticipants}
                                onAccept={this.props.onAccept}
                                onDecline={this.props.onDecline}
                            />
                        </Tab>
                    </Tabs>
                </ShowParticipantsContainer>
            </Template>
        );
    }


}

ShowParticipantsView.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
};
ShowParticipantsView.defaultProps = {};

export default ShowParticipantsView

