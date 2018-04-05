import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {BrowserRouter as Router} from "react-router-dom";

import Routing from './Routing'
import {Provider} from "mobx-react";
import {authStore} from "./stores";


class App extends Component {

    render() {
        return (
            <Router>
                <Provider authStore={authStore}>
                    <MuiThemeProvider>
                        <Routing/>
                    </MuiThemeProvider>
                </Provider>
            </Router>
        );
    }
}

export default App;
