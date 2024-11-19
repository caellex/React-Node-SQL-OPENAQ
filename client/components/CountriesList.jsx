import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import Crash from './CrashMessage'
import CrashMessage from './CrashMessage';

const CountriesList = () => {
  const [countryData, setCountryData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [hasCrashed, setHasCrashed] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/countries");
        const data = await response.json();

        if (data && data.results) {
          setCountryData(data);

          const names = data.results.map(country => country.name);
          setCountries(names)

        } else {
          console.error("Unexpected API response", data);
          setHasCrashed(true)
        }
      } catch (error) {
        console.error("Error fetching countries: " + error);
        setHasCrashed(true)
      }
    };

    fetchCountries();
  }, []);

  if(hasCrashed) {
    return <CrashMessage message="Could not fetch countries." />
  }

  const goToPage = (key) => {
    navigate(`/countries/${key}`);
  };

  return (
    <>
          {countries.map((country, i) => {
            const key = countryData.results[i]?.id ?? i;

            return (
              <p
                className="country-name"
                key={key}
                onClick={() => goToPage(key)}
              >
                <img
                  className="country-flag-icon"
                  src={`https://flagsapi.com/${countryData.results[i].code}/flat/64.png`}
                  alt="Flag not found"
                />
                {country}
              </p>
            );
          })}
    </>
  )
};

export default CountriesList;
