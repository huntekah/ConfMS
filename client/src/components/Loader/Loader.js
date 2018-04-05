import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LoaderBlock} from "./Loader.style"
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Loader extends Component {
    render() {
        let themeColor = this.props.muiTheme.palette.primary1Color;
        return (
            <LoaderBlock id="LoadingPage">
              <CircularProgress size={60} thickness={4} color={themeColor}/>
            </LoaderBlock>
        );
    }
}

Loader.propTypes = {};
Loader.defaultProps = {};

export default muiThemeable()(Loader);
