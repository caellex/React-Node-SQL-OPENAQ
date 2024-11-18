import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Countries from '../components/Countries'
import Home from '../pages/Home';
import CountrySensors from '../components/CountrySensors';
import LocationInfo from '../components/LocationInfo';


const AppRoutes = () => {

      return (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries/>} />
            <Route path="*" element={<Home />} />
            <Route path="/countries/:countryId" element={<CountrySensors />} />
            <Route path="/countries/:countryId/:locationId" element={<LocationInfo />} />
          </Routes>
        </div>
      );
    };

export default AppRoutes
