import React, { Component } from 'react'
import { Affiliation, Container, Email, GlobalErrorMessage, Name, OptionalText, SubmitButton, Surname, Title, } from './SignToConference.style'
import MyTextField from 'components/MyTextField/MyTextField'
import { RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'

class SignToConferenceView extends Component {
    render() {
        return (
            <Container>
                <Title>
                    <MyTextField
                        floatingLabelText="Title"
                        fullWidth={true}
                        value={this.props.title.value}
                        onChange={this.props.title.onChange}
                        errorText={this.props.title.errorMessage}
                    />
                </Title>
                <Name>
                    <MyTextField
                        floatingLabelText="Name"
                        fullWidth={true}
                        value={this.props.name.value}
                        onChange={this.props.name.onChange}
                        errorText={this.props.name.errorMessage}
                    />
                </Name>
                <Surname>
                    <MyTextField
                        floatingLabelText="Surname"
                        fullWidth={true}
                        value={this.props.surname.value}
                        onChange={this.props.surname.onChange}
                        errorText={this.props.surname.errorMessage}
                    />
                </Surname>
                <Affiliation>
                    <MyTextField
                        floatingLabelText="Affiliation"
                        fullWidth={true}
                        value={this.props.affiliation.value}
                        onChange={this.props.affiliation.onChange}
                        errorText={this.props.affiliation.errorMessage}
                    />
                </Affiliation>
                <Email>
                    <MyTextField
                        floatingLabelText="Email address"
                        fullWidth={true}
                        value={this.props.email.value}
                        onChange={this.props.email.onChange}
                        errorText={this.props.email.errorMessage}
                    />
                </Email>
                {/*<OptionalText>*/}
                    {/*Optional information which might be helpful for organizers:*/}
                {/*</OptionalText>*/}
                {/*<Address>*/}
                {/*<MyTextField*/}
                {/*floatingLabelText="Address"*/}
                {/*fullWidth={true}*/}
                {/*value={this.props.address.value}*/}
                {/*onChange={this.props.address.onChange}*/}
                {/*errorText={this.props.address.errorMessage}*/}
                {/*/>*/}
                {/*</Address>*/}
                {/*<PhoneNumber>*/}
                {/*<MyTextField*/}
                {/*floatingLabelText="Phone number"*/}
                {/*fullWidth={true}*/}
                {/*value={this.props.phoneNumber.value}*/}
                {/*onChange={this.props.phoneNumber.onChange}*/}
                {/*errorText={this.props.phoneNumber.errorMessage}*/}
                {/*/>*/}
                {/*</PhoneNumber>*/}
                {/*<WhoAreYou>*/}
                {/*<MyTextField*/}
                {/*floatingLabelText="Write few words about yourself"*/}
                {/*fullWidth={true}*/}
                {/*value={this.props.whoAreYou.value}*/}
                {/*onChange={this.props.whoAreYou.onChange}*/}
                {/*errorText={this.props.whoAreYou.errorMessage}*/}
                {/*multiLine={true}*/}
                {/*rows={2}*/}
                {/*rowsMax={6}*/}
                {/*/>*/}
                {/*</WhoAreYou>*/}
                {/*<Lbo1>*/}
                {/*<MyTextField*/}
                {/*floatingLabelText="How did you find us?"*/}
                {/*fullWidth={true}*/}
                {/*value={this.props.lbo1.value}*/}
                {/*onChange={this.props.lbo1.onChange}*/}
                {/*errorText={this.props.lbo1.errorMessage}*/}
                {/*multiLine={true}*/}
                {/*rows={2}*/}
                {/*rowsMax={6}*/}
                {/*/>*/}
                {/*</Lbo1>*/}
                {/*<Lbo2>*/}
                {/*<MyTextField*/}
                {/*floatingLabelText="How did you get to know about conference?"*/}
                {/*fullWidth={true}*/}
                {/*value={this.props.lbo2.value}*/}
                {/*onChange={this.props.lbo2.onChange}*/}
                {/*errorText={this.props.lbo2.errorMessage}*/}
                {/*multiLine={true}*/}
                {/*rows={2}*/}
                {/*rowsMax={6}*/}
                {/*/>*/}
                {/*</Lbo2>*/}
                <SubmitButton>
                    <RaisedButton
                        type="submit"
                        label={'Sign up'}
                        primary={true}
                        disabled={this.props.disableSubmitButton}
                        onClick={this.props.onSubmit}
                    />
                </SubmitButton>

                <GlobalErrorMessage>{this.props.globalErrorMessage}</GlobalErrorMessage>
            </Container>
        )
    }
}

let inputShape = (valuePropType) => PropTypes.shape({
    value: valuePropType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
})

SignToConferenceView.propTypes = {
    validTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: inputShape(PropTypes.number),
    name: inputShape(PropTypes.string.isRequired),
    surname: inputShape(PropTypes.string.isRequired),
    affiliation: inputShape(PropTypes.string.isRequired),
    email: inputShape(PropTypes.string.isRequired),
    // address: inputShape(PropTypes.string.isRequired),
    // phoneNumber: inputShape(PropTypes.string.isRequired),
    // whoAreYou: inputShape(PropTypes.string.isRequired),
    // lbo1: inputShape(PropTypes.string.isRequired),
    // lbo2: inputShape(PropTypes.string.isRequired),
    globalErrorMessage: PropTypes.string.isRequired,

    disableSubmitButton: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
SignToConferenceView.defaultProps = {}

export default SignToConferenceView
