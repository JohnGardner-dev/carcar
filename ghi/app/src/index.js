import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadAppointments() {
  const appointmentsResponse = await fetch('http://localhost:8080/api/appointments/');
  const manufacturersResponse = await fetch('http://localhost:8100/api/manufacturers/');

  if(appointmentsResponse.ok && manufacturersResponse.ok) {
    const appointmentData = await appointmentsResponse.json()
    const manufacturerData = await manufacturersResponse.json()

    console.log("DATA::", appointmentData)
    console.log("MANUFACTURER DATA::", manufacturerData)
    root.render(
      <React.StrictMode>
        <App appointments={appointmentData.appointments} loadAppointments={loadAppointments} manufacturers={manufacturerData.manufacturers}/>
      </React.StrictMode>
    )
  } else {
    console.error(appointmentsResponse)
  }
}
loadAppointments()
