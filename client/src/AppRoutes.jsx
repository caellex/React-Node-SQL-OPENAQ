import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Countries from '../components/Countries';
import Home from '../pages/Home';
import Sensors from '../components/Sensors';
import MainLayout from '../pages/MainLayout';

const AppRoutes = () => {
    const navigate = useNavigate();

    const goToCountries = () => {
        navigate('/countries/'); 
      };

      return (
        <div>
          <MainLayout />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="*" element={<Home />} />
            <Route path="/countries/:countryId" element={<Sensors />} />
          </Routes>
        </div>
      );
    };

export default AppRoutes
