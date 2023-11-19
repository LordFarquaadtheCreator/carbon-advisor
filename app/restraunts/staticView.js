import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


// Define your parameters
const size = '640x640';
const markers = [
  'color:red|label:S|40.702147,-74.015794',
  'color:red|label:G|40.711614,-74.012318',
  'color:red|label:C|40.718217,-73.998284'
];
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// Construct the URL with the parameters
const url = `https://maps.googleapis.com/maps/api/staticmap?size=${size}&markers=${markers.join('&markers=')}&key=${apiKey}`;

axios.get(url)
  .then(response => {
    // Handle the response data here
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error fetching data:', error);
  });
