import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Template from "components/Template/Template";
import {Divider, RaisedButton, TextField} from "material-ui";
import CKEditor from "react-ckeditor-component";
import SelectEmailAutoComplete from "components/SelectEmailAutoComplete/SelectEmailAutoComplete";
import ChipList from "components/ChipList/ChipList";
import {ButtonClear, ButtonsContainer, ButtonSubmit, EmailBody, EmailHeaders, OuterCard} from "./SendMailView.style";
import {emailAutoComplete} from "api/conference-api";

class SendMailView extends Component {
    constructor(props) {
        super(props);
    }

    onClear(){
      this.ckeditor.editorInstance.setData('');
      this.props.onClear();
    }

    render() {
        return (
            <Template title={"Send mails"} withLogout>
                <OuterCard>
                    <EmailHeaders>
                        <TextField
                            hintText="Conference"
                            floatingLabelText="Title"
                            fullWidth={false}
                            multiLine={true}
                            value={this.props.titleValue}
                            onChange={this.props.onTitleChange}
                            errorText={this.props.titleErrorMessage}
                        />
                        <SelectEmailAutoComplete
                            newEmailSelected={this.props.newEmailSelected}
                            autoComplete={emailAutoComplete}
                            errorText={this.props.emailErrorMessage}
                        />
                        <ChipList elements={this.props.emailsList}
                                  onDeleteItem={this.props.onReceiverEmailDelete}
                        />
                        <Divider/>
                    </EmailHeaders>
                    <EmailBody>
                        <CKEditor
                            activeClass="p10"
                            content={this.props.editorContent}
                            events={{
                                "change": this.props.onEditorChange
                            }}
                            ref={(instance) => {
                              this.ckeditor = instance
                            }}
                        />
                    </EmailBody>
                    <ButtonsContainer>
                        <ButtonSubmit>
                            <RaisedButton
                                type="submit"
                                label="Send e-mail"
                                primary={true}
                                disabled={this.props.disableSubmitButton}
                                onClick={this.props.onSubmit}
                            />
                        </ButtonSubmit>
                        <ButtonClear>
                            <RaisedButton
                                type="submit"
                                label="clear"
                                secondary={true}
                                onClick={this.onClear.bind(this)}
                            />
                        </ButtonClear>
                    </ButtonsContainer>

                </OuterCard>
            </Template>
        );
    }
}

SendMailView.propTypes = {
  onTitleChange: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  titleErrorMessage: PropTypes.string.isRequired,

  onReceiverEmailDelete: PropTypes.func.isRequired,
  newEmailSelected: PropTypes.func.isRequired,
  emailsList: PropTypes.array.isRequired,
  editorContent: PropTypes.string.isRequired,
  onEditorChange: PropTypes.func.isRequired,
  disableSubmitButton: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,

};
SendMailView.defaultProps = {};

export default SendMailView;
