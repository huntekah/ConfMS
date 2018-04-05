import React, {cloneElement, Component} from 'react';
import PropTypes from 'prop-types';

export function withDialog(ChildComponent) {
    ChildComponent.propTypes = {
        showDialog: PropTypes.func.isRequired
    };
    return class Dialog extends Component {
        constructor() {
            super();
            this.state = {
                dialogComponent: undefined,
            }
        }

        addOnCloseHandling(dialog) {
            return cloneElement(dialog, {
                key: 2,
                onClose: () => {
                    if (dialog.props.onClose) dialog.props.onClose();
                    this.setState({
                        dialogComponent: undefined
                    })
                }
            })
        }

        render() {
            return (
                [
                    <ChildComponent
                        key={1}
                        showDialog={(dialog) => {
                            this.setState({
                                dialogComponent: this.addOnCloseHandling(dialog)
                            });
                        }}
                        {...this.props}
                    />,
                    this.state.dialogComponent
                ]
            );
        }
    }
}

