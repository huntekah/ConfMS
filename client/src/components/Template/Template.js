import React, {Component} from 'react';
import {BackButton, Header, Logo, LogoutButton, TemplateContainer, Title} from "./Template.style";
import {RaisedButton} from "material-ui";
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import {muiThemeable} from "material-ui/styles/index";
import {inject} from "mobx-react";

@inject('authStore')
@withRouter
class Template extends Component {
    render() {
        let theme = this.props.muiTheme;
        let templateID = (this.props.title).replace(/\s/g, '').toLowerCase();
        return (
            <TemplateContainer id={templateID}>
                <Header indented={this.props.indented}>
                    <Logo/>
                    <Title theme={theme} id={templateID + "_title"}>{this.props.title}</Title>

                    {!this.props.withoutBackButton &&
                    <BackButton>
                        <RaisedButton
                            primary={true}
                            onClick={() => {
                                this.props.history.push("/");
                            }}
                        >Back</RaisedButton>
                    </BackButton>}

                    {this.props.withLogout &&
                    <LogoutButton>
                        <RaisedButton
                            onClick={() => {
                                this.props.authStore.invalidate();
                                this.props.history.push("/log-in");
                            }}
                        >Logout</RaisedButton>
                    </LogoutButton>}
                </Header>
                {this.props.children}
            </TemplateContainer>
        );
    }
}

Template.propTypes = {
    title: PropTypes.string,
    indented: PropTypes.bool,
    withLogout: PropTypes.bool,
    withoutBackButton: PropTypes.bool,
};
Template.defaultProps = {
    title: '',
    indented: false,
    withLogout: false,
    withoutBackButton: false,
};

export default muiThemeable()(Template)
