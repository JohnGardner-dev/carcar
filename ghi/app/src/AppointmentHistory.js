import {React, useEffect, useState} from "react";



function AppointmentHistory() {

  const [searchInput, setSearchInput] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments()
  },[])

  async function getAppointments () {
    const url = 'http://localhost:8080/api/appointments/'
    const response = await fetch(url)


    if (response.ok) {
      const appointments = await response.json()
      setAppointments(appointments)
    }
  }


    const handleChange = (event) => {
        event.preventDefault()
        setSearchInput(event.target.value)
    }

        return (
            <div>
            <p></p>
            <div className="input-group mb-3">
            <input type="search" id="search" className="form-control" value={searchInput} onChange={handleChange} placeholder="Search Vin" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
            </div>
            </div>
            <h3>Service Appointments History</h3>
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
            {appointments.appointments ? appointments.appointments.filter(appointment => appointment.vin === searchInput).map(appointment =>
               (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.date }</td>
                  <td>{ appointment.time }</td>
                  <td>{ appointment.reason }</td>
                  <td>{appointment.technician.name}</td>
                  <td>{ appointment.vip }</td>
                </tr>
              )
            ) :null}
            </tbody>
            </table>
            </div>



        )
    }




export default AppointmentHistory
