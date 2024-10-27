import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App = () => {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
