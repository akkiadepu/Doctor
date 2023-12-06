import logo from './logo.svg';
import './App.css';
import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Doctorr from './Doctors/Doctorr';
import Patient from './Patients/Patient';
import Navigate from './Navigate';
import Home from './Home';
import Notfound from './Notfound';

const App=()=> {
  return (

    <BrowserRouter>
    <Navigate/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Doctorr' element={<Doctorr/>}/>
      <Route path='/Patient' element={<Patient/>}/>
      <Route path='*' element={<Notfound/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
