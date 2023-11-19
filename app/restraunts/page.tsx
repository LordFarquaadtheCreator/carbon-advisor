"use client";
// without this the component renders on server and throws an error

import React, {useState, useEffect} from 'react'
import RestaurantList from "../../restaurantList";
import RestaurantMap from "../../RestaurantMap";
import dynamic from "next/dynamic";
import { TravelMethod, useTravelStore } from "@/services/travel";
import { DirectionsInputForm } from "../../components/Maps/DirectionsInputForm";
import GoogleMapDisplay from "../../components/Maps/GoogleMapDisplay";
import { useDirections } from "@/services/directions";
import DirectionList from "../../components/Maps/DirectionList";
import "./style.css"
import axios from "axios";
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

  const [address, setAddress] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (firstLeg?.end_address) {
      getImg(firstLeg.end_address)
        .then(url => {
          setImgUrl(url);
        })
        .catch(error => {
          console.error('Error fetching image: ', error);
        });
    }
  }, [firstLeg?.end_address]);
    const handleFetchImage = async () => {
      const url = await getImg(address);
      setImgUrl(url);
    };
  async function getImg(address:string) {
    try {
      const response = await axios.get('https://boston-hacks-405214.uc.r.appspot.com/restaurants', {
          params: {
              address: address
          }
      });
      return response.data.static_map;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null; 
    }
  }

  return (
    <>
    <h1>
      Sustainable Restraunts!
    </h1>
<div className="grid grid-cols-12 gap-4">
      {/* Direction Web View -> Static Image */}
      <div className='col-span-8 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>      {
        imgUrl ? (
          <div>
            <img src={imgUrl} alt="Restaurant Map" />
          </div>
        ) : (
          <div className="justify-center items-cent mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="rounded-sm">
              {firstLeg?.end_address ? <RestaurantMap query={firstLeg.end_address} /> : <RestaurantMap query={'Boston University'} />}
            </div>
          </div>
        )
      }
      </div>
      
      {/* Input Form */}
      <div className="col-span-4  rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <DirectionsInputForm onSubmit={(formData) => updateDirections(formData)} />
      </div>
      </div>

      {/* <div className="justify-center items-cent mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-7 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          {firstLeg?.end_address ? <RestaurantMap query={firstLeg.end_address} /> : <RestaurantMap query={'Boston University'} />}
        </div> */}
        {/* Input Form */}
        {/* <div className="col-span-5  rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <DirectionsInputForm onSubmit={(formData) => updateDirections(formData)} />
        </div>
      </div> */}
      {/* Prints Photo */}
      {/* Prints Resteraunts */}
      {firstLeg && (<>
        {/* <div>
          <img src={imgUrl} alt="Restaurant Map" />
        </div> */}

        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <RestaurantList endAddress={firstLeg.end_address} /> 
        </div>
      </>    
      )}
    </>    
  );
}