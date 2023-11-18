"use client";

import { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { ICoordinate, TravelMethod } from "@/services/travel";
// import 'dotenv/config';

type GoogleMapService = google.maps.Map;
// type GoogleDirectionsService = google.maps.DirectionsService;
// type GoogleDirectionsResult = google.maps.DirectionsResult;
// type GoogleTransitOptions = google.maps.TransitOptions;

interface MapProps {
  directions: google.maps.DirectionsResult;
}

// function getTravelMethod(method: TravelMethod) {
//   switch (method) {
//     case TravelMethod.BIKE:
//       return google.maps.TravelMode.BICYCLING;
//     case TravelMethod.WALK:
//       return google.maps.TravelMode.WALKING;
//     case TravelMethod.CAR:
//       return google.maps.TravelMode.DRIVING;
//     default:
//       return google.maps.TravelMode.TRANSIT;
//   }
// }
// function getTransitOptions(method: TravelMethod) {
//   switch (method) {
//     case TravelMethod.PLANE:
//       return {
//         modes: google.maps.TransitMode.
//       } as GoogleTransitOptions;
//   }
// }

const GoogleMapDisplay = ({ directions }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API!, // ! THIS MIGHT FAIL
  });
  const [map, setMap] = useState<GoogleMapService | null>(null);
  // const [directionsService, setDirectionsService] =
  //   useState<GoogleDirectionsService | null>(null);
  // const [directionsRes, setDirectionsRes] =
  //   useState<GoogleDirectionsResult | null>(null);

  const onLoad = useCallback((map: GoogleMapService) => {
    setMap(map);

    // const directionsService = new google.maps.DirectionsService();
    // setDirectionsService(directionsService);
    // directionsService.route({
    //   origin,
    //   destination,
    //   transitOptions: google.maps.TransitMode.BUS,
    // });
  }, []);
  const onUnmount = useCallback((_: GoogleMapService) => {
    // setDirectionsService(null);
    setMap(null);
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
      {isLoaded ? (
        <GoogleMap onLoad={onLoad} onUnmount={onUnmount}>
          <DirectionsRenderer directions={directions} />
        </GoogleMap>
      ) : <p>REPLACE ME WITH LOADING SPINNER</p>}
      {/* <iframe src="https://storage.googleapis.com/maps-solutions-ma64agra9q/commutes/bynr/commutes.html"
      width="100%" height="100%"
      style={{border:"0"}}
      loading="lazy">
    </iframe> */}
    </div>
    //   <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
    //     <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
    //       Region labels
    //     </h4>
    //     <div id="mapOne" className="mapOne map-btn h-90">
    //       <VectorMap
    //         map={usAea}
    //         backgroundColor="white"
    //         regionStyle={{
    //           initial: {
    //             fill: "#D1D5DB",
    //           },
    //           hover: {
    //             fillOpacity: 1,
    //             fill: "red",
    //           },
    //           selected: {
    //             fill: "#FFFB00",
    //           },
    //         }}
    //         onRegionTipShow={function reginalTip(event, label, code) {
    //           //@ts-ignore
    //           return label.html(`
    //                 <div style="background-color: #F8FAFC; color: black; padding: 2px 8px"; >
    //                   ${
    //                     //@ts-ignore
    //                     label.html()
    //                   }
    //                 </div>`);
    //         }}
    //       />
    //     </div>
    //   </div>
  );
};

export default GoogleMapDisplay;
