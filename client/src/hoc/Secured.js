import React, {Component} from 'react';
import withRouter from "react-router-dom/es/withRouter";
import {inject} from "mobx-react";

export function secured(ChildComponent) {
    @inject('authStore')
    @withRouter
    class SecuredHoc extends Component {
        constructor() {
            super();
            this.state = {
                authenticated: false
            }
        }

        componentWillMount() {
            if (!this.props.authStore.isAuthenticated()) {
                this.props.authStore.invalidate();
                this.props.history.push("/log-in?back=true");
            }
            else {
                this.setState({authenticated: true})
            }
        }

        render() {
            return (
                this.state.authenticated ?
                    <ChildComponent
                        {...this.props}
                    />
                    : ''
            );
        }
    }

    return SecuredHoc
}
