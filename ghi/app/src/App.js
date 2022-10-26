import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListSalesHistory from './ListSalesHistory';
import AddSalesPerson from './AddSalesPerson';
import AddCustomer from './AddCustomer';
import CreateSalesRecord from './CreateSalesRecord';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sales/employees/new/" element={<AddSalesPerson />} />
          <Route path="/sales/customers/new/" element={<AddCustomer />} />
          <Route path="/sales/records/new/" element={<CreateSalesRecord />} />
          <Route path="/sales/records/" element={<ListSalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
