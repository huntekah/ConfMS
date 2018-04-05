import React, {Component} from 'react';
import SendMailView from "./SendMailView";
import {sendEmail} from "api/conference-api";
import validator from 'validator';
import SimpleDialog from "components/dialogs/SimpleDialog/SimpleDialog";
import {withErrorHandling} from "../../../hoc/ErrorHandling";
import {withRouter} from "react-router";
import {withDialog} from "../../../hoc/Dialog";
import {FieldValidator} from "validation/field";
import {FormValidator} from "validation/form";
import {secured} from "../../../hoc/Secured";

class SendMail extends Component {
    constructor() {
        super();
        this.updateContent = this.updateContent.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.state = {
            editorContent: '',
            emailsSet: new Set(),
            newMail: false,
            titleValue: "",
            invalidMail: "",
        }
        this.baseState = Object.assign({}, this.state, {newMail: true});

        this._validator = new FormValidator([
          new FieldValidator("title"),
          new FieldValidator("emailsSet"),
        ]);
    }

    updateContent(newContent) {
        this.setState({
            editorContent: newContent.editor.getData(),
        })

    }

    onReceiverEmailDelete(value) {
        return () => {
            let newEmailsSet = this.state.emailsSet;
            newEmailsSet.delete(value);
            this._validator.runValidation("emailsSet",newEmailsSet.size == 0 ? "" : 1)
            this.setState({
                emailsSet: newEmailsSet,
            });
        }
    }

    newEmailSelected(newEmail) {
      this._validator.runValidation("emailsSet",newEmail)
        if (validator.isEmail(newEmail)) {
            this.setState({
                emailsSet: new Set([...this.state.emailsSet, newEmail]),
            });
        }
        else {
          this.props.showDialog(
            <SimpleDialog
                type={"warning"}
                title=""
            >
                {"this is an invalid mail: " + newEmail}
            </SimpleDialog>
          )
        }
    }

    sendEmail() {
        let emailsList = [...this.state.emailsSet];
        sendEmail({
            emailTitle: this.state.titleValue,
            emailMsgBody: this.state.editorContent,
            Recipients: {emails: emailsList},
        }).then(() => {
          this.props.showDialog(
              <SimpleDialog
                  onClose={() => {
                      this.props.history.push('/')
                  }}
                  title={"Mail has been sent!"}
                  type={'info'}
              />
          )
        }).catch((error) => {
            if (error.status === 400) {
              this.props.showDialog(
                  <SimpleDialog
                      title={"Error!"}
                      type={'warning'}
                  >error.data</SimpleDialog>
                );
            }
            else {
                this.props.setError(error)
            }
        });
    }


    clearText() {
        this.setState(this.baseState);
        this.props.showDialog(
            <SimpleDialog
                title={"Context cleared!"}
                type={'info'}
            />
        );
    }

    onTitleChange(event) {
      let newTitle = event.target.value
      this._validator.runValidation("title",newTitle)
        this.setState({
            titleValue: newTitle,
        });
    }

    canSubmit() {
        return this._validator.isFormValid();
    }

    render() {
        return (
            <div>
                <SendMailView
                    onTitleChange={this.onTitleChange}
                    titleValue={this.state.titleValue}
                    titleErrorMessage={this._validator.getErrorMessage("title")}

                    onReceiverEmailDelete={this.onReceiverEmailDelete.bind(this)}
                    newEmailSelected={this.newEmailSelected.bind(this)}
                    emailsList={[...this.state.emailsSet]}
                    emailErrorMessage={this._validator.getErrorMessage("emailsSet")}

                    editorContent={this.state.editorContent}
                    onEditorChange={this.updateContent}
                    disableSubmitButton={!this.canSubmit()}
                    onSubmit={this.sendEmail.bind(this)}
                    onClear={this.clearText.bind(this)}
                />
            </div>
        );
    }
}

SendMail.propTypes = {};
SendMail.defaultProps = {};

export default secured(withDialog(withErrorHandling(withRouter(SendMail))));
