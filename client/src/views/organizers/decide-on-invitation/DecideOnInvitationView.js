import React, {Component} from 'react';
import YesNoDialog from "../../../components/dialogs/YesNoDialog/YesNoDialog";
import PropTypes from 'prop-types'
import Template from "../../../components/Template/Template";

class DecideOnInvitationView extends Component {
    render() {
        return (
            <Template withLogout withoutBackButton>
                <YesNoDialog
                    show={true}
                    title={"You have been invited to Organising Committee"}
                    yesAction={{
                        label: "Accept",
                        onClick: this.props.onAccept,
                    }}
                    noAction={{
                        label: "Decline",
                        onClick: this.props.onDecline,
                    }}
                >
                    You will be able to manage conference organization
                </YesNoDialog>
            </Template>
        );
    }
}

DecideOnInvitationView.propTypes = {
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
};
DecideOnInvitationView.defaultProps = {};

export default DecideOnInvitationView;

