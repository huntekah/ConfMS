import React, {Component} from 'react';
import {
    Content,
    Outer, Middle, Inner,
} from "./FinishView.style";
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable';

class FinishView extends Component {
    render() {
      let theme = this.props.muiTheme;
        return (
          <Outer><Middle><Inner>
          <Content theme={theme}>{this.props.content}</Content>
          </Inner></Middle></Outer>

        );
    }
}


FinishView.propTypes = {
  content: PropTypes.string.isRequired,
};
FinishView.defaultProps = {};

export default muiThemeable()(FinishView);
