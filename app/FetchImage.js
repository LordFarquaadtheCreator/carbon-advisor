import React, { useEffect, useState } from "react";
const imageUrl = "https://sustainable-af-api.onrender.com/heatmap?" + new URLSearchParams({
  address: "George Sherman Union Boston"
 }) ;

export default function App() {
  const [img, setImg] = useState();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
    <h2>Solar Hotspots ☀️ </h2>
    
    <>
      <img src={img} alt="icons" />
    </>

    </div>
  );
}

