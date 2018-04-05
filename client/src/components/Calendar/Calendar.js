import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CalendarContainer, ErrorMessage, Label} from "./Calendar.style";
import MaterialCalendar from "material-ui/DatePicker/Calendar"

import muiThemeable from 'material-ui/styles/muiThemeable';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initDate: props.value
        }
    }

    shouldDisableDate(date) {
        date = this.props.utcMode ? this.toUtc(date) : date;
        if (this.state.initDate && date.getTime() === this.state.initDate.getTime()) {
            return false;
        } else if ((this.props.minDate && date < this.props.minDate)
            || (this.props.maxDate && date > this.props.minDate)) {
            return true;
        }
        return false;
    }

    onChange(event, value) {
        this.props.onChange(
            event,
            this.props.utcMode ? this.toUtc(value) : value
        )
    }

    render() {
        let error = !!this.props.errorText;
        let theme = this.props.muiTheme;
        return (
            <CalendarContainer>
                {this.props.labelText ? <Label error={error} theme={theme}>{this.props.labelText}</Label> : ""}
                <MaterialCalendar
                    initialDate={this.props.value}
                    onClickDay={this.onChange.bind(this)}
                    shouldDisableDate={this.shouldDisableDate.bind(this)}
                    firstDayOfWeek={1}

                />
                <ErrorMessage>{error ? this.props.errorText : ""}</ErrorMessage>
            </CalendarContainer>
        );
    }

    toUtc(date) {
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    }
}

Calendar.propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    labelText: PropTypes.string.isRequired,
    errorText: PropTypes.string.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    utcMode: PropTypes.bool,
};
Calendar.defaultProps = {
    mode: 'portrait',
    utcMode: true,
};

export default muiThemeable()(Calendar);
