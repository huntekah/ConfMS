import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ContentAdd, ImageEdit, NavigationMoreHoriz, CommunicationMailOutline, SocialPerson, ActionDone, ContentClear} from 'material-ui/svg-icons'
import muiThemeable from 'material-ui/styles/muiThemeable';
import {StyledIconButton} from "./ActionButton.style";

let actionIcons = {
    'add': <ContentAdd/>,
    'edit': <ImageEdit/>,
    'more': <NavigationMoreHoriz/>,
    'mail': <CommunicationMailOutline/>,
    'person':<SocialPerson/>,
    'accept': <ActionDone />,
    'decline': <ContentClear />,
};

const styles = {
    small: {
        width: 36,
        height: 36,
        padding: 9,
    },
    medium: {
        width: 44,
        height: 44,
        padding: 11,
    },
    large: {
        width: 52,
        height: 52,
        padding: 13,
    },
};

const iconStyles = {
    small: {
        width: 18,
        height: 18,
    },
    medium: {
        width: 22,
        height: 22,
    },
    large: {
        width: 26,
        height: 26,
    },
};

class ActionButton extends Component {


    render() {
        let theme = this.props.muiTheme;
        return (
            <StyledIconButton
                theme={theme}
                iconStyle={iconStyles[this.props.size]}
                style={styles[this.props.size]}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                {actionIcons[this.props.type]}
            </StyledIconButton>
        );
    }
}

ActionButton.propTypes = {
    type: PropTypes.oneOf(Object.keys(actionIcons)).isRequired,
    size: PropTypes.oneOf(Object.keys(styles)),
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ActionButton.defaultProps = {
    size: 'medium',
    disabled: false,
};

export default muiThemeable()(ActionButton);
