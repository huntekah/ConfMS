import React, {Component} from 'react';
import {
    ConferenceInfoTile,
    TileTitle,
    TileStartDate,
    TileEndDate
} from "./ConferenceInfo.style";
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable';

class ConferenceInfoView extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

    render() {
        let theme = this.props.muiTheme;
        return (
            <ConferenceInfoTile>
                <TileTitle theme={theme} className={"TileTitle"}>{this.props.conference.name}</TileTitle>
                <TileStartDate>Start date: {this.props.conference.startDate}</TileStartDate>
                <TileEndDate>End date: {this.props.conference.endDate}</TileEndDate>
            </ConferenceInfoTile>
        );
    }
}


ConferenceInfoView.propTypes = {
    conference: PropTypes.object.isRequired,
};
ConferenceInfoView.defaultProps = {};

export default muiThemeable()(ConferenceInfoView);
