const express = require('express');
const cors = require('cors');

const app = express();

const apiKey = "009c7cc9120670de9236d307febc31198efe9f054e7239dd828b2c27e3304872";


app.use(cors({
    origin: 'http://localhost:3000'
  }));

  // LOADS ALL COUNTRIES IN OPENAQ ON CLICK COUNTRIES TAB
  app.get('/api/countries', async (req, res) => {
    try{
        
        const response = await fetch(`https://api.openaq.org/v3/countries?limit=150`, {
            method: 'GET',
            headers: {
              'X-API-Key': apiKey
            },
            accept: 'application/json'
          });
          if(!response.ok){
            throw new Error('Network response not OK')
          }
          const result = await response.json();
          res.json(result);
    }  catch(err) {
        console.log(err.message)
        console.error('Error fetching data from OpenAQ:', err);
      } 
});

// GETS ALL SENSORS FOR SPECIFIED COUNTRY
app.get('/api/countries/sensors', async (req, res) => {
    const { countryId } = req.query;
    console.log("Country searched: ", countryId)
    

    if(!countryId){
        //throw new Error('Country is required!')
    }
    try{
        
        const response = await fetch(`https://api.openaq.org/v3/locations?countries_id=${countryId}`, {
            method: 'GET',
            headers: {
              'X-API-Key': apiKey
            },
            accept: 'application/json'
          });
          if(!response.ok){
            throw new Error('Network response not OK')
          }
          const result = await response.json();
          res.json(result);
    }  catch(err) {
        console.log(err.message)
        console.error('Error fetching data from OpenAQ:', err);
      } 
});

// SEARCH FOR SENSORS IN GIVEN SPECIFIED LOCATION
app.get('/api/location/search', async (req, res) => {
  const { locationId } = req.query;
  console.log("Sensor ID searched: ", locationId)
  

  if(!locationId){
      //throw new Error('City is required!')
      // ???????????????????????????????????????????????????????????????????????
  }
  try{
      
      const response = await fetch(`https://api.openaq.org/v3/locations/${locationId}`, {
          method: 'GET',
          headers: {
            'X-API-Key': apiKey
          },
          accept: 'application/json'
        });
        if(!response.ok){
          throw new Error('Network response not OK')
        }
        const result = await response.json();
        res.json(result);
  }  catch(err) {
      console.log(err.message)
      console.error('Error fetching data from OpenAQ:', err);
    } 
});

// SEARCH FOR MEASUREMENTS FROM SPECIFIED SENSORS IN LOCATION
app.get('/api/location/sensor', async (req, res) => {
  const { sensorId } = req.query;
  console.log("Sensor ID searched: ", sensorId)
  

  if(!sensorId){
    // do some error handling
  }
  try{
      
      const response = await fetch(`https://api.openaq.org/v3/sensors/${sensorId}/measurements`, {
          method: 'GET',
          headers: {
            'X-API-Key': apiKey
          },
          accept: 'application/json'
        });
        if(!response.ok){
          throw new Error('Network response not OK')
        }
        const result = await response.json();
        res.json(result);
  }  catch(err) {
      console.log(err.message)
      console.error('Error fetching data from OpenAQ:', err);
    } 
});

app.listen(5000, () => {console.log("Server started on port 5000!")})


// https://api.openaq.org/v3/locations/2947/latest

// https://api.openaq.org/v3/sensors/6253/measurements/daily?datetime_from=2024-10-31T00:00:00Z

// https://docs.openaq.org/api/operations/location_latest_get_v3_locations__locations_id__latest_get

// http://localhost:3000/countries/53/2947