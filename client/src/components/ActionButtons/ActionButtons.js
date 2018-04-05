import React, {Component} from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionButton from "../ActionButton/ActionButton";
import {ActionButtonsContainer} from "./ActionButtons.style";


let actionIcons = ['add', 'edit', 'more', 'mail', 'person', 'accept', 'decline'];

class ActionButtons extends Component {


    render() {
        let theme = this.props.muiTheme;
        return (
            <ActionButtonsContainer>
                {this.getActions(theme)}
            </ActionButtonsContainer>
        );
    }

    getActions() {
        return this.props.actions
            .map((action, id) =>
                <ActionButton
                    key={id}
                    type={action.type}
                    onClick={action.onClick}
                />
            );
    }
}

ActionButtons.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(actionIcons),
            onClick: PropTypes.func.isRequired
        })
    ).isRequired
};
ActionButtons.defaultProps = {};

export default muiThemeable()(ActionButtons);
