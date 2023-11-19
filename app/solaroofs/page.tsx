"use client";

import { useDirections } from "@/services/directions";
import { useSolaroofsStore } from "@/services/solaroofs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
function formatToCurrency(stringCurrency: string) {
  const num = parseFloat(stringCurrency);
  return formatter.format(num);
}

export default function SolaroofsPage() {
  const [directions] = useDirections((state) => [state.directions]);
  const { solaroofsFinancialData, updateSolaroofsDetails } = useSolaroofsStore(
    (state) => state
  );
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (directions) {
      const endAddress = directions.routes[0].legs[0].end_address;
      updateSolaroofsDetails(endAddress);
      
      (async () => {
        const imageUrl = "https://sustainable-af-api.onrender.com/heatmap?" + new URLSearchParams({
          address: endAddress
         }) ;
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImgUrl(imageObjectURL);
      })()
    }
  }, [directions]);

  return (
    <main>
      <h1 className="text-2xl">Solar Hotspots ☀️</h1>
      {directions ? <Image src={imgUrl} alt="Solar hotspot." width={500} height={400}/> : "Enter your directions in the dashboard to get started!" }
    <div>
      {solaroofsFinancialData && (
        <div className="flex flex-row justify-center items-cent mt-4 md:mt-6 2xl:mt-7.5">
          <div className="w-1/2 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2 className="font-bold text-xl">Minimum 💲</h2>
            <p>Initial Investment: {formatToCurrency(solaroofsFinancialData.min_initial)}</p>
            <p>Years to Payback: {solaroofsFinancialData.min_payback}</p>
            <p>Savings From Investmest: {formatToCurrency(solaroofsFinancialData.min_savings)}</p>
          </div>
          <div className="w-1/2 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h2 className="font-bold text-xl">Maximum 💲💲💲</h2>
            <p>Initial Investment: ${formatToCurrency(solaroofsFinancialData.max_initial)}</p>
            <p>Years to Payback: {solaroofsFinancialData.max_payback}</p>
            <p>Savings From Investmest: ${formatToCurrency(solaroofsFinancialData.max_savings)}</p>
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
