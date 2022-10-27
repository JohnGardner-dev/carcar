import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';
import ListAppointment from './ListAppointments';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import AppointmentHistory from './AppointmentHistory'
import ListManufacturers from './ListManufacturers';
import ManufacturerForm from './ManufacturerForm';
import ListModels from './ListModels';
import ModelForm from './ModelForm';
import ListAutomobiles from './ListAutomobiles';
import AutomobileForm from './AutomobileForm';


function App(props) {
  if (props.appointments===undefined || props.autos===undefined || props.autos===undefined){
  return null
}

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/service/technician" element={<TechnicianForm />}/>
          <Route path="/service/appointments" element = {<ListAppointment appointments={props.appointments} loadAppointments={props.loadAppointments}/>}/>
          <Route path="/service/appointments/new" element = {<AppointmentForm />} />
          <Route path="/service/appointments/history" element = {<AppointmentHistory appointments={props.appointments} />} />
          <Route path="/manufacturers" element = {<ListManufacturers />} />
          <Route path="/manufacturers/new" element = {<ManufacturerForm />} />
          <Route path="/models" element = {<ListModels models = {props.models} />} />
          <Route path="/models/new" element = {<ModelForm/>} />
          <Route path="/automobiles" element = {<ListAutomobiles autos={props.autos}/>} />
          <Route path="/automobiles/new" element = {<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
