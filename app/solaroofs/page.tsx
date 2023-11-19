"use client";

import { useDirections } from "@/services/directions";
import { useSolaroofsStore } from "@/services/solaroofs";
import React, { useEffect } from "react";

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

  useEffect(() => {
    if (directions) {
      updateSolaroofsDetails(directions.routes[0].legs[0].end_address);
    }
  }, [directions]);

  return (
    <main>
      <div>IMAGE HERE</div>
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
    </main>
  );
}
