import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LoadingPageBlock, RoundSquare, Rotate} from "./LoadingPage.style"
import Template from "../../components/Template/Template";

import muiThemeable from 'material-ui/styles/muiThemeable';

class LoadingPage extends Component {
    render() {
        return (
            <Template title="Loading..." withoutBackButton>
            <LoadingPageBlock id="LoadingPage">
                <Rotate
                    duration="2.5s"
                    iterationCount="infinite">
                    <RoundSquare>ConfMS</RoundSquare>
                </Rotate>
            </LoadingPageBlock>
            </Template>
        );
    }
}

LoadingPage.propTypes = {};
LoadingPage.defaultProps = {};

export default LoadingPage;