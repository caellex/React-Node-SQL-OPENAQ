import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Countries from '../components/Countries'
import Home from '../pages/Home';
import Sensors from '../components/Sensors';
import MainLayout from '../pages/MainLayout';
import Measurements from '../components/Measurements';


const AppRoutes = () => {

      return (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries/>} />
            <Route path="*" element={<Home />} />
            <Route path="/countries/:countryId" element={<Sensors />} />
            <Route path="/countries/:countryId/:locationId" element={<Measurements />} />
          </Routes>
        </div>
      );
    };

export default AppRoutes
