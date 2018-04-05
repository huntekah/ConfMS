import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "../Dialog/Dialog";

class YesNoDialog extends Component {

    render() {
        let actions = [
            {
                label: this.props.noAction.label,
                primary: false,
                onClick: this.props.noAction.onClick,
            },
            {
                label: this.props.yesAction.label,
                primary: true,
                onClick: this.props.yesAction.onClick,
            },
        ];
        return <Dialog
            actionButtons={actions}
            type={this.props.type}
            title={this.props.title}
            onClose={this.props.onClose}
        >
            {this.props.children}
        </Dialog>;
    }
}

YesNoDialog.propTypes = {
    type: PropTypes.oneOf(['none', 'info', 'warning', 'error']),
    title: PropTypes.string,
    yesAction: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    noAction: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }),
    onClose: PropTypes.func,
};
YesNoDialog.defaultProps = {
    type: 'none',
    title: '',
};

export default YesNoDialog;
