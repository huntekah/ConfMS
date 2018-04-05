import React, { Component } from 'react'
import {
    Address, Affiliation, Container, Email, GlobalErrorMessage, Name, OptionalText, Password, PasswordConfirm, PhoneNumber, SubmitButton,
    Surname, Title
} from './SignUp.style'
import Template from 'components/Template/Template'
import MyTextField from 'components/MyTextField/MyTextField'
import { RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'

class SignUpView extends Component {
    render() {
        return (
            <Template title={'Sign up'} indented withoutBackButton>
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
                    <Password>
                        <MyTextField
                            floatingLabelText="Password"
                            type={'password'}
                            fullWidth={true}
                            value={this.props.password.value}
                            onChange={this.props.password.onChange}
                            errorText={this.props.password.errorMessage}
                        />
                    </Password>
                    <PasswordConfirm>
                        <MyTextField
                            floatingLabelText="Confirm password"
                            type={'password'}
                            fullWidth={true}
                            value={this.props.passwordConfirm.value}
                            onChange={this.props.passwordConfirm.onChange}
                            errorText={this.props.passwordConfirm.errorMessage}
                        />
                    </PasswordConfirm>
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
            </Template>
        )
    }
}

let inputShape = (valuePropType) => PropTypes.shape({
    value: valuePropType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
})

SignUpView.propTypes = {
    title: inputShape(PropTypes.string.isRequired),
    name: inputShape(PropTypes.string.isRequired),
    surname: inputShape(PropTypes.string.isRequired),
    affiliation: inputShape(PropTypes.string.isRequired),
    email: inputShape(PropTypes.string.isRequired),
    password: inputShape(PropTypes.string.isRequired),
    passwordConfirm: inputShape(PropTypes.string.isRequired),
    // address: inputShape(PropTypes.string.isRequired),
    // phoneNumber: inputShape(PropTypes.string.isRequired),

    globalErrorMessage: PropTypes.string.isRequired,

    disableSubmitButton: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
SignUpView.defaultProps = {}

export default SignUpView



