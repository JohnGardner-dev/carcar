function ListAppointment(props) {

  async function deleteAppointment(id) {
    console.log("CLICKED DELETE BUTTON")
    const deleteUrl = `http://localhost:8080/api/appointments/${id}`
    const fetchConfig = {
      method: "delete"
    }

    const response = await fetch(deleteUrl, fetchConfig)
    console.log("RESPONSe:::", response)

    if(response.ok) {
      const reponse = await fetch('http://localhost:8080/api/appointments/')
      console.log("props",props)
      props.loadAppointments()
    }
  }

  async function completeAppointment(id) {
    const completeUrl = `http://localhost:8080/api/appointments/${id}/complete/`
    const fetchConfig = {
      method: "put"
    }

    const response = await fetch(completeUrl,fetchConfig)

    if(response.ok) {
      const reponse = await fetch('http://localhost:8080/api/appointments/')
      console.log("props",props)
      props.loadAppointments()
    }

  }

        return (
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Vin</th>
                <th>Owner</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>VIP?</th>
              </tr>
            </thead>
            <tbody>
            {props.appointments.filter(appointment => appointment.completed === false).map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.date }</td>
                  <td>{ appointment.time }</td>
                  <td>{ appointment.reason }</td>
                  <td>{ appointment.vip }</td>
                  <td><button onClick={() => deleteAppointment(appointment.id)}>Cancel</button><button onClick={() => completeAppointment(appointment.id)}>Completed</button></td>
                </tr>
              );
            })}
            </tbody>
            </table>
        )
    }


export default ListAppointment
