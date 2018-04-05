import React, {Component} from 'react';
import {FormValidator} from "validation/form";
import {eachValueInSeparateLine, required} from "validation/rules";
import validator from 'validator'
import SimpleDialog from "components/dialogs/SimpleDialog/SimpleDialog";
import {sendOrganizersInvitations} from "api/committee-api";
import InviteOrganizersFormView from "./InviteOrganizersFormView";
import {FieldValidator} from "validation/field";
import {withErrorHandling} from "hoc/ErrorHandling";
import {withRouter} from "react-router";
import {secured} from "../../../hoc/Secured";

//TODO refactor to use withDialog
class InviteOrganizersForm extends Component {

    constructor() {
        super();
        this.state = {
            emailsText: "",
            emailsSet: new Set(),
            wrongEmails: new Set(),

            showInvitationsSentDialog: false,
        };

        this._validator = new FormValidator([
            new FieldValidator("emailsText", [eachValueInSeparateLine()])
        ]);
    }

    onEmailsTextChange(event, value) {
        this._validator.runValidation("emailsText", value);
        this.setState({
            emailsText: value
        })
    }

    onAdd() {
        let newEmails = new Set();
        let wrongEmails = new Set();

        this.state.emailsText
            .split("\n")
            .forEach(value => {
                if (validator.isEmail(value)) {
                    newEmails.add(value)
                }
                else {
                    wrongEmails.add(value)
                }
            });

        this.setState({
            emailsSet: new Set([...this.state.emailsSet, ...newEmails]),
            emailsText: "",
            wrongEmails: wrongEmails
        });
        this._validator.resetField("emailsText", "");
    }

    onSubmit() {
        sendOrganizersInvitations([...this.state.emailsSet])
            .then((result) => {
                this.setState({
                    showInvitationsSentDialog: true
                })
            })
            .catch((error) => {
                this.props.setError(error);
            })
    }

    onEmailDelete(value) {
        return () => {
            let newEmailsSet = this.state.emailsSet;
            newEmailsSet.delete(value);
            this.setState({
                emailsSet: newEmailsSet
            });
        }
    }

    closeInvitationsSentDialog() {
        this.props.history.push("/");
    }

    closeWrongEmailsDialog() {
        let newEmailsText = [...this.state.wrongEmails].join("\n");
        this._validator.runValidation("emailsText", newEmailsText);
        this.setState({
            emailsText: newEmailsText,
            wrongEmails: new Set()
        });
    }

    render() {
        return (
            <div>
                <InviteOrganizersFormView
                    disableAddButton={!this._validator.isFormValid()}
                    disableSubmitButton={this.state.emailsSet.size === 0}
                    onAdd={this.onAdd.bind(this)}
                    onSubmit={this.onSubmit.bind(this)}
                    emailsText={{
                        value: this.state.emailsText,
                        onChange: this.onEmailsTextChange.bind(this),
                        errorMessage: this._validator.getErrorMessage("emailsText")
                    }}
                    emailsList={[...this.state.emailsSet]}
                    onEmailDelete={this.onEmailDelete.bind(this)}
                />
                {this.state.showInvitationsSentDialog &&
                <SimpleDialog
                    onClose={this.closeInvitationsSentDialog.bind(this)}
                    title={"Invitations sent!"}
                    type={'info'}
                />
                }
                {this.state.wrongEmails.size !== 0 &&
                <SimpleDialog
                    onClose={this.closeWrongEmailsDialog.bind(this)}
                    title={"Wrong emails!"}
                    type={'warning'}
                >
                    {"Following values are not emails: " + [...this.state.wrongEmails].join(", ")}
                </SimpleDialog>
                }
            </div>
        );
    }
}

InviteOrganizersForm.propTypes = {};
InviteOrganizersForm.defaultProps = {};

export default secured(withErrorHandling(withRouter(InviteOrganizersForm)));
