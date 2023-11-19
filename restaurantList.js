import React, { useEffect, useState } from 'react';

const RestaurantList = ({ endAddress }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://boston-hacks-405214.uc.r.appspot.com/restaurants?' + new URLSearchParams ({
          address: endAddress
         }) );
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="pt-5 text-2xl font-bold">🌏 Sustainable Restaurants Nearby 🌏</h1>
      <ul className='list-decimal pl-5'>
        {restaurants.names?.map((restaurant) => (
          <li key={restaurant}>{restaurant}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
