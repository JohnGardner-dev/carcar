import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';
import ListAppointment from './ListAppointments';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';

function App(props) {
  if (props.appointments===undefined){
  return null
}

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technician/" element={<TechnicianForm />}/>
          <Route path="appointments/" element = {<ListAppointment appointments={props.appointments} loadAppointments={props.loadAppointments}/>}/>
          <Route path="appointments/new" element = {<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
