import React, {Component} from 'react';
import YesNoDialog from "components/dialogs/YesNoDialog/YesNoDialog";
import Redirect from "react-router-dom/es/Redirect";
import OrganizingCommitteeView from "./OrganizingCommitteeView";
import {getOrganizers, deleteOrganizer} from "api/committee-api";
import LoadingPage from "views/loadingPage/LoadingPage";
import {withErrorHandling} from "../../../hoc/ErrorHandling";
import {withRouter} from "react-router";
import {withDialog} from "../../../hoc/Dialog";
import {secured} from "../../../hoc/Secured";

const pagePath = "/organizing-committee";
class OrganizingCommittee extends Component {

    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            usersToDelete: new Set(),
            showDeleteDialog: false,
            tableData: {},

            deleted: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.deleted == false && this.state.deleted == true){
          this.fetchData();
          this.setState({
            deleted: false,
          });
        }
    }

    fetchData() {
        getOrganizers()
            .then((response) => {
                let tableData = (response).map((a, index) => {
                    return Object.assign({}, a, {ID: index});
                })
                this.setState({
                    loading: false,
                    tableData: tableData,
                })
            })
            .catch((error) => {
                this.props.setError(error);
            })
    }

    confirmDeleteDialog() {
        let usersToDelete = this.state.usersToDelete;
        usersToDelete.forEach((user) => {
            deleteOrganizer(user.UUID)
                .then((response) => {
                  this.setState({
                    deleted: true,
                  });
                })
                .catch((error) => {
                        this.props.setError(error)
                });
        });
        this.forceUpdate();
    }

//TODO
    onPersonButton(person) {
        console.log("HERE YOU SHOULD IMPLEMENT AND END TO /user/uuid or sth.");
        console.log(person);
    }

    onDelete(people) {
        let usersToDelete = new Set();
        let deletedUsersNames = new Set();
        people.map((a) => {
            deletedUsersNames.add(this.state.tableData[a].name + " " + this.state.tableData[a].surname);
            usersToDelete.add(this.state.tableData[a]);
        });

        this.setState({
          usersToDelete: usersToDelete,
        });

        let yesAction = {
            label: "Ok",
            onClick: this.confirmDeleteDialog.bind(this),
        };
        let noAction = {
            label: "Cancel",
            onClick: ()=>{},
        };
        this.props.showDialog(
          <YesNoDialog
              yesAction={yesAction}
              noAction={noAction}
              title={"Deleting user's!"}
              type={'warning'}>
              {"Following users will be deleted: " + [...deletedUsersNames].join(", ")}
          </YesNoDialog>
        )

    }

    render() {
        return (
            this.state.loading ? <LoadingPage/> :
                  <div>
                      <OrganizingCommitteeView
                          tableData={this.state.tableData}
                          onPersonButton={this.onPersonButton.bind(this)}
                          onDelete={this.onDelete}/>
                  </div>
        );
    }
}

OrganizingCommittee.propTypes = {};
OrganizingCommittee.defaultProps = {};

export default secured(withDialog(withErrorHandling(withRouter(OrganizingCommittee))));
