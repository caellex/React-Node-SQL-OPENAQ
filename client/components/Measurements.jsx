import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sensor from './Sensor';
import mapPlaceholder from '../src/assets/map-place.jpg'

const Measurements = () => {
  const { locationId } = useParams();
    const [location, setLocation] = useState([])
    const [sensorIds, setSensorIds] = useState([])

    useEffect(() => {
      const fetchLocationData = async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/location/search?locationId=${locationId}`);
        const data = await response.json()
        const locationResults = data.results || [];

        setLocation(locationResults)

        const sensorsResults = data.results[0]?.sensors?.map(sensor => sensor.id);
        setSensorIds(sensorsResults)
        
        console.log(location)
      }

      fetchLocationData()
    }, [locationId])

  return (
    <div className="measurements-overview-wrap"> 
      <h2 className="sensor-location">{location[0] ? location[0].locality : "N/A"}, {location[0] ? location[0].name : "N/A"}</h2>
      <img className="sensor-map" src={mapPlaceholder} />

      <p className="latest-measure-title">LATEST MEASUREMENTS: </p>
      <p className="latest-measure-when">Last update: 2024-10-30 12:00:00:00</p>

      <div className="latest-measurements">

        <div className="measure">
          <p>PM10 μg/m³</p>
          <p>RESULT</p>
          </div>

        <div className="measure">
          <p>PM2.5 μg/m³ </p>
          <p>RESULT</p>
          </div>

        <div className="measure">
          <p>NO₂ μg/m³ </p>
          <p>RESULT</p>
          </div>


      </div>
      <button onClick={() => console.log(sensorIds)}>LOG</button>
      <button onClick={() => console.log(location)}>LOG</button>
      </div>
  )
}

export default Measurements
