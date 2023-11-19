import React from 'react';
import {} from 'dotenv/config'

export const RestaurantMap = ({ query }) => {
  const encodedQuery = encodeURIComponent(query);
  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=${encodedQuery}`;

  return (
      <iframe
        title="Restaurant Map"
        width="600"
        height="400"
        src={src}
        allowFullScreen
      ></iframe>
  );
};

export default RestaurantMap;