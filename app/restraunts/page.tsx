"use client";
// without this the component renders on server and throws an error

import React from 'react'
import RestaurantList from "../../restaurantList";
import RestaurantMap from "../../RestaurantMap";
import dynamic from "next/dynamic";
import { TravelMethod, useTravelStore } from "@/services/travel";
import { DirectionsInputForm } from "../../components/Maps/DirectionsInputForm";
import GoogleMapDisplay from "../../components/Maps/GoogleMapDisplay";
import { useDirections } from "@/services/directions";
import DirectionList from "../../components/Maps/DirectionList";

const NULL_STRING = "---";

export default function RestrauntsPage() {
  const {
    travelMethod,
    distanceMiles,
    timeEstimatedMinutes,
    carbonEmittedMt,
    updateTravelDetails,
  } = useTravelStore((state) => state);
  const { directions, updateDirections } = useDirections((state) => state);
  const firstLeg = directions?.routes[0].legs[0];

  return (
    <>
      {/* Direction Web View */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-9">
          {firstLeg?.end_address ? <RestaurantMap query={firstLeg.end_address} /> : <RestaurantMap query={'Boston University'} />}
        </div>
      <div className="col-span-3 justify-start">
            <DirectionsInputForm onSubmit={(formData) => updateDirections(formData)} />
        </div>
      </div>

      {/* Direction Form */}
      {firstLeg && (
        <>
        <div className="flex flex-row">
          <DirectionList
            startAddress={firstLeg.start_address}
            endAddress={firstLeg.end_address}
            totalDistance={firstLeg.distance?.text ?? NULL_STRING}
            totalDuration={firstLeg.duration?.text ?? NULL_STRING}
            steps={
              firstLeg.steps.map((step) => {
                return {
                  distance: step.distance?.text ?? NULL_STRING,
                  duration: step.duration?.text ?? NULL_STRING,
                  // @ts-ignore
                  htmlInstructions: step["html_instructions"],  // there was an error in API, so we use key-syntax
                };
              }) ?? []
            }
          />
          <br/>
          <RestaurantList endAddress={firstLeg.end_address} />
        </div>
        </>
      )}
    </>
  );
}

