import React, { Component } from 'react'
import Loader from 'components/Loader/Loader'
import { withRouter } from 'react-router'
import { withErrorHandling } from 'hoc/ErrorHandling'
import { getParticipants } from '../../../api/participants-api'
import ParticipantsTileView from './ParticipantsTileView'

class OrganizersTile extends Component {

    constructor() {
        super()
        this.state = {
            participants: undefined,
            loading: true,
        }
    }

    componentDidMount() {
        getParticipants()
            .then((response) => {
                this.setState({
                    participants: response,
                    loading: false,
                })
            })
            .catch((error) => {
                this.props.setError(error)
            })
    }

    render() {
        return (
            this.state.loading ? <Loader/> :
                <ParticipantsTileView
                    participants={this.state.participants}
                    moreOnClick={() => {
                        this.props.history.push('/participants')
                    }}
                />
        )
    }
}

OrganizersTile.propTypes = {}
OrganizersTile.defaultProps = {}

export default withErrorHandling(withRouter(OrganizersTile))
