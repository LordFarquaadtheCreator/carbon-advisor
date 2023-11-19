import React from 'react';

const RestaurantMap = () => {
  return (
    <div>
      <h2>Restaurant Map 🍽️ </h2>
      <iframe
        title="Restaurant Map"
        width="600"
        height="400"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAHbJM1jo4wyx5whpMNtfnpsHT30MjJ0JA&q=450+Massachusetts+Ave,+CambridgeVeggie+Galaxy"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default RestaurantMap;