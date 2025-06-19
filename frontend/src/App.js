import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Register from './Reg_Log/Register';
import Login from './Reg_Log/Login';
import Booking from './Main/Booking';
import Dashboard from './Main/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/reg' element={<Register/>}/>
        <Route path='/log' element={<Login/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
        <Route path='/booking' element={<Booking/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
