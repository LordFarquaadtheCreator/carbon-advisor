// CarbonEmissions.js
import React, { useEffect, useState } from 'react';

const CarbonEmissions = () => {
  const [emissionsData, setEmissionsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://boston-hacks-405214.uc.r.appspot.com/route?'+ new URLSearchParams( {
          origin:"New York" , 
          destination:"Boston",mode:"TRANSIT",
          alternatives:"true"
            
          }
        ));
        const data = await response.json();
        setEmissionsData(data);
      } catch (error) {
        console.error('Error fetching emissions data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading emissions data...</p>;
  }

  return (
    <div>
      <h2>Carbon Emissions Information</h2>
      <pre>{JSON.stringify(emissionsData, null, 2)}</pre>
    </div>
  );
};

export default CarbonEmissions;
