import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SimpleDialog from "../SimpleDialog/SimpleDialog";
import {ErrorsContainer, FieldError, FieldErrors, FieldHeader, GlobalError, GlobalErrors} from "./ErrorsDialog.style";

class ErrorsDialog extends Component {

    renderGlobalErrors(list) {
        return list.map((error, id) =>
            <GlobalError key={id}>{error}</GlobalError>
        )
    }

    renderFieldErrors(list) {
        return list.map((error, id) =>
            <FieldError key={id}>{error}</FieldError>
        )
    }

    render() {
        return (
            <SimpleDialog
                onClose={this.props.onClose}
                type={'error'}
                title={"Errors"}
            >
                <ErrorsContainer>
                    {this.props.errors.globalErrors.length === 0 ? "" :
                        <GlobalErrors>
                            {this.renderGlobalErrors(this.props.errors.globalErrors)}
                        </GlobalErrors>
                    }
                    {Object.entries(this.props.errors.fieldErrors).length === 0 ? "" :
                        <FieldErrors>
                            {Object.entries(this.props.errors.fieldErrors).map(([fieldName, errors], id) => {
                                return [
                                    <FieldHeader key={id}>{fieldName}</FieldHeader>,
                                    this.renderFieldErrors(errors)
                                ]
                            })
                            }
                        </FieldErrors>
                    }
                </ErrorsContainer>
            </SimpleDialog>
        );
    }
}

ErrorsDialog.propTypes = {
    onClose: PropTypes.func,
    errors: PropTypes.shape({
        globalErrors: PropTypes.array,
        fieldErrors: PropTypes.object
    }),
};
ErrorsDialog.defaultProps = {};

export default ErrorsDialog;
