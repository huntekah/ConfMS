import React, { Component } from 'react'
import DecideOnInvitationView from './DecideOnInvitationView'
import { acceptInvitation } from 'api/committee-api'
import Redirect from 'react-router-dom/es/Redirect'
import ErrorsDialog from 'components/dialogs/ErrorsDialog/ErrorsDialog'
import { withErrorHandling } from '../../../hoc/ErrorHandling'
import { withDialog } from '../../../hoc/Dialog'
import PropTypes from 'prop-types'
import { secured } from '../../../hoc/Secured'
import { inject } from 'mobx-react'

// TODO refactor to use withRouter
@inject('authStore')
class DecideOnInvitation extends Component {

    constructor() {
        super()
        this.state = {
            decision: undefined,
            serverErrors: null,
        }
    }

    accept() {
// TODO taken from logged user profile in future
        let email = this.props.authStore.user.email
        acceptInvitation(email, this.props.match.params.token)
            .then(() => {
                this.setState({
                    decision: true
                })
            })
            .catch(error => {
                if (error.status === 400) {
                    this.props.showDialog(
                        <ErrorsDialog
                            errors={error.data}
                        />
                    )
                }
                else {
                    this.state.setError(error)
                }
            })
    }

    decline() {
        this.setState({
            decision: false
        })
    }

    render() {
        return (
            this.state.decision === true ? <Redirect to={'/'}/> :
                this.state.decision === false ? <Redirect to={'/'}/> :
                    <DecideOnInvitationView
                        onAccept={this.accept.bind(this)}
                        onDecline={this.decline.bind(this)}
                    />
        )
    }
}

DecideOnInvitation.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    })
}
DecideOnInvitation.defaultProps = {}

export default secured(withDialog(withErrorHandling(DecideOnInvitation)))
