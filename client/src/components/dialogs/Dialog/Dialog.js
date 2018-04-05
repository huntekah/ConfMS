import React, {Component} from 'react';
import {Dialog as MaterialDialog, FlatButton} from "material-ui";
import PropTypes from 'prop-types';
import {DialogContent, DialogTitle, ErrorIcon, InfoIcon, TitleIcon, TitleText, WarningIcon} from "./Dialog.style";
import muiThemeable from 'material-ui/styles/muiThemeable';

class Dialog extends Component {

    constructor() {
        super();
        this.icons = {
            'none': "",
            'info': <InfoIcon/>,
            'warning': <WarningIcon/>,
            'error': <ErrorIcon/>,
        };
    }


    render() {
        let theme = this.props.muiTheme;
        let actions = this.props.actionButtons.map((actionButton, key) =>
            <FlatButton key={key}
                        label={actionButton.label}
                        primary={actionButton.primary}
                        onClick={() => {
                            actionButton.onClick();
                            if (this.props.onClose) this.props.onClose();
                        }}
            />
        );
        return <MaterialDialog
            open={true}
            actions={actions}
            title={
                <DialogTitle>
                    <TitleIcon>
                        {this.icons[this.props.type]}
                    </TitleIcon>
                    <TitleText theme={theme}>
                        {this.props.title}
                    </TitleText>
                </DialogTitle>}
        >
            <DialogContent>
                {this.props.children}
            </DialogContent>
        </MaterialDialog>;
    }
}

Dialog.propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['none', 'info', 'warning', 'error']),
    title: PropTypes.string,
    actionButtons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        primary: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    }))
};
Dialog.defaultProps = {
    type: 'none',
    title: '',
    actionButtons: [],
};

export default muiThemeable()(Dialog);
