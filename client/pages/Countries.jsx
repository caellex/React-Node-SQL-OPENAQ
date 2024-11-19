import React from 'react';
import CountriesList from '../components/CountriesList'
import MainLayout from './MainLayout';


const Countries = () => {

  return (
    <>
      <MainLayout pageTitle="Countries" />
      <div className="column-wrap">
        <CountriesList />
      </div>
    </>
  );
};

export default Countries;
