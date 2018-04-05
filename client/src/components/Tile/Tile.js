import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TileActions, TileContainer, TileContent, TileTitle} from "./Tile.style";
import muiThemeable from 'material-ui/styles/muiThemeable';
import ActionButtons from "../ActionButtons/ActionButtons";

class Tile extends Component {

    render() {
        let theme = this.props.muiTheme;
        let tileClassName = "TileContainer"+(this.props.title).replace(/\s/g,'');
        return (
            <TileContainer className={tileClassName}>
                <TileTitle theme={theme} className={"TileTitle"}>{this.props.title}</TileTitle>
                <TileContent className={"TileContent"}>
                    {this.props.children}
                </TileContent>
                <TileActions theme={theme}>
                  <ActionButtons actions={this.props.actions}/>
                </TileActions>
            </TileContainer>
        );
    }
}

Tile.propTypes = {
    title: PropTypes.string.isRequired,
};
Tile.defaultProps = {};

export default muiThemeable()(Tile);
