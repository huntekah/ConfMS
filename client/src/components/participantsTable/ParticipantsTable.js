import React, {Component} from 'react';
import {ActionButtons, ParticipantsTableContainer, StyledTableHeaderColumn, StyledTableRowColumn} from "./ParticipantsTable.styles";
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableRow} from "material-ui";
import ActionButton from "./../ActionButton/ActionButton"


class ParticipantsTable extends Component {

    headers = [
        'Title',
        'Name',
        'Surname',
        'E-mail',
        'Affiliation',
        'Actions'
    ];

    render() {
        return (
            <ParticipantsTableContainer>
                <Table fixedFooter={false}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            {this.headers.map((header, index) =>
                                <StyledTableHeaderColumn key={index}>{header}</StyledTableHeaderColumn>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.participants.map((participant, index) =>
                            this.renderRow(index, participant)
                        )}
                    </TableBody>
                </Table>
            </ParticipantsTableContainer>
        );
    }

    renderRow(index, participant) {
        return <TableRow
            key={index}
            selectable={false}
        >
            <StyledTableRowColumn>{participant.title}</StyledTableRowColumn>
            <StyledTableRowColumn>{participant.name}</StyledTableRowColumn>
            <StyledTableRowColumn>{participant.surname}</StyledTableRowColumn>
            <StyledTableRowColumn>{participant.email}</StyledTableRowColumn>
            <StyledTableRowColumn>{participant.affiliation}</StyledTableRowColumn>
            <StyledTableRowColumn>
                <ActionButtons>
                    {(participant.state === 'declined' || participant.state === 'pending') &&
                    <ActionButton
                        type='accept'
                        onClick={this.props.onAccept.bind(null, participant)}
                        size={'small'}
                    />
                    }
                    {(participant.state === 'accepted' || participant.state === 'pending') &&
                    <ActionButton
                        type='decline'
                        onClick={this.props.onDecline.bind(null, participant)}
                        size={'small'}
                    />
                    }
                </ActionButtons>
            </StyledTableRowColumn>
        </TableRow>;
    }
}

ParticipantsTable.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
};
ParticipantsTable.defaultProps = {};

export default ParticipantsTable

