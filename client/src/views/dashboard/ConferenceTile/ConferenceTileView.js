import React, {Component} from 'react';
import {timeUntil} from "commons/dateUtills";
import Tile from "../../../components/Tile/Tile";
import {Counter, Dates, DatesHeader, EndDate, RegistrationToggle, StartDate, Status, StatusTitle,} from "./ConferenceTile.style";
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types'
import {muiThemeable} from "material-ui/styles/index";
import {formatDate} from "../../../commons/dateUtills";

function i18n(word, number) {
    return word + (number !== 1 ? 's' : '');
}

class ConferenceTileView extends Component {

    getCounterContent() {
        let untilStart = timeUntil(this.props.conference.startDate);
        let untilEnd = timeUntil(this.props.conference.endDate);

        console.log(untilStart)
        console.log(untilEnd)

        if (untilStart === 0) return "Starts in less than 24h!";
        if (untilEnd === 0) return "Ends in less than 24h!";
        if (untilStart > 0) return `${untilStart} ${i18n('day', untilStart)} to start`;
        if (untilStart < 0 && untilEnd > 0) return `${untilEnd} ${i18n('day', untilEnd)} to end`;
        if (untilEnd < 0) return `Ended ${untilEnd} ${i18n('day', untilEnd)} ago`;
    }

    render() {
        let registrationStatusDescription = this.props.registrationToggle.status ? "open" : "closed";

        let theme = this.props.muiTheme;
        return (
            <Tile
                title={this.props.conference.name}
                actions={[
                    {
                        type: "edit",
                        onClick: this.props.editOnClick
                    },
                    {
                        type: "mail",
                        onClick: this.props.mailOnClick
                    },
                ]}>
                <Status>
                    <StatusTitle>Status:</StatusTitle>
                    <RegistrationToggle>
                        <Toggle
                            label={`Registration ${registrationStatusDescription}`}
                            toggled={this.props.registrationToggle.status}
                            defaultToggled={this.props.registrationToggle.status}
                            onToggle={this.props.registrationToggle.onToggle}
                        />
                    </RegistrationToggle>
                </Status>
                <Dates>
                    <DatesHeader>Dates:</DatesHeader>
                    <StartDate>
                        <p>Start: {formatDate(this.props.conference.startDate)}</p>
                    </StartDate>
                    <EndDate>
                        <p>End: {formatDate(this.props.conference.endDate)}</p>
                    </EndDate>
                </Dates>
                <Counter theme={theme}>{this.getCounterContent()}</Counter>
            </Tile>
        );
    }
}

ConferenceTileView.propTypes = {
    conference: PropTypes.object.isRequired,
    editOnClick: PropTypes.func.isRequired,
    mailOnClick: PropTypes.func.isRequired,
    registrationToggle: PropTypes.object.isRequired,
};
ConferenceTileView.defaultProps = {};

export default muiThemeable()(ConferenceTileView);
