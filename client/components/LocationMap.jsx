import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import CrashMessage from './CrashMessage'

import 'mapbox-gl/dist/mapbox-gl.css';

const LocationMap = (coords) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasCrashed, setHasCrashed] = useState(false)
  const mapContainerRef = useRef();
  const mapRef = useRef();

  const sensorMapStyle = {
    height: '34vh',
    width: '50vw',
    justifySelf: 'center',
    border: '0.6rem solid #7777BB',
    borderRadius: '1rem',
    color: 'black',
  };

  useEffect(() => {
    if(!mapContainerRef.current || !coords) setHasCrashed(true)
    if (mapContainerRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY2FlbGxleCIsImEiOiJjbTNuOHI5a2sxNHAwMnFxejN3djE2ODQyIn0.uvLrso-puZ6YZ-FJUmNPPg';

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current, 
        center: [coords.lng, coords.lat], 
        zoom: 13 // starting zoom
      });

      const popup = new mapboxgl.Popup().setText(
        'Sensors are located here.'
      );

      new mapboxgl.Marker({color: 'red', rotation: 15})
      .setLngLat([coords.lng, coords.lat])
      .setPopup(popup)
      .addTo(mapRef.current);

      setIsLoaded(true);
    }
  }, [coords]);

  if(hasCrashed) {
    return <CrashMessage message="Map not loaded correctly." />
  }


   return (
<div
      style={sensorMapStyle}
      ref={mapContainerRef}
      className="map-container"
    />)}

export default LocationMap