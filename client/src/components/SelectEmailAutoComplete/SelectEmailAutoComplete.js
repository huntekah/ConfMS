import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import {emailAutoComplete} from "api/conference-api";
import {Redirect} from "react-router-dom";
import {withErrorHandling} from "hoc/ErrorHandling";

class SelectEmailAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            data: [],

            serverValidationErrors: null,
            error: false,
            errorCode: "",
        }
    }

    fetchData(searchText) {
        let emailList = {};
        this.props.autoComplete(searchText).then(
            (response) => {
                emailList = Array.from(response.emails, (a) => a.email);
                this.setState({
                    data: emailList,
                });
            }).catch((error) => {
            if (error.status === 400) {
                this.setState({
                    serverValidationErrors: error.data,
                    errorCode: error.status,
                })
            }
            else {
              this.props.setError(error);
            }
        });
    }

    handleUpdateInput(searchText) {
        if (searchText.length < 3) {
            this.setState({
                searchText: searchText,
                data: []
            });
        }
        else {
            this.setState({
                searchText: searchText,
            });
            this.fetchData(searchText);
        }
    };

    handleNewRequest() {
        // to send value up!
        this.props.newEmailSelected(this.state.searchText);
        this.setState({
            searchText: '',
        });
    };


    render() {
        return (
            this.state.error ? <Redirect push to={"/error/" + this.state.errorCode}/> :
                <AutoComplete
                    hintText={"example@email.com"}
                    floatingLabelText="E-mail"
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                    onNewRequest={this.handleNewRequest.bind(this)}
                    dataSource={this.state.data}
                    maxSearchResults={3}
                    fullWidth={true}
                    filter={AutoComplete.caseInsensitiveFilter}
                    errorText={this.props.errorText}
                />
        );
    }
}

SelectEmailAutoComplete.propTypes = {
    newEmailSelected: PropTypes.func.isRequired,
    autoComplete: PropTypes.func.isRequired,
};
SelectEmailAutoComplete.defaultProps = {};

export default withErrorHandling(SelectEmailAutoComplete);
