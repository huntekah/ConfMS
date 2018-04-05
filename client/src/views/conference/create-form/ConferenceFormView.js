import React, { Component } from 'react'
import Template from '../../../components/Template/Template'
import { RaisedButton } from 'material-ui'
import { ConferenceName, EndDate, FormContainer, GlobalErrorMessage, StartDate, SubmitButton } from './ConferenceForm.style'
import Calendar from '../../../components/Calendar/Calendar'
import PropTypes from 'prop-types'
import MyTextField from '../../../components/MyTextField/MyTextField'
import { Price } from 'views/conference/create-form/ConferenceForm.style'

class ConferenceForm extends Component {

    render() {
        let actionText = this.props.type === 'create' ? 'Create' :
            this.props.type === 'edit' ? 'Edit' : ''

        let conferenceNameClassName = (actionText + 'conferenceName').toLowerCase()
        let SubmitButtonClassName = ('SubmitButton' + actionText).toLowerCase()

        return (
            <Template title={actionText + ' conference'} indented withLogout>
                <FormContainer>
                    <ConferenceName className={conferenceNameClassName}>
                        <MyTextField
                            floatingLabelText="Conference name"
                            fullWidth={true}
                            value={this.props.conferenceName.value}
                            onChange={this.props.conferenceName.onChange}
                            errorText={this.props.conferenceName.errorMessage}
                        />
                    </ConferenceName>

                    {/*//TODO configure currency*/}
                    <Price>
                        <MyTextField
                            floatingLabelText="Price (zł)"
                            fullWidth={true}
                            value={this.props.price.value}
                            onChange={this.props.price.onChange}
                            errorText={this.props.price.errorMessage}
                        />
                    </Price>

                    <StartDate>
                        <Calendar
                            labelText="Start date:"
                            value={this.props.startDate.value}
                            minDate={new Date()}
                            onChange={this.props.startDate.onChange}
                            errorText={this.props.startDate.errorMessage}
                        />
                    </StartDate>

                    <EndDate>
                        <Calendar
                            labelText="End date:"
                            value={this.props.endDate.value}
                            minDate={new Date()}
                            onChange={this.props.endDate.onChange}
                            errorText={this.props.endDate.errorMessage}
                        />
                    </EndDate>

                    <SubmitButton>
                        <RaisedButton
                            type="submit"
                            label={actionText}
                            primary={true}
                            disabled={this.props.disableSubmitButton}
                            onClick={this.props.onSubmit}
                            className={SubmitButtonClassName}
                        />
                    </SubmitButton>

                    <GlobalErrorMessage>{this.props.globalErrorMessage}</GlobalErrorMessage>
                </FormContainer>
            </Template>
        )
    }
}

let inputShape = (valuePropType) => PropTypes.shape({
    value: valuePropType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
})

ConferenceForm.propTypes = {
    type: PropTypes.oneOf(['create', 'edit']).isRequired,

    conferenceName: inputShape(PropTypes.string.isRequired),
    price: inputShape(PropTypes.string.isRequired),
    startDate: inputShape(PropTypes.instanceOf(Date).isRequired),
    endDate: inputShape(PropTypes.instanceOf(Date).isRequired),

    globalErrorMessage: PropTypes.string.isRequired,

    disableSubmitButton: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
ConferenceForm.defaultProps = {}

export default ConferenceForm
