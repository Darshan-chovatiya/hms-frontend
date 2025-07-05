import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import { LoginPage , AdminPanelPage, CompanyLoginPage, CompanyPanelPage, DriverPanelPage } from './pages';
import {CompanyPrivateRoute, PrivateRoute} from './components/PrivateRoute';
import VisitorForm from './components/VisitorForm';
import DriverSignup from './components/driver/DriverSignup';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/admin/login' element={<LoginPage/>} />
          <Route path='/super-admin' element={<PrivateRoute><AdminPanelPage/></PrivateRoute>} />

          <Route path='/:companyName' element={<CompanyLoginPage/>}/>
          <Route path='/hotel' element={<CompanyPrivateRoute type='hotel'><CompanyPanelPage/></CompanyPrivateRoute>}/>

          <Route path='/driver' element={<CompanyPrivateRoute type='driver'><DriverPanelPage/></CompanyPrivateRoute>} />

          <Route path="/hotel/scan/:companyId" element={<VisitorForm />} />

          <Route path="*" element={<CompanyPrivateRoute authentication={false}><CompanyLoginPage/></CompanyPrivateRoute>}/>
          <Route path="/driver-signup" element={<DriverSignup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
