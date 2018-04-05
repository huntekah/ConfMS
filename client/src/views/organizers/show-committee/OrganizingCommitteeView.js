import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Template from "components/Template/Template";
import {Container, DeleteButton, OrganizerList} from "./OrganizingCommittee.style";
import UserTable from "components/UserTable/UserTable";

class OrganizingCommitteeView extends Component {
    constructor() {
        super();
    }

    render() {
        let rowButtons = [{type: "person", onClick: this.props.onPersonButton},];
        return (
            <Template title={"Organizing Committee"} withLogout>
                <Container>
                    <OrganizerList>
                        <UserTable
                            height={"inherit"}
                            title={"Organizing committee overview"}
                            tableData={this.props.tableData}
                            rowButtons={rowButtons}
                            onDelete={this.props.onDelete}
                        />
                    </OrganizerList>
                    <DeleteButton/>
                </Container>
            </Template>
        );
    }
}


OrganizingCommitteeView.propTypes = {
  tableData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onPersonButton: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
OrganizingCommitteeView.defaultProps = {};

export default OrganizingCommitteeView;
