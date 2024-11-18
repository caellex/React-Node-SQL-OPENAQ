import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import CrashMessage from './CrashMessage'

import 'mapbox-gl/dist/mapbox-gl.css';

const LocationMap = (coords) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const sensorMapStyle = {
    height: '34vh',
    width: '50vw',
    justifySelf: 'center',
    border: '0.6rem solid #7777BB',
    borderRadius: '1rem',
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY2FlbGxleCIsImEiOiJjbTNuOHI5a2sxNHAwMnFxejN3djE2ODQyIn0.uvLrso-puZ6YZ-FJUmNPPg';

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, 
        center: [coords.lng, coords.lat], 
        zoom: 13 // starting zoom
      });

      setIsLoaded(true);
    }
  }, []);


   return (
<div
      style={sensorMapStyle}
      ref={mapContainerRef}
      className="map-container"
    />
  // ) : (

  //   <CrashMessage />
  // )
)}

export default LocationMap