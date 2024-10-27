const express = require('express');
const cors = require('cors');

const app = express();

const apiKey = "009c7cc9120670de9236d307febc31198efe9f054e7239dd828b2c27e3304872";


app.use(cors({
    origin: 'http://localhost:3000'
  }));

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

// CLICK ON COUNTRY FUNCTIONS

app.get('/api/countries/search', async (req, res) => {
    const { countryId } = req.query;
    console.log(countryId)
    

    if(!countryId){
        //throw new Error('City is required!')
        // ???????????????????????????????????????????????????????????????????????
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

app.listen(5000, () => {console.log("Server started on port 5000!")})