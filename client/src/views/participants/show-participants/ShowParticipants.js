import React, {Component} from 'react';
import ShowParticipantsView from "./ShowParticipantsView";
import {getParticipants} from "api/participants-api";
import {withErrorHandling} from "hoc/ErrorHandling";
import {changeParticipantsState} from "../../../api/participants-api";
import LoadingPage from "../../loadingPage/LoadingPage";

class ShowParticipants extends Component {

    constructor() {
        super();
        this.state = {
            participants: undefined,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getParticipants()
            .then((response) => {
                this.setState({
                    participants: response,
                    loading: false,
                })
            })
            .catch((error) => {
                this.props.setError(error);
            })
    }

    acceptParticipant(participant) {
        changeParticipantsState(participant.id, 'accepted')
            .then((response) => {
                this.fetchData()
            })
            .catch((error) => {
                this.props.setError(error)
            });
    }

    declineParticipant(participant) {
        changeParticipantsState(participant.id, 'declined')
            .then((response) => {
                this.fetchData()
            })
            .catch((error) => {
                this.props.setError(error)
            });
    }

    render() {
        return (
            this.state.loading ? <LoadingPage/> :
                <ShowParticipantsView
                    participants={this.state.participants}
                    onAccept={this.acceptParticipant.bind(this)}
                    onDecline={this.declineParticipant.bind(this)}
                />

        );
    }
}

ShowParticipants.propTypes = {};
ShowParticipants.defaultProps = {};

export default withErrorHandling(ShowParticipants);

