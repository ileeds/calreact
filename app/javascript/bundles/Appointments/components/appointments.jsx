import React from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';
import { AppointmentsList } from './AppointmentsList';
import update from 'immutability-helper';
import { FormErrors } from './FormErrors'
import moment from 'moment'

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  static defaultProps = {
    appointments: []
  }

  constructor(props, _railsContext) {
    super(props)
    this.state = {
      appointments: this.props.appointments,
      title: {value: '', valid: false},
      appt_time: {value: new Date(), valid: false},
      formErrors: {},
      formValid: false
    }
  }

  componentDidMount () {
    if(this.props.match) {
      $.ajax({
        type: "GET",
        url: '/appointments',
        dataType: "JSON"
      }).done((data) => {
        this.setState({appointments: data});
      });
    }
  }

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName],
                                {value: {$set: fieldValue}});
    this.setState({[fieldName]: newFieldState},
       () => { this.validateField(fieldName, fieldValue, validations) });
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if (e !== '') {
        errors.push(e);
      }
      return(errors);
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFieldState = update(this.state[fieldName],
                                 {valid: {$set: fieldValid}});
    const newFormErrors = update(this.state.formErrors,
                                 {$merge: {[fieldName]: fieldErrors}});
    this.setState({[fieldName]: newFieldState, formErrors: newFormErrors}, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid &&
                              this.state.appt_time.valid})
  }

  handleFormSubmit = () => {
    const appointment = {title: this.state.title.value, appt_time: this.state.appt_time.value};
    $.post('/appointments', {appointment: appointment})
      .done((data) => {
        this.addNewAppointment(data);
        this.resetFormErrors();
      })
      .fail((response) => {
        this.setState({formErrors: response.responseJSON})
      });
  }

  resetFormErrors() {
    this.setState({formErrors: {}})
  }

  addNewAppointment(data) {
    this.setState({appointments: this.state.appointments.concat([data]).sort(function(a,b) {
      return new Date(a.appt_time) - new Date(b.appt_time);
    })});
  }

  render () {
    return (
      <div>
        <FormErrors formErrors = {this.state.formErrors} />
        <AppointmentForm title={this.state.title}
          appt_time={this.state.appt_time} onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit}
          formValid = {this.state.formValid} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}
