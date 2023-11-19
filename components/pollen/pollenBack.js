const axios = require('axios');

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; 
const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`;
console.log(apiKey);

const data = {
  universalAqi: true,
  location: {
    latitude: 37.419734,
    longitude: -122.0827784
  },
  extraComputations: [
    "HEALTH_RECOMMENDATIONS",
    "DOMINANT_POLLUTANT_CONCENTRATION",
    "POLLUTANT_CONCENTRATION",
    "LOCAL_AQI",
    "POLLUTANT_ADDITIONAL_INFO"
  ],
  languageCode: "en"
};

axios.post(url, data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
