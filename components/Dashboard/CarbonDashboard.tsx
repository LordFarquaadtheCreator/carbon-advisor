"use client";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import './styles.css';
import React, { use } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import CardComponent from "../pollen/pollen";
import RestaurantList from "../../restaurantList";
import RestaurantMap from "../../RestaurantMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { TravelMethod, useTravelStore } from "@/services/travel";
import { DirectionsInputForm } from "../Maps/DirectionsInputForm";
import GoogleMapDisplay from "../Maps/GoogleMapDisplay";
import { useDirections } from "@/services/directions";
import DirectionList from "../Maps/DirectionList";

const NULL_STRING = "---";

export default function CarbonDashboard() {
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
      {/* Data Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Miles Card */}
        <CardDataStats title="miles" total={`${distanceMiles ?? NULL_STRING}`}>
          {travelMethod === TravelMethod.CAR ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 512 512"
              fill="none"
            >
              <path
                d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                fill=""
              />
            </svg>
          ) : travelMethod === TravelMethod.BIKE ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 640 512"
              fill="none"
            >
              <path
                d="M312 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h25.7l34.6 64H222.9l-27.4-38C191 99.7 183.7 96 176 96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h43.7l22.1 30.7-26.6 53.1c-10-2.5-20.5-3.8-31.2-3.8C57.3 224 0 281.3 0 352s57.3 128 128 128c65.3 0 119.1-48.9 127-112h49c8.5 0 16.3-4.5 20.7-11.8l84.8-143.5 21.7 40.1C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L375.4 48.8C369.8 38.4 359 32 347.2 32H312zM458.6 303.7l32.3 59.7c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-32.3-59.7c3.6-.6 7.4-.9 11.2-.9c39.8 0 72 32.2 72 72s-32.2 72-72 72s-72-32.2-72-72c0-18.6 7-35.5 18.6-48.3zM133.2 368h65c-7.3 32.1-36 56-70.2 56c-39.8 0-72-32.2-72-72s32.2-72 72-72c1.7 0 3.4 .1 5.1 .2l-24.2 48.5c-9 18.1 4.1 39.4 24.3 39.4zm33.7-48l50.7-101.3 72.9 101.2-.1 .1H166.8zm90.6-128H365.9L317 274.8 257.4 192z"
                fill=""
              />
            </svg>
          ) : travelMethod === TravelMethod.PLANE ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 576 512"
              fill="none"
            >
              <path
                d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                fill=""
              />
            </svg>
          ) : travelMethod === TravelMethod.TRAIN ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 448 512"
              fill="none"
            >
              <path
                d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                fill=""
              />
            </svg>
          ) : travelMethod === TravelMethod.WALK ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 320 512"
              fill="none"
            >
              <path
                d="M208 96c26.5 0 48-21.5 48-48S234.5 0 208 0s-48 21.5-48 48 21.5 48 48 48zm94.5 149.1l-23.3-11.8-9.7-29.4c-14.7-44.6-55.7-75.8-102.2-75.9-36-.1-55.9 10.1-93.3 25.2-21.6 8.7-39.3 25.2-49.7 46.2L17.6 213c-7.8 15.8-1.5 35 14.2 42.9 15.6 7.9 34.6 1.5 42.5-14.3L81 228c3.5-7 9.3-12.5 16.5-15.4l26.8-10.8-15.2 60.7c-5.2 20.8.4 42.9 14.9 58.8l59.9 65.4c7.2 7.9 12.3 17.4 14.9 27.7l18.3 73.3c4.3 17.1 21.7 27.6 38.8 23.3 17.1-4.3 27.6-21.7 23.3-38.8l-22.2-89c-2.6-10.3-7.7-19.9-14.9-27.7l-45.5-49.7 17.2-68.7 5.5 16.5c5.3 16.1 16.7 29.4 31.7 37l23.3 11.8c15.6 7.9 34.6 1.5 42.5-14.3 7.7-15.7 1.4-35.1-14.3-43zM73.6 385.8c-3.2 8.1-8 15.4-14.2 21.5l-50 50.1c-12.5 12.5-12.5 32.8 0 45.3s32.7 12.5 45.2 0l59.4-59.4c6.1-6.1 10.9-13.4 14.2-21.5l13.5-33.8c-55.3-60.3-38.7-41.8-47.4-53.7l-20.7 51.5z"
                fill=""
              />
            </svg>
          ) : (
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 576 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
            </svg>
          )}
        </CardDataStats>
        {/* !!! WORK ON CONVERTING METRIC TONS TO A FAMILAR UNIT */}
        {/* Metric Tons Card */}
        <CardDataStats
          title="metric tons"
          total={`${carbonEmittedMt ?? NULL_STRING}`}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 448 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
              fill=""
            />
          </svg>
        </CardDataStats>
        {/* Minutes Card */}
        <CardDataStats
          title="mins"
          total={`${timeEstimatedMinutes ?? NULL_STRING}`}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      {/* Direction Web View */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
        <div className="col-span-9 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          {firstLeg?.end_address ? <RestaurantMap query={firstLeg.end_address} /> : <RestaurantMap query={'Boston University'} />}
        </div>
      <div className="col-span-3 justify-start rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <DirectionsInputForm onSubmit={(formData) => updateDirections(formData)} />
        </div>
      </div>

      {/* Direction Form */}
      {firstLeg && (
        <>
        <div className="flex flex-row">
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>  <DirectionList
            startAddress={firstLeg.start_address}
            endAddress={firstLeg.end_address}
            totalDistance={firstLeg.distance?.text ?? NULL_STRING}
            totalDuration={firstLeg.duration?.text ?? NULL_STRING}
            steps={
              firstLeg.steps.map((step) => {
                return {
                  distance: step.distance?.text ?? NULL_STRING,
                  duration: step.duration?.text ?? NULL_STRING,
                  htmlInstructions: step["html_instructions"],  // there was an error in API, so we use key-syntax
                };
              }) ?? []
            }
          />
        </div>

          {/* <br/>
          <RestaurantList endAddress={firstLeg.end_address} /> */}
        </div>
        </>
      )}
    </>
  );
}
