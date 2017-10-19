import React, {Component} from 'react';
import {RaisedButton} from "material-ui";
import {Div} from "./homepage.style";

class Homepage extends Component {

    constructor() {
        super();
        this.state = {
            text: ""
        };
    }

    updateText() {
        return this.setState({text: "Hello world!"});
    }

    render() {
        return (
            <Div>
                <h1>ConfMS</h1>
                <RaisedButton label="Press me!" primary={true} onClick={() => this.updateText()}/>
                <h2>{this.state.text}</h2>
            </Div>
        );
    }
}

Homepage.propTypes = {};
Homepage.defaultProps = {};

export default Homepage;
