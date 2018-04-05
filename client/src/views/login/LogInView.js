import React, {Component} from 'react';
import {Email, InvalidCredentialsMessage, LoginButton, LogInContainer, Password, SignUpMessage} from "./LogIn.style";
import MyTextField from "../../components/MyTextField/MyTextField";
import PropTypes from 'prop-types'
import {RaisedButton} from "material-ui";
import Template from "../../components/Template/Template";
import {Link} from "../../components/commons.style"

class LogInView extends Component {
    render() {
        return (
            <Template title="Log in" withoutBackButton>
                <LogInContainer>
                    <Email>
                        <MyTextField
                            floatingLabelText="Email"
                            fullWidth={true}
                            value={this.props.email.value}
                            onChange={this.props.email.onChange}
                            errorText={this.props.email.errorMessage}
                        />
                    </Email>
                    <Password>
                        <MyTextField
                            floatingLabelText="Password"
                            type={"password"}
                            fullWidth={true}
                            value={this.props.password.value}
                            onChange={this.props.password.onChange}
                            errorText={this.props.password.errorMessage}
                        />
                    </Password>
                    <LoginButton>
                        <RaisedButton
                            type="submit"
                            label="Log in"
                            primary={true}
                            disabled={this.props.disableSubmitButton}
                            onClick={this.props.onSubmit}
                        />
                    </LoginButton>
                    {/*TODO*/}
                    <InvalidCredentialsMessage>
                        {this.props.invalidCredentials ? "Invalid email or password" : ""}
                    </InvalidCredentialsMessage>
                    <SignUpMessage>
                        Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </SignUpMessage>
                </LogInContainer>
            </Template>
        );
    }
}

let inputShape = (valuePropType) => PropTypes.shape({
    value: valuePropType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
});

LogInView.propTypes = {
    email: inputShape(PropTypes.string),
    password: inputShape(PropTypes.string),

    disableSubmitButton: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,

    invalidCredentials: PropTypes.bool.isRequired,
};
LogInView.defaultProps = {};

export default LogInView

