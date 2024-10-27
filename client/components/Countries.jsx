import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Countries = () => {
  const [backendData, setBackendData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countrySensors, setCountrySensors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/countries")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);

        const names = data.results.map(country => country.name);
        setCountries(names);
      });
      console.log(countries)
  }, []);

    const handleClick = (countryId) => {
        navigate('/countries/' + countryId);
    }

  return (
    <>
      {typeof backendData.results === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <div className="column-wrap">
          {countries.map((country, i) => {
            const key = (backendData.results[i] && backendData.results[i].id !== 'undefined' ? backendData.results[i].id : i);

            return ( <p className="country-name" key={key} onClick={() => handleClick(key)}><img className="country-flag-icon" src={`https://flagsapi.com/${backendData.results[i].code}/flat/64.png`} alt="Flag not found" />{country}</p>)
          })}
        </div>
      )}
    </>
  );
};

export default Countries;
