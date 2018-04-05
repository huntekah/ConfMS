import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "../Dialog/Dialog";
import {handleKey} from "../../../hoc/EventHandler";

class SimpleDialog extends Component {

    @handleKey("Enter")
    handleEnter() {
        this.props.onClose()
    };

    render() {
        let actions = [{
            label: "OK",
            primary: true,
            onClick: this.props.onClose,
        }];
        return <Dialog
            actionButtons={actions}
            type={this.props.type}
            title={this.props.title}
        >
            {this.props.children}
        </Dialog>;
    }
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['none', 'info', 'warning', 'error']),
    title: PropTypes.string,
};
SimpleDialog.defaultProps = {
    type: 'none',
    title: '',
};

export default SimpleDialog;
