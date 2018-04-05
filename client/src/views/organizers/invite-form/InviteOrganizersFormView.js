import React, {Component} from 'react';
import {RaisedButton} from "material-ui";
import PropTypes from 'prop-types'
import Template from "../../../components/Template/Template";
import ChipList from "../../../components/ChipList/ChipList";
import MyTextField from "../../../components/MyTextField/MyTextField";
import {AddButton, Container, EmailList, EmailsInput, EmailsTextField, SubmitButton} from "./InviteOrganizersForm.style";

class InviteOrganizersFormView extends Component {
    render() {
        return (
            <Template title={"Invite to committee"} withLogout>
                <Container>
                    <EmailsInput>
                        <EmailsTextField>
                            <MyTextField
                                floatingLabelText="Input emails..."
                                fullWidth={true}
                                value={this.props.emailsText.value}
                                onChange={this.props.emailsText.onChange}
                                errorText={this.props.emailsText.errorMessage}
                                multiLine={true}
                                rows={3}
                                rowsMax={10}
                                id="EmailInput"
                            />
                        </EmailsTextField>
                        <AddButton>
                            <RaisedButton
                                type="submit"
                                label="Add"
                                primary={true}
                                disabled={this.props.disableAddButton}
                                onClick={this.props.onAdd}
                                id="AddButton"
                            />
                        </AddButton>
                    </EmailsInput>
                    <EmailList id="EmailList">
                        <ChipList elements={this.props.emailsList}
                                  onDeleteItem={this.props.onEmailDelete}
                        />
                    </EmailList>
                    <SubmitButton>
                        <RaisedButton
                            type="submit"
                            label="Send"
                            primary={true}
                            disabled={this.props.disableSubmitButton}
                            onClick={this.props.onSubmit}
                        />
                    </SubmitButton>
                </Container>
            </Template>
        );
    }
}

let inputShape = (valuePropType) => PropTypes.shape({
    value: valuePropType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
});

InviteOrganizersFormView.propTypes = {
    emailsText: inputShape(PropTypes.string.isRequired),
    emailsList: PropTypes.arrayOf(PropTypes.string),
    onEmailDelete: PropTypes.func.isRequired,

    disableSubmitButton: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,

    disableAddButton: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
};
InviteOrganizersFormView.defaultProps = {};

export default InviteOrganizersFormView;
