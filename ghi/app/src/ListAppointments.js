import React from "react"

class ListAppointment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: []
    }

    this.deleteAppointment = this.deleteAppointment.bind(this)
    this.completeAppointment = this.completeAppointment.bind(this)

  }


  async componentDidMount () {
    const autoUrl = "http://localhost:8080/api/appointments/"
    const response = await fetch(autoUrl)

    if (response.ok) {
      const data = await response.json()
      this.setState({appointments:data.appointments})
    }
  }

    async deleteAppointment(appointment) {
      const copy = [...this.state.appointments]
      const deleteUrl = `http://localhost:8080/api/appointments/${appointment.id}`
      const fetchConfig = {
        method: "delete"
      }

      const response = await fetch(deleteUrl, fetchConfig)

        const newState = copy.indexOf(appointment)
        const result = copy.splice(newState,1)
        this.setState({appointments:copy})

  }

  async completeAppointment(appointment) {
    const copy = [...this.state.appointments]
    const completeUrl = `http://localhost:8080/api/appointments/${appointment.id}/complete/`
    const fetchConfig = {
      method: "put"
    }

    const response = await fetch(completeUrl,fetchConfig)
    console.log("RESPONSE", response)

    if(response.ok) {
      const newState = copy.indexOf(appointment)
      const result = copy.splice(newState,1)
      this.setState({appointments:copy})
  }
}

  render() {
        return (
          <div>
          <p></p>
          <h3>Service Appointments</h3>
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Vin</th>
                <th>Owner</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Technician</th>
                <th>VIP?</th>
              </tr>
            </thead>
            <tbody>
            {this.state.appointments.filter(appointment => appointment.completed === false).map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.date }</td>
                  <td>{ appointment.time }</td>
                  <td>{ appointment.reason }</td>
                  <td>{appointment.technician.name}</td>
                  <td>{ appointment.vip }</td>
                  <td><button className="btn btn-outline-danger" onClick={() => this.deleteAppointment(appointment)}>Cancel</button><button className="btn btn-outline-success" onClick={() => this.completeAppointment(appointment)}>Completed</button></td>
                </tr>
              );
            })}
            </tbody>
            </table>
            </div>
        )
    }
  }


export default ListAppointment
