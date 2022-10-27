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


  if(appointmentsResponse.ok) {
    const appointmentData = await appointmentsResponse.json()

    root.render(
      <React.StrictMode>
        <App
        appointments={appointmentData.appointments}
        loadAppointments={loadAppointments}/>
      </React.StrictMode>
    )
  } else {
    console.error(appointmentsResponse)
  }
}
loadAppointments()
