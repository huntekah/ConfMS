import React, {Component} from 'react';
import { isPrice, maxLength, required } from 'validation/rules'
import {FormValidator} from "validation/form";
import {createConference} from "api/conference-api";
import SimpleDialog from "components/dialogs/SimpleDialog/SimpleDialog";
import ConferenceForm from "./create-form/ConferenceFormView";
import ErrorsDialog from "components/dialogs/ErrorsDialog/ErrorsDialog";
import {FieldValidator} from "validation/field";
import {withErrorHandling} from "hoc/ErrorHandling";
import {withRouter} from "react-router";
import {withDialog} from "../../hoc/Dialog";
import {handleKey} from "../../hoc/EventHandler";
import {secured} from "../../hoc/Secured";

class CreateConference extends Component {

    constructor() {
        super();

        let initialDate = new Date();
        initialDate.setHours(0, 0, 0);
        initialDate = new Date(initialDate.getTime() - initialDate.getTimezoneOffset() * 60000)

        this.state = {
            conferenceName: "",
            price: "",
            startDate: initialDate,
            endDate: initialDate,
        };

        this._validator = new FormValidator([
                new FieldValidator("conferenceName", [maxLength(100)]),
                new FieldValidator("price", [isPrice()]),
                new FieldValidator("startDate"),
                new FieldValidator("endDate"),
            ],
            (startDate, endDate) => {
                if (startDate > endDate) {
                    return "Start date should be before end date"
                }
                return ""
            }
        );
        this._validator.runValidation("startDate", this.state.startDate);
        this._validator.runValidation("endDate", this.state.endDate);
    }

    @handleKey("Enter")
    handleEnter() {
        if (this.canSubmit()) {
            this.createConference();
        }
    };

    changeConferenceName(event, value) {
        this._validator.runValidation("conferenceName", value);
        this.setState({
            conferenceName: value
        });
    }

    changePrice(event, value) {
        this._validator.runValidation("price", value);
        this.setState({
            price: value
        });
    }

    changeStartDate(event, startDate) {
        this._validator.runValidation("startDate", startDate);
        this._validator.runGlobalValidation(startDate, this.state.endDate);
        this.setState({
            startDate: startDate
        });
    }

    changeEndDate(event, endDate) {
        this._validator.runValidation("endDate", endDate);
        this._validator.runGlobalValidation(this.state.startDate, endDate);
        this.setState({
            endDate: endDate
        });
    }

    createConference() {
        createConference({
            name: this.state.conferenceName,
            price: this.state.price,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }).then(() => {
            this.props.showDialog(
                <SimpleDialog
                    onClose={() => {
                        this.props.history.push('/')
                    }}
                    title={"Conference created!"}
                    type={'info'}
                />
            )
        }).catch((error) => {
            if (error.status === 400) {
                this.props.showDialog(
                    <ErrorsDialog errors={error.data}/>
                );
            }
            else {
                this.props.setError(error);
            }
        });
    }

    canSubmit() {
        return this._validator.isFormValid();
    }

    render() {
        return (
            <ConferenceForm
                type='create'
                conferenceName={{
                    value: this.state.conferenceName,
                    onChange: this.changeConferenceName.bind(this),
                    errorMessage: this._validator.getErrorMessage("conferenceName")
                }}
                price={{
                    value: this.state.price,
                    onChange: this.changePrice.bind(this),
                    errorMessage: this._validator.getErrorMessage("price")
                }}
                startDate={{
                    value: this.state.startDate,
                    onChange: this.changeStartDate.bind(this),
                    errorMessage: this._validator.getErrorMessage("startDate")
                }}
                endDate={{
                    value: this.state.endDate,
                    onChange: this.changeEndDate.bind(this),
                    errorMessage: this._validator.getErrorMessage("endDate")
                }}

                globalErrorMessage={this._validator.getGlobalErrorMessage()}

                disableSubmitButton={!this.canSubmit()}
                onSubmit={this.createConference.bind(this)}>

            </ConferenceForm>
        );
    }
}

export default secured(withDialog(withErrorHandling(withRouter(CreateConference))));
