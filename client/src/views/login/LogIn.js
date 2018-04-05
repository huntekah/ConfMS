import React, { Component } from 'react'
import LogInView from './LogInView'
import { FormValidator } from '../../validation/form'
import { FieldValidator } from '../../validation/field'
import { isEmail } from '../../validation/rules'
import PropTypes from 'prop-types'
import { inject } from 'mobx-react'
import ErrorsDialog from '../../components/dialogs/ErrorsDialog/ErrorsDialog'
import { withErrorHandling } from 'hoc/ErrorHandling'
import { withRouter } from 'react-router'
import { withDialog } from '../../hoc/Dialog'
import queryString from 'query-string'

import { handleKey } from '../../hoc/EventHandler'

@inject('authStore')
@withDialog
@withErrorHandling
@withRouter
export default class LogIn extends Component {

    static propTypes = {
        authStore: PropTypes.shape({
            setToken: PropTypes.func,
        }).isRequired,
    }

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

            invalidCredentials: false,
        }
        this._validator = new FormValidator([
                new FieldValidator('email', [isEmail()]),
                new FieldValidator('password')
            ]
        )

        this.query = queryString.parse(this.props.location.search)
    }

    @handleKey('Enter')
    handleEnter() {
        if (this.canSubmit()) {
            this.handleLogIn()
        }
    };

    handleLogIn() {
        this.props.authStore.authenticate(this.state.email, this.state.password)
            .then((response) => {
                this.query.back ?
                    this.props.history.goBack() :
                    this.props.history.push('/')
            }).catch((error) => {
            if (error.status === 400) {
                this.props.showDialog(
                    <ErrorsDialog
                        errors={error.data}
                    />
                )
            }
            else if (error.status === 401) {
                this.setState({
                    invalidCredentials: true
                })
            }
            else {
                this.props.setError(error)
            }
        })
    }

    changeEmail(event, value) {
        this._validator.runValidation('email', value)
        this.setState({
            email: value
        })
    }

    changePassword(event, value) {
        this._validator.runValidation('password', value)
        this.setState({
            password: value
        })
    }

    canSubmit() {
        return this._validator.isFormValid()
    }

    render() {
        return (
            <LogInView
                onSubmit={this.handleLogIn.bind(this)}
                disableSubmitButton={!this.canSubmit()}

                email={{
                    value: this.state.email,
                    onChange: this.changeEmail.bind(this),
                    errorMessage: this._validator.getErrorMessage('email')
                }}
                password={{
                    value: this.state.password,
                    onChange: this.changePassword.bind(this),
                    errorMessage: this._validator.getErrorMessage('password')
                }}

                invalidCredentials={this.state.invalidCredentials}
            />
        )
    }
}

