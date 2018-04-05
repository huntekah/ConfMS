import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ErrorPage from "./views/errorPage/ErrorPage";
import SendMail from "./views/organizers/send-mail/SendMail";
import ShowOrganizingCommittee from "./views/organizers/show-committee/OrganizingCommittee";
import SignUp from "./views/sign-up/SignUp";
import SignToConference from "./views/sign-to-conference/SignToConference"
import CreateConference from "./views/conference/CreateConference";
import EditConference from "./views/conference/EditConference";
import InviteOrganizersForm from "./views/organizers/invite-form/InviteOrganizersForm";
import DecideOnInvitation from "./views/organizers/decide-on-invitation/DecideOnInvitation";
import Dashboard from "./views/dashboard/Dashboard/Dashboard";
import LogIn from "./views/login/LogIn";
import ShowParticipants from "./views/participants/show-participants/ShowParticipants";

export default class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route path="/conference/create" component={CreateConference}/>
                <Route path="/conference/edit" component={EditConference}/>

                <Route path="/organizing-committee/add" component={InviteOrganizersForm}/>
                <Route path="/organizing-committee/invitation/:token" component={DecideOnInvitation}/>
                <Route path="/organizing-committee" component={ShowOrganizingCommittee}/>

                <Route path="/participants" component={ShowParticipants}/>

                <Route path="/sign-up" component={SignUp}/>
                <Route path="/log-in" component={LogIn}/>
                <Route path="/sign-to-conference" component={SignToConference}/>

                <Route path="/send-mail" component={SendMail}/>

                <Route exact path="/error" component={ErrorPage}/>
                <Route path="/error/:errorCode" component={ErrorPage}/>


                <Route exact path="/" component={Dashboard}/>
                <Route render={() => (<Redirect to="/error/404"/>)}/> //Catches everything else

            </Switch>
        );
    }
}
