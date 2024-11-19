import React, { useState } from 'react'
import MainLayout from './MainLayout'
import SensorLocations from '../components/SensorLocations'

const CountrySensors = () => {
    const [title, setTitle] = useState("")

    const handleDataFromChild = (data) => {
        setTitle(data)
    }
  return (
    <>
      <MainLayout title={title}/>
      <SensorLocations />
    </>
  )
}

export default CountrySensors