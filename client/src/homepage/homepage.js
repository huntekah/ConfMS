import React, {Component} from 'react';
import {RaisedButton} from "material-ui";
import {Div, HelloText} from "./homepage.style";
import {getHelloText} from "../server/hello-api"

class Homepage extends Component {

    constructor() {
        super();
        this.state = {
            text: "",
            error: false
        };
    }

    updateHelloText() {
        getHelloText().then((response) => {
            this.setState({text: response.message});
        }).catch(() => {
            this.setState({error: true});
        });
    }

    render() {
        let helloText = this.state.error ? "Error!" : this.state.text;
        return (
            <Div>
                <h1>ConfMS</h1>
                <RaisedButton label="Press me!" primary={true} onClick={() => this.updateHelloText()}/>
                <HelloText error={this.state.error}>{helloText}</HelloText>
            </Div>
        );
    }
}

Homepage.propTypes = {};
Homepage.defaultProps = {};

export default Homepage;
