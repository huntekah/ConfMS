import React, {Component} from 'react';
import SignToConferenceView from "./SignToConferenceView";
import ConferenceInfoView from "./ConferenceInfoView";
import FinishView from "./FinishView";
import {FormValidator} from "validation/form";
import {isEmail, isPhoneNumber, maxLength, required} from "validation/rules";
import {FieldValidator} from "validation/field";
import {createParticipant} from "api/users-api";
import {getConference} from "api/conference-api";
import Template from "components/Template/Template";
import ErrorsDialog from "components/dialogs/ErrorsDialog/ErrorsDialog";
import {withErrorHandling} from "hoc/ErrorHandling";
import {withRouter} from "react-router";
import SimpleDialog from "components/dialogs/SimpleDialog/SimpleDialog";
import {handleKey} from "hoc/EventHandler";
import {withDialog} from "../../hoc/Dialog";
import {formatDate} from "commons/dateUtills";
import LoadingPage from "../loadingPage/LoadingPage";

class SignToConference extends Component {

    constructor() {
        super();

        //TODO should come from config
        // this.validTitles = [
        //     "Mr", "Ms", "Mgr", "Dr", "Professor", "Student"
        // ];

        this.state = {
            title: "",
            name: "",
            surname: "",
            affiliation: "",
            email: "",
            address: "",
            phoneNumber: "",
            whoAreYou: "",
            lbo1: "",
            lbo2: "",

            conference: undefined,
            loading: true,
            finished: false,
        };

        this._validator = new FormValidator([
            new FieldValidator("title", [maxLength(50)]),
            new FieldValidator("name", [maxLength(50)]),
            new FieldValidator("surname", [maxLength(50)]),
            new FieldValidator("affiliation", [maxLength(50)]),
            new FieldValidator("email", [maxLength(50), isEmail()]),
            // new FieldValidator("address", [], false),
            // new FieldValidator("phoneNumber", [isPhoneNumber()], false),
            // new FieldValidator("whoAreYou", [], false),
            // new FieldValidator("lbo1", [], false),
            // new FieldValidator("lbo2", [], false),
        ],);
    }

    @handleKey("Enter")
    handleEnter() {
        if (this.canSubmit()) {
            this.signToConference();
        }
    };

    componentDidMount() {
        try {
            getConference()
                .then((response) => {
                    let conference = {
                        name: response.name,
                        price: response.price,
                        startDate: formatDate(response.startDate),
                        endDate: formatDate(response.endDate),
                    };
                    this.setState({
                        loading: false,
                        conference: conference,
                    });
                })
                .catch((error) => {
                    if (error.status === 404) {
                        this.props.history.push("/");
                    }
                    else {
                        this.props.setError(error)
                    }
                })
        }
        catch (error) {
            throw error
        }
    }

    signToConference() {
        createParticipant({
            title: this.state.title,
            name: this.state.name,
            surname: this.state.surname,
            affiliation: this.state.affiliation,
            email: this.state.email,
            // address: this.state.address,
            // phoneNumber: this.state.phoneNumber,
            // whoAreYou: this.state.whoAreYou,
            // lbo1: this.state.lbo1,
            // lbo2: this.state.lbo2,
        }).then(() => {
            this.props.showDialog(
                <SimpleDialog
                    onClose={() => {
                    }}
                    title={"You have been signed into the conference!"}
                    type={'info'}
                />
            );
            this.setState({
                finished: true,
            });
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

    // changeWhoAreYou(event, value) {
    //     this._validator.runValidation("whoAreYou", value);
    //     this.setState({
    //         whoAreYou: value
    //     });
    // }
    //
    // changeLbo1(event, value) {
    //     this._validator.runValidation("lbo1", value);
    //     this.setState({
    //         lbo1: value
    //     });
    // }
    //
    // changeLbo2(event, value) {
    //     this._validator.runValidation("lbo2", value);
    //     this.setState({
    //         lbo2: value
    //     });
    // }

    canSubmit() {
        return this._validator.isFormValid();
    }

    render() {
        return (
            this.state.loading ? <LoadingPage/> :
                this.state.finished ? <FinishView content={"Congratulations, you have signed to Conference!"}/> :
                    <Template title={"Sign to conference"} indented withoutBackButton>
                        <ConferenceInfoView conference={this.state.conference}/>
                        <SignToConferenceView
                            validTitles={this.validTitles}

                            globalErrorMessage={this._validator.getGlobalErrorMessage()}

                            disableSubmitButton={!this.canSubmit()}

                            onSubmit={this.signToConference.bind(this)}

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
                            // whoAreYou={{
                            //     value: this.state.whoAreYou,
                            //     onChange: this.changeWhoAreYou.bind(this),
                            //     errorMessage: this._validator.getErrorMessage("whoAreYou")
                            // }}
                            // lbo1={{
                            //     value: this.state.lbo1,
                            //     onChange: this.changeLbo1.bind(this),
                            //     errorMessage: this._validator.getErrorMessage("lbo1")
                            // }}
                            // lbo2={{
                            //     value: this.state.lbo2,
                            //     onChange: this.changeLbo2.bind(this),
                            //     errorMessage: this._validator.getErrorMessage("lbo2")
                            // }}
                        />
                    </Template>
        );
    }
}

SignToConference.propTypes = {};
SignToConference.defaultProps = {};

export default withDialog(withErrorHandling(withRouter(SignToConference)));
