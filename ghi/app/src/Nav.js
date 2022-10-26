import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
              <ul className='dropdown-menu'>
              <li><a className='dropdown-item' href="/service/technician/">Enter a Technician</a></li>
                <li><a className='dropdown-item' href="/service/appointments/">List of Appointments</a></li>
                <li><a className='dropdown-item' href="/service/appointments/new/">Enter a Service Appointment</a></li>
                <li><a className='dropdown-item' href="/service/appointments/history/">Appointment History</a></li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Nav;
