import React, {Component} from 'react';
import ConferenceTileView from "./ConferenceTileView";
import PropTypes from 'prop-types';
import withRouter from "react-router-dom/es/withRouter";
import {setConferenceStatus} from "api/conference-api";
import {withErrorHandling} from "hoc/ErrorHandling";
import ErrorsDialog from "components/dialogs/ErrorsDialog/ErrorsDialog";
import {withDialog} from "../../../hoc/Dialog";

class ConferenceTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationOpen: props.conference.registrationOpen,
            submissionOpen: props.conference.submissionOpen,
        }
    }

    setConferenceStatus(status) {
        setConferenceStatus(status).then(() => {
            this.props.history.push('/')
        }).catch((error) => {
            if (error.status === 400) {
                this.props.showDialog(
                    <ErrorsDialog errors={error.data}/>
                );
            }
            else {
                this.props.setError(error);
            }
        });
    }

    onRegistrationToggle(event, isInputChecked) {
        let status = {
            registration: isInputChecked,
            submission: this.state.submissionOpen
        };
        this.setConferenceStatus(status);
        this.setState({
            registrationOpen: isInputChecked
        })
    }

    render() {
        let registrationToggle = {
            status: this.state.registrationOpen,
            onToggle: this.onRegistrationToggle.bind(this),
        };
        return (
            <ConferenceTileView
                conference={this.props.conference}
                editOnClick={() => {
                    this.props.history.push("/conference/edit")
                }}
                mailOnClick={() => {
                    this.props.history.push("/send-mail")
                }}
                registrationToggle={registrationToggle}
            />
        );
    }
}

ConferenceTile.propTypes = {
    conference: PropTypes.object.isRequired
};
ConferenceTile.defaultProps = {};

export default withDialog(withErrorHandling(withRouter(ConferenceTile)));
