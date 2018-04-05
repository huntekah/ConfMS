import React, {Component} from 'react';
import OrganizersTileView from "./OrganizersTileView";
import {getOrganizers} from "api/committee-api";
import Loader from "components/Loader/Loader";
import {withRouter} from "react-router";
import {withErrorHandling} from "hoc/ErrorHandling";

class OrganizersTile extends Component {


    constructor() {
        super();
        this.state = {
            organizersCount: undefined,
            loading: true,
        }
    }

    componentDidMount() {
        getOrganizers()
            .then((response) => {
                this.setState({
                    loading: false,
                    organizersCount: response.length,
                })
            })
            .catch((error) => {
                    this.props.setError(error)
                }
            )
    }

    render() {
        return (
            this.state.loading ? <Loader/> :
                <OrganizersTileView
                    membersCount={this.state.organizersCount}
                    addOnClick={() => {
                        this.props.history.push("/organizing-committee/add")
                    }}
                    moreOnClick={() => {
                        this.props.history.push("/organizing-committee")
                    }}
                />
        );
    }
}

OrganizersTile.propTypes = {};
OrganizersTile.defaultProps = {};

export default withErrorHandling(withRouter(OrganizersTile));
