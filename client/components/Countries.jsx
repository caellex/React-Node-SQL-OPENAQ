import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Countries = ({ data }) => {
  const [backendData, setBackendData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countrySensors, setCountrySensors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/countries");
        const data = await response.json();

        if (data && data.results) {
          setBackendData(data);

          const names = data.results.map(country => country.name);
          setCountries(names);
        } else {
          console.error("Unexpected API response format", data);
        }
      } catch (error) {
        console.error("Error fetching countries: " + error);
      }
    };

    fetchCountries();
  }, []);

  const handleClick = (key) => {
    navigate(`/countries/${key}`);
  };

  return (
    <>
      {typeof backendData.results === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <div className="column-wrap">
          {countries.map((country, i) => {
            const key = (backendData.results[i] && backendData.results[i].id !== 'undefined' ? backendData.results[i].id : i);

            return (
              <p
                className="country-name"
                key={key}
                onClick={() => handleClick(key)}
              >
                <img
                  className="country-flag-icon"
                  src={`https://flagsapi.com/${backendData.results[i].code}/flat/64.png`}
                  alt="Flag not found"
                />
                {country}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Countries;
