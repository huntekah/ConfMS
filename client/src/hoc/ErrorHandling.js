import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withRouter from "react-router-dom/es/withRouter";
import {inject} from "mobx-react";

export function withErrorHandling(ChildComponent) {
    ChildComponent.propTypes = {
        setError: PropTypes.func.isRequired
    };

    @inject('authStore')
    @withRouter
    class ErrorHandlingHoc extends Component {

        handleError(error) {
            if (error.status === 403) {
                this.props.authStore.invalidate();
                debugger

                this.props.history.push("/log-in?back=true");
            }
            else {
                this.props.history.push(`/error/${error.status}`);
            }
        }

        render() {
            return (
                <ChildComponent
                    setError={(error) => {
                        console.log(error);
                        this.handleError(error);
                    }}
                    {...this.props}
                />
            );
        }
    }

    return ErrorHandlingHoc
}
