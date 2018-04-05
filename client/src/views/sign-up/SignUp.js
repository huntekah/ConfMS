import React, {Component} from 'react';
import SignUpView from "./SignUpView";
import {FormValidator} from "validation/form";
import {isEmail, isPhoneNumber, maxLength, required} from "validation/rules";
import {FieldValidator} from "validation/field";
import {createUser} from "api/users-api";
import ErrorsDialog from "components/dialogs/ErrorsDialog/ErrorsDialog";
import {withErrorHandling} from "hoc/ErrorHandling";
import {withRouter} from "react-router";
import SimpleDialog from "components/dialogs/SimpleDialog/SimpleDialog";
import {handleKey} from "hoc/EventHandler";
import {withDialog} from "../../hoc/Dialog";

class SignUp extends Component {

    constructor() {
        super();

        // TODO should come from configuration file
        // this.validTitles = [
        //     "Mr", "Ms", "Mgr", "Dr", "Professor"
        // ];

        this.state = {
            title: "",
            name: "",
            surname: "",
            affiliation: "",
            email: "",
            password: "",
            passwordConfirm: "",
            // address: "",
            // phoneNumber: "",
        };

        this._validator = new FormValidator([
                new FieldValidator("title", [maxLength(50)]),
                new FieldValidator("name", [maxLength(50)]),
                new FieldValidator("surname", [maxLength(50)]),
                new FieldValidator("affiliation", [maxLength(50)]),
                new FieldValidator("email", [maxLength(50), isEmail()]),
                new FieldValidator("password"),
                new FieldValidator("passwordConfirm"),
                // new FieldValidator("address", [], false),
                // new FieldValidator("phoneNumber", [isPhoneNumber()], false)
            ],
            (password, passwordConfirm) => {
                if (password !== passwordConfirm) {
                    return "Passwords should match"
                }
                return ""
            }
        );
    }

    @handleKey("Enter")
    handleEnter() {
        if (this.canSubmit()) {
            this.signUp();
        }
    };

    signUp() {
        createUser({
            title: this.state.title,
            name: this.state.name,
            surname: this.state.surname,
            affiliation: this.state.affiliation,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            // address: this.state.address,
            // phoneNumber: this.state.phoneNumber,
        }).then(() => {
            this.props.showDialog(
                <SimpleDialog
                    onClose={() => {
                        this.props.history.push('/')
                    }}
                    title={"Account has been created! You can log in now!"}
                    type={'info'}
                />
            );
        }).catch(error => {
            if (error.status === 400) {
                this.props.showDialog(
                    <ErrorsDialog errors={error.data}/>
                );
            }
            else {
                this.props.setError(error);
            }
        })
    }

    changeTitle(event, value) {
        this._validator.runValidation("title", value);
        this.setState({
            title: value
        });
    }

    changeName(event, value) {
        this._validator.runValidation("name", value);
        this.setState({
            name: value
        });
    }

    changeSurname(event, value) {
        this._validator.runValidation("surname", value);
        this.setState({
            surname: value
        });
    }

    changeAffiliation(event, value) {
        this._validator.runValidation("affiliation", value);
        this.setState({
            affiliation: value
        });
    }

    changeEmail(event, value) {
        this._validator.runValidation("email", value);
        this.setState({
            email: value
        });
    }

    changePassword(event, value) {
        this._validator.runValidation("password", value);
        this._validator.runGlobalValidation(value, this.state.passwordConfirm);
        this.setState({
            password: value
        });
    }

    changePasswordConfirm(event, value) {
        this._validator.runValidation("passwordConfirm", value);
        this._validator.runGlobalValidation(this.state.password, value);
        this.setState({
            passwordConfirm: value
        });
    }

    // changeAddress(event, value) {
    //     this._validator.runValidation("address", value);
    //     this.setState({
    //         address: value
    //     });
    // }
    //
    // changePhoneNumber(event, value) {
    //     this._validator.runValidation("phoneNumber", value);
    //     this.setState({
    //         phoneNumber: value
    //     });
    // }

    canSubmit() {
        return this._validator.isFormValid();
    }

    render() {
        return (
            <div>
                <SignUpView
                    validTitles={this.validTitles}

                    globalErrorMessage={this._validator.getGlobalErrorMessage()}

                    disableSubmitButton={!this.canSubmit()}

                    onSubmit={this.signUp.bind(this)}

                    title={{
                        value: this.state.title,
                        onChange: this.changeTitle.bind(this),
                        errorMessage: this._validator.getErrorMessage("title")
                    }}
                    name={{
                        value: this.state.name,
                        onChange: this.changeName.bind(this),
                        errorMessage: this._validator.getErrorMessage("name")
                    }}
                    surname={{
                        value: this.state.surname,
                        onChange: this.changeSurname.bind(this),
                        errorMessage: this._validator.getErrorMessage("surname")
                    }}
                    affiliation={{
                        value: this.state.affiliation,
                        onChange: this.changeAffiliation.bind(this),
                        errorMessage: this._validator.getErrorMessage("affiliation")
                    }}
                    email={{
                        value: this.state.email,
                        onChange: this.changeEmail.bind(this),
                        errorMessage: this._validator.getErrorMessage("email")
                    }}
                    password={{
                        value: this.state.password,
                        onChange: this.changePassword.bind(this),
                        errorMessage: this._validator.getErrorMessage("password")
                    }}
                    passwordConfirm={{
                        value: this.state.passwordConfirm,
                        onChange: this.changePasswordConfirm.bind(this),
                        errorMessage: this._validator.getErrorMessage("passwordConfirm")
                    }}
                    // address={{
                    //     value: this.state.address,
                    //     onChange: this.changeAddress.bind(this),
                    //     errorMessage: this._validator.getErrorMessage("address")
                    // }}
                    // phoneNumber={{
                    //     value: this.state.phoneNumber,
                    //     onChange: this.changePhoneNumber.bind(this),
                    //     errorMessage: this._validator.getErrorMessage("phoneNumber")
                    // }}
                />
            </div>
        );
    }
}

SignUp.propTypes = {};
SignUp.defaultProps = {};

export default withDialog(withErrorHandling(withRouter(SignUp)));

