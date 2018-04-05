import React, {Component} from 'react';
import MockTileView from "./MockTileView";

class MockTile extends Component {
    mockOnClick() {

    }

    render() {
        return (
            <MockTileView
                mockOnClick={this.mockOnClick.bind(this)}
            />
        );
    }
}

MockTile.propTypes = {};
MockTile.defaultProps = {};

export default MockTile;
