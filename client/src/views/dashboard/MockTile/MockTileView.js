import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tail from '../../../components/Tile/Tile'

class MockTileView extends Component {
    render() {
        return (
            <Tail
                title={"Mock tile"}
                actions={[
                    {
                        type: "add",
                        onClick: this.props.mockOnClick
                    },
                    {
                        type: "edit",
                        onClick: this.props.mockOnClick
                    },
                    {
                        type: "more",
                        onClick: this.props.mockOnClick
                    }
                ]}>
                <h3>Mock section</h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend et est a venenatis. Duis imperdiet luctus bibendum.
            </Tail>
        );
    }
}

MockTileView.propTypes = {
    mockOnClick: PropTypes.func.isRequired
};
MockTileView.defaultProps = {};

export default MockTileView;
