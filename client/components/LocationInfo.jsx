import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Sensor from './Sensor';
import mapPlaceholder from '../src/assets/map-place.jpg'
import MainLayout from '../pages/MainLayout'
import LocationMap from './LocationMap';
import BounceLoader from "react-spinners/BounceLoader";

const LocationInfo = () => {
  const { locationId } = useParams();
    const [location, setLocation] = useState([]);
    const [sensorIds, setSensorIds] = useState([]);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1)
    let isoDate = currentDate.toISOString();

    useEffect(() => {
      const fetchLocationData = async () => {
        try{
          const response = await fetch(`http://127.0.0.1:5000/api/location/search?locationId=${locationId}`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch sensor. Response ${response.status}`
            );
          } else {
          const data = await response.json()
          const locationResults = data.results || [];

          setLocation(locationResults)
          
          const sensorsResults = data.results[0]?.sensors?.map(sensor => sensor.id);
          setSensorIds(sensorsResults)
          setIsLoadingMap(false)
          }
        }catch(e){
          console.error(`Error fetching sensor data`, e)
        }
      }
      fetchLocationData();
    }, [])
    
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
    <>
    
    <MainLayout pageTitle={location[0]?.country?.name ? location[0]?.country?.name : " Quality Monitoring"} />

      <div className="measurements-overview-wrap"> 
      <h2 className="sensor-location">{location[0]?.locality ? location[0].locality : "Unspecified"}, {location[0]?.name ? location[0].name : "N/A"}</h2>
      {isLoadingMap ? <BounceLoader
        loading={isLoadingMap}
        color="#8484cc"
        cssOverride={{margin: '2em 0 2em 0'}}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <LocationMap lng={location[0]?.coordinates?.longitude} lat={location[0]?.coordinates?.latitude}/>}
      <button type="submit" className="save-button" onClick={() => console.log("Saved location. (Not really)")}>Save Location</button>

      <p className="latest-measure-title">LATEST MEASUREMENTS: </p>
      <p className="latest-measure-when">Last update: {ConvertDate(isoDate)}</p>

      <div className="latest-measurements">

{sensorIds.map((sensor, i) => <Sensor key={i} id={sensor} />)}


      </div> {/*LATEST CLOSER*/}
      </div> {/*OVERVIEW WRAP CLOSER*/}
      </>
  )
}

export default LocationInfo