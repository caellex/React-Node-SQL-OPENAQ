import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sensor from './Sensor';
import mapPlaceholder from '../src/assets/map-place.jpg'

const Measurements = () => {
  const { locationId } = useParams();
    const [location, setLocation] = useState([])
    const [sensorIds, setSensorIds] = useState([])

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2)
    let isoDate = currentDate.toISOString();

    useEffect(() => {
      const fetchLocationData = async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/location/search?locationId=${locationId}`);
        const data = await response.json()
        const locationResults = data.results || [];

        setLocation(locationResults)

        const sensorsResults = data.results[0]?.sensors?.map(sensor => sensor.id);
        setSensorIds(sensorsResults)
        
      }

      fetchLocationData()
    }, [locationId])

    const ConvertDate = (dateToFormat) => {
      if(dateToFormat){
          let latestDate = dateToFormat.split('T')[0];
          let tempTime = dateToFormat.split('T')[1];
          let latestTime = tempTime.split(/[+-.]/)[0];
  
          let time = latestDate + " " + latestTime;
          return time;
      }
    }

  return (
    <div className="measurements-overview-wrap"> 
      <h2 className="sensor-location">{location[0] ? location[0].locality : "N/A"}, {location[0] ? location[0].name : "N/A"}</h2>
      <img className="sensor-map" src={mapPlaceholder} />

      <p className="latest-measure-title">LATEST MEASUREMENTS: </p>
      <p className="latest-measure-when">Last update: {ConvertDate(isoDate)}</p>

      <div className="latest-measurements">

{sensorIds.map(sensor => <Sensor key={sensor} id={sensor} />)}

<button className="save-button" onClick={() => console.log("Saved location. (Not really)")}>Save Location</button>
      </div>
      </div>
  )
}

export default Measurements
