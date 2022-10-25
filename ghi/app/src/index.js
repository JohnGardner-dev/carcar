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
  const response = await fetch('http://localhost:8080/api/appointments/');
  console.log("RESPONSE::",response);

  if(response.ok) {
    const data = await response.json()
    console.log("DATA::", data)
    root.render(
      <React.StrictMode>
        <App appointments={data.appointments} loadAppointments={loadAppointments}/>
      </React.StrictMode>
    )
  } else {
    console.error(response)
  }
}
loadAppointments()
