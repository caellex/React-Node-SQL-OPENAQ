import React, { useEffect, useState } from "react";

const Sensor = ({id}) => {
  const [sensor, setSensor] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 2)
    const isoDate = currentDate.toISOString();
    const fetchSensorData = async () => {
      try {

        const response = await fetch(
          `http://127.0.0.1:5000/api/location/sensor?sensorId=${id}?datetime_from=${isoDate}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch sensor. Response ${response.status}`
          );
        }
        const data = await response.json();
        if(data.results[0]) setSensor(data.results[0]);
        setSuccess(true);

      } catch (e) {
        console.error("Error fetching Sensor with ID ${id} \n", e);
      }
    };
    fetchSensorData();
  }, [id]);

  function formatSensorName(name){
    const conversionMap = {
        "PM10 ΜG/M³": "PM₁₀ μg/m³",
        "PM25 ΜG/M³": "PM₂.₅ μg/m³",
        "NO2 ΜG/M³": "NO₂ μg/m³",
        "NO2 PPM" : "NO₂ PPM",
        "CO MG/M³": "CO μg/m³",
        "O3 ΜG/M³": "O₃ μg/m³",
        "O3 PPM" : "O₃ PPM",
        "SO2 ΜG/M³": "SO₂ μg/m³",
        "SO2 PPM" : "SO₂ PPM",
        "PM1 ΜG/M³" : "PM₁ µg/m³",
        "RELATIVEHUMIDITY %" : "Humidity",
        "TEMPERATURE C" : "Temperature °C",
        "UM003 PARTICLES/CM³" : "UM₀₀₃ particles/cm³",
    }

    return conversionMap[name] || name
}
  return (
    <>
      {success ? (
        <div className="measure">
          <p className="measure-unit">{formatSensorName(sensor.name.toUpperCase())}</p>
          <p className="measure-value">{sensor?.latest?.value.toFixed(2) } μg/m³</p>
          {/* <button onClick={() => console.log(sensor.name.toUpperCase())}>Log</button> */}
        </div>
        
      ) : (
        "Sensor did not load correctly."
      )}
    </>
  );
};

export default Sensor;


