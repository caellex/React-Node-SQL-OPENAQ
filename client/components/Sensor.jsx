import React, {useEffect, useState} from 'react'


const Sensor = ({ sensorIds }) => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchSensorData = async (id) => {
            const response = await fetch(`http://127.0.0.1:5000/api/location/sensor?sensorId=${id}`)
            const data = await response.json()
            return data;
        }

        const fetchAllSensors = async () => {
            try {
                const dataPromises = sensorIds.map(id => fetchSensorData(id));
                const results = await Promise.all(dataPromises)

                setSensorData(results)
                
            } catch (error){
                console.error("Error fetching sensor data: ", error)
            }
        }
        fetchAllSensors()
    }, [sensorIds])
  return (
    <div className="sensor-overview">
        {sensorData.map((data, index) => {
            <p key={index} onClick={console.log(data.results[4])}>{data.results[0]}</p>
        })}
    </div>
  )
}

export default Sensor
