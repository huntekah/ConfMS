import React, {Component} from 'react';
import Template from "../../components/Template/Template";
import {Error, ErrorCode, ErrorDescription} from "./ErrorPage.style";

class ErrorPage extends Component {

    messages = {
        "401": "Access Restricted",
        "404": "We can't seem to find the page\n you're looking for :("
    };

    defaultMessage = "Ooops, an error occured! \nWe are very sorry :|";

    render() {
        let errorCode = this.props.match.params.errorCode ? this.props.match.params.errorCode : '';
        let errorMessage = this.messages[errorCode];
        if (!errorMessage) errorMessage = this.defaultMessage;

        return (
            <Template withoutBackButton>
                <Error id="ErrorPage">
                    <ErrorCode id="ErrorCode">ERROR {errorCode}</ErrorCode>
                    <ErrorDescription id="ErrorDescription">{errorMessage}</ErrorDescription>
                </Error>
            </Template>
        );
    }
}

ErrorPage.propTypes = {};
ErrorPage.defaultProps = {};

export default ErrorPage;
