import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Sensors = () => {
    const { countryId } = useParams();
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        const findCountrySensors = async (countryId) => {
            if (!countryId) {
                console.error("Country ID is undefined")
                return;
            }

            fetch(`http://127.0.0.1:5000/api/countries/search?countryId=${countryId}`)
                .then(response => response.json())
                .then(data => {

                    const sensorResults = data.results || [];

                    setSensors(sensorResults);
                    console.log(data)
                }).catch(error => console.error("Error fetching sensors: " + error))

        }
        findCountrySensors(countryId);
    }, [countryId]
    )
    return (
        <>
            <h2 className="center">Sensors in Country ID: {countryId}</h2>
            <div className="column-wrap">
                {sensors && sensors.length > 0 ? (
                    sensors.map(sensor => (
                        <div key={sensor.id} className="sensor-item">
                            <p className="column-name">{sensor.name}</p>
                            <p className={sensor.locality !== null ? "specified-loc" : "not-found"}>
                                {sensor.locality !== null ? sensor.locality : "Specified location not found."}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="center">No sensors found.</p>
                )}
            </div>
        </>
    );
}

export default Sensors
