"use client";
import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { usAea } from "@react-jvectormap/unitedstates";
import 'dotenv/config';

const Map = () => {
  return (
  <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-8">
    <iframe src="https://storage.googleapis.com/maps-solutions-ma64agra9q/commutes/bynr/commutes.html"
      width="100%" height="100%"
      // style="border:0;"
      loading="lazy">
    </iframe>
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

export default Map;
