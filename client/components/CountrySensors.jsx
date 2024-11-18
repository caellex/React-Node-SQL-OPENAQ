import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../pages/MainLayout';
import BarLoader from "react-spinners/BarLoader";


const CountrySensors = () => {
    const { countryId } = useParams();
    const [sensors, setSensors] = useState([]);
    const [areSensorsLoading, setAreSensorsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const findCountrySensors = async (countryId) => {
            if (!countryId) {
                console.error("Country ID is undefined");
                return;
            }
            try{
            const response = await fetch(`http://127.0.0.1:5000/api/countries/sensors?countryId=${countryId}`);
            const data = await response.json();
            const sensorResults = data.results || [];

            setSensors(sensorResults);
            
          } catch(e){
            console.error("Failed to fetch country sensors.", e)
          }

          setAreSensorsLoading(false);


        }
        findCountrySensors(countryId);
    }, [countryId]);

    const goToPage = (key) => {
        navigate(`/countries/${countryId}/${key}`);
      };

      return (
        <>
          <MainLayout pageTitle={sensors[0]?.country?.name} />
          <h2 className="center">{areSensorsLoading ? "Loading Sensors.." : `Sensors in ${sensors[0]?.country?.name}`}</h2>
          <div className={sensors && sensors.length > 0 ? "column-wrap" : ""}>
            {sensors && sensors.length > 0 ? (
              sensors.map(sensor => (
                <div key={sensor.id} className="sensor-item" onClick={() => goToPage(sensor.id)}>
                  <p className="column-name">{sensor.name}</p>
                  <p className={sensor.locality !== null ? "specified-loc" : "not-found"}>
                    {sensor.locality !== null ? sensor.locality : "Specified location not found."}
                  </p>
                </div>
              ))
            ) : (
              <>
                {areSensorsLoading ? (
                                   <BarLoader
                                   loading={areSensorsLoading}
                                   color="#8484cc"
                                   cssOverride={{justifySelf:'center', width:'40vw', marginTop:'2em'}}
                                   size={150}
                                   aria-label="Loading Spinner"
                                   data-testid="loader"
                                 />
                ) : (
                  <>
                    <p className="center header-error">No sensors found.</p>
                    <p className="center description-error">Wait up to a minute, if the sensors still haven't loaded they are currently unavailable.</p>
                  </>
   
                )}
              </>
            )}
          </div>
        </>
      );
    }
      



export default CountrySensors