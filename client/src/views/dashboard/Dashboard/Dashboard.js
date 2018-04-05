import React, {Component} from 'react';
import DashboardView from "./DashboardView";
import {getConference} from "api/conference-api";
import LoadingPage from "views/loadingPage/LoadingPage";
import {withRouter} from "react-router";
import {withErrorHandling} from "hoc/ErrorHandling";
import {secured} from "../../../hoc/Secured";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conference: undefined,
            loading: true,
        }
    }

    componentDidMount() {
        try {
            getConference()
                .then((response) => {
                    this.setState({
                        loading: false,
                        conference: response
                    });
                })
                .catch((error) => {
                    if (error.status === 404) {
                        this.props.history.push("/conference/create");
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

    render() {
        return (
            this.state.loading ? <LoadingPage/> :
                <DashboardView conference={this.state.conference}/>
        );
    }
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default secured(withErrorHandling(withRouter(Dashboard)));
