window.AppointmentsList = createReactClass({
  render: function() {
    return (
      <div>
        {this.props.appointments.map(function(appointment) {
          return(
            <Appointment appointment={appointment} key={appointment.id} />
          )
        })}
      </div>
    )
  }
});
