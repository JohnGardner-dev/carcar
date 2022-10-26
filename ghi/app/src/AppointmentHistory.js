import {React, useState} from "react";



function AppointmentHistory(props) {

    const [searchInput, setSearchInput] = useState("");

    const handleChange = (event) => {
        event.preventDefault()
        setSearchInput(event.target.value)
        console.log("SEARCH INPUT::", searchInput)
    }

        return (
            <div>
                <h3>Service Appointments</h3>
            <div className="input-group mb-3">
            <input type="search" id="search" className="form-control" value={searchInput} onChange={handleChange} placeholder="Search" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
            </div>
            </div>
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
            {props.appointments.filter(appointment => appointment.vin === searchInput).map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td>{ appointment.vin }</td>
                  <td>{ appointment.owner }</td>
                  <td>{ appointment.date }</td>
                  <td>{ appointment.time }</td>
                  <td>{ appointment.reason }</td>
                  <td>{appointment.technician.name}</td>
                  <td>{ appointment.vip }</td>
                </tr>
              );
            })}
            </tbody>
            </table>
            </div>



        )
    }




export default AppointmentHistory
