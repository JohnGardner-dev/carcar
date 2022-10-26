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
  const modelsResponse = await fetch('http://localhost:8100/api/models/');
  const autosResponse = await fetch ('http://localhost:8100/api/automobiles/');

  if(appointmentsResponse.ok && manufacturersResponse.ok && modelsResponse.ok && autosResponse.ok) {
    const appointmentData = await appointmentsResponse.json()
    const manufacturerData = await manufacturersResponse.json()
    const modelData = await modelsResponse.json()
    const autoData = await autosResponse.json()


    root.render(
      <React.StrictMode>
        <App
        appointments={appointmentData.appointments}
        loadAppointments={loadAppointments}
        manufacturers={manufacturerData.manufacturers}
        models={modelData.models}
        autos={autoData.autos} />
      </React.StrictMode>
    )
  } else {
    console.error(appointmentsResponse)
  }
}
loadAppointments()
