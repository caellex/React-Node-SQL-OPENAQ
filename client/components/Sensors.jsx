import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MainLayout from '../pages/MainLayout';

const Sensors = () => {
    const { countryId } = useParams();
    const [sensors, setSensors] = useState([]);
    const [waitForResultsCount, setWaitForResultsCount] = useState("60")
    const navigate = useNavigate();

    useEffect(() => {
        const findCountrySensors = async (countryId) => {
            if (!countryId) {
                console.error("Country ID is undefined")
                return;
            }

            const response = await fetch(`http://127.0.0.1:5000/api/countries/sensors?countryId=${countryId}`)
            const data = await response.json()
            const sensorResults = data.results || [];
            setSensors(sensorResults);
                

        }
        findCountrySensors(countryId);
    }, [countryId]
    )

    // Countdown for user if the data doesn't load properly. Sometimes it can take up to a minute for sensors to load. Long live OpenAQ-
    useEffect(() => {
        if(sensors.length === 0){
            const countdown = setInterval(() => {
                setWaitForResultsCount((prevCount) => {
                    if(prevCount > 0){
                        return prevCount - 1;
                    } else {
                        clearInterval(countdown);
                        return 60;
                    }
                });
            }, 1000)
            return () => clearInterval(countdown);
        }
        
    }, [sensors])

    const handleClick = (key) => {
        navigate(`/countries/${countryId}/${key}`);
      };

    return (
        <>
        <MainLayout pageTitle={sensors[0]?.country?.name} />
            <h2 className="center">Sensors in Country ID: {countryId}</h2>
            <div className={sensors && sensors.length > 0 ? "column-wrap" : ""}>
                {sensors && sensors.length > 0 ? (
                    sensors.map(sensor => (
                        <div key={sensor.id} className="sensor-item" onClick={() => handleClick(sensor.id)}>
                            <p className="column-name">{sensor.name}</p>
                            <p className={sensor.locality !== null ? "specified-loc" : "not-found"}>
                                {sensor.locality !== null ? sensor.locality : "Specified location not found."}
                            </p>
                        </div>
                    ))
                ) : (
                    <>
                    <p className="center header-error">No sensors found.</p>
                    <p className="center description-error">Wait up to a minute, if the sensors still haven't loaded they are currently unavaliable.</p>
                    <div className="counter">{waitForResultsCount}</div>
                    </>
                )}
            </div>
        </>
    );
}

export default Sensors
