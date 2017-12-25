import React from 'react';
import Datetime from 'react-datetime';

export default class AppointmentForm extends React.Component {
  handleChange(e) {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime(e) {
    const name = 'appt_time';
    const obj = {};
    if (obj[name] = e.toDate()) {
      this.props.onUserInput(obj);
    }
  }

  render () {
    const inputProps = {
      name: 'appt_time'
    };
    return (
      <div>
        <h2>Make a new appointment</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input name='title' placeholder='Appointment title'
            value={this.props.title} onChange={(e) => this.handleChange(e)} />
          <Datetime input={false} open={true} inputProps={inputProps}
            value={this.props.appt_time} onChange={(e) => this.setApptTime(e)}/>
          <input type='submit' value='Make appointment' className='submit-button' />
        </form>
      </div>
    )
  }
}
