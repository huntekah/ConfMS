import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tile from "../../../components/Tile/Tile";
import muiThemeable from 'material-ui/styles/muiThemeable';

function i18n(word, number) {
    return word + (number !== 1 ? 's' : '');
}

class OrganizersTileView extends Component {
    render() {
        let theme = this.props.muiTheme;
        return (
            <Tile
                title={"Organizing committee"}
                actions={[
                    {
                        type: "add",
                        onClick: this.props.addOnClick
                    },
                    {
                        type: "more",
                        onClick: this.props.moreOnClick
                    },
                ]}>
                <Container theme={theme}>
                    {this.props.membersCount} {i18n("member", this.props.membersCount)}
                </Container>
            </Tile>
        );
    }
}

OrganizersTileView.propTypes = {
    membersCount: PropTypes.number.isRequired,
    addOnClick: PropTypes.func.isRequired,
    moreOnClick: PropTypes.func.isRequired,
};
OrganizersTileView.defaultProps = {};

export default muiThemeable()(OrganizersTileView);

import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    color: ${props => props.theme.palette.primary1Color}
`;

