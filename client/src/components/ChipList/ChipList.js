import React, {Component} from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {ChipsContainer, Container, EmptyListMessage, MyChip} from "./ChipList.style";

class ChipList extends Component {

    renderChips(elements) {
        return elements.map((element, id) =>
            <MyChip className="Chip"
                key={id}
                onRequestDelete={this.props.onDeleteItem ? this.props.onDeleteItem(element) : undefined}>
                {element}
            </MyChip>
        )
    }

    render() {
        let theme = this.props.muiTheme;
        return (
            <Container>
                {this.props.elements.length === 0 ?
                    <EmptyListMessage theme={theme} id="EmptyListMessage">List is empty...</EmptyListMessage> :
                    <ChipsContainer id="ChipsContainer">
                        {this.renderChips(this.props.elements)}
                    </ChipsContainer>
                }
            </Container>
        );
    }
}

ChipList.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteItem: PropTypes.func,
};
ChipList.defaultProps = {};

export default muiThemeable()(ChipList);
