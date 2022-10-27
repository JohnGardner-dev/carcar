import { NavLink, Link } from 'react-router-dom';

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
              <a className='nav-link dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Manufacturer</a>
              <ul className='dropdown-menu'>
              <li><Link className='dropdown-item' to="/manufacturers">List Manufacturers</Link></li>
              <li><Link className='dropdown-item' to="/manufacturers/new">Enter a Manufacturer</Link></li>
                </ul>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Vehicle Models</a>
              <ul className='dropdown-menu'>
              <li><Link className='dropdown-item' to="/models">List Models</Link ></li>
              <li><Link  className='dropdown-item' to="/models/new">Enter a Model</Link ></li>
                </ul>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory</a>
              <ul className='dropdown-menu'>
              <li><Link  className='dropdown-item' to="/automobiles">List Automobiles</Link ></li>
              <li><Link  className='dropdown-item' to="/automobiles/new">Enter an Automobile</Link ></li>
                </ul>
            </li>
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Service</a>
              <ul className='dropdown-menu'>
              <li><Link  className='dropdown-item' to="/service/technician/">Enter a Technician</Link ></li>
                <li><Link  className='dropdown-item' to="/service/appointments/">List Appointments</Link ></li>
                <li><Link  className='dropdown-item' to="/service/appointments/new/">Enter a Service Appointment</Link ></li>
                <li><Link  className='dropdown-item' to="/service/appointments/history/">Appointment History</Link ></li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Nav;
