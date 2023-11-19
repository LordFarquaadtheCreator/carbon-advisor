"use client";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

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
      <button onClick={() => updateTravelDetails()}></button>
      {/**  */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="miles" total={`${distanceMiles ?? "---"}`}>
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
        <CardDataStats
          title="metric tons"
          total={`${carbonEmittedMt ?? "---"}`}
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
        <CardDataStats title="mins" total={`${timeEstimatedMinutes ?? "---"}`}>
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

        <div className="flex flex-row">
            <div className="flex-grow">
                <RestaurantMap query={firstLeg}></RestaurantMap>
            </div>
            <div>
                <DirectionsInputForm onSubmit={(formData) => updateDirections(formData)} />
            </div>
        </div>
        
        <RestaurantList></RestaurantList>
    </>
  );
}

const TEST_DIRECTIONS = {
  "geocoded_waypoints": [
      {
          "geocoder_status": "OK",
          "place_id": "ChIJOwg_06VPwokRYv534QaPC8g",
          "types": [
              "locality",
              "political"
          ]
      },
      {
          "geocoder_status": "OK",
          "place_id": "ChIJGzE9DS1l44kRoOhiASS_fHg",
          "types": [
              "locality",
              "political"
          ]
      }
  ],
  "routes": [
      {
          "bounds": {
              "northeast": {
                  "lat": 42.3519217,
                  "lng": -71.0550703
              },
              "southwest": {
                  "lat": 40.752823,
                  "lng": -73.97719599999999
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "7:23 PM",
                      "time_zone": "America/New_York",
                      "value": 1700353380
                  },
                  "departure_time": {
                      "text": "2:36 PM",
                      "time_zone": "America/New_York",
                      "value": 1700336160
                  },
                  "distance": {
                      "text": "229 mi",
                      "value": 367983
                  },
                  "duration": {
                      "text": "4 hours 47 mins",
                      "value": 17220
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.3519217,
                      "lng": -71.0550703
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.752823,
                      "lng": -73.97719599999999
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "16.6 mi",
                              "value": 26690
                          },
                          "duration": {
                              "text": "35 mins",
                              "value": 2100
                          },
                          "end_location": {
                              "lat": 40.9117088,
                              "lng": -73.78355719999999
                          },
                          "html_instructions": "Train towards Stamford",
                          "polyline": {
                              "points": "cpvwFntobMg@m@yIwFmf@w[]WcsBusAqXuQ{NsJoDyB{DiC{FwD}@m@oAy@{CsB}CsB{CsB}CqB_@WyHgF_Am@wI{F_@W}CsByAaAaC}AeGaEs@e@_@UyHeFoCiB_B_Ay@i@gFiDGEqEyCAAiBkAyAiAUM_FyCoDaCyAaAMIIIKIMIKKKKIIIIMOKO?AMQIMCCKUEKEGKUIUISAEEMGUAGa@sAOi@Oi@Oi@Qi@Ok@Oi@Oi@Oi@a@sA_@sAa@sAWw@M]IUIUKSEKEIMWAAMUIMEEOUQUQSOQQSKKIGQQSOKIKIUO]U}@k@{EwC_CyAw@g@qAy@sA{@QKe@[e@[e@]g@_@m@c@AA[Y]W[Y[Y]][[[[CAYYY[[[Y[Y][[Y]W[[_@g@m@e@o@e@o@e@o@c@s@[e@IMMSU_@e@w@KQWe@iCyEaCkEkGeLm@eAWc@qBoDqEgIm@gACEoBoDo@iAo@eAo@eA[e@[a@IMGISWSWUWIKSU[]][GG[Y][a@[]Y[SECYQAAYQ[S_@SYOOGWOoD{AcBy@aBy@cBu@MEIEmCqAA?_Ac@_@Sa@Q_@SUKmB}@a@QIEyAq@_@ScCiA}@a@EA_@Q{As@GE_@QiBy@{@a@eAe@_CiAQIo@[cBw@_@Oa@Sa@Q_@SYMwAo@s@]wAs@mB{@m@WwAq@_Bu@cAg@a@Q_@QcBy@ICw@_@a@SMGQIgBy@[Oa@ScCiAAAaCiAq@[qAm@gBy@}@a@yAs@ICaAe@aAe@_@QcBy@aAe@aAc@aAe@QIOGaCiAsAo@qAk@a@SYMiBaA_Ai@]So@c@uA_AWQ_@Ue@YYS}AcA_Am@}@m@]UwBuAe@]}B}ASO_BaAyA_Ac@Ym@c@g@]QMmAy@{@u@[WYW_A}@cBoB}@uAeCgFgC{FqAqCgAcCQa@}@sBKUoBkEm@sAoAqCCGi@kAcA{BuB{EwCyG}@kBe@cA[k@k@_A_@e@]g@i@g@aA_Aa@[IGqBuAgAu@gAs@}AeAiCgBECqBsAkAu@y@g@}@k@{As@mAi@oBq@cA]w@Y}@[qBs@}@Wk@QkC{@kBq@OE{@YwC_A[MgBk@sAc@wCaAkDkAgEqAcEuAkDkAwDmAkDgAGCwC_AqAc@eBo@gAa@_Bq@aAc@kCsAgCmAq@a@KGsBmA]S{A_AWOUOKIgBgACASMWOo@a@cBaA]Q_Ak@i@YuA}@_Ai@MEg@W_@U_@Sm@[mFsDyFyEMMgCeCcJyI}GsFsDyC_@Ye@_@q@q@o@k@_AiACEs@mAk@}@S_@Wa@Wc@Ue@eAwBQa@O_@CE}@aC_@gAIUg@gBaAmDOs@AGSkAo@kEACAMKq@_@cF[uEACAOY{DACe@uGMgA[kBESEYMm@Og@Oi@m@yBSo@Ka@CGMk@]uAOk@GYAAGW_@}BCMIm@UqBM_BCa@ASAWAS?CEsA?uA@{@?ELuD@GDm@J}AL}AXaEBY@IToCH_ATiDLsBFqA@m@@_@@G?Y@c@?yBCqAAQCw@Eq@Ec@UkCO{AEm@Go@Gm@AKGa@Ea@AKKeACSGaACo@ASCYGaBC{AAM?qAA_@B}@@]DgAPeCDm@Di@Fs@Fo@BU@KHy@?C@ONgAHm@Hm@Hm@Hm@Fm@Hm@R{ALw@`@sCF_@Fq@XwBF]\\gC@GFe@Hm@Hm@F]^wCFe@@GHm@@I`@yC@E\\oC`@{CNaAHq@DWFc@D[@KJs@DQ@QNcABWJs@Fg@Jq@PsA^mC`@_Dn@wEXuB@CR{AR}AXkB\\mC`@yCFa@Jw@Z_CXyB^sC?CN{A@GBe@Du@FwA@a@?M@o@?O?_@?_@?a@?EAo@A[?SAg@KgBCm@Cm@Cg@?GC]E_AAWCo@Em@Go@ASCYGm@AI[oBCM]aBKa@I]YaAmA_D_@}@S_@g@{@k@y@a@i@k@o@QUm@i@u@m@QOKIg@]eAu@k@e@_@Y{AgAu@g@FS"
                          },
                          "start_location": {
                              "lat": 40.752823,
                              "lng": -73.97719599999999
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 40.9117088,
                                      "lng": -73.78355719999999
                                  },
                                  "name": "New Rochelle"
                              },
                              "arrival_time": {
                                  "text": "3:11 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700338260
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.752823,
                                      "lng": -73.97719599999999
                                  },
                                  "name": "Grand Central Terminal"
                              },
                              "departure_time": {
                                  "text": "2:36 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700336160
                              },
                              "headsign": "Stamford",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Metro-North Railroad",
                                          "phone": "1 (212) 532-4900",
                                          "url": "http://www.mta.info/mnr"
                                      }
                                  ],
                                  "color": "#ed1c24",
                                  "name": "New Haven Line",
                                  "short_name": "New Haven",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 5,
                              "trip_short_name": "6338"
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "177 ft",
                              "value": 54
                          },
                          "duration": {
                              "text": "1 min",
                              "value": 55
                          },
                          "end_location": {
                              "lat": 40.9114981,
                              "lng": -73.7841466
                          },
                          "html_instructions": "Walk to New Rochelle",
                          "polyline": {
                              "points": "equxFfziaMh@tB"
                          },
                          "start_location": {
                              "lat": 40.9117088,
                              "lng": -73.78355719999999
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "177 ft",
                                      "value": 54
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 55
                                  },
                                  "end_location": {
                                      "lat": 40.9114981,
                                      "lng": -73.7841466
                                  },
                                  "polyline": {
                                      "points": "equxFfziaMh@tB"
                                  },
                                  "start_location": {
                                      "lat": 40.9117088,
                                      "lng": -73.78355719999999
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      },
                      {
                          "distance": {
                              "text": "212 mi",
                              "value": 341239
                          },
                          "duration": {
                              "text": "3 hours 56 mins",
                              "value": 14160
                          },
                          "end_location": {
                              "lat": 42.3519217,
                              "lng": -71.0550703
                          },
                          "html_instructions": "Train towards Boston",
                          "polyline": {
                              "points": "{ouxF|}iaMVu@yAcAi@_@q@e@q@o@?AiG}Dq@g@}@q@c@[mAy@s@i@eAw@_Am@[UCAWQo@g@]W_@WYSc@[UQa@YaBmAu@i@}@o@CAQMo@e@a@[wG{E_Ay@o@o@a@g@k@m@e@m@y@mAe@o@i@{@KOe@s@KQe@s@aBiC{BkDmAmBU[iAgBa@o@g@w@cLmQcEqG]k@eA_BMQwA{Bw@mAoAoBgBmCEGmAmByDmFoA_BaBqBgC{CQUyAgBw@}@u@}@UY{@aA[_@mAyAUWGIMQs@u@eAmAAAm@w@_AiAs@{@q@u@Y_@SSo@u@aAkA]c@[c@WWGI}DyEyCqDGI{BmCaAkAeFgGuH_J_@c@y@eAuCiDq@w@gC{CWYiByBa@e@kAuAiCaD_BkBwCmDMQg@m@Y_@[]e@k@OSMOMOy@aAKOMOqA{A[_@u@}@wAcB}AkBGIw@}@EGm@u@OQSUGG}@gAm@s@GImCcD}AkBIIu@}@UWUWu@}@KMOQy@_Aq@y@a@g@kAuAGGiAuAY]o@w@a@e@WYwAeBc@i@MQmB{BoA}AqRmUyEyFoA{AaBoBKM_AoAKSi@w@GKq@eAEIuAgCUe@iA{Bc@_Ao@oAk@iAq@wAeA_CmA_DCKWy@Ok@]wAGWKk@[eBQmA_@oCw@mGe@wDCYMaAIm@[iCg@aEGa@c@mDKw@M}@YaBEMIc@Ke@CKQu@Ok@Y{@So@Us@Ui@_@}@Qa@Uc@aAkB_@m@oAyBg@y@a@s@oAwBqHeMgB}CqA{Be@u@gAiBKQMSuBqDgDyFIOKOYg@QYiAmBqA}BGG_@s@_@m@gAiBw@kA]g@OWa@o@KQw@sAm@eAWc@mCsEcAeB[i@o@iAWa@gAiB?A[e@{@yAUc@e@u@IO}@{AeBwCYi@MUUe@OYUi@MWOc@Sk@AASo@Kc@Sq@AGOi@A?YqAWqAKm@SyAG]AOIm@QyA?AO}AC_@AMGm@M}AIs@a@mDYyA_@gBWiAQo@[cAk@cBGQ_@}@O_@MUIQACYk@q@mAi@y@eBeC[_@CECAo@s@mDoCGEm@g@cGoE{AqAo@g@i@c@w@m@s@k@_@Yi@a@AAQOa@[uAeA_Au@gAy@i@c@q@i@aAu@YSq@i@w@m@m@e@]YYSEC[WAA][GG[S{AmAGEqB{A][w@m@aBoAyAkAGEu@k@CCk@c@MKOMYW]Y{@q@QMiA{@MKo@g@UQ_@YYU]WCAa@[e@_@?Ac@_@USc@e@WWCEY]SWGGi@{@GKYg@?Ai@kACIO_@Qg@ACOe@Qk@AGKc@Mk@ESCMQkAI_@AMMmAQiC?QCo@Em@Ae@Eo@A]A]CYKsBC[GaAEm@?IGc@MmAM{@Gc@AIKk@Mm@Kk@CK_@uAI_@Oi@GY[mAWcAEMWcAACW}@c@eB_B{F_@kAQm@e@kAm@uAUi@We@a@s@]k@k@y@k@y@U[]c@CCs@{@MQKMMM_AmAOQs@_AIIqB_CwBmCyCmDe@k@}BmC}AiBuBiCOQe@k@yAeBk@q@oAyAmAuA{@cAs@y@mAuAwAaBiAuAy@aA_AkAu@iA{@uAYg@aAiBYk@q@uBQi@Yy@GSGSGUEUYoAScAG[Ga@S{AQyAI{@C[GaAAIEy@A[?EIgCAa@EgB?CAo@Ao@?CG}B?KCo@Ao@Am@IoCCaAAm@AWAWA]Ak@C}@AGA]?OC]AQAME_@C_@AOE_@MsACUCSEYCKUmAYwAYwAScAYqACOEQ?Cu@qDc@}B]{Aa@_BMc@Om@{@mC[}@u@{BoCiIsD}KgJyXkBwFGQc@uAGSe@oASk@y@iC[cAK_@CI]wAESGUWyAAGSsACKEa@Q{AK}@Q{AE]S{A[eCCOAQo@eFc@oDIu@Ks@q@oGCUq@}FS{AIu@WyBIw@Eg@KeBG}AAMEaCCkC?AC}DAsA?a@EwEIkLM}OGkJGmICwB?GA}@G}GAcACiAE}A?AG}AA]AQEo@EcACUAUUmCIcACWIm@KeAWoBU}AKm@_@gCKk@Im@OaAEUEUc@uC]_CAGwC{Ru@cF?CIe@_@gCIm@Im@Km@i@uDE_@Oy@QiA]iBe@yBu@qC}@qCm@gBiAiCEGw@{AkAqBi@w@mAaBQUs@{@m@s@}@}@qAkA{BcBiCiB_FmDsCsB_Aq@[[cAcAi@o@AAs@_ASW{@sAk@aAEI]q@Yo@k@sACE]}@EKUk@GWIYQi@Oi@Ok@Oi@Ma@CM_@uAI[EM]sAc@yAOk@CKUy@w@uCYeA}@aDkB{GMa@AGIY_@sAa@{Ag@iB_@sAe@aBYiAOi@GUSs@Me@ACKa@Ss@Oi@Oi@K_@CKc@{A]mAW_AGSk@sBu@kCc@uAu@wBSg@]w@KUq@sAKSMUo@eAMUaA}AQYs@gAU]q@eAMQa@s@Wa@KOy@oAYc@[i@Ya@o@eAWa@Wa@y@oAQWYa@Ya@CEUYMOY]SQSUGI_@[c@_@y@o@}@m@}@i@u@a@w@]}@]u@Wi@OuA]iAUiAQ}AYsA[_BYy@OaDm@yCm@oAWSEUEgBYuAYkAYqA_@eA_@aAe@_Ag@iAu@{@o@}@s@_A_AaAcAeAuAcBoCgAyBw@uBCIm@gB_@yAOq@Q{@WyA[cCSwBG{@Cu@I_CA{A?iABkAB}ALiCt@}Mp@yLf@_Jb@uHLyBJ}ANoCDk@NmCPqCH}A`@{GHwAJwC@gCA_BEaBA[KiBGu@Gs@SkBEYSkAScAOq@WeAGS_@qAk@}A]}@Yo@]s@a@u@uAcCcF}IiKwQkBeD{@cBi@mAi@qAq@oBu@kC_@{A[sAQaA]oB]eCQcBMcB?AKaBGyAAQASe@cKWaFI_BGoAAe@Cg@Em@Co@Co@Em@GwAEu@MmCIcBQ}EEwCAu@BiCBcDDyBB}AFaDPyKTqNLyGXuOFqEFgEBqCEoFAS?SGuAIgBAUCWEo@Gm@K_BEm@Go@C_@QeCCUCUSmCSkCC_@e@eGUwC[cEiAeOWuCWoB[yB]aBg@wBOg@a@wAo@gBGOc@gAk@gA]k@Yg@iBkCq@y@kCgC_BmA]SYQiB_A}@_@yMqEgFeBoIqCu@Wc@OiAe@}BoAaAq@sAeAoAgAGGyAmA{@u@iAaAiAcAIGoAiAyBoBOKOM?AoAiAi@a@s@k@g@g@yAsAwAmAcByAIIIGUQwCkCuAkAGIqAiAmAmAYYUWAA?AMMQSU]W_@]m@ACQa@MY[{@a@uAKc@Q}@G[a@cDIm@Im@Im@Ik@Im@S{AS{AOoA]eC_@{BWeAKc@s@wCIWK_@a@}AOi@aAkD_@uAOi@_@uAAAI_@a@uAOk@_@sAo@_C_@uA_AiDEQEQo@_C_@uAaB_GiAgEGSEMg@iBW_AQq@y@uCgA{DmAoDKYg@yA}@aCKUKWsAyCu@{Ai@qAk@oAe@eAUg@iB_EcRab@i@mAiB_E}@sByEoKw@gB}BgFqCoG_@y@[}@mAaD?AOg@gAsD}@yDGSy@aECSCSe@}CCOS{AIg@W_C}@uHE]Gm@w@uG[oCCSa@cD]}Ck@wEYeC{AmMQ{Aa@iDCSCS_@wCQ}Ag@eE]_DYcDc@sGQeFG_B?CMyCA_@O}DKmCeAuYWyGCq@SmFMwDUuGE{C?sDBmBFwBFaAHwAVwCToBz@mGlAwHp@uE`@gCPiAL}@Jm@`@gCTyAnAeIh@eERuBN_C@KBo@F_B@[D{B?e@@mAAQAcBEyAGsBGiAGeA]mDa@aDo@oDCMs@aDsDyOk@aCESEQ]wAi@aCmAoFeDsNQu@?CiC}KuBgJcCkK]wA]uAI[o@{BGQa@kA_AmCa@cAQe@sBwEiF_K_ByCwAmCGKGKkCaFkF{JIOCGmCeFm@iAUc@m@iAKSMSk@iAWc@m@iAa@u@cAoBcAmBKSKS{@_BOYEIWc@m@iAEKGK}@eBWc@m@iAUc@m@iAWe@Uc@cAmBIMGM}@aBm@iAgFmJOYsAiCKUSg@e@iAUo@_@kAACW_AYkAUmAUkAOaAMaAMoAEa@Ee@?GE_@CeACo@GgCAk@?YCgAEwEGqEI{EGyECmBAq@C{@?c@C}AAo@AS?QAo@Ao@C{BEqBCgBAe@AiAEmBGeBGmA?QEu@ImACUASKwAOyAAGOuAS{AQoAU_Bi@_Dg@iCYgA[wA_@yAOe@WaAY}@Mc@e@wAEKUq@Uk@c@iAe@iAe@gAg@eAoAiCg@{@g@{@IMGKe@u@c@q@u@eAu@cAy@eAy@_AW[e@i@QQ[[]_@OOQO{@y@y@w@][e@c@oBkBmBgBiBeBkBgBsBoBkBiBmAsAmAoAg@o@a@g@kA_BUYACi@w@qAmBgBiCiAcBWa@MQc@q@i@y@a@k@Ya@iAeBkAeBaFqHaFkHg@u@sCkEQUiCwD}DaGkAeBw@kAk@{@eBgC[e@o@_A_BeCiAgByAqCy@sBk@gBg@kB_@oBY_BWkB_@eCWiB?EG_@q@yEg@qDWsBIm@UqBYmCa@wFMkCMyCI}AG_BCs@Cu@KmCIoCCm@KoCGaBAWAYKsCG}AG_BGuA?GA]C[GuAIuBCo@Cm@G_BA]A[OiDEm@I{BKqBI}ACo@Co@I}ACo@?MC_@A_@G}ACo@G}ACq@I{AEo@I}ACm@CWAWCo@G}AEo@KmCC_@K}CMmCGcBAWA_@AMA[K}DE}AG_BAe@CUCo@Co@KmCO{DCk@?AAi@G}AEiACo@Ci@ACEo@Em@E]Iu@Gm@AAIq@Im@Kk@G]EOUcAESKUSi@a@}@Ug@CCS]W]]_@IKm@g@c@Ye@Y[KKEy@O]I{@EOBY@m@FkLhAmALsBPG@K@U?cBN_@BmCVmCVgAJgAJgAHa@BI@Y@S@O?c@Ac@Ec@Ey@GMC{A[oBy@qAi@eAk@}@i@m@_@q@e@s@e@k@i@]]w@aA[e@Yg@k@gB[aAu@_EAEe@sEGcAEc@SwFS_F?MA{@A{C?U@yD?u@@]FaD@m@HmFJmFJoF?SDkC@]Bq@BiA@aAH_EFyD?CBmAFqADmA?E?KD_A?o@@}ABuD\\eQHqDTyLB_B?CRaD?I@m@@MDiDD}AB_B@o@B_BBw@?Q@[@o@?KBmABm@B_BLiGByIKoDUcDKaAm@_E}AsHy@mCA?e@qASe@yAsCqC{E_HeLiJqOo@gA_@k@i@{@AEMS}@wAWa@iAiBgAiBSYEGo@eAMUIOs@mAo@eAo@eAi@{@_@m@KOIMaA_BgAiBeKwPU]kGuJu@kAS[qAgBKKa@k@iBsCiM_SqBsECGi@yB]uAOm@Ok@Kk@UoAWyAaFyYQaAEWWyAa@gCKk@WyAYaBm@mDWyAIi@AA_@iCUyA{@aFUyAW{AIe@AEKm@Kk@c@gCMs@uHqd@oD{TaBmKCI{@_FUmAIe@EUc@cCgAcGoAgIo@iEGY{@_FYcBYyAuAsFU{@EOmAcDYs@Ug@kGiOgAoDQc@WgAsAmFaBiIoAoGKm@gDaQCICOgAqEsAqEgAqCK]_@k@gAgBKOKOU_@o@kAeAmBS_@cHmNk@kA{@cB?AOi@K_@CKu@}BWu@WiAi@cC_@}AG[Im@EUAES{AKm@Im@E[ACIm@Gm@AQEe@C]I_A?CAk@Co@Ao@I}D?C?k@A_BAo@AoCC}DCiB?A?Y?Y?[CsBA_BMmLa@}a@UaIGuB}@eI]gBWyA_@qBGS_@uA_@sAq@_C_@uAQo@Y_ACEEOIQw@mB}@wBuBkFkDqJcGaOsHeR}GqM_DcGyAsCcAmBeDmG{IkQACuGaM_D{FcGcLKSaIaPsEiJuEuHqIuL_CgDsAkBu@gAqHuJ[c@s@aAaCcDwCaECCs@cAoCwDuFyHs@aAgBcCq@aAwU_\\s@aAi@u@c@k@MQIKeAyAs@aAgOsScB_C_DkEqDaFyHuKyAsBe@q@aCeDsDiFyBkEyAeD}BuGcDiKmAiFwFeTo@_CWcAGQQq@CGOk@k@iBUs@M]qAgDa@m@qPyRu@}@qA{Aw@}@u@}@]_@W_@SSGIqAaBqA}AoA}Au@_A[]MOIIw@aAu@}@yKsM[_@[_@oKkMm@cAgA{Ac@u@eAmBsIuOyBgE]q@e@}@Wa@CGaC{EUa@AC}@cBmAwBmEeIyAmCYg@CEo@qAa@{@OYIMeAkByAiCWg@AEyAsCWe@mAaCa@w@aDaGOc@oBsC[c@_CyCyBiC}DkDcA}@iD{CqCaC{@c@sAg@A?eAWeAWa@Kc@Ig@Iw@IQCEAKCgB_@eAUSEIEeBw@a@SyBcA{@e@OIqAq@MI_@Ua@S_Ai@_@U_@U{@k@iBmAUQKIyAw@]Ou@_@w@e@sA}@_@]SQYYu@}@_@k@IKs@wAa@cAe@wAg@{AWu@Og@Qg@Qk@Uo@[eACGQk@Mg@K]Mi@EOCMWmB?IGm@GaAA]CeA?]?i@?{@?mA?qAA_AE{@AWAWGk@Go@Ga@Ge@Kc@AGCOI[Ma@Kc@M_@KUGOSa@M[CEQ]S]c@y@MWk@aAs@mA[o@OYIKQ]IQKQS_@MSIOWc@IS]m@[k@Q[EGWe@CE]m@GMGKOW]k@]m@O[CEUe@k@kAiAcCQ_@[s@Wm@We@IM?A]s@c@w@q@kAEIiAgB_@m@a@k@u@gAa@i@m@s@k@q@e@k@MM[a@cAkAQUi@m@c@i@o@u@w@_Ak@q@Y_@Yc@o@eA[q@o@uAYy@Y}@Uy@YcAQs@Ig@UmACKQiAKo@AMKm@?AKaAMoAEe@CYEw@EmAE}@CoAAeAAoA?k@@]?S@i@@_@?A@_@B}@Bc@?ADk@Ds@Dk@?AHy@Hy@BUHm@@MNu@DUHi@Jk@H]FQ@MZmA^sA?Ad@}AXs@Xw@p@eBZo@\\q@Xk@Ta@Va@V]PYR[b@i@|@gA?AZ]r@u@\\]XUVUJIXQf@_@VQROh@]ZOv@a@f@Wd@UHEfAa@`@ORGZKZIf@If@KjBSBAl@Ed@EPCTAb@AL?fAC^?B?Z?bBFZBN@L@bD^~C\\~C\\hEf@p@Fn@Hh@F~@JpBRpFp@hBT`BR~ARH@d@H|Dt@H@|@HrBRfAHdAJdBRfAN^Dd@FxC^VB|BXNBhDd@h@Hn@HrATl@FnC^t@F`@BP@zCNnBCnAA~@?n@GNAh@G|@KLC`@Eh@In@KZEn@Mv@QbBi@p@Sp@Un@W~@a@~@c@f@Wr@c@d@Yt@e@r@i@VUx@k@lAeAhAaAfAaAJKp@m@j@i@XYfByAz@u@bCyBz@u@DEr@o@d@e@h@i@n@m@l@s@`@m@Ze@`@u@Ra@\\u@Pe@HSHWVy@Pq@R}@H[Ji@F]n@sDrAcIVaBLw@L_AJgAFu@Dq@?OB]@e@BaA@{@?o@@k@CoACeACm@Cc@AWASs@sKEs@Ek@QkCEm@Eq@K}AK}AO{BK}AoBqYc@yGKaBI{AEcAEkAAm@?YAcA?q@@o@@s@Bs@Bu@F{@D_A@ADq@Hq@LmANeALaALw@Jk@^sBRcAjA_FXkA?ANi@BId@_BRo@L]d@sAPg@d@mAVo@Rc@HSRe@N[r@uAt@sA^k@HQzE}Gl@{@^k@f@y@p@qAZo@Tk@d@wAL_@BIJa@VgAFWFYN{@VyALo@F]j@gD^uB@G^{BJs@RyABORiAPkABOHc@@CHg@n@uDDUF_@NcADa@Fg@NsAH_AF_AJqBB{@DqABq@BqC?I@_BBoC@cBByA@_BTmUB_B@uAAw@?m@Cq@EgAM}AEUIu@My@G_@G[Oq@Qq@_@sAESQi@K[Wu@w@oCo@wB{@sCQo@Mi@Oo@G[Gc@Q{ACYEg@Cm@Cu@Aw@@mABw@Be@?AB_@Fm@@MD]Hi@NaAFY@IHc@TkAXyA~@_FVoAF]Jg@Nq@P_ALu@Nw@Lu@Jk@Hk@Fe@Hg@Fk@Ho@Fk@Fi@Dk@JkADm@Fw@Do@Du@H}ADs@Bg@FoADiAHwBF_BB}AB_ADcBFuBFmDFwBFeDFiCDuD@gB?G?eC?_AE_CA[GaDAKGmCIuBKcDOsEIiDOyEAAE{AIoCGgBCe@E}AIeC?GCo@ImC?ACm@CcAAY?A?_@AO?WAiA?}AAU@Y?iA?S@o@?o@?E@i@DuA?I@Q@g@@a@D}@Bc@Bi@@ODw@FcAJqAD]Dk@Fq@BMLkA?ANuAJs@Hk@Ho@Fa@Ly@Fa@Ly@Fe@@GF]T{AHm@Fa@Lw@`@iCZsBNaARsAJs@Hk@Jo@XmBj@qD\\yBPoABIHm@Ju@N{@@IHm@VyAT{Ap@mEzAaKJw@NgAVcBTyAZ{BV{ARwAJo@Jq@Hi@DUNcAFc@@EFg@RqA@IPiABOL{@VaBPiANgAN}@BQD[N}@TuAT}APmAHk@He@Ju@BQRmAPmA@GPkABML{@F_@Js@PmA@EPkANaAHi@Jo@PoATyAJq@Jq@D[N_AF[TuABUTyARsAVcBVeBVcB`@eC`@sC\\}BPgAJo@Z}Bn@eEh@gDVkBPwAJaA@WFm@FgA@WBg@DmA?Y@Y?m@?q@?C?w@Aa@?SCu@Ao@Cw@Eq@Cs@Eu@?GCq@Cc@Cc@AKAk@G}@?WASCSI_BAOA]Em@?ACo@Ew@K}BC{@GeAEcAAWQqDI_BMwCAWEk@?CG}AAS?[IuB?YA[ASAc@A_A?i@Ao@?UA{AAmAAk@?s@AgAAeAAaB?m@A_BAo@?G?g@C{BCgDEgCGsDAKE{CGgCEcDA_AGeDEmBIqFCmBG}DG{CAu@Ck@Co@Ck@AKCc@?EEg@KsAAIGg@AEIk@E]EQKm@E[EO?AWkACIOi@a@sA?AQg@K[e@uAEIQg@EIM]Si@Qg@_@aAGMQg@Si@Qg@]{@?AM[EIGQUk@M_@CGSi@CG[cACEWu@K[m@eB]aAUo@q@gBCEQg@qBsFAC}AgEe@qACIcAsCSm@W{@IYYcA]wAEOMk@[sA?CUeAQcAQaAW{AM_AMgAa@iDaBsNa@gDeBmO_AcIOwA[oCm@gFCUCWc@yD_AaIeA}IoDaY_@yCq@oFcB{MWsBWmBKy@_@sCYwBQwAUiBWoB[iCM_AEa@YsBS_BE]QoAQuACQSuAKcAOkAEYMgAOgAK_AK{@QuAOkAQmAKaAM{@Q_BAAOqAMkAMgAK_AMqAOeBOuBQ{BO{BKyAMcBK_BCg@IiAYcEQwBS_D_@yFIkAIoAKkBIiAEs@KkBQqCK_BEm@KaBGo@?AGs@MsBAYM}AAKYiECSOmCGy@Ec@ImAAQGw@Ce@G}@Ek@?AEi@K}A?AGqAAIEiAEaACoACiAAg@Ai@AeAAgB?gA@mB?mA?e@BmG?[@oC@oC?}AHmU@mC@qCBoI@}D?w@?g@@oC@oC@_B@}A@oC?_B@o@?oCFmO?IBuG@iDBsEB_HB}J?[@sBByGAs@?UA_A?q@Ai@Aa@A[A]E{@E_AEo@Cg@COI_AGs@Io@Ge@Kw@SuAAKU}AO{@O}@sAiJ?CKo@Ik@AKa@yBAGUqAKq@cBuKcAoGu@cFG_@GSIo@AIGWEYM{@SkAEYO_A?CWgBSoAUuAIe@OeAM}@CKIi@Ii@OaAO{@Kq@CMQgACQIm@AEIg@Ig@Kq@AIIc@Ga@CKIk@AEQmAAGIm@AEIg@Kk@UyA?A[wBWwA[oBQmACIQuAAES{ACKEe@COGq@Gk@Ce@Ew@AKCw@AYAIAe@?SA_A?{@?K?c@@[?S@k@@C@i@Bc@@ODq@F}@BSBS@WBOFm@@ENcAP}@@MP{@DMj@oCf@yB\\{A`BmHtAgGNk@v@oD\\wApB}IbBsHj@cCtAeG~BkKzBwJh@wBH]f@aCj@eCj@aC~BkKdBqHJg@hA_FfA{Ef@uBPw@^aBXmAPw@j@uCN}@H[PqAJ}@Jk@Hy@@ADk@Fo@D]@O@O@_@B[B_@B[@]D{@@W@i@?EDeB\\iN?MDiBB_BD}A@[@Y@e@Bw@@c@?KD_BJwDDwCHwDDuABqA@[B}@DuBD_B@y@BsAFiB?GBeBDqA@c@H{CHqD?K@m@@c@@MB}ABo@BsAD{@Be@DmABYHmAHkAL_BH{@RoBFa@Hq@VmBPqAXuBLaAh@eE~BmQHm@nAmJz@sGf@wDHg@BYF_@Fg@Fo@XeCDc@@OBOHmA?AJ}ABc@Bo@Be@DcADeABuA@_@@e@?Y@eA?u@@cAAuAAiAA_AAm@A]Ai@Ai@Cs@Co@GgAG_AGcAAIM}A?CMoAIw@E]COIm@Kk@Io@Kk@Im@ACIg@EUEWIc@k@_DOw@eBeIYyAMk@g@cCMk@UcAa@mBcGiYoCsMuA{GmAaG]aB[wAMk@Mk@CKe@wBI]CMMk@_@cBK_@[wAQu@g@eBEOWw@I[GSQi@M[MYAEQ]O_@[q@Wi@AA[k@Wa@Ua@S]MSU]SWm@}@[c@m@aAOS{@mAgA_B{@oAU]a@o@q@_Ai@y@W]mAgB?A_AuAg@y@i@cAUc@{@kBCGeAgDISEUOk@Mk@c@gBGYU{AO{@WiCGoAOoCO_DGkDG_EAo@?W@wB?q@@k@D_B@o@D_B@i@Bk@Bo@F}AHeCHgBJoCL}DRmFDy@FqB@QVmIPmFXkIL_EBo@L}D?KRqGB_@B}@T}GHkBPqGHmCPmFHoC@o@Bo@Bo@HmC@_@?O?o@?_@AOGsAIw@Go@Gm@Go@O{AOiBEc@e@yGEm@e@{GKqAIy@[{D[uDAEW{Da@eGCUWeEEe@[cE_@aFu@wJKyA[qEImAM}AEo@?GEe@Ec@Gy@AKEa@Eo@Gm@Ee@Iw@Gm@Ec@AKWkCc@yEAOo@wGc@oECWe@iFe@_FWsCO}AU_CIq@Ec@Is@Ie@UyAWuAEOWgA_@{ASs@Sq@[gAYeAWaAKYW_AYaA_@qAACe@eBIUOi@Ma@Qo@YaAa@sAUy@AGK[Og@i@kBi@kBi@gBg@kBoAmEGS_@uAQi@o@_CGQCKK]c@yACI[iAk@qB_BuF{@yCy@wCw@oCo@}Ba@uAQk@_@qAeAoDy@uCqAuEOi@GQk@sBMc@sBiHa@sAcAmDMg@g@eBa@yAEKa@uAQg@So@Oa@i@{Aa@iAQe@i@sAo@}A_@{@Sg@AEe@gAq@aBSg@{AsDSe@gAkCuAkDm@sA?AaB{Dk@wAYu@mAwCs@aBYu@}BuFqB{EqD{IoAyC_@aAc@kAQc@Oa@Sw@GWKc@Mg@G[Ge@Ge@Gi@?CCYCc@Ac@CqA@_@?k@@]?SDkAHeB@U@YBo@Bo@Bo@L}DJmCBo@?CBk@Bo@Bm@Bo@Bo@Bo@Do@Bm@Bo@Bo@Bo@F}ABo@V}G@WRyEHuBDcADy@LuBDm@Dg@LcAFm@D]RyADOJm@P{@Ry@b@_BJ[ZaATs@JYNa@Ti@b@eA~@{Bv@eBfC{F|BiF`BuDXs@t@cBr@}AL[DKTe@f@kAh@oA~@uBRe@`AyB^}@Zq@Rg@Te@b@eAVk@?ATg@jAmCrA{Ch@kAh@oAnAwC@C|@uBb@aA`AaCTg@Rg@DKL[f@qAPe@Pi@Rg@HUFQPi@@C`@kAPk@`@sABGZmAb@{Ah@{BF[FYv@sDVwAPcAVuAPeAHm@`@aC?EJm@DWBUVoBDYHs@Fg@Ho@Fk@?AJ_ABe@De@BYBUDi@H_BJkB@e@Dm@@Y@UBo@Dy@DsA@U@YH_BBm@Bo@F_BBo@HmBB_@Bo@Bm@F_BBi@@EN}DBq@LkC@c@Dy@HyBJsBF_BBy@Bc@LoCBm@Bo@JmCBk@DiAFgA@QFeADu@Hy@Fq@Da@?AHk@DYJs@Hg@DQJk@@IJa@F[R{@Ty@H[Pi@@IL_@Pi@h@yAP]FOx@aBBI`AiBRa@Tc@dAmBP_@BETe@\\s@`@_AFQNa@L]L]Ni@BIHURu@XiADWFYPy@RkAL}@?AP{AH}@Da@Bc@JsBBc@@[FmA@u@@_@@sA?y@?y@?e@?}A?M?m@?A?k@?A?wAAOAM?E?i@@y@Ac@A}BAwA?g@?]?gBCmE?{BAcDAwAAsA?e@C}@Cy@A[Eu@GaAGs@Is@K}@Ge@Ga@Ge@I[Ii@Ok@GUQu@CKKg@Om@Sw@i@wBSw@I[YmACKMg@[mAa@aBYeAU{@wAqFeA{DOi@?AmAuESs@s@kC[mAW}@W_Aw@{Ca@{A_BaG_@uA_@uAQe@AAQc@e@eB_@yASs@Qq@W_A?AOk@Oi@IYYeAS}@EOMc@wAiFYgAMe@[uAAGWiAWkAE[Ky@Ea@E_@IiAEsAASAmB?K?q@?k@?k@?u@?E@kC?m@@e@?y@?m@GaCE{@Go@Gw@Gg@Ik@ACKm@QaAEQAICI?CMs@Sy@UqAMm@M}@OcAK{@CUEi@G{@AQC[Cc@GmACo@Em@GkAAQEm@Cm@E{@GcACa@a@{HOmCBo@@U@g@I}AEo@QmDAOCc@Ey@A]AQEi@IcBCo@Cm@I_BAOMiCCc@MyBEcAEm@IiAK}@?EIs@Ky@Ii@Km@Kk@ScAAGI]Mg@Oo@Qs@ACOg@Og@AC[y@i@qAISKSYk@OWKSk@aAS[IOMQc@m@AAMQe@m@w@{@q@q@q@m@QOa@_@}@w@q@m@KKSQuAkAgB}Ao@k@YU_Ay@gC}Bo@i@YYsBiBEEq@m@_@]USk@i@c@_@m@k@[[QO_@]g@i@s@y@SWUYe@o@_@m@[g@_@q@S][m@a@y@KUw@mBa@gAeB}EqBsFAGsC_Ie@qAQg@Wq@IYKYSg@Qi@[{@ISWy@Qc@[_A]_AYw@EM[{@Uo@GQa@mAOa@Si@_BmEOe@Oa@K[Yu@sByFIWeB}E[{@IUc@iAAE_AkC]aA]aAQe@wBeG}@cCSk@i@aAWq@Yw@c@mAm@aB[_AQe@Oa@]aAWw@a@oAY_AW_Ac@iBU_ACOQaAY}AO{@?EKq@MeASwAKeAMeAKcAAUK}@ImAIgAEq@AKCw@Cq@C_ACiA?]?o@?aA@iABmA@SBo@Dw@FaAHeAFk@?CLcAJ}@Hm@Lq@@IPaANw@Pw@VeAZkAZaA^kALa@Tq@r@sBTo@b@qAHUn@eBPg@`@mA@Cn@cBXs@BGTg@l@eA^i@`@m@p@}@f@i@BC`AcA|E{ENObBeBt@y@JMf@q@l@_AXk@@E\\q@Tk@Xu@Rm@BGRs@FYNg@RcADWJw@Fc@B[JaABYD{@Bw@?ABa@?k@?u@?G?SAoACk@AYG{@IgAGm@Ko@E[AEGa@Ms@?CUmAAEQcAQcAACKg@EOSiAs@qDa@}BOu@Oy@YyASkAIc@WoAi@yCMk@WyAG[GYKq@Kg@UoACIWyAc@oBS{@Qi@Ka@K[_@_AEKKWQ]c@{@MWg@w@c@m@Ya@a@a@c@e@w@u@u@m@e@_@aAq@m@e@aAs@cAu@s@e@y@k@eAu@c@Yo@c@SOSMIG]Wg@]s@g@{@m@YSk@a@QMUQSMUMIESKa@SCA{@]UIa@Kk@Qm@Mi@MmA[qA[y@Qw@Q_AY[I]Kk@SqAm@_B}@eBkASQc@_@_@_@Y[KKKM[_@i@w@We@QW_@w@[s@Wo@c@mAe@}Ai@iBUu@i@mByBqHkBmGe@aBK]_@kAc@}A[cAc@cBAAWgAMk@COMk@CQSuAOmAGo@CWCg@GgAEeB?O?o@Aw@@y@B}@?ABo@Dy@JqAPwBReCTkCNmBTmCFy@LyAReCDi@TqCJiA@GF{@`@uE?Av@sJRaCzAaRH{@L{AJuAJsAH{@JmAJ{AFqAFqAHoBB{ADuA@s@@w@?g@@w@@o@?aBA}@CuBEqBEw@A]ImAQ}BKoASiBASE[QyAUgBMu@ESG]GYGUGYSq@AGKWIMYu@Yo@Sc@Ye@EIY_@QWk@o@WWOOUQ_@WIGSMSKCAYMSKWKQGw@YUGq@UgBo@u@U}@[eFcBuAc@k@So@USGu@WUGME_@I?A}@SYIYIeAWa@MIA[Ke@MWIUI?@KCKCOEy@Uk@QSGeCo@e@S[MMCk@Qq@Qa@Ii@Ok@O]IEAe@Ka@I_@I]GYG[GWEWEYEMCGAWEUEOCOCWG_@Ga@GoAWYE_BYk@MSEq@UcAe@_@Sm@g@y@w@q@{@_@i@k@{@o@eAIOiAaBg@q@e@i@m@k@?Ak@a@u@a@IEc@KSCe@GE?c@?}@HC@a@HaA\\[Pm@`@UTSP_@d@u@dAMT_@j@}@rAGHi@z@y@lAABa@f@o@v@SRUTaAp@}@`@{@R_AJmA@oAOUGEAi@QSK_Ai@[[GGAAq@y@CEYc@S_@AASg@Sg@Sw@K]AEO}@YoAKo@Ky@c@qDIaASsBSyCAOC_@OsC[_HGeCSaH[wHAQAo@QuECiC@{AP_C@[DQr@sEBMLk@dA}EFUDU\\wAh@aCVkAR@DsAH]Nk@Lk@Lk@z@mDLk@hAyEx@oDLk@Pq@XiA@E\\sA`@wAf@mAh@oAn@_BnAgC^u@f@s@Va@Xa@Xa@JMVa@DGp@s@\\]Z]v@y@bCgCnAgAt@g@f@_@TKPIdAg@vDiAPGlBe@nAa@x@YlCmAxAmA`AkAhAmBl@yAf@}AFUvAeFr@cCDQxAiFPm@ZiArAmEFOlBeFDKb@_AVc@P_@|@qAdCcD?Ar@_AjA_BTYDELQp@aAXa@n@_ABEz@yAr@kBj@kBd@gCTcBJm@Ho@^{CBo@~CkUnAoJbBkMR{A@APkA?AHm@@CBSR{AP{Al@sEBQj@sD?A`A_F@Gl@}BLa@Ja@IY`@yA?Aj@kBDQb@oAh@}Ah@wAh@sAj@qAl@qAd@_A`@w@bAoB~@gBBG~@gB`AkBbAmB\\q@`@w@bAmB~@iB`AiB|@gB`AkB^s@^s@r@uAJQ`@w@^s@~@iBDIFMLUZk@Zo@Zm@HOTc@\\m@BEr@wA~@iB`AgB~BqE~@kB`@u@\\q@NWbAoBl@kAJQHOd@}@r@wABEx@{Ax@_Bv@}Ax@}Ax@}Av@}Ax@{Av@_Bd@y@Ra@x@_Bv@{Ax@_Bx@}Av@_BDK@CVk@^{@\\{@Z}@\\aAZgAZeAXiAPu@Pw@Nw@Nw@Fa@Hc@Jq@BS^kC@EL_ABOPsA@IHe@Fo@Da@@OFo@Bi@Ds@By@?]?[@IA[?_@Aq@Aa@?KAKCs@G}@I{@I}@ScBQiAQgAQw@Qw@Sw@Su@Oi@Sm@e@yAWw@Uu@Uw@Uu@m@iBm@iBe@sAQi@Sg@Yu@Yq@]q@]m@]k@W_@EIIMc@g@a@g@qAsAYYi@i@_AcAGEY[]]CAu@u@MM}@aAIIu@q@CEyBwBaA_AMMq@m@}@}@ECy@y@GGq@q@[YUUiBgBu@s@s@q@kBcBo@g@o@g@o@c@SM_@U_@UAAe@U]S[MCA]Oa@O_@O_@O_A[aA[_A[qAc@EAuAc@m@Sk@Sy@W[KUIUIm@QuAc@wAe@wAe@GCYK_@Ka@O]MSIQEAAWGUGm@SGAOGSGOEMGe@O_@MgAa@c@Oc@SeAe@}@a@_Ag@yBqAa@W_@W}@m@GEUOc@]e@_@UUc@c@c@c@y@cA]c@Ye@EG]i@a@s@c@{@c@gAa@eAWu@_@kAUq@KY]kAIWWu@_A{Cs@}BCEg@aBCEk@gBGQ[aAa@qAc@uA[eAEMY}@a@mA_@oA[oACGGa@Mk@?CIk@Iq@Gk@Em@Ey@Aw@?w@@}@@KBs@?MHcAHs@NaADWJc@Rw@XaA\\{@d@cAf@_Ad@w@lA_BFKx@uAl@_AdCoD|CwENUVa@Xc@DG\\i@~@wAhAcB@AVc@LSb@o@PYnAqB@AbAiBR_@BCrDmFHMfFcInAqBz@uApByC^k@hAgB`BkCb@q@pAcCf@aADGp@iAf@aAnByEF[d@iBTkAVuB@MLcBFwA?AAsBEgDAq@S_HEwAOuFK}DEgASuHK}DCc@MkECm@YcEk@oD?EqAmFy@oCuAqEQm@cB{FsAyEo@yBsAaFmAiEMc@m@wBe@uBi@{CEe@Is@IwACaAAmAAs@@oADyAJ_BReB?EPwAl@yD?AfA_ID[b@{CD]^kC\\eB\\gBf@aBh@aBDIr@wAr@mADGz@uA`CgELS~@{Aj@_ALQHK~AiC`BuCVc@FMLWn@uAP[Vc@?Ad@eABENi@FURaALm@^}CJuA?c@@{AKaEQcBYsBSy@Q_Au@qCaA{Cm@cBACi@sA_AqB_AgBIQqBmDQY_BqC}AkCcBsCeAkBWc@}DsGw@uAeGkKg@y@yCaF_C{Dg@{@uAaCIMsBqDgGmKCGqBkDgAkBo@gAMUmE{HmBgDuCeFqDgGmAsBuHoMyAgCqCaFOYa@i@u@aAq@{@]a@[]u@{@]a@Y_@wAgBkAqAoAyAuAoBgAwByAaD{@kCACo@wC]mB_@wBe@sFAEM{BC_CEaCAUEsDAuD?}AAm@@qC?oF@c@E{CO}P?YO_DYyC]_CMeAi@qCAIe@gB_AuCEKaBaEmBkDCCkBcCW]s@aAg@m@s@m@aB}AyAmAMK{CsBWQeDyB_Am@IEyAk@eCcAcA_@mG{BA?sE{A[KcBs@eBq@kAe@{@]iAa@mE{AcDkAg@QcA_@eC_Aa@Oa@OcA_@KCKEUIMG[Mm@WaA[s@Yc@YMImAq@cAu@wAqACEEEEGe@k@Y[i@w@IMQWOUW_@i@}@_@u@OYi@gAw@kB_AqCMc@Sq@CMiAyEI_@Ia@A?YwACKU_AQw@Ok@y@mDk@cC{@kDeAuEWcAY{ASeAU{AKq@Is@MkAMcB?AIgBAMA_AAsA@cA?G@g@BiBDsA?IBq@LuDBk@LoDBe@NqE@S@KB_ADeANaDNyCLsCLoCJ}BFgC?aA?wA?u@?UGkE?i@Ao@?AA_@EiC?u@AsAG{CIwIGeFEeDG_DCuCGkDCeDIiGGiCEeCAkCGeDGmCOiKAw@A_BM_KAm@CeDEkDGeDAgAMqICgDGqDGqG?ECwCC}B?QGoAEw@]oEWoBYiBy@{DoAsEIQqB{E]q@[g@Ua@QW{@oAgAyAa@g@mA_BuAgBiAyAW[}IcLu@_AAC{DcFu@_AwD}EY[o@{@_B}Bw@oAm@iAWi@c@cAEKCISe@Um@}@eCM[K[ACo@iBqAoD{AkESi@u@{B_CaH{CaJuBiGiAgDiAkDa@gAaBiEOc@kAiDyAoECG_@cASm@oEaMgA{CoE_MUo@}AkEkBkFk@{AiCmHcAqCsBwFaCcHiA{Cw@{BCGyAaEqBuFGMSk@o@iBmAkDk@iBk@{AGOYu@aA}BaAuBCGy@aBiBaDw@oA]g@_@g@[c@eAsAUYaAmAaAaAcA}@aAu@]YIEWQaAm@SMuBgA_@QAAyAm@e@SgA_@OGyAg@aBi@cA[mDeAeBi@IC{Ae@eA]qGuBSGs@UeCy@a@MiBk@cBi@kC{@cDgAaCy@IEi@Us@_@q@a@q@c@A?q@e@q@g@o@k@e@_@WYKIuAwAq@u@o@w@m@y@k@}@c@s@GIg@}@e@}@g@}@Yo@IOUg@y@mBu@sBWs@i@}Ae@}AUq@a@_BK_@UaAS_AO_AQ_Am@sDa@gCE[cB{Ky@kF_A{Fg@{CIe@y@cFk@_Ek@kDAIi@eDi@eDOcAKo@oA}Ha@cCm@wD_ByJs@mFCWACc@gCa@cC_@gCw@eFCKu@uE_@iCm@uDWaBi@iDa@uBi@eC_@uAGS_@mAk@_Bk@wAkAkCAE_AsBgBaE}BaFMY{AgDsA{CcDmHEGwCkGkAeCyCcHAA{DwIm@qAGMoB}E?A{@gBsA}CKY_@_AQc@c@kA_@sAEIESGW]{AS{@Gc@UoAG]QqACYC[Ci@CWEo@A[GcBAy@CoAB_A@cBHuBF_AHw@De@Hw@J}@PkABMF]P{@b@uBf@kCF[^cBb@sBlAkF\\{Ah@_Cj@cCZwAPw@DSDUBIJa@ViAZwAb@kBDSNo@lAuFnAaGR}@b@qBb@cCH[?CJm@Ls@TaBJy@PaBH}@H{@Dy@JiBBq@@o@?K?CBsB?eA?qBA_@E}AAo@?AEw@IoAQqCAOYmDEm@w@yJGw@C]IeAO}BOoBQ{B_@mFGm@Gy@Ec@COGg@Gg@QqA?EOgAMo@YqAGUCIs@kCIUMe@EKEQ]gAM[_@gAo@qAc@{@w@{AWc@sBuDWe@Yi@i@cAo@mAyAqCcAmBgC_FyAsCqB{DqAeCGM{AuCaFsJaAiBo@oAqByDyAsC{AsCqByDqByDm@kAuDeHi@aA[m@_@s@y@_BmG_M{@aB{AgC_EaIy@}AuBiEYi@_AeBq@sAm@iAwC{Fm@kAo@kAoAaCMWu@sAc@}@u@uAO[m@kAq@oAy@yAGKkBwDo@mACEoAeCEIk@iAeAoBm@iAQ]uGeMGOqAeCyAsC_ByCQ_@cAoB{AuCKSeBcDoCmFsAeCuJaRiD{GWe@eEgICEIQeGmLqB{DoByD{AuC_AkBo@mAsBwDWi@S_@eAoB?AUc@yAsCACmByDoB{DoAeC_@u@_E}H_@u@m@mAmBwDWg@eFqJqLaUUe@kF{JoCkFGMyBiE_CoE}CcGyFyKEI}@eB}CeGSa@gAqBwDgHACyBwDc@o@}AwB_AkA_AiAKMgCiCQQECmCyBg@_@OKSOuAaAoAy@QKy@e@gAk@qAm@QI{BaAgAc@eCeAyEmBUIwH}C_DqAYKqEiBe_@gOuDwAGEwCkAiBq@CA{GqCsB{@c@SUIuEiBa@O{EoB}GkC_Bo@kDqAA?MGaIaDiDsAcDqAoKkEECkEcBeBs@mBw@UKsGgCcEcB}B_AmBw@yOoGiEeBeCcAe@QaBo@gDsAk@SsGiCQIeBs@aBq@IC}B}@qCiAeHqCgEcB_DqAkAe@gOiGuBy@uDyAaHsCgDuAcDqAe@SmGeCiAe@eAc@}CoAwAk@qBw@gDsAOG}F_CeAa@iFuBcFqBg@U}BaAi@Sa@Q_@Qa@Oa@Qi@UKEICWKa@QUKICa@Qa@Oa@QoAg@u@YKEw@[a@QeCcAyAm@IEKCgDuAiKeE_EaBoCgA{EoBu@a@_@OA?_@M}@_@}@_@EAiEcBaAa@mHuCuL{Ec@QaBo@aDsA{EmB}CsAqGmCeGgCa@QeCeAq@Ys@YiFuBOGgMcFoHuCyN}FyKkEcDoAcBq@kFwBiFwBaA_@kBw@{Am@aKaEaHuCGCaDqAiBs@yHyCs@WiBs@kKsEmH_DcAc@aGcCkAe@gCaAe@ScDqA{D_BeIcDy@[}EoBqBw@qFwB{KmE}Aq@eDqAgBu@g@Q_@M_Bs@g@SwQmHECa@QcHwCICiDoAeBo@OGu@[aBq@uCiAwCkAIEcDuAiCiAQG_EeBaFoBWK_DuAm@[w@]CCkBcAuA{@YQy@m@CA_@Q]U_@WKGSOw@g@_@W]We@[wA_A}@o@MI_DaCw@g@gBuAuAaAcAw@aDaCo@e@qAiAqAcAqGiFMKKI_CcBoA_A{BcBkA}@{AcAy@i@iAs@MIKIe@YwAy@c@Sw@a@CC}Ao@_Bk@QG[MoCw@a@Kc@I{@SQEIAYGICq@KMCSCwBYWAq@AKAA?G?}A?o@?gABK?W@eABiAHgAFgDT{Kt@gCPuE\\c@DkBLSBs@DiBLoCNoBL_@BQ@SBcDV_@B{DVaAJ{AJuGh@kC\\gB^eB`@eBf@cA\\cA`@[Lg@Pw@\\_N~FQHaA^GDE@MFsAl@uF`CuB~@cBv@oBx@a@P_A^c@P_A^gBl@A?{Ab@_B`@{AVC?aANK@mALe@BI@I@M?K@K?cABA?gAAI?uAGaAEu@IEA_AKiASkAUYGq@QSEw@UKCKEUIM?]Ia@Ms@Sc@KcAYeAYuCw@y@UeAYSG[KSGGAEAyA]iBc@i@MiCs@cCm@mD_AiEgAg@MeAY}EoA}I_C}Cy@oCs@wCu@yAa@_AUuCw@y@UKCKEQCe@M{@UkEkACAaBc@a@KcCo@[IaAM}@UyBm@oBg@gAYo@Sq@SaBa@aBa@aBe@}@UuAa@uA]oDaA_AWkD}@_EgAOCw@UyDcAaPeEwFyACASGOEMC}Cy@WGm@QkCq@a@KwGeBcAWgEiAoGaBqPmEmEkAoCq@kA[qGcBeAYUGKCeAY_@KA?eA[a@Kc@M]KC?yI_C]Ig@O}Cw@uA_@a@KWIGAgD{@GCkA[_Ba@qCs@o@O_Cm@cEeAg@Oc@KqKsCyGgBcDy@yCw@gHiBoEmA{Bk@gBe@oA]WGg@Mg@OCAc@KQEm@Oc@MkD_AKCmBg@{Cw@wCu@uLaDqBg@SG{I}BmA[c@McCq@aFoA{Bk@mGcBmA[g@Ma@MsCu@qCs@QG{Cw@QE[IICmA[QCEAa@K_@KA?sDo@eBWc@IeAQqAUw@QCAa@KUGwCu@gBe@yA_@sBi@oA[oAUsAUy@Km@G}AI}AEcABaA@u@DuAJg@FkAVm@LuBl@G@w@VKDODCBaBx@MFiB`AmAp@EBiCzAoIvEuBlA}DvBo@\\cB~@MHa@RsAx@kAp@cDjBuDtBiDlB{AbAk@f@k@l@k@t@]n@Yj@EHSf@_@fA[jAc@fBaC`Kq@vCQt@aA~DmAdFYlAAFOn@iAlEGV_@rAa@hA]z@CFIXs@pACDIJOTc@l@_@b@_@Ze@^CBSLkAp@uAf@k@Ls@LgAH]?u@?OAc@AEAu@G}Dg@eAMaG{@KCWCyDi@_Dc@oAQ}ASKAiBWMCcDe@uAQaDe@iBUc@Ec@GeAQyAWq@SWGaA_@KGiAi@YOwEiCsBiAqC{AmDsBgAu@}@u@_@]YUo@q@u@y@y@gA}@sAwAiCCEw@iBc@uA]qAWmAUuAOcAEU[_CYyB[}BmAuIUqBKs@KmAIkAGuBAwA@sACwCAw@A{@Es@KsAIu@KwASoBSyBKkAIiA?KKiBIsBG_BKiCKwCMcBOuAOs@Mg@a@uAKYw@cAaAmA_EkFKPw@_A_Ay@q@i@QIOIEAKEQEOEa@ESAS?S@SBw@N_@FWFiATqBj@g@N{Ad@k@RoB|@wC~AYPuEhCsC`BoFtCmAp@{@d@E@{@`@}@Z{@Tw@L_ADm@@{@AkAGc@Em@IeASg@McBk@q@[IEoDgBaB{@IEyAy@s@a@kAw@_As@_BmAiAaAeBoASM}A_AcAe@y@_@iBu@mAe@oBw@qBu@uAk@eCiAgAk@wAw@SMy@e@sBiAiBeAsF{C[QoC{AIGw@c@WOeAi@GCiAk@{B_AgC{@uAa@iCo@aCm@iCq@aCm@eD{@wAe@_Bo@sEoBo@Yc@SwAq@_EuBiCuAaCuAeSsKyAu@iB_AeAk@OGsDiBm@[MGw@e@wDeBaAm@kAaAq@g@k@k@MM[]]c@Ye@c@u@MUGKs@wAe@}@c@{@MWMU}A{Cy@aBg@_A}EuJ]o@yAuCAA}A_D[i@qAkCe@}@wAgC[g@GM_@e@c@k@YYs@k@USo@e@YSgAk@e@Sg@Qg@MOEIA[EgAQcBM_ACMA_@Cw@CaDOkBGgAGoCKi@CK?cCKIAm@GSAE?gASu@Sm@Uk@Yu@c@iAaA_@c@e@m@[c@w@qA]q@GMGOCEKUACOe@Sm@M_@o@wBSs@[gAY_AUaAMq@SmAKs@Kw@mAoM[aD_@wDg@iFi@gFGq@a@}DQ{Ai@kFgDk\\KiA}AiOyB}Sy@uIYmCQiBMgAQmB?EIeASwB_@{DKy@w@}H]cDKeAGm@s@wGi@qFE][gDwA}M[eDM}AGo@QiBEc@Im@Gm@AEGi@MgAQkBi@wFe@mEi@oFs@kH{AeOO}AGo@WmCIm@Go@Gm@SkBGm@Go@SqBcB{PcA{JCOi@wHCQCWWcCCSCUa@aESiBMqAO}AIy@Ec@Go@Iu@MuAYmCE]o@qFa@iCiAyF_AeDkAkD}@yBgBuD_@o@kBuC_@e@o@}@w@}@w@y@kAiAq@k@YSg@a@_Aq@c@[aAq@yA}@gAq@IG_Am@ECy@i@]S_@USMKI_@Ug@[wA}@AAoAw@oAy@iAq@uA}@uA{@{@k@oCcBqAw@e@[eC{AYQ_C{AoBoAkEuCGEaAe@oEyCsIiFgYoQcKoG?A}IwFKGqD}B_DoBw@g@mDwBaDuB_CyAqBqAq@_@o@c@m@a@iBiAeAq@u@g@IE_BcASM_Ak@KGqAy@uBsAsBqAaBcAc@[YQsAy@OIKIMGsAw@KIw@g@_@UQKOKm@a@q@a@cAk@[UwA_AECw@g@YQ_@U]Um@_@e@[_Ak@_BcAwCmBeAo@_BcA_BaAKIKGmAw@eAo@WQoBmAeC_B{BuA}CoBMIwBsAgAq@_Am@}ByA[S{BuAiCaByBwAcC{AsBqAsBqA}AcAgC}AkAy@YOcBgAgFeDUM_Am@k@]SM_@U_BcA}AaAoIiF_GuDgBmA}FoDaEiCOIcGyDiGsD}GeE{DiC_EgCqCgBqFiDyH}EkAw@qBuA{A{@aAk@uA_A}AaAcC_B{BsA{@m@eC_BgBeAAA}AcAq@a@mAw@_@U}AeAUMi@]qBqAqHwEwH{E{@i@A?eBgAmBiAoCiB}BwAeBiAwBqAiBkAcDsB{JmG_BaAq@c@gAu@yA}@{CmB_DoB}AcA{@i@cC}AmAw@oG_EwBsAgFgD]SoCcB}DgCqD}BuCgB_DmBeDuBMIiBiAeBeAAAuA}@eAw@g@[mBiAm@_@MIeBgAIEw@g@YQwBwAwBuA}BuAqCiBi@]cBgAyBsAeBiAYQyAaAwBsAKI_@U_@U_@UKGSM[S_@U_@U_@Wg@[_@W_@UCC[QoBoAmAw@cAo@yCkBoGaEOK}@k@wA}@GEa@W_@UgAq@MIoA{@sBsAuFgD_EiCgEkCCAeAs@_Am@_@Um@_@QKSOUOIG_@W]S]S_@U_Am@aC{AuCiByA_AKGiAs@s@e@QKSMkAu@aC}AmBmA{BwA_DmB_CyAqD}B}DeCqA{@}@m@w@e@ACqMkI_DoBgFeDgEkCuAu@kBcAe@UwDaBgEiBkPgHgJ}DcDuA{NqG_LwEeBu@kBw@QGQIgAg@cBw@o@Y_b@sQu@[OG}Ak@{Bs@gCo@y@QgDk@qAOA?{BQwGk@oCUcDUcGc@oE_@s@CoMaAyGe@sFe@uIm@uBOuE]c@Eo@Eu@GEAiBMkBME?uHq@{NeAuE]aGc@{E[wGi@qBOik@eE_Jq@I?qBOkE_@wIm@C?c@Ec@EiEc@o@AiAEkCYoAOyB]eEy@_D_Ag@QeDoAQK{DoBwBoAkC}AgOiJKGgFyCuEsC_DsBA?gDsCKICCcCwBMKgB{AsCaCyJsIaAw@gBwAmHkGeByAeA_ASOyAoAWSEEGGoAkA{@u@oAiAyDcEeFaGSWeBsBu@}@qA}ACCKKwAaBqA}AY[uAaBcCyC}OkRc@i@i@m@Y_@}@eAiOkQsDcEwAqAc@a@WS{AkA]W{AkA}AiAwAiAuFiEaBmA[U_EyC_DyB}AcAiBkAMG_Ai@_@SA?aBw@a@QIEWKa@OYKGCcA_@]MCAa@KeAYa@Ma@Kc@Ma@KeAYECG?WIg@Gc@ECA_@Ac@C]Ci@Cc@Aa@AA?gAGQAsFG{@BgABc@@O?{ADc@@gABK?W?c@@E?aADm@B}@BaCFK@wDH_@@gADwENoBF}BF}BFaABwADsBBqBJ{@B_FHsBFA?c@@qADuGPwBBy@BaBDm@BoCHeADiADcGReHVS?aABi@BcCHqADeBFeBFq@ByABwADo@?e@BeABm@BuAFE?iADgABeCHO@cDH_ABaA@gA?c@?w@?q@AsCK}BQq@GaAMkBYoE_A{Bo@ICkA_@{@[{@[MEuAk@e@QgBs@}Ak@WKmAe@KEm@U{@[m@Sg@SYKgBq@s@YuBw@kBu@sBu@eBq@eC{@sBw@uBy@aC_AwBw@cBq@{Ak@{@[iAc@mAe@cAc@eC_A]KyAk@mAe@uBw@gBq@CA]Ma@OyAm@mAg@OGo@SgAc@g@U}@Yi@SuBw@}B}@gCaAwBy@gC_A{B}@}Ak@}B}@qBu@aC}@eBo@sCiAcA]cBq@gBq@oBu@oBu@mBu@qBu@AAw@[yCiAqBu@_C{@cCaA{@[gBq@aDmAw@]uAi@cC}@oBu@kBs@gBq@QG_A]{@]wAi@uBw@}@_@aA]MGo@UgAa@sBy@gBu@aC_AuAm@}B{@YKcA_@UKmAe@a@OQGq@WcAa@o@WyDwAmDsAcBo@g@QqBu@aC_A{CkAuCeAoDyAwFsBc@QeBo@IE}B{@c@QaA_@cA_@A?yCiA_DmAkCcAs@YSIoAg@KEuBw@ECcA_@SGcAa@CAiAc@oAe@sAg@iAc@_A]aA]GCkAa@qAc@eAYoAWgASAAmASmAQuAQuAQuAQoAQ_BU}ASuH_A}@M}Fu@aDa@_BUyAS}ASoAQcH{@{Dg@gBWaAOs@IkAOQCYEsBWA?_C[o@IaAM[EwAS_@EiBU_C[SC]E}ASwB[oAOmAOoAOmAQmDc@iAQMAWEkAOgBUeAKIAs@G{AK{AECA[?gAAuCAq@AuA?mAAaJCI?sA?kEEWAmDGgDK[AoCMcAG]Cu@EyAOMAuBWwAUuAYmAYgBe@sAc@gBk@]Oi@U{Aq@a@QECyBkAaBcAA?}@k@kAs@qBmAAA}AcAA?aE_CGEIEuI{Fe@ScBu@iBw@_Ak@_B_AKGcDgBcDiB{@g@}A{@aCsAaDiBaDgBiBcAu@c@c@Qm@]mAu@c@UAA_CsAmAo@mAq@eCyAwDcB}CgAeBi@cBk@cBi@iBk@SGiCy@uAg@{DoA_@SeB_Ag@Y{BwAy@m@SSSSo@i@yBeBsDoCIIc@_@gA{@gAu@w@g@WO}GaDCAiDsAcAYyJoCeA[YK{Bw@c@OQKyCwAk@[}BwAmA}@kCoBw@s@w@u@c@a@eAgA_AcAy@_AY]k@s@IKi@o@KOOQMO{BoCuAeBUYw@}@u@_Au@_Au@_A[a@u@aAiCiDeByBQSOSIMsAiBaCgDuAmBSWs@aA]e@WYiBaCkBaCYa@u@_AAAcBsBW[[_@mB_Cc@i@aBuBmBcCW][_@uBqCyBsCY_@GIyAiBc@o@kAeBEEk@_AWa@_AaCGe@Kw@SsA?CCk@IaBCYAUMoCKqCAi@?}@?gA?cA?o@?g@Ay@?cA?qA?k@?c@?K?qABq@HaAFaAFy@HwALeBDq@Dg@JyAHaADa@DUHi@Jm@Hm@Hk@NcA@GFa@@MF[BQBQHq@Hm@L{@D_@F_@Ho@PqAHi@L}ANkAJaAHm@@AF}@BW@a@@a@Ac@?UGe@OaASo@KYEKMUO]QWQ[a@e@e@a@MOWSKIMIKGIGWI[Kw@Q]O[OQIOEWKUKw@[g@QYOm@Ww@[a@Q_@OKEUIa@Qa@Oi@SoBw@g@SsAK"
                          },
                          "start_location": {
                              "lat": 40.9114981,
                              "lng": -73.7841466
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.3519217,
                                      "lng": -71.0550703
                                  },
                                  "name": "South Station"
                              },
                              "arrival_time": {
                                  "text": "7:23 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700353380
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.9114981,
                                      "lng": -73.7841466
                                  },
                                  "name": "New Rochelle"
                              },
                              "departure_time": {
                                  "text": "3:27 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700339220
                              },
                              "headsign": "Boston",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Amtrak",
                                          "url": "https://www.amtrak.com/"
                                      }
                                  ],
                                  "color": "#cae4f1",
                                  "name": "Northeast Regional",
                                  "text_color": "#000000",
                                  "url": "https://www.amtrak.com/northeast-regional-train",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 10,
                              "trip_short_name": "88"
                          },
                          "travel_mode": "TRANSIT"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "cpvwFntobMwiJqlGkw@}_Agu@ioAac@aXwsB{`Aey@gg@e}@s}Ak`DeuAweAwoAgOqeAT_vBr\\yfCa@oe@q_@si@{v@al@qmAghBauBefC{gAorAg`@orA{vAwpCuOaq@ck@yu@ubA_|@m`@__Bw~@_mAoFyr@mt@m{C}[ieFkMok@{e@}d@aWan@}v@cnB{bAa\\aVmi@`FmsAPus@}c@i~@}Nm`By@amC_Ow{@}}@{d@gt@ko@{Qsx@mhBopFsWeqDjPawBgy@y_D{j@weAu[wbAsCopAw]ocAuv@u{@kn@y~@aTyq@qI{{AgL_~Byr@sFsWmB}Ra`@z@ibB{AedCilA}pBu_@wv@kQqeAuu@}rDeq@qvBwC{t@iLadBcaAiwBixC_rEi`A_rBoa@ym@etAasBwUad@oi@_c@gn@}ZyN_r@_e@geAe^up@Jcj@fWqf@nf@iGhxAhQtv@qK|f@}m@u@kkBnGydAd^q{@nIwdAmL}nAdOgiCpAgwBr`@ikCpQsyBgG{rCsd@{xA}t@_eGwMouDh@qiCiQkoAeRexAf|@ykEvPkiDzHahAoLyz@ca@keBg`@iq@~AatEec@sgEcaAybDii@uwAnCq|@t]erAn`@s~@zUyqBlZw}AuCepB_i@}jCaN}qBc~@wnAcdAwqCmG{x@dTmv@d\\ao@yI_r@iYiq@if@uWij@_|@qAsaA`KqjBqNsi@qfAq[qe@eZke@fWwQojAvSisAhw@ws@~g@elAzYaoBpi@wgAx~@k{BeJkr@qa@ej@_nA{m@qb@qn@mJer@fj@k~@la@qt@_@caA_X}tB|a@ghA{Cim@}e@}z@cyA{`CiVoaCqa@cd@cr@_Wkd@{\\wUanAu@_~FkRuo@mj@au@m}@ahC_z@yoBmmA}d@id@aq@yc@qqCsz@g`CcKwz@pYwtA}@umAyVo}@mxAkqCwsCssFcbBsoCwkCqfAomGggCuqHmzCinEqrBc|@ah@qhArDk_Bhd@mh@O{~DydAiuE_mAeeBcd@udAyGcl@~[ia@bm@oMfd@cSpHgzAc^qTq`@sFes@cE{l@aSoUabAn[udEonBot@yeAgq@_OuPqNgKco@gc@}kE}UqbCkMiz@q\\{`@}dB{fAsyA__AegDyuBobGkvD_dCi}A}zAi`AaaBut@ysAq_@yxEu]sdAk^}aAov@{_BehBw|@ui@wwCfDwoA{AulAed@gpDutAc~C}dA{vDw[kmDk`B}uAmw@mu@m`Aoh@s`AnCux@dAqf@o^aQsAK"
          },
          "summary": "",
          "warnings": [
              "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
          ],
          "waypoint_order": []
      },
      {
          "bounds": {
              "northeast": {
                  "lat": 42.3600861,
                  "lng": -71.0545226
              },
              "southwest": {
                  "lat": 40.7569006,
                  "lng": -74.000925
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "7:38 PM",
                      "time_zone": "America/New_York",
                      "value": 1700354286
                  },
                  "departure_time": {
                      "text": "3:00 PM",
                      "time_zone": "America/New_York",
                      "value": 1700337600
                  },
                  "distance": {
                      "text": "231 mi",
                      "value": 371201
                  },
                  "duration": {
                      "text": "4 hours 38 mins",
                      "value": 16686
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.3600861,
                      "lng": -71.05888279999999
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.7569006,
                      "lng": -73.9902798
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "230 mi",
                              "value": 369964
                          },
                          "duration": {
                              "text": "4 hours 20 mins",
                              "value": 15600
                          },
                          "end_location": {
                              "lat": 42.3518283,
                              "lng": -71.0562097
                          },
                          "html_instructions": "Bus towards Boston (South Station), MA",
                          "polyline": {
                              "points": "siwwFffrbMuAu@sEvNGRmBdGaCpHq@vBY|@eAfD}A|EyBdHo@rBENOd@Wx@IVU[QUkAcBMSc@q@e@u@MSSY_@c@Y[c@a@k@e@{@k@SM]S_BcAk@_@g@[UQQMc@WyAaAmBsAMKyBuAoBsAKEmFmDWOMEc@UECcAYUEcCQo@Cy@Kw@U_AY{@i@sCmBa@WwA}@wHkEiEoCyDkC{M_J}AeA}AeAeA}@{@u@g@e@sA{AKGGE]WkJeGyDeCmBkAaAm@g@[k@]kAi@eAc@iA_@{Bo@g@M}FeB}BaAaCgAmBcAaCwAqDaCcCmBkAcAsAsAm@m@g@m@k@q@s@cAaBwB{@iAm@u@w@w@YWc@[WOc@WgBo@uIyBw@SkA[sAe@cBu@}Au@aCsAi@[mCcBoEwCgEsCyIqGmDcC{FsDaDgBeGgDgKyGcEyCaAk@{G}Cs@c@cAq@kBuA{GaHaCgCwBoBuE{DmDuCiBmAkCiBcBqA{AiAmCcB}CaCsEaEsDgDgDyCiFsEeAy@y@k@o@c@kJwDaFeAqDy@aFaA{KyBmAe@kAw@{BqBMMcA}@kEuDm@_@aAm@_Ak@iAi@eAe@eA_@uA_@wB_A_DuAo@Yg@[s@m@Ya@e@o@YW]SaA_@_Bc@m@C_AGaAA}@A_BMgBQs@MiDk@_@IQESISMMOIOGQEUAS?YBq@Ba@JuBXwDRcBbAwIF_@Hi@Ro@fBwFpAgEd@yAt@}BX}@^iA~@iCl@mB^wALaAFcAFqALaBr@cF@Gf@iDT}@Xq@^e@fAuAVi@Pq@@k@Eo@Uk@_@c@c@Mg@?g@NYVQ^YZ_@HQBi@@]Ii@SqDgBwAmA}AeAuAaAyAkAwBgBqEgEwGiFoCmCoFaFsBgBkAw@oAs@_Bw@wAk@aCu@iC{@mAc@aAc@eAq@w@k@c@a@u@oA_A}A{G}J{B}CU]AHKjAAFAHTZZb@JNrCpDlDrE^j@b@l@l@p@l@n@l@f@l@d@t@d@n@\\r@\\~Bv@jC`A~ChAxBlArAv@rBxA|NzMjF`FxIdIrDlCxCpB\\P`CnAlJrEpCtAvB`Ax@\\~A`@jCj@zBj@zAj@dAn@z@^lAj@xAt@pAh@vAh@pBf@x@RpAZ`Cd@tCh@zL~BfHrAr@Jz@Jt@Fz@B|@?jACv@Gl@Mn@UbBy@h@Yb@Qd@OKqA?uAFg@J[TQLAJ?J@HDHHDJDR?N?NENGHML[NyAb@}@\\w@b@eAf@m@NcAT{@RwANY@U?MAy@Gy@M_DIwRqDwGoAqA[{@U{Bk@kAa@_Bs@iAi@wDgBqAk@yBy@yDaAeBc@aCcAeDaBaD{AmBaA}BiAgCqA}BuAcBmAmB{AmHwGeJoIoCmCoFaFsBgBkAw@oAs@_Bw@wAk@aCu@iC{@mAc@aAc@eAq@w@k@c@a@kAsA}@mAyEcHaCeD{AsBmAuA_AkAqAqA_AaAs@k@}@q@iAs@}@e@y@c@eAe@{Ak@gA_@gKiDaGqBoHmC_L{DqLeFmGsBmEiAu@SiBk@gBoAcBaBsBcBuEgEoRwOgEcFcDyE}@uAy@oAk@cAaAoBg@iAYo@g@wA[gAW{@YaAYsA_@mBaAgGYsBa@yBa@aBe@{Ae@oA_@w@_@u@]o@k@s@}@gAuB{BmBuBoBoBqBoByGkGwGkGuCoCoAcA}@k@eAi@eAe@mAc@cBc@qBa@mCYuBU}P}AgBO{@IaAKwGs@UAs@IsKaAwCUeAUm@QmAe@YM]Qw@c@_@W{@w@m@m@y@aAkCcDk@m@q@m@eAw@{F_DsB_AaCsAw@k@m@g@e@c@oBaCo@aAkEmGcBiCeBcCkAoBkAgCQe@o@sBs@}CeD{Mo@sBa@kAgAwBm@_As@{@OQwBcCsGsH]a@u@m@w@g@eAi@k@Yk@Wi@MKCk@OwCa@mXsCiFi@kAKqKiAwD]_AK_Fc@cDSa@?k@?_ACuGDeBCcBEqAGcBUoEgA_OaEmAM_AEo@?w@BmCTqAXwA`@gB|@uBrAkAlAyAbBiGhLmBjDyBlCyApAcAl@qAn@aAZeBl@m@Fe@DiBRo@?W?kAAu@G{@Ii@KYIcA]sEeB}Bu@wBg@q@MkAM_AIkBI{AAcBBaCRkDn@uKrCuD`AcE~@k@H_BNe@BaCBeACcEWk@KqCm@mBq@{BaA}@i@gAy@k@m@k@e@gBeBcA_AwBkBCCECeDsBiAu@cDaCeBkAyCmBkAk@{CuAmDuAeDiAYG}Ac@gFiA}B_@_Ee@wBSQAkAG{BGk@?mA@yC@uCFuM~@aN|@eFb@oEZ_ABmCIwBImAOoYuFgGiAeB[oAYk@M}Ba@iLwB}GkA_B[aBa@kBq@iBy@qAw@qA_Ay@o@cB{A_CkB}A_AgB}@m@S}Bu@qAYqB_@}Lu@qBQaEo@{DgAgAa@qB}@sAs@kJcGw@_@sAi@m@UwBo@qBg@__@uJqHoBcCq@iBm@o@Y{@c@}BwAeCgB}DkCqAaAoCaBoCkAq@WeCs@wAUaBS{F_@cBKqE[e@EeAI[EgAKa@GgCm@_Be@eDqA}BcA}F_CaCq@aCg@gAQgBO{B?uABwABwAFwANwATwAVqA^sBj@{Ad@y@Zu@Ze@J]B_@Cc@Gk@OYQa@_@i@s@a@o@Uk@Sy@My@Ig@[iAc@gAw@cBWw@i@kB]oAYqAWuAQoAKmAGeAEiAAyA@uADuAFuAjAkR`BqW`@qHHqAPoCPyCJsALyAR{AX}AZoAn@iBp@}At@{Ar@iAt@cAp@s@r@o@t@o@v@g@x@c@~@a@lAc@lIgCfA[bA[z@]x@_@z@c@z@i@x@i@v@m@r@m@v@s@p@s@r@y@n@y@V]n@aAl@_ATe@Zm@~@sBf@mAt@}BZgAb@iBZyAVwAVoB\\aEH{AFoADeAFmBDoFBoBH_FBq@?SLoDDa@RuBL{@l@{Dr@uCH]b@uAb@eAPg@Rg@z@qBdBqDjAiCfAqCb@uATkAHc@d@yCNiAH{AFgB@]@y@@{@Aw@Cw@A_@Cw@G{@KsAMwAOsAOsAQqAKu@Kw@i@eDSsA[aBKm@cAuF]iBg@iCYoAg@cCa@iBKk@CICGUeAQu@i@eCs@}CYoAOu@G[Ku@Kw@C[IsAC{@Au@?y@@y@Dy@Dw@Hy@Ju@Ju@Ns@Rs@Rs@HWVq@d@cAh@cAl@}@LQ^a@b@c@b@a@d@]d@Wx@e@dBw@f@QdBq@h@U|@c@d@Wd@]x@o@b@c@b@c@`@e@\\g@^i@\\o@Xk@LWVm@Vo@Vu@\\kA~@yCr@}BTq@Vo@Xm@JUZk@Zi@^i@n@y@n@u@v@q@b@]b@[x@g@z@a@vAs@`Ac@n@[nAm@pAo@z@c@h@[b@Wd@]d@_@b@a@t@u@r@}@b@o@b@q@`@s@\\u@N[LYL_@JYL_@JYJ_@J]H_@J]X_BHa@L_AJcAHaABa@Ba@BaAB_ADeCDeCFiC@aA@c@DeCDaADcA@c@FaAHaAHcAHy@De@H{@Ju@Lw@X_BLu@^iBNs@Ps@f@iBRq@Ro@`@kAJYVo@b@eAhAoC~@uBtAeD^k@PQT_@PUn@u@b@e@b@g@j@u@NQNUJULYL_@FUHYDYBWDk@@a@@]A]A[Ea@CSG]EYUeAU_Ac@yAEKO]M][w@MWMUYk@MUm@aA_@g@_@e@sA_BaAkAm@w@_@e@eAyAeAyA{@sAk@{@o@eAcAaB]i@_@g@OQQQQOOQg@]QMg@Ye@Qg@QUG}@QaAO_AKiAIwAImAAcAAe@?aABaABaAFcAHo@FcALcAP{AZ{Cn@yAZy@PqQfEwBf@yCp@{VpFgNxC{XdG_AP_ANcALaAJ_AF_ABaA@aA?aAC_AGu@IKA_AM_AO_AQ_AW}@W_AY{@_@}@a@{@c@{@g@{@i@y@m@w@o@u@q@u@u@s@u@q@y@q@{@}PiUq@y@o@y@s@u@u@q@c@a@QOw@o@y@i@{@i@y@e@}@a@{@_@_A]}@W_AUaAS_AQaAKaAIaAEaACaA?kEB}RJcAA_A?aACaACaAEaAEaAE_AIaAIaAIqSqBwAKwAIwAEwA?wABwADeT~@qDNuADwABwA@wA?wA?wACuACwACuAGwAIwAIuAKaAIiAKuAO_AKaAM_AO}@OaAO_AO_AQaAQ}@S}@QmAYgAWsA[uA]uA_@sAa@sAa@sAc@qAc@sAe@qAe@}@]sAi@oAi@qAk@qAk@qAm@oAm@yFuC[QgAk@y^gReb@iT}@c@}@a@}@_@_A_@}@Y}@[_AWaAY_AS_ASaAQ_AOaAMaAKaAIcAIa@Cm@Cm@Co@AmA?aA?sQCwAAwAEwAGwAIwAMuAOwAOuASsAUuAWwA]sA[sA_@uAa@qAe@sAe@qAi@{Aq@gAg@qAo@mAq@mAs@ipAcu@cFwCmAs@oAo@oAo@qAk@qAk@sAg@qAc@sAc@sA_@uA]uA[uAWuAWuASwAQuAMwAKwAIwAEaISiBEwBEyAGwAGwAIuAMwAOuAQuASuAUwAYex@_P_AQaAOaAKaAGaACaACaA@aABcADaAHaALaAPaAR_ATo_@pJ_Dv@_ARcAP_ALaALaAFaADaA?cA?aAEaAEcAMaAKaAQsXuE_Ca@gQwC_C_@wAUuAQuAQwAMuAMyAKuAIyAEwAGwAAuACwA?wA@wABwADwADeBHoBN{ALuAN{Gr@uALuALyAJuAHwAHwADwAFuABwA?yA@uA?wAAwACwAEuAEwAGwAIwAGwAKuAKuAKwAOwAOuAOwASuAQuASuAUuAWuAWsAYuA[uA]sA[sA]uAc@qAc@cA[_A]iAa@qAg@gAc@aAa@aAa@}@a@{@a@}@a@oAo@mAq@oAq@mAs@mAu@mAs@yGcEuLoH{@g@y@g@}@e@y@a@}@a@}@_@}@]}@[}@W}@WaAU_ASaAQwCg@aCa@kASy@Q}@S_AU{@S_AW}@W{@Y}@Yy@YuHoC}By@c@Oi@Og@Mk@Ko@Ks@Gm@Ei@Ck@Ao@@m@Bi@Di@Dk@Fk@Ji@Je@Jg@Ni@Pg@Rg@Tc@Tg@Zg@Za@Ze@^mB|AcCnBe@`@mDtC}BhBm@d@k@^k@\\s@`@q@\\k@Vm@TmRnHq@Vo@Ve@Ve@Vc@Vc@Xe@\\g@b@e@b@a@b@kGhHoAvAkAtAk@j@m@l@m@f@o@h@o@b@u@b@y@h@q@^u@^_Ab@_A\\aA\\_AV_AV{@NkHtAk@Fk@Di@Bk@@k@Ai@Ck@Ek@Gi@Ii@Ki@M}@UaAW}@Y{@[SGi@U}@a@{@a@{@a@{@c@g@WyEcC{@a@{@_@_Aa@aAa@eAa@cA]}@WaAWcNmDwJgCuAa@qA]sAa@kA_@eAa@y@_@{@a@_Ae@y@c@w@e@y@g@g@Wi@Sg@Sk@Q}@WgD{@kA[gAW_AQ_AQ_AM_AMaAK_AIaAGaAEkGOqLWkHOaACaAE_AG_AGaAK_AM_AQaAU{@W}@[}@_@iEiBqAi@sAe@}@W_AUaAS}@MaAKcAIyKy@cAG{@IaAK_AM_AQ_AW{@Y}@[y@_@{@c@y@g@w@i@u@m@w@q@s@u@w@u@yNeOwXgYcAcAeAiAcAeAaAiAaAkA_AkA_AoA}@oA_AsAeEkGo@}@o@y@s@u@u@q@w@o@w@i@{@g@{@e@}@_@}@[_AW_AQ_AOcAKaAEcAA_AB_ADaAHaAL_ARm@Ni@Ly@TyEpA}@T_AR_AL_AJaAF_AB_A?aAC_AIaAK_@E_@G_ASa@I]K_AW{@[}@]{GqC_A]}@[}@Y}@Wy@So@Mg@Ii@Ii@Im@IqLqAi@Ik@Gg@Ii@Kk@Mg@Oi@Oi@Qi@Ue@Sg@Wi@Wc@We@[e@]c@[a@]a@]a@a@a@_@c@e@c@c@_@e@a@e@aD}Dk\\ma@g]sb@cBsBSWaAoA}@kA{@mACC_AsA_AuAg@u@kMiRe^}h@}BkDiFyH{@qA}@sA{@sA_A{Ay@yAw@wAs@uAu@}As@{Aq@{Ao@_Bo@aBk@aBm@aBg@eBqJyZaA_DoF_Q}GwT_@iA_@iAc@kAe@eAg@cAg@aAm@aAm@}@o@}@m@u@q@u@s@q@w@q@w@m@u@k@{@g@w@a@}@a@}@]}@[{@U_AS_AQaAO_@Ea@GqG{@_AM{@O{@O}@S_AUy@S}@Y}@Y}@]sBu@}@k@OKSQQWQWOYKWK]Ka@uEkSKe@G]E_@A]A_@@e@@c@BYFYF[dA{CbDmIrHoR~BcGxAwDd@qAb@qA^qA\\qAZqAVsAVuAVyALy@Jy@Jw@HcAH_AHkAHwAHwADuADyA@uA?uA?{ACuAEwAEyAGsAe@_JqCmk@wCum@O_DO}CMuBMqBOsBSqBUqBWoBYoBYmB_@kB_@oBa@iBe@iBe@iBoEcQa@aB]sAYmAYoAWkAWqAWuAWqASmASsASoAQqAMgAOiAQyAUsBMeAMgAQgAQeAUcAWiAYeA_@mAuB}G}AgFqAcE]gA]gAYkAUiAUgAQiAOaAKiAKaAIgAGeAEcACaAAiAAeA@iABgABeADeAFgAFcAJcALeANeAPaAP_AR_AV_AVaALa@Ja@tBmHNi@Nk@Nm@Ns@Ns@N}@LcALiAHeAHmADkADuAP}GR}Gr@eZRqITmJDwAFsAFwAJuALuANuANsARsATwA~DmVt@oEv@yEp@gEfGya@TqATsAH_@Lo@XoAZmA\\oA^kA^iAtCcITq@Rq@Ru@Pu@Ly@L}@Hw@F{@B{@@y@?}@C}@G{@Gw@Iy@Ky@Mo@Ou@o@uC[qAOu@Kw@Kw@q@yGIw@Mw@Qu@Su@Uq@[q@[k@_@i@a@e@c@_@c@]g@Yi@Ui@Og@Km@Gi@CqDEm@Bi@Fi@Ji@Lg@Pg@PaDnAiHzC{B|@y@X{@T}@N}@H{@B}@A}@G{@M}@Q{@Wy@_@w@c@w@g@u@m@u@o@s@o@q@q@q@u@q@w@m@u@m@y@m@}@k@}@g@_AMSYm@g@cAc@cAe@gA_@eAa@kA]gA[kA[mAWkAWoAUqAW{AOeASqAw@iFW_BQeASeAWiA[iA]gA[eAYs@Ys@o@wAu@uAm@cAm@}@o@{@o@y@s@u@cDiDcAeAcImIs@s@u@{@u@_Am@w@m@y@m@{@m@}@i@}@i@aAe@{@e@_Ae@{@c@_Ai@kAg@iAc@eAa@gA]eAa@kA_@kA[gA]kAYgAYmAQu@Qy@Ic@UoAUoASoASqAQsAOoAOyAwCkYOsAQuAOqASuAQqASqASqAUuAuByLY{A}Hed@YcBQoASsAQsA}@oH}AoLMcAKiAGkAEiA?iA?kADgAFmAHgALgANcAR_APy@Tw@Vw@l@aBbA}CnBmFb@iAb@cAtC}G`@cAb@iARk@Rm@Rw@Ns@Ns@Jq@Jq@Jy@H}@Fy@Dy@By@@w@?{@?{@Cy@C{@Ey@Gw@M}@Ky@Mw@Ou@Qu@Uw@Sq@Uq@Ws@[s@_FkLeC_G]y@[{@]}@[cAW_AU_ASaASaAQaAOeAMcAKaAIiAIeAKiBMiBIuAKsAIuAg@{GKyAMsAQuASsAWoAYsA[mA]mA_@kAc@iAmHeRaEkKi@uAc@kAc@mA_@mAa@mA[kA[kAWkAWmAUqAUoAQsAOkAMsAMsAKuAIwAkBkZIsAEoACqAAuA@uADsAFkAJsANqAPsAToAVmAZmAhEwNZiA\\qATqATuAPsALyAHwAFuABwA?yACuAG{AIwAMwAOqASuAWoA[sA[iA}FsSi@qBo@{B]mAYoAWmASmAQoAOsAKkAIsAGoACsAAuAAsA?qAJw[?sA?uAAqACyACwAEyAEsAIuAIuA]uEcBgWIqAIwAEqAEqACoAAoA?oA@qABqADqAl@{PDsADyA@wA?uACuAEwAGyAKqAKsAOuAQmAWuAUmA]sA]oA[kAgDoL[eA]oAWeAUkASkAQkAMoAImAIoAEeAAmA?cA?eA@e@Bg@DcAHmAJiAFo@Jq@PiATiAViAXcAXaAZ{@jOkd@`@iA^eAb@gA`@_Af@kAh@iAb^wv@t@cBx@gBz@mBr@cBp@cB^{@^}@Z{@\\}@ZcAVaARaAReAPcANgALgAlAsKtBwRVaCdCwUZwCtDe]T}BHw@Hy@Fw@Dw@D{@By@@y@?y@Ay@Cw@E{@Gy@I_AKaAOeAMs@Os@Qs@Qq@Uo@Uq@Yq@Yq@Yk@[i@]k@]i@[c@]a@c@e@_@a@_DuCuEgE{GkGoG_GeAaAgAaAgAcAcA}@cAaAiAeAcAaAaA_AcAaAgAgAaAaAgAiAwQmRiM_N_IiIu@u@y@u@m@g@m@g@e@]e@[i@[g@Wi@Wg@Um@Ui@Qk@Qi@Om@Mm@Ko@Im@E]A_@A]?k@?k@Bo@Fm@Hk@Ho@Nu@Tw@ZqLfFoAh@}@^{@Z}@Z{@X}@VaAT{@P_AP_AL}@JcAJ_AF}@DaAB_A@aAA}@CaAEaAG_AI_AM_AK_AO{@O_AU}@Wi@Si@Si@We@Ue@Wc@Ue@[a@[e@]a@_@_@a@c@e@_@c@]e@_@k@Yg@[k@[o@]y@Y{@W}@W_AqJa^_AoDSs@Qs@Us@Us@Ws@Wo@Ym@[o@_@q@_@k@]i@a@g@a@g@c@e@c@e@c@_@a@a@eBaBg@e@{@w@qAoAg@g@i@k@g@m@e@i@g@o@e@q@c@q@c@s@c@u@a@w@]u@_@y@mWml@a@{@_@y@a@u@e@w@e@s@g@s@i@o@KMa@c@c@a@e@_@c@]o@c@yXuQw@i@w@k@w@k@w@k@u@m@s@o@s@q@q@q@q@s@o@s@KKg@k@o@y@o@y@m@{@m@y@k@}@m@}@i@}@g@_Ai@aAk@eAi@gA[s@]u@]{@Wo@Wo@]cA_@iA]kA_@mAYiAYkAYmAUmAUoAUsAyBuNeAkH_@aCa@eCe@sCa@cCe@oCe@cCe@gCs@{Du@{Dg@gCi@gCi@eCi@eCi@gCk@gCi@aCm@cCm@iCm@aCm@gCq@qCw@uCw@wCy@{Ca`@gvAaFkQiJy\\]mA]gAa@iAc@kAa@aAk@sAc@aAi@eAk@cAm@cAo@_Ak@{@m@{@qHoJgBeCoDuEo@w@o@}@o@{@m@{@m@{@m@_Ai@{@k@_Ai@_Ag@_Ag@aAg@cA}@kBeEuIwMyX}LoWg@cAg@iAe@cAc@cAa@eAa@cA_@eAa@gA_@kA_@mASq@Qs@YeAWkAYmAYqAYyAYaBgP{w@sAwGyDwQqEwTWqAWoAWwAUsASqASsAeFs]a@uCcH{e@QqAi@qDO_ACMQqASoAUoASmAWmAYmAYoA[kA]kAcIiXa@uA{AeFY_A[y@ISSg@a@_Ac@{@c@w@g@w@e@q@k@u@k@q@i@k@m@k@o@g@q@g@q@c@q@_@[Q_@Q]O]Mk@Sk@Qy@Ss@Oy@Ku@Iw@Eu@Cw@Au@?yP?s@As@As@Cs@Eu@Gs@Is@Iq@Ms@Mo@Qs@Sq@Qo@Uq@W_@Oa@Qc@Sa@Sc@Wi@[e@[m@a@o@e@q@k@k@g@m@i@i@i@g@m@i@q@i@q@g@q@e@q@c@s@c@u@c@u@_@w@a@w@a@}@[y@]}@[}@Y}@Y_A[cAcAyD}AoFWaA]cA]aA]}@a@_A_@_Ac@}@c@}@i@_Ae@u@g@s@g@u@oEiGsLsP_@g@]i@]g@[m@[m@Wq@Wo@Wq@Ss@Sw@Sy@Mu@Mu@Ky@Is@I{@Gy@Ey@a@wIE{@G}@Gw@KaAMy@Oy@Sy@Uy@uA_FoAmE]kA[kAYaAYeAYoAYqAWoAWsAUsASuASyAMeAMgAKcAIiAEkAEqAEyAGqDMoGGsDEgHI{DWsJGmE?y@?{@@y@Dy@Dy@Fy@Hy@Hw@Lw@Jk@t@wDLw@Jw@Hw@Bm@Bk@@o@?o@Cq@Cs@KoBM_CMgCU_EEu@Cu@Ay@?y@@u@@u@Dw@Du@Fs@Fu@Js@Ju@Ls@Ns@Pq@Po@Ro@Ro@Tk@Xm@Vk@Zg@Zg@\\g@\\e@\\c@`@a@^_@`@]`@[d@[d@Yd@Wb@Sf@Qd@Qh@OpG{Al@Of@Mj@Sf@Sf@Sf@Uf@Wb@Wf@[d@[d@_@b@_@b@a@^a@`@a@b@m@`@m@`@o@\\o@Zo@\\u@Vs@nGoPTq@Tq@Rq@Ru@Ns@Pw@Lu@Lw@Jw@Hy@Hw@Fw@Bi@Dk@Dy@@w@@y@@{@?{@A_FEiQ?u@?s@@q@Bi@Bi@Fu@Hs@Jw@Jo@Lo@Po@Po@Tm@fCqGTq@Ro@Ru@Ns@Ls@Lw@Hu@Fw@Dy@@s@@u@A{@Cy@Cu@Gy@Iu@Ku@Ou@Ou@Qs@_D}LqLyd@wD_O}CyLYmAScASoAOiAMqAIoAGqACsAAwA@uABsAFsAJqAJiAJcANaAPcARcAR}@V}@\\cAb@sAlGcRfDqJjHeTpAqDtGwR^iAZoAVoATsANsALuAFwADwA@uACwAGuAIwAMuASsAUqA[oA]mAa@iAc@gAg@eAk@aAm@}@cBoByEwFo@{@m@}@g@aAg@eAc@gA_@kA[mAWoAUqAOwAK{AIcBE_BIaD[uLGwAIuAMyAQuAUuAWqA[qA]oAa@kAe@kAg@gAi@eAo@eAs@cAw@aAiu@c~@m@u@o@{@m@}@k@}@i@_Ag@aAg@eAe@eAe@eA_@eA_@iAgDcKiDgKcCqHiI}VqD{Ka@oAc@kAi@kAi@aAq@aAs@_Au@y@w@s@y@m@y@m@{JeHqW}QaD}BkFuDwB}AeA{@w@m@w@o@uCcCwIiHoVmSmIcHu@m@y@m@w@g@{@g@{@c@}@a@}@]}@Y_AY_AS_C_@aAK_AGaACaAAaA?_ADu@Fo@Fm@Jk@Lm@Nm@Pi@Pm@TYLYNe@Ve@Zg@^sJ~Gy@j@w@j@{@d@{@b@w@`@{@\\{@\\{@Z{@TcATy@P{@N}@L}@H_AH_AD_A@}@@_AAaAC{@EaAI{@KsBSkAMgi@oFmJcAsEe@cCWaAO_AO_AU_AW{@W_A[{@_@{@_@{@c@{@e@y@i@w@i@sPwLgOwKy@o@s@m@u@s@s@s@u@y@o@{@o@w@m@{@k@aAk@_Ag@aAu@{A_Pm]u@}As@yAu@{Aw@yAy@wAw@wAw@sA{@uA{@sA{@qAaJ{McNkSaAyA}HoL}A{BmEuG}@oAaAqA_AkAaAoAaAkAeAmAeAgAeAgAeAgAgAcAiAeAgAaAiA_AiAaAmHsFoKeIiSmOeQwMsNuKyk@kc@_BkA_BkA_BgAmAw@mAu@iAq@gAm@m@[cAi@iAm@aAe@kAi@uB_AoDyAoGeCoJsDuD{Ae@Ue@Wc@Yc@]][][]_@Ya@Ye@[i@Wm@Wm@Uo@Qm@Qq@Oq@Ku@Ku@Iw@Gu@Eu@Eu@Cw@Ay@Aw@AoAAwA@{ABuAFyAHwAHsALwApBuUzAePx@gJHqAFsAFqABuA@oAAiACkAIkAMoAQiAUiA[eA_@cAc@aAs@kA]e@a@c@_@a@c@_@g@_@i@]q@_@y@a@_A[{@U}@UkHgBoHkByFuAcXwGyCs@a`@oJ_AW{@Yu@Yw@]}@_@eAg@{@g@kAs@cAq@}M{Ied@cZeRaMwA}@wA_A{A_AaB}@}A{@aBy@eBy@iBy@kBy@qH}CcFuBgTcJiIkDmTcJcAe@oAk@kAm@kAq@w@g@u@g@e@][Ue@]c@_@e@a@c@a@c@a@c@c@m@q@o@u@o@u@o@y@m@y@m@{@k@{@i@_Ai@_Ag@_Ag@cAe@aAc@cAc@eAa@gAa@gASo@Uq@Sq@Sq@Sq@Qq@Sq@Qq@Qs@Qq@Qs@Qs@Qs@Qq@Os@Os@Qs@Os@Ou@Os@Os@Ou@Ms@Ow@Ms@Mu@Ms@Oy@i@kDW}Aw@sFQoAQqAOsAMqAMqAi@eGGy@Gw@Ew@Ew@Gw@Ew@Ew@Ew@E{@Ew@Ey@Cw@Cw@OcFAw@Aw@Cw@Aw@AqBAw@?w@Aw@?y@?w@?y@?w@?w@@y@?w@@w@?u@By@DwD@sAP_M@w@@{@@w@@u@BoBAy@Cw@Cw@Ew@Gw@Iu@Mu@Ms@Ms@Qs@Qq@Uo@Uq@Wm@Ym@Yi@[i@[e@_@i@_@c@c@c@a@_@c@_@sMaKe@_@c@_@a@c@e@e@c@k@c@m@Wc@]k@[m@Yq@Wo@Wu@Us@Qu@Qu@Oy@Mw@Kw@aA_IqDqYOoAKw@Ms@Ms@Qs@Sq@So@Wo@Wm@Yk@]i@[g@_@e@a@e@a@a@a@a@iCeCe@c@c@a@c@c@s@s@gAeAc@c@a@c@a@c@a@c@c@e@}EqFc@e@c@_@c@_@i@]g@Yi@Ug@Si@Mk@Me@Gg@C]Ck@?m@@sHRq@@{@Bi@Bm@@i@Am@Cg@Gk@Mi@Si@Ue@Ye@]a@_@]]Y[Wa@_@k@Wm@Yq@Qm@Qu@o@}Ci@gCa@qBOu@Mu@Ig@E_@G_@Ee@Cg@Eo@Cg@Ck@Am@?k@?i@Jih@DqQ@wADgH@{@@w@\\eTHgFH_FBeBPqJ?y@A{@Cy@Es@Gu@K{@Mw@Mo@Mk@Oi@Us@Uo@Yo@[m@]k@_@i@]c@{@}@_FcFc@a@e@_@e@]g@]_@Ua@Sc@QYMk@Qi@Mi@Mi@I_@Ce@Ck@AqMAoA@]A]A[E]Ec@I[Ia@K[Ic@Oi@Qg@Uk@[g@Ye@_@c@_@a@a@_@g@_@k@[k@{BwE]s@Ym@]k@]i@]g@_@g@aAmAYc@Wc@Wg@Ym@[m@Wq@Wo@Wq@Wq@Uq@Uq@Us@Uq@]kASq@Uw@Sw@Qs@Os@Ow@Qw@gAuFu@aFIs@Ig@Eg@Ee@E_@Aa@Cc@A_@Ag@?i@?q@@kC?U?UAWCYCYCYE[EUGWGUEUKYGUKUISMWMUOUOSOSOSQOQOQOCAOKSKu@]MCK?O@_AAqBCHCY??@i@AsAA{@AF_ADg@Bm@B]@SDw@B]Dq@H}@F{@RuBL_BLwAFs@Fi@Fm@@IL}AFo@Fm@PqBFm@Do@Fi@?[{@K]Ia@MB]?A?AEQ@E?I?mAAu@@eADkDAg@?_B?g@@cB@]?QB_BD{@FiC?i@?E?[?a@A]@[@g@C_BCo@?A?C?GEuAASC_A?YAm@?CAAEI?s@?qF?wG?a@?a@?sB?u@@c@?WBi@@a@B[D_@@ID]?EHi@DSBODSBOJe@DQJ_@J]HWHWJYJWVo@JUJUBGHMHOb@s@LSLQNUNSNUNQPQb@a@?AjAiAv@s@VU`@a@HG?AJIPU@AHKNQPUJQLUHQDGJSDKDMHUJYFSBKFSDWDQRqAFu@@[@W@Q?I?I?m@@_@?[?]?}@?oA?_@?m@?mA?m@?O?m@?g@Am@@y@?]@q@B}@B[@_@Bm@@]J_BJc@Fy@HaADYD]D]@I@QF_@Jw@N}@Ls@?CHe@FYXyAJi@He@f@kCLq@V{AJk@Lu@TaBD[TkBLkAH}@Hu@Ds@Ba@Dw@Dy@@[@]Bm@?K@y@@w@?O?aA?mA?mA?mC@iE?_E?cB@]?C?o@?_BEiBCo@?ICu@Ei@Ci@Ee@Gu@I_AM}@CUEU?AE_@Ie@CQCIGa@CMI[G[?EAEAC?EKa@GY?AGWACGSEQOe@K]GSQe@GQGSQe@A?MMIWGQMa@Oe@Sk@M]M_@EOEQI[Kg@Ow@WuAScAQeAUqAaA}FMy@iBkKKm@SkAy@sEk@cDIk@aAwFo@{D_@}BG[QeAIi@SmAKk@s@kEcAoGy@_FaAwF}@qFaAkGWaBKu@Gc@EYAMGa@Io@[yCM}AIy@MaBa@mFs@mJSsCMwAYkDGu@Gs@Eo@Cc@MoAEk@CSC]Iy@C]?ACYC]C[C]C]C[C]E[C]C]C[C]C[AMEk@C]C]C[E]C[C]C]C[ASAIC[C]C]Gk@Ek@C[CY?CC[C]C[A]Em@AQC]A_@E_BCaCAKAkAAsBA}@?qC?MAqEAoC?A?m@?AAaC?kAAs@AmBKcCA_@KyAGs@Cc@CWOsAAEQoA?AUyAIe@G_@G_@Ow@S{@EUYqAAAYmACKW}@EQGQMc@Mc@k@iBYu@k@aBWq@Yq@M[Wm@Wk@MWk@iA[k@[k@U]u@oAa@o@]e@gAyAe@m@s@u@[]QSMOWUa@a@i@e@}@u@eAy@mAy@CCc@WMIs@c@eGwDmAu@qAy@_@Ui@]WQ}AaAOIwEuCkAu@WOgDuBQKQMm@]a@YwBsA_BcAiC_Bq@a@q@c@QKq@a@m@_@YQm@_@CCUOUMeAq@e@Yy@g@SMQMSMkAu@y@i@y@k@u@e@IG_CcBwAcAUOwB_BqGwE{@m@OMw@k@eAw@y@m@iAy@{AgAAA{B_Bw@m@{@q@o@c@][UWUS_@a@_@a@a@e@_@e@k@w@OUi@w@e@y@k@gA_@u@Se@i@mAc@oAIUM_@EOKYUu@Su@Mi@S}@Kg@Mo@G]Kk@My@Io@Im@Gi@?Ca@cEi@aGI{@Iu@KiAEg@KiAIw@UkCIaAEe@Gk@O}AEe@CUE[E]Iw@E]E[CWGa@AMKo@Gg@M}@CMGe@E]OaAKk@E[G]G]CMCKCSG[G[CMAKEOCQCIG_@Q{@G[Ic@I[Ie@Oq@Qy@CEIc@CII_@Ok@I]U}@U}@?Ae@iBa@sASq@EMIWCGKa@[cA[_AIWKYKYEMCIa@kAUq@GOMa@Wq@IWm@eB_@iAa@iAKWs@uBEIu@{Ba@iAUq@a@kAEI_@eAM_@M]g@{A]aAUq@Qg@Qi@]eAYaAa@yAMc@UaAI[a@kBG[YoAAGSiAOw@G[m@aDKg@[_BG_@?AWsAOu@Kk@CQQw@EUQw@YmAMi@AC_@uAOm@M_@Ss@_@kAIUIYM_@Sg@IWWs@i@qAa@cAYo@O[Yo@]s@ACc@{@[k@EIc@u@KO_@o@MWW_@u@kAQWk@y@S[a@k@KOoAiBkAeBUYMUo@}@i@w@OSGKa@o@QUOS_AsAW_@m@}@CC_@k@a@m@oAgBkBqCKOc@o@MQ[c@Yc@a@m@AA[c@w@kAA?S[Ye@]m@ACYg@IMISKSISc@eA_@}@KWKYGSAEKYQo@GQKa@I[GYEMCKGYGWEQCMI]Ii@Ic@CQKm@a@iCCKIq@ESEYG_@O}@EUG[Ii@ESSwASmAIg@Mu@?AIa@Ko@UyAIg@Ge@CMM{@UyAO_AKs@Mw@ACUyAQmAIa@_@eCKm@YeBUsAU{AMw@Ms@?CG_@EYMw@G_@Mw@E[O{@QeAW_BIe@]_CE[Ki@Im@G]EYG]E]CMAGO{@E]GYE[AIGYCUMy@G[EUGa@AIKk@EW[oBUyAG_@QiAGc@EWG]SsAGY?ASqAKo@AGSmAIe@Ko@YmBe@{CYgB?AMq@Kq@?EGYKs@G_@OeASyAMy@Mm@Ki@WyASoAO}@SgAO}@SmAKs@UuAu@gDS{@IYKa@GYSs@IWSq@_@qAUo@Us@IUK]Uo@ISWq@?AWo@MYO_@c@cAKUIUKSKWKWe@cAMYMWAEIOKWWm@EIQc@Yo@MY_@}@s@_B]w@Wk@KY}@wBEMUg@]w@]s@KWKUMYEMEIe@gAKWAECG[u@g@iAM[MYGQM[MWKWIQYq@KWKYMWYo@o@{ASc@Qc@MYKWKUWm@EKQ_@GOKWKUKUISYq@KUKWKUWm@MYEKQa@KUISM]IQO]Wo@a@}@O[M[MWUk@A?EMcA_CEOSa@Qc@CEQc@GO[s@IUi@mAYq@Yq@ISMWISAECEKWKSOa@Wk@Wk@ACO]M]IOKWKUGQCEKUEKCIMYACISKUKWAAM]IQCEGMM[ACKSISEKQa@AEMWISMYKWMYQ]KS[s@gAgCIQu@}AIMMYMS]o@Yi@ACIOMUOUOWCCGKo@aAOSOWQUu@cAAA_AqACG_@e@MSSWEGEIOQAAOU_@e@Yc@OSe@m@g@q@QWq@}@W]g@q@_AqAa@i@m@y@o@{@_@g@MQm@y@i@s@k@u@OSGI_@g@e@o@Ya@QU]e@[a@_@i@W]g@q@IKKOQWKMi@u@U[]c@e@q@q@_A_@i@c@m@AA[e@[g@IOUa@Wc@OWYi@i@mAQa@[w@AAK]Qg@k@kBc@aBU_AYoAMs@QaAM{@Im@Iq@E_@Iw@AO?AGs@Gs@A]Ey@Eu@?WCq@C}@?_@?aA@m@?C?k@@m@@ID{A@_@BYBcABm@@]BY@[B]@a@JaBJ}AH}AF}@?APiCBa@@O?KB]Dq@Di@Be@NkCDm@Ba@@[B[@[@]B_@@]?C?W@W@c@?[@Y?S?I?c@?_@?AAw@?oA?IAu@?u@CqD?y@?OAuAAyA?g@A_B?KAcBA{@?Y?A?_@Aa@?[?w@AoAAaA?g@Ak@AuA?m@?YAW?YAe@?OCi@Co@Ce@?IEc@AQGm@CYAICUGg@Ii@E[AGEWESACG]Ia@Kc@Qy@Oo@AEUaACOI_@S}@Ow@?EIg@CUIa@AKAIEa@AECYAMCa@AMC_@AO?GC]AYA_@?IAS?Y?c@?[?u@?M?Q@]@y@@Y@]Bc@Di@Ba@?CBYHaAHo@Hk@BQ?CDSHk@BKDWHa@FYLk@H[BMXqALg@P{@ZwA\\{ALi@No@d@{BViAPy@F[FWFYFYD]Jo@Fg@D_@D[B[HaADs@F{@Bw@?a@@[?c@?iA?g@A_@?_@Cu@?ACc@C[C]G{@AMEa@Ee@E[Ii@Ik@EYMq@Gg@Ig@Ie@O}@M{@AAg@_D?AGa@]qBIi@Ic@UwAO{@Mu@E[Kk@G_@?AWyA]uBGa@M{@Ic@YaBIk@AG]wBCQUsAO{@Ge@UqA[kB?AO{@Mw@WyAESG_@CMOq@I_@I]K_@ACGWOg@AAK_@K[Qe@Qe@Um@Yo@Wo@A?Ui@MUEIUa@Yk@_@q@EKa@w@]o@AASa@a@u@i@cAi@cAS_@k@eAOYMWIQe@_AEGYm@Wo@MWEMEKYs@KSGSA?O_@Qg@ACi@wACIM[EO[{@Uk@a@iAKYWu@IWGOCIKYM[e@oAk@aBm@cBSo@M[AEOa@c@mAq@kBM_@[{@a@kAKYYy@Um@Og@Qe@[{@Qg@Yw@M]ACGSQg@KYKUK]Um@_@eASk@Uq@GQc@iAK[Uo@Qg@KWi@}ASk@GSISUm@Ws@Y{@aAqCk@_BGOw@{BIWc@oACGIUi@yAQi@e@oAUs@KWKYIYM[IUUq@IUYy@i@yAACM[Sm@M[K]KW_@eASm@Uk@Wu@Oa@GSYw@CI[y@Yw@Wu@EMc@qAKUMa@Sk@GSQc@EOCGKYEMM[?CUm@o@gBCIISOe@Oa@AECEOc@IS?CYu@ACOc@ACM]Ws@KYEOQe@ACQe@Us@Yy@EM[}@GOk@}ACGCK_@cASk@K[EKy@}BcB}E_CyG}AmE}AiEACY{@_@eACEUs@IQm@gBCIe@qAEKYw@CKCGc@kAK[K[q@mBEKYw@Qg@M]EKEM_@cAQi@CGsAwDOc@GQc@mAISIWSi@c@oAQe@g@yASg@Qi@g@uAOc@?AUm@a@kASi@M_@Uq@Si@Sg@Ww@Uq@M[Sk@Ws@Uq@c@kAAE[{@s@oBUo@Uq@ACYw@KY[}@AEKYM[KYUq@a@iAM_@KWIWGQCGEMOc@K[KWGQoAmDeAyCGQYu@CICGO_@IWQe@Ma@c@kAc@oA[}@Oa@Sm@KWGOWs@Qg@M]k@_BSi@Yy@g@wAM_@Yw@KWSm@M]]_AM]GSGO[{@oAsDWq@Wu@gBcFWu@Sk@Si@M_@ACa@gA?AEIY{@CG]_AIYEKIUkBkFCGi@}A]_Au@sBe@sAIUOa@kAgD{@_C_@gAQe@Uq@Qi@Wo@K]Oc@Wq@_@eAu@yBm@cBIUoBwFe@qAQe@Si@MYWm@IUQ]IQMWQ_@U_@O[k@}@QYQUSY_@g@IK_@c@a@e@AAMOWYiAiAc@c@m@i@a@_@UUe@c@UUGE[[[[SSOOWUSSCAaAaAa@_@k@k@oAuAUWc@e@o@w@a@i@[c@a@o@[i@k@cAWe@Ue@Yo@Wk@Si@KYM_@Sm@Qk@EQAEUw@GUEUOm@?CESMi@G_@Ms@Ka@G[E[I[G]EWGYKi@c@{BIc@AGc@yBOo@AIGUGYK]Ok@K_@K[IYAAIWOc@Qi@GOCGKYIWMWSg@]w@Yk@S_@Ue@MSMUOWMU_@i@OU]g@QWMQQUMOW[k@m@SWSSQQMMQQQOQMw@o@][QMy@q@a@[USi@c@e@_@UQUS]WQOe@_@g@a@k@c@]YUQMKOMg@a@c@]WUOKUSo@g@UQOMc@_@u@k@y@q@AA{@q@A?]Y]Yk@e@w@m@e@_@g@_@a@]QMe@a@e@]e@_@e@]OM]Y[UQOMKoAcAk@e@]W}AoAMKq@i@gBwA]YCAMKGEQQKGUSSOKKMKOMKGGE_@[s@k@m@e@{CaCgA}@CAQO_@Yc@_@c@[e@a@o@g@]WCCIGSOOKa@]{@o@w@k@SO{CaCg@c@_@]]_@e@e@AAMMOQQSMSUUW]AAW_@W_@[e@KQ[g@OYOUO[IMOYWg@GMGMYi@O]KUIQM[KWO]Uo@[w@ACe@mACIUm@a@kAa@kASg@Ys@Oc@AAUk@Wm@K[Si@w@yBkAcDmBoFYy@y@wBw@sBM]m@aBc@iAACUm@EKq@iBQc@AEO_@eC{GWs@Yw@q@kBg@oAWs@ACK[Sg@a@gAo@eBWs@c@iAWs@EIg@uASi@a@gAOa@Yw@Qg@a@cAQg@EMy@wB_@gAEIKWIWKYKWCIi@uAc@iA[y@e@oACKM]g@qAg@oAe@qAw@qBSk@Sk@g@qA_@cASi@CISk@Um@O_@Qi@ACWu@KYSk@K_@CEUq@Qm@_@mACEKa@Qi@Wy@Ok@[cAAEOk@EMQm@g@iBUw@I[Qm@IWSw@CIEMI]]kA?COe@CK[iAOi@ACa@yAMc@EQ_@oAKa@[eAe@eBk@mB[iAYeAACaAkDOg@GQ[gAe@cBm@uBEQCIK[K_@[eAI[[iAUw@I[GWIYK[AG?AEOIYIYIYIYEKEOGWIYIYIYK[GYIUSu@IYSs@GWGSAGOe@Qu@Sq@GWOk@K[Ka@]mAU{@?AEMi@qBOk@A??AI[IYIYIY]mAQq@_@oASs@Uu@Uy@_@eAIWIU?AAAUo@Ws@Ui@M_@MYKUIQO]Wo@Ue@EIO]IMMWUe@CEOYAC]o@OYS_@CEWc@KSOWOUMUW_@MSMSKOu@iAIKOQOUg@o@KMQSOSQQQQOQe@g@SS[[KKWWQQQOOOQOWUWUYUOMc@]UQWSEEk@a@OKkBwAAAQMECa@Y_Aq@WQi@]]U_@WKKIGwB}AOMc@Yy@k@_@Wk@_@[Ug@_@qBsAcAs@GEa@[_@WYQ]Wg@_@[UuAcA]Um@c@UOWQgAu@a@[i@_@_Ao@]WQMa@YWSi@]u@i@aAs@QMe@[_@Yc@[A?QMa@YIGiAw@SM]W[SWSo@c@sByAc@[a@YYQe@]{AeA[UEEcCcB}BaB{CwBGEMIQMWSGEOKGE_@WUQGCIGmA}@a@YAA_@WCAYUIEiAw@gAw@k@c@QMYSe@[IGSOqA_Au@g@wAeA_@WsAaA{@m@KI}@o@QMi@_@mA{@GG{AeAk@_@o@c@MIw@i@QK_@YOIaAo@UMk@]IEAAIGYOYQa@U_@Qy@e@{@c@m@[]Qc@WkB_As@a@YMe@WMGIEgAk@q@_@{Ay@QKw@a@IEKE_@Se@YQIKGAAo@[QKECQMYOm@]UMKGe@YcAm@a@UGE{@g@MIYQ_@U[SgAs@[S_@U[UAAy@g@k@a@QMSMQMSOQMSMSOQMQMSOQMSOKIKGa@[QMSOQMSOSMQMSOQMSOQMQMSOcAu@e@]e@]GEg@_@SOu@i@SOQOe@]SMQOCAOMQMQMUOe@]w@m@QMSOQMOKSQg@_@QKSQa@YUQg@_@wB_ByBaBs@i@YSc@[]WQOA?i@a@YSc@[]YECa@[UOYSw@m@KGYUk@c@SMAAeAu@WQkAw@a@W[Sa@UQM_@UYQg@WYQEC_@Sy@c@w@_@q@]s@]GCMGSKe@Ua@Q[QWK]OIEiAi@MGk@WMG[OQIo@[uCsAqAm@uAo@oAm@qAo@AA]OCCSISKSKQIOGSK{@c@uAs@qAs@o@]]QeB_AKGOI_@Sg@YSKSMe@Wo@]_@Uc@UWOe@WAAaAi@c@WWMAAk@]g@YWOm@_@GE[QQMWMSMy@i@c@Y{AaA_Am@a@WGE_@UmAw@IG]UUO}@k@KIWOSMSOSKSMSOe@[SMy@i@SMOKIGKGg@]OKUOCAOKSOKGECIG}@m@[SSMe@[IGKGu@g@u@g@ECQMSOQM]W[UIGGGQOCC]YAAYYIIQOWYEEQQKMQSW[]e@QWQYIKS[_@m@S]CE]i@[k@EG_@m@e@u@S_@GI]k@g@y@OWIMMU{@wAS]a@o@MUQYIMQYQ[Yg@U[y@uAc@u@gAiBc@s@oAuBQ[Wa@S[k@aAS]a@q@Wc@k@cAw@wAa@u@Ua@]o@MUk@eAo@oAQ[EIEIi@cAMWQ_@AC_@s@IOKUm@oAUc@Sc@[o@Yg@IOEI]k@OWS_@IOm@{@MSY_@W[MO]_@WWWUa@_@a@]m@g@k@g@y@q@YUGEYWa@]_@[_@[WUOMIIYUYUOM[WAA[Y]Y]YSQIGoAiAuAqAKK{@{@OOUUQQ?AY[CCWYSUY[q@u@KMCC_@e@a@e@SU_@g@MOOS_@e@QU[c@Y]c@o@Ya@QWU]Ya@Wa@QWWa@e@o@ACq@aA_@e@Y_@S[g@m@W[W]UW_@c@SU[]k@o@g@g@a@c@i@i@OOMMk@g@c@a@WUYUCC]Ym@g@]YOMm@e@EEuAaAEEg@[_@YiAs@{@e@YSq@_@[Q_@Ss@_@]QgAk@]Qu@a@}@e@MIYMg@YSKg@We@Ws@_@UOWMA?a@Wq@]WMMGSIe@Wk@[YOGEc@UOI}@g@g@[AAWOg@[[Sa@Y]UCA]UQOg@]k@a@c@[[S]WIGUOi@_@q@e@w@k@QKs@g@EC]W{@k@i@_@YSMI[Ug@]OK[UOMQK_@Wk@a@c@[MIQMm@a@w@k@e@]c@]_@Yi@c@e@a@MISSg@e@c@_@a@_@c@c@_@_@YWIIc@e@UWYYKMKMIGEGMMGGKMSWUWAAUWOS_AeAk@q@AAUW]a@_BmBGGc@g@g@m@KMY[a@e@GGSUY]]]CCUUUUWW]]AAc@a@QO_@_@AAa@]]YSQ_@[KIYW]WYS[W]W[U[UQKIGSOSMOKUOQKYQMIQKSMUO[S]Se@[o@_@UOOKq@e@_Ak@y@e@_@UIIQMe@WKIMI[U]WCAQMa@Ye@_@OMSO?Ac@]SOOOQOc@a@_@]OMYWOOGE[[e@c@QQIIGGOOQOOOQOQOOOOOCCMMQQKKEEc@_@OOQOKMy@w@g@e@QQAAMKMMEEGGQOQQSSOOQOOOc@a@OOQQOOQQc@_@OOQQKICEKKII_@]e@_@QOGGGECCGECESOOMAAa@YMKCCQMSOc@]IGGESMQOQKCCQMSMQMUO}AcA{@g@QKg@Y_@SQKSKSIe@WCAOGSKSKQIC?QKSIQIECMGQIUKKG[OQISKOIWKSKA?QISKECIEUKUKQIQISKSKKEGCSKWKOIQISKSIUKQIQK]OIESKUKA?iAk@kAi@QIWKQIAAOI]OKESKSIQIg@USKQKUKQISKSISKSKSISKQISIQKUKSIQISKQKYMOISIQISIUMQIQICASKOISKUISKSKSIQKUKUKe@USIQIUMSISKQISKEAKGQIWKw@a@UKQGCAe@USISIQIi@Sg@SQGUKe@OUISGUISGSGi@QSGUGKCWIWISGGCMCUGQGOEm@QSIGAKCSGSIEAIAICOG_@KMEc@Mg@OKCGCi@OOESIYI[I_@MKEIASGEAa@MSGUGAASGQEUIQGC?QGUGECu@SGCs@Si@QSGUGSGQGA?UGSGSGSGSGUISESGQGUGSGWIg@OME]KUGUIo@QKEYI[IA?SGUGk@OQESGSEEAOCSGSEUGOCUGUEKCIAUGQCAASEIAKCSCUGSESCSEUEUESESEQEWE_AQSESESESEUEUEUESEUESESEQEC?UESESEUESESEQCCASEUESESCCAsFeAo@Mo@MYGy@Qi@KaAUe@Km@OCAg@Kq@Q]KaBc@UGa@Kc@M_AUA?s@S{A_@MEe@Kk@OmBg@_@Kg@Mk@OYIsA]s@U_A[{@]c@QoAk@c@Wu@e@i@_@QMSMSQCCYUi@g@OOk@k@_@c@a@i@S[o@}@IOOWACKQKSOWCGQ]_@y@[q@e@kAAC_@{@Wq@kAsCw@mBcA_CUe@c@y@Q[ACIK?CCCQW_@g@e@i@UUi@e@QMe@]UMAAWMa@Se@QOG_A]cA_@_@MKE{@[UIKE]MEC_@MGCKEMGMGAAMGIEEAUK?ACAMISKSMGCCCEEUMSOQMQMMKYSQQKG[YQQQQIISSY[w@{@kBqBa@c@GIc@g@_AcA{@_AGIWWMQMOq@u@EGcAgA?Au@w@EEs@w@]_@[]OQg@k@II]_@[_@QSe@k@Ya@e@o@KOU_@MSOWS[Uc@MWGOEEGOGOA?Sg@CEKWIQCEGQAESi@AAKYK[KYACIWESK_@CEGWEQMc@EOAKEOI[GYAGEUG[EYGYE[Gc@EWSkAKm@AGGe@Km@?A?AQgAOaACMCKAEAEACGIM_AGa@Ko@_@kBQ}@I_@GWCKCKI]GUAEOs@Ka@EQ?CI[G[GUaBsHa@eB]yAiEcREUwBmJWkAUaAkAmFOk@i@eC_@aBa@sBKg@Kc@GWMs@Oy@GYG[?AEWG[G[E[ESGa@G]G[E[G[E[G[G[G[EYG[E[GYUsAG]E[G[GYE[GYE[G[G[G]EY?AG[EWG[G]E[Ow@G[EYEYAAE[G[G[E[GYE[COCMGYEWG]G]EYGYMs@AEG[GWOw@WqAGYQw@I[GYGYIY?AGYIYI]GWK_@ESa@aBa@wACKEKOk@CIIWcAsD_A_DIYIYI[IWI[IWIYIYEQCIIYIYKY?AGWIYKYIYSs@I[EMCII[Sq@IYIYI[IWIU?CIYKYIYIYI[IYCIEOIWI[IYIYIYUq@GQEOIWK[M_@CGGQGQSm@IUK]AASm@IQAGKUKYKWKYKWISAEWo@CGGQKWIQO]KWKYKWO_@GMMYWq@KUEOEIMYKWKUK[KWKWKUKWMYKYKUKYMYIUKUYs@Wo@KWKWWm@IQCGWo@KYMYKUKYACISKUKYYq@KUKYKYEKEKKWKWKWIYWq@Ws@IUKYIUK[K[?AGUUs@IWIYK]Qo@IWI]GQAEGYIYI[GWI[G[EOCKGYGYG[IYG]GYG[Ow@G[G[EWG]EWG_@EYG[CSAGE[G[E[E[E[EWAMCQE]E[Kw@E[QuAOqAE[E]EYE]E[E[E[E[CYG_@CYE[CSGg@EWE[E]E[E]AGCSE[CYE[E]E[K{@Ky@EWKy@E[Kw@E]CYE]EYGe@Is@Ks@Ky@Kw@E_@E]Iu@Ku@Kw@EYE_@E]EW?AE]E[CYKw@Ky@E[E[E]E]E[E[E[Kw@E]AMCKC]E[E[E[E[E]E[E]E[E[E_@UeBEa@CMCQE[CUE_@Ku@?AE]E[Kw@Ee@COE]G_@CYE]AECUEYE[E]Iu@E]E[Iy@EYE[C]EYC_@CYE]CYE_@Gy@Gy@AKAOGw@C]E_@Eu@C[C_@C[A[Gw@A]A[C[A_@Ew@A[C]?SCg@A]A[A[A]A_@A[CuAA]Cy@?]A]?[AAAw@AwAA_@A]?]Cu@?S?GAa@A]?Q?MAo@Ae@A[?A?YA]A_@?]AY?[?OAM?]A[A]?[A_@A[As@?G?WAK?SA[A]?_@Au@A_@?]A]?CAWA]?_@Au@AYAa@Cy@Ao@?KA]C[A]A[C[A_@C]C[A[C]C[AQAIGy@?AGy@CYE]C_@EW?AE]C[EYC[E]E]Kw@Ks@Ga@E[EYG[Mw@G[E[G[G[GYAIEQG[GYGYGYI]Qs@I]GYQo@K_@Qq@Ss@K]Ss@KYSq@KYUq@KU?AK[KWKWKYWq@KYMWKUIUO[KWIQACKWMW_@}@EIMWKWKUMWKWKWMWKWMUWo@Ym@Yq@MWKYKUMUKYKWMWKWKUM[IUMWIYWo@ISM]KWKYKWKYIYEGEQUm@K[IWKYUs@IWK[GQKa@IWIWCGe@aB?AIWKYI[IYSo@I[KYSs@Su@IWKYGYe@}AMa@I[_@mASs@_@mAK_@Qk@Ss@K]IUSu@Us@Ss@Ss@GQK_@Uu@i@gBSs@EMMe@Uu@Sq@Ss@Sq@Og@CKIYUs@Uu@Sq@GQM_@Sq@AAQi@AEWu@Uo@Uo@Wq@Wq@Wq@Yq@Ys@ISk@wAQ_@Ys@Qa@EKg@iAUm@e@gAYo@Yq@Yo@Wo@Yo@Wo@Yo@Wo@Yo@Wo@Yo@Qc@EIWm@M[GMCEWo@e@gAWo@Yo@Yo@Yq@Wm@Yq@Wo@Yo@Wo@Yo@Wo@Yo@Wm@Yq@Yo@Yq@Wo@Yo@Yo@Wo@Yo@Wo@CGQc@CEOa@GMUo@Ys@Uq@ACQc@CGKYUs@Ws@]eAUo@I[q@wBAGQi@?AMc@o@_CCEYkASw@GUIYUeAKa@G[EUCKGSOs@AIEQ]aBI]Oy@Ms@EW]gBAEU{AIa@EYCSM}@OcAIk@]gCCW[_Ck@uEUmBQwAe@{DGe@ScBS{AM}@UkBQiAKs@[sBOw@?CMq@SmAG[YwAWqA?C_@eBMo@I[]}A]wA[kASu@c@cBEOACOk@K]Ss@IWI[Y_AKa@]kACIOi@IWOg@?CcAiD?AIYSo@_@qAOg@_@uAGQOi@Oe@Kc@GUYcAYgAMg@_@yAGYWcAYqAI_@Ow@_@kBMo@_@mBOcAMq@Ks@YcBGc@EUCOE_@EYSuAAKU}AEa@Ga@e@kDm@kEOeAE]G[WmBk@eEe@oDEWKs@OkAG_@S}A?AAG]aCMaAOiAUwAKs@G[EWUsAO_AQ}@E[q@wDu@cE?CKg@cAwF[iB[eBW{AEUk@_DAGc@_Cc@gC?AKk@q@uDWuAg@mCUkAEUCGOq@I]Ss@CMI[M_@Oi@Ma@GQM]Qi@m@kBISi@cBWu@Wy@c@qAo@mBSm@k@iBGOs@{BQi@Uu@c@eB[mAEOQ{@Ig@]kBYaBIe@CSKm@?AOaAI{@CKMcAGm@Go@Eo@Ec@KsAC[Ey@A[AIGgAA]Cs@Aa@Cm@Co@EgACeAGyA?WAGG}BA]C_@?QIqBEaAIqBG}ACk@Ca@Ei@Cc@G_A?AGm@Gs@CUQ_BCSOeACS[yBG[Mu@G]Ic@Kc@Kg@Ow@q@oCK_@ESAEIWAC?A[gA?Aq@yBUw@Uw@Uu@Qi@[eAi@cBw@aCa@oAIS]cA_@iAc@qAIUo@gBWq@Qe@ISm@}Ac@iACGa@cAOa@GM]y@KUIUIQSc@GKKQKUq@uAYg@Q[KSWe@Wa@S_@OYCCMUS_@QYMWOUCGS_@Yg@S_@U_@?AWc@]m@Sc@MUEIUe@Sa@Se@O[IUCIO_@O_@Qc@Sk@Qi@So@Qk@ACOk@Og@Mk@GUESMk@Qw@Ia@Ic@I_@Ig@EWEWEYOgACUCQEWGq@I{@M{AEg@Gm@SoDSoDAOIqAKaB?IGaAIyAYqE?OG}@C[[mFCo@KyAEu@Co@Gw@AUC]AYEw@IsAMkBUqDOiCQ}CGw@IoAEm@?ACWIgAKgAAQMqAKaAM{AMiACWIo@OoAE_@SaBa@aDIo@MeACSE[Gm@a@eDAAGm@Y{BIu@[cCK{@MiAIk@?EQyACWCOK_AKaAC]Gc@C_@O}AKqAEg@Gq@G_AOoBAMMqBE}@Ek@GuAAYGgAA[Cc@Ac@Cy@Cc@Cy@As@C}@C_AAs@Cu@?ECgAAo@CwACuAAy@?EAw@Ac@Cy@AaAAs@Aa@Au@Ac@CuA?GCeA?ICo@Ai@?a@?EC}@AgAAk@AYC_AAqAAUAYAiAEqBAOAYCk@Am@Ck@G_AAWMuBGu@Ei@Gs@Iq@Gg@CSIi@CSCQCSCOM{@Mu@?CSiAAGIc@I_@AIQy@CMKg@GYKe@Kc@Qo@CKEQIYIWOi@CKMc@Og@K[Sk@GSM]Oc@[y@KWu@eBM]CGCGGMACSe@Se@c@cAWm@Wk@[w@g@kAi@mASg@KSWm@KU]{@GMg@kAGOGMQc@Ug@GOO]KUc@eAWk@Wm@?AWk@[q@Uk@IQMWQc@q@_BKUIQM[Ug@ISCGM[IQIQ]{@Sg@GIK[Se@GMKUISMYEMYq@O]KWIQQa@O_@IQO_@e@gAO[CEO_@O]y@mB[w@Se@Yo@GOi@sACG[s@O_@O[ISOa@KUSi@KWEOKYSg@Qe@M]M]GSKWUo@KYAEK[g@{ACIOa@W{@[aAMc@GQMc@YaAGUW{@K_@W{@Qs@Qk@[qAWeAMe@EQOo@Qs@CKMg@I_@I_@UcAI_@GYGYMk@]aBUmAI_@Ic@O}@Mo@g@uCMs@QgAOaAIk@G_@Ge@OeAG]Kw@Is@Ik@c@sDEc@Gg@AECSCSAQGk@E[Iu@Gq@Gs@I{@Gs@AGEo@E]AQCUGy@?GIkAEe@IiAMqBCi@Ee@AYAUCg@Eo@Ey@AYCc@EuACm@EgACk@?CAY?UCk@Aa@Co@CmA?WE}BEwBAsBCyAAiCAO?K?c@CaB?_AAa@?_@A}@Ae@?SAqACmBCyB?_@CiCAeBC_BAqAAgACwCCeDCmB?a@A]?e@Au@EcD?QAeBAsBCyCAkAAm@AgAAeACiCEaFG_F?KEsEEyD?_AAu@As@AiA?a@CkB?e@Aq@?SCaDE{C?ICwDA_A?KAgBASEkF?YC{AAk@Am@?[?AAc@CcAEoAAKA_@ASIqBGmAC]AUImAIoAGu@Eg@AMEk@Gg@O}AGq@Gg@Ky@?EOqAKq@Ec@EUKs@Ga@EYEUGc@AAIm@O}@Ke@AGm@iDUgAIc@O{@Ki@k@yCI_@mAoGCKE[g@iCGUIc@Ou@c@cCACIa@WqAMo@G_@GYQcAYcBKo@SoAIk@QyASsBGo@KiAG_AGeAG{@?CCcAE}@CeACy@Aw@Am@?}@Ai@@m@?kA@m@BeDB}A?O@_A@wA@o@?K@e@BkC@y@?E@[?UBuA@y@@q@?S?[B_A?_@B{A?u@@q@@o@@o@@g@?W@iA@G?g@?G@O@iA@m@?OB}B@Q?]BsBBkA?[@}@BiBDqD@}@@_@BeCFcFByB@W?o@@w@BcBFmFBiB@}@@{@@o@@gA@y@@k@BaBBuBDyC?y@@[?W?k@?O?sA?SAmAA{@Aa@GwBI}BCm@KwAIiAM_BEa@Go@AESmBSyAE[Ik@?AMaAMy@QwAQqAG_@E]Gc@S{AS}AOiACUQ{AQwAIy@?EIw@IcAGeAIoACm@EkAGyAA_ACkAAwA?}@?kA@mA?a@ByADiBBc@Bo@Bi@@GBo@Do@J{BB[DaAJiBDg@JmBBi@Bo@@EFuADs@Do@@SJuBHwAJqBH}ADm@LaCBa@D}@NwC@ML_CDs@Dw@FmADw@JgBBi@B[DaAFcABc@FiAJuBFgAHsANmCFoABe@Ds@JkBD{@HwAHyAH{AJmB@e@Bo@Dy@BqABcA?e@@}A?o@?cA?]Aq@AqAA}@Ai@IgBC}@Eo@G}@E}@CWIeAGm@Ek@Q_BCSQoAK_AIc@k@uDW{AM}@O{@CQg@aD[sBUsAEY[oBEYIc@Ik@CSCIAKGYIk@Ks@EQ[oBGc@Ie@[sBa@{BIi@I_@Mm@_@gBYkAIYe@gBg@eB]cAGSSi@a@gAGQQa@AEk@yAO_@IOIWMYe@kAUm@Uk@[w@[w@sBiF]{@i@yAe@kAc@gAQe@Si@Ys@c@kAGOKYO_@c@gA?AYq@Wq@Yu@KWKWGOs@kBMYCIO]g@qASg@GOKWUk@Uo@]y@EKc@gAAGCCM]AEm@wA[s@EMYo@c@cAm@oAO]Wi@EGQ]Yk@_@s@KUwAaCWc@IMyAeCWc@U_@Wc@U_@OWe@w@g@y@QYMUaBmCWc@Wc@Wc@SYQ[q@gAe@w@]m@CCWa@Yg@Wa@s@kAOYm@_Ak@}@Yc@k@y@eA{AEEa@k@[_@SWKMc@i@MOc@i@SWgAkAMOYYUWcAcAc@e@k@i@GGu@o@e@c@sAmAm@k@YUk@g@MM_@]GGoAiAk@i@eA_Aa@]]]{@u@cA_AUS_@[MOIGYWw@s@YUMM[Yg@e@WUiAeASQKIKKqAkAOOA?}@y@_@]WUc@a@[W_@]EE[WUU[YSQeA_AUUuAmAIIc@_@SSa@_@][MKw@s@WWs@m@KMKK_@]m@i@a@]aA}@u@q@eEwDSQsAmAAAWUCAACoAiAg@e@YWc@a@WUMOOMW[KI_@c@c@g@EEQUUWOS_@e@_AqAa@m@g@u@IMkAyBWa@O[IOWi@Ug@ACKWO[_C}FKUMa@Qg@IUQg@i@cBo@kBY}@Qg@AAIWu@{Bi@aBw@_Cu@yB_@iACIIWKWm@kBo@oBe@wAWs@Ww@Qk@[}@K[oCkI_AwCu@yBEMq@qBM]Uu@IWY{@[_ACI?AEOKYa@oA]aAUs@]kAQo@YgAMg@GWI[Oq@S{@Ms@GWG]Mu@EYO{@YiBEQSsAACGa@AIKk@ESQkA]sBE[Ms@E[UyAQaAM}@CMMw@SkAAEG_@AMG_@CGCSCQW{A?AIk@_@wBCWUuAIc@SsAIa@QkAW{AW}Aa@iCcAoGUyAKq@a@aCGe@O}@W{AE]COKm@m@yDo@wDCWUuAGYIi@?Co@wDSsASqAIa@c@uCGYCS[kBc@oCa@kCSmA[kBE]o@}DMy@ESSmAYiB]uBAGYiBkAkHe@uCQiAQgASmAM{@EQO}@QmAIi@QeAW}AMy@O_AM}@Mq@G_@?A]uB[oBO}@Mw@SqAYeB?Cg@yCSqAg@aD}@uFKo@Kq@W_Ba@}BkAuGWuACOa@wBACq@qDc@cC]gB?AIa@e@gC_AcF]mBGYACIi@ACSeAKk@Mq@SeAEOk@aDa@uBG[Ic@Q_A?Ac@aCMq@G[EQEQIc@_@sBa@uBCQi@qCa@}BKg@G[Q}@]eB[yAQw@a@aBYcAIYe@_BW{@i@}As@sB[w@e@kAEKw@gBQ_@[q@]u@KSGKo@iAUc@QY}B}DiB}Cg@{@c@u@MSq@kAU_@kAoBWc@S_@iAkB[i@O[_BmCQY{@sAOYGKEGi@}@KSKQQWy@sAo@gAo@gAGOa@o@a@q@CE?AIOEEeAiBc@u@EIEIOU_@o@MSWc@Ua@S]IOmAsBiB}CIMUa@Q[y@wAIMcBsC{AiCeAmBk@gAa@}@_@}@Yk@AEk@{AEOg@{AACIUQk@GUCIIYI[IYIYGWGWGUCQGUG[I]E[G[EQCOE[EWIc@Ky@Ea@EWAOIk@CWGq@Gs@KcAE_AGy@EwAAa@S{GWeK?ICcACk@E}BMcFEqAA[AW?IA_@E{A?SIiCAa@Ac@CkAC_ACk@?a@C[?YEgA?[Cg@?[Ag@Cw@AOGmCAe@AUEeBCe@Cs@Ag@Ca@Gw@AUEe@IkAAAGw@_@gDc@gD]qBY}ACMACe@_CAAAIGSOk@CMQm@Og@I]Uu@[iAOc@e@uA[y@k@wAWk@O[O]IQISQa@GMIOS_@Q]k@gAa@w@qAgCMW[o@mA_C[q@IM_@u@[m@q@sAm@mA]q@IOO[EIy@cBq@{AGKM[Um@a@iAUm@i@iBMa@Oi@U}@Mk@AGOq@Q}@GW]mBKs@Mu@QkAMu@Ig@Ii@UyAW{AIm@AGOaAUsA[qB?AEYKm@k@sDMw@i@kDG_@G[o@_ESqAE[UsAa@kCCMSsAIc@e@yCSsASoA_@aCAEMw@Io@Kk@?AKm@SsASgAAKk@sDQeAGe@W_BSsAIe@UuAQgAYmBQgAm@wDCMQmAMs@k@wDG_@Kk@OcASqAQgAKm@Ik@CICSO}@[oBE]YiBE]My@M_AK_AI_AIy@KeAA]CWIyAKaB?EG{ACgACeAAo@AiC?[?[?q@?E@a@@w@@o@?A?C@k@?E@c@B_@@k@Bs@@Q@[BYBi@Fu@B_@BW@Q@KB_@?ABWBWJ_A?E@CBUDe@@I@ORiBNoA?C@KJ_ANwA@KHq@NuA@MDY?IVwBHu@@KBO@MBQLkAD[Fo@D_@@QLiAFq@BKFs@@QBO@O\\{DDi@PuB@ORaCFm@BWHgATmCPwBBWb@kF^mEV{CDg@?EDa@JkANoBDk@TmCTqCFm@@I@Q@MVsC@O^oEFw@VeDHaADc@ZwDF{@JcAD[Fs@HkABOHcAFw@H_AFs@De@Di@L{ABWJkAH_ABa@D_@Di@De@Di@B_@Fg@FaAB]?CB[@YBa@?AB_@Be@@Y@S?QBm@?E@i@@q@@Y?W?]@W?a@?g@Ag@?E?u@A]Ae@AYAu@A]G{AEk@G}@Ca@AQAGCUCWIcAGk@Iq@EYAGE]Gc@Ik@Ki@?AG[AOG[EOESGa@Ia@GUESKa@Oq@WaAMc@GSEOIYCGGSK]GQQe@K]ACO]Qg@O]IQM[O_@O[ISS_@MYQ]IQQ[g@cAy@}AYi@Uc@S]MSSa@OWGOIOIQKSWo@KSISAEKWO[ISIUISUq@Y{@M_@IWGSSs@GYEOGUOk@I[Ki@K_@O{@Mo@Ii@Kk@M{@G]Ec@Ga@Gg@Ee@Gi@Ei@Gs@IeAIiACYIgAIgA?AMqBGo@SuCC[MwAGu@?GIu@Gi@Is@Ii@E_@SyAMq@SsAQy@AGUkAWgAMo@Mc@e@iB_@qASs@EMkAkDy@uBw@gBo@sAAA}AuCOY[g@Ua@AAg@u@KQIMSYm@{@MOa@i@_AsAw@iASYe@m@}@oA[e@CCs@aAU]_@g@i@u@SWS]_@e@MSW[]e@CE]e@_@i@Ya@IMm@y@]i@IMa@q@U_@c@u@c@u@Ua@_AiB_@w@Wi@M[Sa@O_@Sg@s@gBEKGOAEa@gAOc@Us@EMQg@?Ao@iBWw@Oc@K[CE[aAOc@Yy@]eAM]s@wBACk@_BGQc@sAEKQi@So@Uq@a@kAYy@Ww@]cAUq@eAaDy@_CGSYw@EMIWUw@y@iCQc@Si@Ma@Ys@i@_BIWY}@q@mBa@qAm@uBMa@e@qBGUQs@AGOq@ESIa@WwAUoAYiBWkB?AUmBQgBKcAQ{BAM?CEu@Es@E}@Ca@AQCy@Cq@Ao@CoACwA?o@?O?_C?E?aA@aA?i@?[@y@?M?k@?_@@o@?m@?cA@gA@{B@yB@{A@o@?EA{A?o@?i@?_@?[?QAYAaA?GEwAA_@Ag@AQE_BAECm@Ey@Ee@A]Eg@Eq@Gq@AMOsAGu@MiACWCUCSACGk@EW_@_DEWCU?CIo@OgAGi@COGm@AIGc@AMOmAIk@CQE[Gk@CSE[CSIm@EYCSCWEWCYCSIo@E[c@mDCQE[E]?AE]ACAKAKAGOiA]sCm@cFIo@McAS}AMmAIs@Gs@K_AC]IiAACGcAEm@M}BQeFQkFQqGGwCG_CEkAGeB?MEu@EoA?ECg@OkDA_@A[Aa@A_@A]Aa@Ac@?W?a@A]?a@?S?I?U?Q@q@?C?[@c@@y@?[?C@_A@U?I?_@B}A?[@c@@_A?a@@]?K@S?]@]?c@@[?_@@a@?]@_@@}@?c@@w@@g@@_A?Y@a@B_B?_@?O@I?_@@a@?_@?_@?[Aa@A_@?GAUC_@AMAQC_@E]E]G_@G_@G[I[I]GUCGIYKYIWM[O[KWOWMUOYOW[o@KQcAkBIM]o@]i@Yg@OYMUMUMUMYKWKUYu@KWK]IUIYIWI]IYG[G[G]EUI]G]EYG]E[EYG]Ia@EYIi@AGG]G[E[G]E[G[G[G[GYESAGG[I[IYI[IYKYK[Uo@MYKWMWCISa@OYMWEEIOMUAAIMAEKOq@kAOUMUMUCCKQMUMWOUACIQMWMYCEGQKU?AMYIWK[KWI[IYACGUG[IYGY?AG[GYE]G[?CEYE[CUEc@E]?KCOA]C]C[A]A[ASGiA?CIuBAOGgAIwBAUE{@A[A]C]MsCEeAEmAUmFGqACq@C]AOA[A_@K}BCm@Ca@EaAMqCCs@Ck@Cs@A[Au@C}@?CCiAAkAA{BAg@AkB?CCy@Cu@C_@AYIqAAUKoAMsAIiAGm@C]CWGaAC[IuACc@IkAGiACq@E{@AQEeAE_AC[C{@AUGoAKkCKuBCu@AGCo@AUCg@Ac@GoAC_@Cm@Cs@AQEaAAKCi@IyAEo@I_AAYGg@Gy@AGIy@MoAM}@AGASG[E]AM]aCe@eD]iCGYMcACQKo@AOQkACQYqBQoAKw@Gg@Gk@C]E_@K}@Gq@Eu@KwAY}DSwCKsAIsAG}@CQCe@AMKuA?EOqBGcAEa@YyDKoAMyAWiC?AK_AIu@S}AMeAEa@M{@Im@Ko@Is@Ig@ESM{@Ks@O{@Ms@SmAMm@Ie@AEOu@UkAa@uBWoAg@gCOy@Qy@WwAQy@Ki@Ki@y@gEKi@ACCQCKMm@g@gCIc@WqAUsAEYKi@Kq@G_@U}A?CIi@AMCMEYCYE]OcACWGc@EWEa@a@_DM_AWqBM{@?CGg@Io@CSS}ASiBC[MmACQIw@Gw@Ea@WeCCUKcAIy@Ky@K{@QyAEUIo@Ky@Ge@WoBG_@QsAKy@E]My@Gi@Ik@Gc@AEIm@C[G[Kw@E_@Ik@AIKy@Iy@I{@Gw@Ei@AYC]AWEyAAg@?SAU?m@?U?]?e@?W@w@B}@?g@@i@@{@?Q@g@B}@@w@@{@@{@?AB{@?g@@o@Bo@VqQ@O@_BBuA@m@@c@@aB@oA?w@Be@?}@?mA?iAA{@A}@CqDKeIC{BAs@?s@WmUAcAAaAQyPAgAAsACmAA{@?_@A[?g@Aq@?]Cy@?]A[A]A]A[Ae@AWC_@A]AYG_AA[OuBGw@G_AA[AAAWC_@A[C[EuBA_@?a@A[?{@@[?[@[?a@@YBy@D}@Do@?EHcAB[Dw@Dk@Do@@SBa@JyAJ}A@YToDNwBFy@@WN{BLqBPoCHkADq@Fw@?EF{@BYVmDBa@XaE?EL}A@U?CB[B_@VqD@SXuDLsBF}@B[Ds@Bc@?ABa@@e@@m@?w@?}@A_@A[?YAYCg@Gu@A[E]CUCUAOE[Io@G[CUEUW_BAIEYKs@Ga@G[CYMy@AKAOE]CS?GIs@C_@C]AYC[A]A[C_@A[?_@AU?SAi@A]A]?[?_@?[@]?]@A?[@Y@[B]B]B[BWBY@IB[@IHk@H]F[FUBKBGBKHW@ABGDKDIFMJSJQDIDGBCLSNQDGDG@?@CPQPOBCHG@ADCHGLIDCZSRI?AXOVMl@YBCh@U^OBC^SROPMJIFENONOLODENSNSHKBGNWDI@ADIP]JSJUHUJUFMDMLYN]HQJWHQPc@Re@JU?AFM@EHQXo@\\w@BIJUHQ?ALYJWFOFMFQ@CDI@EFMFSBGDKHW@EJ]H[DM@GFSBI@GBIBOBEDSDMDKJ[L]Na@DI@EZq@@CHQz@iBz@iBJS@CRc@HQHSDGJWBIFMHSFOBG@CNe@J[DKHWBMDKRu@BOBGF[FY@AFWDSFc@DSJq@@G@EJq@D_@D[Da@BU@IBWBWF]BWBUToB@KDa@ZqCBSLmA@ED[BUD_@?AJy@Da@Hs@D[B[DWB]Hu@@ID]Hy@@U@ADu@D}@Ba@@U@]?[@I?Y?]@[?[?a@Aq@?[?uA?CAm@AyB?A@O?a@Ak@?]?[?]?]?[?]?[?]?]?]?[A]?]?[?]?[?W?UAcI?I?]?[?K?G?W?wA?GA]?]@]AO?O?a@?s@?Q?g@?s@?[?_@@Q?c@@[Bm@@U@I@WFy@BUDUBg@B[@U@UBeA?W?E?Y?YCkFA]A{@AsECyF?q@EeK?[C_B?g@?yA?y@?{@EqFC}BGoGAaBAq@EaE?A?o@C_B?q@?}@?uB?u@?_@?qBAiA?q@@qB?U?E?]?]?uA?W@c@DuAB[JyABY?IBS@[B[B]B_@B[B[@[B]B[B[D[B]BU@ER}ABQD[FYD[D[F]RqA@KPcAD]Fc@L}@RyA@EL_AX_CE_@@Q@UJ_BDoAB{@@Y?k@?O@I@I@C?A@CA{@?C?ECi@AOE_@?ECMCM?EA??ECMEKCI?AACAECEAECIEKEICIGI?AGIGIEIEEAAAAEGIGGEAAGGIGKGKEIECACAEACAKCIAAAKAKCGC{@QMCc@ISEaASIAGAGAG?I?A?G?[AYAG?A?E?GAGAGACAA?ECKCMGO?KEGC_@Qe@Se@QOIUKUKA?aAc@o@WCAQGWOa@QMGQGIEQz@"
                          },
                          "start_location": {
                              "lat": 40.7569006,
                              "lng": -73.9902798
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.3518283,
                                      "lng": -71.0562097
                                  },
                                  "name": "South Station"
                              },
                              "arrival_time": {
                                  "text": "7:20 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700353200
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.7569006,
                                      "lng": -73.9902798
                                  },
                                  "name": "Port Authority Bus Terminal"
                              },
                              "departure_time": {
                                  "text": "3:00 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700337600
                              },
                              "headsign": "Boston (South Station), MA",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Peter Pan Bus Lines",
                                          "phone": "1 (800) 343-9999",
                                          "url": "https://peterpanbus.com/"
                                      }
                                  ],
                                  "color": "#3c974d",
                                  "name": "NEW YORK - WATERBURY - HARTFORD - WORCESTER - BOSTON Express Service",
                                  "short_name": "Peter Pan",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                      "name": "Bus",
                                      "type": "BUS"
                                  }
                              },
                              "num_stops": 2,
                              "trip_short_name": "5641"
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "0.8 mi",
                              "value": 1237
                          },
                          "duration": {
                              "text": "18 mins",
                              "value": 1084
                          },
                          "end_location": {
                              "lat": 42.3600861,
                              "lng": -71.05888279999999
                          },
                          "html_instructions": "Walk to Boston, MA, USA",
                          "polyline": {
                              "points": "synaGbcupL?BEC]O@Aa@OYEKGWUIEGEKG?Bc@c@@AMGGKKMW_@IQIOKYO[Si@KWSg@Uo@GMEFKJGHg@f@@@CBOTCDCGk@j@ED]\\@BA?QPe@h@O@oArAo@n@@JEDST?@KHKJGFEDC@IDIFEBKBMDi@P_@HE@QFK@EB?AC@YFA??CQ@UDc@@Q@C?K?EACCGDYD?AQD}@PIBE?{@RK?e@HCDMNI\\?HUBE??QOBc@JYCc@HC@cAP?H?VD|@?R@h@?~@?DAB?@?@A@C@A@A@A@?@AB?@?D?L?N@B@BBBm@BDP"
                          },
                          "start_location": {
                              "lat": 42.3517753,
                              "lng": -71.056023
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "0.2 mi",
                                      "value": 295
                                  },
                                  "duration": {
                                      "text": "4 mins",
                                      "value": 265
                                  },
                                  "end_location": {
                                      "lat": 42.3536855,
                                      "lng": -71.0537896
                                  },
                                  "html_instructions": "Head <b>north</b> on <b>Atlantic Ave</b> toward <b>Essex St</b>",
                                  "polyline": {
                                      "points": "synaGbcupL?BEC]O@Aa@OYEKGWUIEGEKG?Bc@c@@AMGGKKMW_@IQIOKYO[Si@KWSg@Uo@GM"
                                  },
                                  "start_location": {
                                      "lat": 42.3517753,
                                      "lng": -71.056023
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "0.5 mi",
                                      "value": 774
                                  },
                                  "duration": {
                                      "text": "11 mins",
                                      "value": 653
                                  },
                                  "end_location": {
                                      "lat": 42.3598863,
                                      "lng": -71.0572634
                                  },
                                  "html_instructions": "Turn <b>left</b> onto <b>Congress St</b>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "qeoaGdutpLEFKJGHg@f@@@CBOTCDCGk@j@ED]\\@BA?QPe@h@O@oArAo@n@@JEDST?@KHKJGFEDC@IDIFEBKBMDi@P_@HE@QFK@EB?AC@YFA??CQ@UDc@@Q@C?K?EACCGDYD?AQD}@PIBE?{@RK?e@HCDMNI\\?HUBE??QOBc@JYCc@HC@cAP"
                                  },
                                  "start_location": {
                                      "lat": 42.3536855,
                                      "lng": -71.0537896
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "443 ft",
                                      "value": 135
                                  },
                                  "duration": {
                                      "text": "2 mins",
                                      "value": 139
                                  },
                                  "end_location": {
                                      "lat": 42.3598942,
                                      "lng": -71.0587695
                                  },
                                  "html_instructions": "Turn <b>left</b><div style=\"font-size:0.9em\">Take the stairs</div>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "ilpaGzjupL?H?VD|@?R@h@?~@?DAB?@?@A@C@A@A@A@?@AB?@?D?L?N@B@BBB"
                                  },
                                  "start_location": {
                                      "lat": 42.3598863,
                                      "lng": -71.0572634
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "82 ft",
                                      "value": 25
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 20
                                  },
                                  "end_location": {
                                      "lat": 42.36012179999999,
                                      "lng": -71.0587946
                                  },
                                  "html_instructions": "Turn <b>right</b>",
                                  "maneuver": "turn-right",
                                  "polyline": {
                                      "points": "ilpaGhtupLm@B"
                                  },
                                  "start_location": {
                                      "lat": 42.3598942,
                                      "lng": -71.0587695
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "26 ft",
                                      "value": 8
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 7
                                  },
                                  "end_location": {
                                      "lat": 42.3600861,
                                      "lng": -71.05888279999999
                                  },
                                  "html_instructions": "Turn <b>left</b>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "wmpaGltupLDP"
                                  },
                                  "start_location": {
                                      "lat": 42.36012179999999,
                                      "lng": -71.0587946
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "siwwFffrbMi_@naA{Q}Q{}Aw|@qiFkcDyfAa}@{eAmc@ut@iXv]kbButAyw@{UsUpi@z`@zwAn~@rz@`T~QaLuGvG}x@wI{}@qb@qiBm{A}wBciAyVcs@so@ev@kgA{Oyd@_Ykj@w~@w^cb@c|AoL{b@wHe]~Xmb@tPoaA~@oj@eOox@q_@orAlBecDm~@gkCew@{u@_CiO{J_E}x@hQ}iAve@cUfSsb@vX}hBcPeoApJ}s@|kAcvAz_@kqB}_@ep@qnCh]k]_Ack@ak@grAaQwvB_GalCijAayAuN}zBqmAms@iGs{AuUkaArQqcCmM_vA{HkvAwp@_cAcQefAjm@ka@x\\__@zA}xA{h@k~AyTmj@qIecAebAq`@m^wb@nEofA{QesBqaC}lBu`Eo|@}[iEue@l]ggAqZ}pEw\\s|Abj@okGjAilA}UoJog@jKef@o`Act@clAw]_oB{PyzA~Swn@{OaiAub@enB_Le`AtKyt@oQ{fBgDwvCwJarAp`Am_CxW}qBgKgu@gsBylBs`ApPgl@uXwn@wqAcwAwiBee@y~AmyAqtFmvAyhCkbAmqFoo@mgA}~@aPgd@qbAuh@e_ByI}kBdDsbAzh@m^fZm`AdJapA{a@{jBhSi~@fWyoA{Xmi@{Gqw@ciAg~Aek@e~AwqBy}Aa`@qKi_@vPm]fJiyAaOwy@}k@mh@}bAicAewAeqC}uBy_A{r@fAsuBsgBsg@qcB}dAyuBsjAob@}jCeAoiAii@o~@yk@{lA{m@_PcCqcDkQo\\q`@gFub@cc@cOy{@{OiPcByj@p@i{AdVyt@fL}kBuUwtAkn@omGw`@kl@w~@sk@gz@wm@iTax@uRalA}f@cgBkw@asAqW{tAcz@qqD_}@uqB_r@g`A}Fw~A{BkgCw@gzAea@_rAqhAu_DmwAo`Eev@{vByn@ibAqd@qz@gz@_q@_u@q_Aaz@y{Bm}@g}C{hBycBkmCqeB{dCq{Aiw@}f@mo@qaAaiB}uBksBi}AycDguBqqAi_@wfAqV{w@k{@ml@yk@aQmp@ux@uvDeiA{`FmK{|Bol@isBwnAqlDcaAuoFw{@agFog@ulAyRk{ByZmbEodAumCaXuxF}YkiFSwnGkFcaCel@}gBm}BatCk`A{aBwb@ofB_sAq`Iy~@ygBk`@wpBcTmaByk@gwBsYy_C|He`A|S}hCyHq}@wZceAao@weBso@saBgOwrBaV}aEkc@cqBeVywD{p@}iFmIc~FxI}yCzk@ogArJuxHc^gJmLcGmNbKcSbN"
          },
          "summary": "",
          "warnings": [
              "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
          ],
          "waypoint_order": []
      },
      {
          "bounds": {
              "northeast": {
                  "lat": 42.3519217,
                  "lng": -71.0550703
              },
              "southwest": {
                  "lat": 40.752823,
                  "lng": -73.97719599999999
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "7:50 PM",
                      "time_zone": "America/New_York",
                      "value": 1700355000
                  },
                  "departure_time": {
                      "text": "3:34 PM",
                      "time_zone": "America/New_York",
                      "value": 1700339640
                  },
                  "distance": {
                      "text": "229 mi",
                      "value": 368122
                  },
                  "duration": {
                      "text": "4 hours 16 mins",
                      "value": 15360
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.3519217,
                      "lng": -71.0550703
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.752823,
                      "lng": -73.97719599999999
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "33.0 mi",
                              "value": 53130
                          },
                          "duration": {
                              "text": "53 mins",
                              "value": 3180
                          },
                          "end_location": {
                              "lat": 41.046946,
                              "lng": -73.54128059999999
                          },
                          "html_instructions": "Train towards New Haven",
                          "polyline": {
                              "points": "cpvwFntobMg@m@yIwFmf@w[]WcsBusAqXuQ{NsJoDyB{DiC{FwD}@m@oAy@{CsB}CsB{CsB}CqB_@WyHgF_Am@wI{F_@W}CsByAaAaC}AeGaEs@e@_@UyHeFoCiB_B_Ay@i@gFiDGEqEyCAAiBkAyAiAUM_FyCoDaCyAaAMIIIKIMIKKKKIIIIMOKO?AMQIMCCKUEKEGKUIUISAEEMGUAGa@sAOi@Oi@Oi@Qi@Ok@Oi@Oi@Oi@a@sA_@sAa@sAWw@M]IUIUKSEKEIMWAAMUIMEEOUQUQSOQQSKKIGQQSOKIKIUO]U}@k@{EwC_CyAw@g@qAy@sA{@QKe@[e@[e@]g@_@m@c@AA[Y]W[Y[Y]][[[[CAYYY[[[Y[Y][[Y]W[[_@g@m@e@o@e@o@e@o@c@s@[e@IMMSU_@e@w@KQWe@iCyEaCkEkGeLm@eAWc@qBoDqEgIm@gACEoBoDo@iAo@eAo@eA[e@[a@IMGISWSWUWIKSU[]][GG[Y][a@[]Y[SECYQAAYQ[S_@SYOOGWOoD{AcBy@aBy@cBu@MEIEmCqAA?_Ac@_@Sa@Q_@SUKmB}@a@QIEyAq@_@ScCiA}@a@EA_@Q{As@GE_@QiBy@{@a@eAe@_CiAQIo@[cBw@_@Oa@Sa@Q_@SYMwAo@s@]wAs@mB{@m@WwAq@_Bu@cAg@a@Q_@QcBy@ICw@_@a@SMGQIgBy@[Oa@ScCiAAAaCiAq@[qAm@gBy@}@a@yAs@ICaAe@aAe@_@QcBy@aAe@aAc@aAe@QIOGaCiAsAo@qAk@a@SYMiBaA_Ai@]So@c@uA_AWQ_@Ue@YYS}AcA_Am@}@m@]UwBuAe@]}B}ASO_BaAyA_Ac@Ym@c@g@]QMmAy@wAmAYW_A}@cBoB}@uAeCgFgC{FqAqCgAcCQa@}@sBKUoBkEm@sAoAqCCGi@kAcA{BuB{EwCyG}@kBe@cA[k@k@_A_@e@]g@i@g@aA_Aa@[IGqBuAgAu@gAs@}AeAiCgBECqBsAkAu@y@g@}@k@{As@mAi@oBq@cA]w@Y}@[qBs@}@Wk@QkC{@kBq@OE{@YwC_A[MgBk@sAc@wCaAkDkAgEqAcEuAkDkAwDmAkDgAGCwC_AqAc@eBo@gAa@_Bq@aAc@kCsAgCmAq@a@KGsBmA]S{A_AWOUOKIgBgACASMWOo@a@cBaA]Q_Ak@i@YuA}@_Ai@MEg@W_@U_@Sm@[mFsDyFyEMMgCeCcJyI}GsFsDyC_@Ye@_@q@q@o@k@_AiACEs@mAk@}@S_@Wa@Wc@Ue@eAwBQa@O_@CE}@aC_@gAIUg@gBaAmDOs@AGSkAo@kEACAMKq@_@cF[uEACAOY{DACe@uGMgA[kBESEYMm@Og@Oi@m@yBSo@Ka@CGMk@]uAOk@GYAAGW_@}BCMIm@UqBM_BCa@ASAWAS?CEsA?uA@{@?ELuD@GDm@J}AL}AXaEBYVyCH_ATiDLsBFqA@m@@_@@G?Y@c@?yBCqAAQCw@Eq@Ec@UkCO{AEm@Go@Gm@AKGa@Ea@AKKeACSGaACo@ASCYGaBC{AAM?qAA_@B}@@]DgAPeCDm@Di@Fs@Fo@BU@KHy@?C@ONgAHm@Hm@Hm@Hm@Fm@Hm@R{ALw@`@sCF_@Fq@XwBF]\\gC@GFe@Hm@Hm@F]^wCFe@@GHm@@I`@yC@E~@kHNaAHq@DWFc@D[@KJs@DQ@QNcABWJs@Fg@Jq@PsA^mC`@_Dn@wEXuB@CR{AR}AXkB\\mC`@yCFa@Jw@Z_CXyB^sC?CN{A@GBe@Du@FwA@a@?M@o@?O?_@?_@?a@?EAo@A[?SAg@KgBCm@Cm@Cg@?GC]E_AAWCo@Em@Go@ASCYGm@AI[oBCM]aBKa@I]YaAmA_D_@}@S_@g@{@k@y@a@i@k@o@QUm@i@u@m@QOKIg@]eAu@k@e@_@Y{AgAiD_CQKa@]A?aGeEUQc@[_@Wm@c@_Aq@q@g@}@o@[UeAu@YSCA[S_@WMKOK_@W[UAA}@q@AAgAw@aAs@y@k@a@[YS[S}@q@}@o@mA{@eAw@qAaAkAiA_@a@[[[]s@aAY]s@aAKMyAwBo@aAyBmDkE{GS[o@cAy@qAg@y@q@cAmDqFiKiP]i@eA_B[i@uAuBaFyHEIkAgBw@gAiCmDkAyAaBsBgC}CEG}AgBGK[]Y_@[_@[]W[y@aAGIQSoAwASWIKgC{Ca@e@iFmGkBwBuAcBw@_AcCuCCCkB}Bu@}@u@}@eAmAaAmAgC{CeBuBgAqAsDkEqA{AmEkFKOkB}BqA{AGGqFsGU[yAeBu@y@gAqAyBoCOQu@_A[]k@u@QUOMMOu@}@Y_@AAY]Y]kB{BAAkCaDq@w@u@}@[_@_@e@[]EEIIu@}@e@k@OQiB}BaCuCGGu@}@GGWWUWIKk@s@eAmAcAkA_@c@kAwAg@m@i@o@e@k@{@eAIKqBaCa@e@OQkB{BqA}AoGwHuQoTu@}@}AmBMO[c@g@o@_@k@CC]k@a@o@GMWa@]q@e@}@Yg@]w@a@y@Sa@Ue@O[q@sASc@Ym@S_@Q]Se@O]Sc@Sg@Qc@Um@GSM]Oe@EMGQK_@Oo@WgAAAUkAQ_AOcACOMcAM}@QsAK}@o@kFc@qDMeAWqBOoAUgBS}Ae@uDCMYmBIc@ESG]e@mBc@_BCGa@mASi@]y@_AmBKSg@_Aq@iAuDoGS[_FmIaAcBeAeBACo@gA_A_BoAuBWc@Wc@o@eA}AmCi@_AmBaDOW[i@k@cA_A}A[i@e@w@q@iAc@w@y@uAYe@{@wA_@q@OWa@o@KQw@sAm@eAWc@mCsEcAeB[i@o@iAWa@gAiB?A[e@{@yAUc@e@u@IO}@{AeBwCYi@MUUe@OYUi@MWOc@Sk@AASo@Kc@Sq@AGOi@A?YqAWqAKm@SyAG]AOIm@QyA?AO}AC_@AMGm@M}AIs@a@mDYyA_@gBWiAQo@[cAk@cBGQ_@}@O_@MUIQACYk@q@mAi@y@eBeC[_@CECAo@s@mDoCGEm@g@cGoE{AqAo@g@i@c@w@m@s@k@_@Yi@a@AAQOa@[uAeA_Au@gAy@i@c@q@i@aAu@YSq@i@w@m@m@e@]YYSEC[WAA][GG[S{AmAGEqB{A][w@m@aBoAyAkAGEu@k@CCk@c@MKOMYW]Y{@q@QMiA{@MKo@g@UQ_@YYU]WCAa@[e@_@?Ac@_@USc@e@WWCEY]SWGGi@{@GKYg@?Ai@kACIO_@Qg@ACOe@Qk@AGKc@Mk@ESCMQkAI_@AMMmAQiC?QCo@Em@Ae@Eo@A]A]CYKsBC[GaAEm@?IGc@MmAM{@Gc@AIKk@Mm@Kk@CK_@uAI_@Oi@GY[mAWcAEMWcAACW}@c@eB_B{F_@kAQm@e@kAm@uAUi@We@a@s@]k@k@y@k@y@U[]c@CCs@{@MQKMMM_AmAOQs@_AIIqB_CwBmCyCmDe@k@}BmC}AiBuBiCOQe@k@yAeBk@q@oAyAmAuA{@cAs@y@mAuAwAaBiAuAy@aA_AkAu@iA{@uAYg@aAiBYk@q@uBQi@Yy@GSGSGUEUYoAScAG[Ga@S{AQyAI{@C[GaAAIEy@A[?EIgCAa@EgB?CAo@Ao@?CG}B?KCo@Ao@Am@IoCCaAAm@AWAWA]Ak@C}@AGA]?OC]AQAME_@C_@AOE_@MsACUCSEYCKUmAYwAYwAScAYqACOEQ?Cu@qDc@}B]{Aa@_BMc@Om@{@mC[}@u@{BoCiIsD}KgJyXkBwFGQc@uAGSe@oASk@y@iC[cAK_@CI]wAESGUWyAAGSsACKEa@Q{AK}@Q{AE]S{A[eCCOAQo@eFc@oDIu@Ks@q@oGCUq@}FS{AIu@WyBIw@Eg@KeBG}AAMEaCCkC?AC}DAsA?a@EwEIkLM}OGkJGmICwB?GA}@G}GAcACiAE}A?AG}AA]AQEo@EcACUAUUmCIcACWIm@KeAWoBU}AKm@_@gCKk@Im@OaAEUEUc@uC]_CAGwC{Ru@cF?CIe@_@gCIm@Im@Km@i@uDE_@Oy@QiA]iBe@yBu@qC}@qCm@gBiAiCEGw@{AkAqBi@w@mAaBQUs@{@m@s@}@}@qAkA{BcBiCiB_FmDsCsB_Aq@[[cAcAi@o@AAs@_ASW{@sAk@aAEI]q@Yo@k@sACE]}@EKUk@GWIYQi@Oi@Ok@Oi@Ma@CM_@uAI[EM]sAc@yAOk@CKUy@qA{ESq@VO"
                          },
                          "start_location": {
                              "lat": 40.752823,
                              "lng": -73.97719599999999
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 41.046946,
                                      "lng": -73.54128059999999
                                  },
                                  "name": "Stamford"
                              },
                              "arrival_time": {
                                  "text": "4:27 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700342820
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.752823,
                                      "lng": -73.97719599999999
                                  },
                                  "name": "Grand Central Terminal"
                              },
                              "departure_time": {
                                  "text": "3:34 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700339640
                              },
                              "headsign": "New Haven",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Metro-North Railroad",
                                          "phone": "1 (212) 532-4900",
                                          "url": "http://www.mta.info/mnr"
                                      }
                                  ],
                                  "color": "#ed1c24",
                                  "name": "New Haven Line",
                                  "short_name": "New Haven",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 2,
                              "trip_short_name": "6540"
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "197 ft",
                              "value": 60
                          },
                          "duration": {
                              "text": "1 min",
                              "value": 61
                          },
                          "end_location": {
                              "lat": 41.0469065,
                              "lng": -73.5420051
                          },
                          "html_instructions": "Walk to Stamford",
                          "polyline": {
                              "points": "m~oyF~oz_MFpC"
                          },
                          "start_location": {
                              "lat": 41.046946,
                              "lng": -73.54128059999999
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "197 ft",
                                      "value": 60
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 61
                                  },
                                  "end_location": {
                                      "lat": 41.0469065,
                                      "lng": -73.5420051
                                  },
                                  "polyline": {
                                      "points": "m~oyF~oz_MFpC"
                                  },
                                  "start_location": {
                                      "lat": 41.046946,
                                      "lng": -73.54128059999999
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      },
                      {
                          "distance": {
                              "text": "196 mi",
                              "value": 314932
                          },
                          "duration": {
                              "text": "3 hours 2 mins",
                              "value": 10920
                          },
                          "end_location": {
                              "lat": 42.3519217,
                              "lng": -71.0550703
                          },
                          "html_instructions": "Train towards Boston",
                          "polyline": {
                              "points": "e~oyFptz_MFEW_AaAiDo@_Cy@yCOi@?CKWYgA_@wAaAiDo@cCOg@_@sAYeAOi@EMCOc@}AOi@Ok@Uy@a@sAOi@_AuCg@cBy@qCc@oACGk@wA}@sBUc@MUKSm@aAACe@w@i@{@QWaA{AGKq@eAGIi@y@Wc@KQk@{@i@{@Yc@gAgB_@k@cA}AS[CGYa@ACW[U]e@i@MMUUGGSSc@_@s@k@{@o@y@i@eAk@cAe@m@UoAa@kA[iBa@kAScBYkAWmAUsAYoFoAeAUqAUSESEiB[C?aAQMCqA[qAa@u@Wu@[}@e@u@a@y@k@cAu@s@m@}@{@q@w@o@u@c@m@kAiBYi@[m@m@oAe@mAM[Qg@Y_A_@oAG[Mi@EU[}ASqAM}@KiAMyAIuAEiAEeBAqBBkBDsAFsA?CBk@Dq@LuBJoBJoBJ{AJqBRcDT_ERsDViEVmEN{CB[JqBJaBDi@Do@JiBHqADo@@OFmAJwAXgFJiC@M@o@@g@@wA?}AE{BGqAAQC[G_AE]Iy@OoAACg@yCWoAK]YcAe@wAc@iAk@oAm@oAs@qAKSyAeCgAoByAiCoAuBoA}BcBuCoA{BiAoBqA_CU_@Wi@Wi@Ym@Wm@Qa@[u@Wu@Ww@Wu@]mAe@kB]}AUsAQiAOeAOoAMkAKcAK_BOkC?QAQS_EMiCMaCE{@EeAKwBGqACg@?ECa@I_BCm@IqASiECs@YwGEkC?q@A}ABoC?a@FsD?YFwDHqEBqADqBFwCDiDH_EF}DHaEJuFNmJHgF@_B@_A?{CAaAAy@ASASCm@Co@AWGeAC_@G}@IgAOsBEo@CSSuCAUCUSiCSmCC]_@oE]qE]mE]wEW_Ee@_F_@aD_@_Cq@{CK[e@eB{@eCGMWm@g@eAg@}@_@k@OUa@o@s@eAk@o@u@y@y@w@k@e@a@[w@k@s@c@i@YwAs@c@OgAa@oC_AcCy@wCaAoC_AyBs@oC_A}Bu@SIkAa@_Bq@eAk@cAo@s@e@y@q@}@w@g@c@w@q@}AuAk@g@iAaAEC_A}@cBwAcA{@MMMKqAiAe@k@s@k@g@g@yAsAwAmAcByAIIIGUQwCkCuAkAGIqAiAmAmAYYUWAA?AMMQSU]W_@]m@ACQa@MY[{@a@uAKc@Q}@G[a@cDIm@Im@Im@Ik@Im@S{AS{AOoA]eC_@{BWeAKc@s@wCIWK_@a@}AOi@aAkD_@uAOi@_@uAAAI_@a@uAOk@_@sAo@_C_@uA_AiDEQEQo@_C_@uAaB_GiAgEGSEMg@iBW_AQq@y@uCgA{DmAoDKYg@yA}@aCKUKWsAyCu@{Ai@qAk@oAe@eAUg@iB_EcRab@i@mAiB_E}@sByEoKw@gB}BgFqCoG_@y@[}@mAaD?AOg@gAsD}@yDGSy@aECSCSe@}CCOS{AIg@W_C}@uHE]Gm@w@uG[oCCSa@cD]}Ck@wEYeC{AmMQ{Aa@iDCSCS_@wCQ}Ag@eE]_DYcDc@sGQeFG_B?CMyCA_@O}DKmCeAuYWyGCq@SmFMwDUuGE{C?sDBmBFwBFaAHwAVwCToBz@mGlAwHp@uE`@gCPiAL}@Jm@`@gCTyAnAeIh@eERuBN_C@KBo@F_B@[D{B?e@@mAAQAcBEyAGsBGiAGeA]mDa@aDo@oDCMs@aDsDyOk@aCESEQ]wAi@aCmAoFeDsNQu@?CiC}KuBgJcCkK]wA]uAI[o@{BGQa@kA_AmCa@cAQe@sBwEiF_K_ByCwAmCGKGKkCaF}AeDcAmBeAoBAEm@gAyAuCQ[[k@]o@OYk@eAKQKQm@iAIQKSi@eAcAyBq@oAk@iAMUMSm@iAUc@GKOWUc@e@{@GKGKcAoBUc@m@iAUc@eAoBuAiCGMGKoA_CYk@S]mFyJOW}@iBWo@Ue@Um@s@sBACYiAK_@Ka@Q}@Ki@Mq@OaAMgAMcAIkA?EEg@GwACq@As@?GCo@?WAQ?[AeAOcLO_LC}AAo@C}A?KEcCAo@?Q?QCs@EgDEeDAo@C_B?SGmBC{@Ae@Ew@Ci@Eu@AMIoAASAQGu@AKKcAAKIu@Eg@CWYyB]_C]sB_@uBYuAKg@Kg@[oAOo@Qo@Qi@CKOk@]gACK_@eAMc@Yu@Yu@c@kAe@gAs@aB]s@_@u@{@cBi@_AUc@IKGKWc@c@o@{@kAy@kAA?y@iAo@u@OQg@i@_@c@_AaAOOOOSSw@u@KIuAsAKIyEsEyEqEcD}Cy@w@mAoAmAsAg@m@MOs@_Ag@q@Y_@W_@eBkCyAyBuAsB]e@m@_Aa@i@i@{@Ya@kAcBkAeBsK_PgFuH_DwE_AuAqDmFoAkBm@}@yA{BIKkAeB_BcCcBoC_@s@]s@w@qBk@eBg@kB[_BYcB_@iCk@yDGi@G_@s@}Ee@oDQkA[kCc@cEMiB]kGIeCG_BG}ACo@?OC}@MoCMwCCc@MoCIqBA[AYKoCI}ACo@Co@EuAAGA]A[GkAI_CCm@Co@Co@Co@C[A]G_BG}AG_BEs@EyAI}AG_BCm@EgACo@AOC_@A_@G_BCm@Co@G_BAAI{ACm@I_BCo@ASCYCk@IkBCo@Co@KqBA[Co@Cm@Co@E_BCm@AQA]Co@AQAWCo@E_BM}DKoCAUEuAKmCM}DCg@?CCk@EmACm@Co@Cs@AUCWEc@Eo@Ec@AIGo@Gm@?AGm@I_@Mm@Kk@CKI_@Oi@AGQc@Qg@Ue@Ue@Q_@CEWc@IKm@s@y@s@WUa@UCAg@W[KSGk@C{@?Q@w@DOBoMnAq@HqAJc@DM@S?E?eBPkALyFf@eAJc@D[BoAFc@B[Bi@?WAo@Ec@Em@EYGmAW_EeBaAe@kBoAq@a@o@e@WS[[YWU[]a@[k@]o@a@{@Qm@M]EOOm@Km@WeBI{@[yCI}@G}@?AMmCGaAEmACk@EaB?UCuA?c@?iB?c@?cA?[@kA@cA?a@B}@BoA@}@B_BFmCBwA?GFoC@k@@q@D_B@o@@o@D{A@q@@m@@q@@SBkAB}A@k@@s@D_B@_A@]B_B@M@_@@qABo@B_BN_KTiLF_ETwK@cAB_BFmC?I@m@@MDiDD}AB_B@o@B_BBw@?Q@[@o@?KBmABm@B_BLiGByIKoDUcDKaAm@_E}AsHy@mCA?e@qASe@yAsCqC{E_HeLiJqOo@gA_@k@i@{@AEMS}@wAWa@iAiBgAiBSYEGo@eAMUIOs@mAo@eAo@eAi@{@_@m@KOIMaA_BgAiBeKwPU]kGuJu@kAS[qAgBKKa@k@iBsCiM_SqBsECGi@yB]uAOm@Ok@Kk@UoAWyAaFyYQaAEWWyAa@gCKk@WyAYaBm@mDWyAIi@AA_@iCUyA{@aFUyAW{AIe@AEKm@Kk@c@gCMs@uHqd@oD{TaBmKCI{@_FUmAIe@EUc@cCgAcGoAgIo@iEGY{@_FYcBYyAuAsFU{@EOmAcDYs@Ug@kGiOgAoDQc@WgAsAmFaBiIoAoGKm@gDaQCICOgAqEsAqEgAqCK]_@k@gAgBKOKOU_@o@kAeAmBS_@cHmNk@kA{@cB?AOi@K_@CKu@}BWu@WiAi@cC_@}AG[Im@EUAES{AKm@Im@E[ACIm@Gm@AQEe@C]I_A?CAk@Co@Ao@I}D?C?k@A_BAo@AoCC}DCiB?A?Y?Y?[CsBA_BMmLa@}a@UaIGuB}@eI]gBWyA_@qBGS_@uA_@sAq@_C_@uAQo@Y_ACEEOIQw@mB}@wBuBkFkDqJcGaOsHeR}GqM_DcGyAsCcAmBeDmG{IkQACuGaM_D{FcGcLKSaIaPsEiJuEuHqIuL_CgDsAkBu@gAqHuJ[c@s@aAaCcDwCaECCs@cAoCwDuFyHs@aAgBcCq@aAwU_\\s@aAi@u@c@k@MQIKeAyAs@aAgOsScB_C_DkEqDaFyHuKyAsBe@q@aCeDsDiFyBkEyAeD}BuGcDiKmAiFwFeTo@_CWcAGQQq@CGOk@k@iBUs@M]qAgDa@m@qPyRu@}@qA{Aw@}@u@}@]_@W_@SSGIqAaBqA}AoA}Au@_A[]MOIIw@aAu@}@yKsM[_@[_@oKkMm@cAgA{Ac@u@eAmBsIuOyBgE]q@e@}@Wa@CGaC{EUa@AC}@cBmAwBmEeIyAmCYg@CEo@qAa@{@OYIMeAkByAiCWg@AEyAsCWe@mAaCa@w@aDaGOc@oBsC[c@_CyCyBiC}DkDcA}@iD{CqCaC{@c@sAg@A?eAWeAWa@Kc@Ig@Iw@IQCEAKCgB_@eAUSEIEeBw@a@SyBcA{@e@OIqAq@MI_@Ua@S_Ai@_@U_@U{@k@iBmAUQKIyAw@]Ou@_@w@e@sA}@_@]SQYYu@}@_@k@IKs@wAa@cAe@wAg@{AWu@Og@Qg@Qk@Uo@[eACGQk@Mg@K]Mi@EOCMWmB?IGm@GaAA]CeA?]?i@?{@?mA?qAA_AE{@AWAWGk@Go@Ga@Ge@Kc@AGCOI[Ma@Kc@M_@KUGOSa@M[CEQ]S]c@y@MWk@aAs@mA[o@OYIKQ]IQKQS_@MSIOWc@IS]m@[k@Q[EGWe@CE]m@GMGKOW]k@]m@O[CEUe@k@kAiAcCQ_@[s@Wm@We@IM?A]s@c@w@q@kAEIiAgB_@m@a@k@u@gAa@i@m@s@k@q@e@k@MM[a@cAkAQUi@m@c@i@o@u@w@_Ak@q@Y_@Yc@o@eA[q@o@uAYy@Y}@Uy@YcAQs@Ig@UmACKQiAKo@AMKm@?AKaAMoAEe@CYEw@EmAE}@CoAAeAAoA?k@@]?S@i@@_@?A@_@B}@Bc@?ADk@Ds@Dk@?AHy@Hy@BUHm@@MNu@DUHi@Jk@H]FQ@MZmA^sA?Ad@}AXs@Xw@p@eBZo@\\q@Xk@Ta@Va@V]PYR[b@i@|@gA?AZ]r@u@\\]XUVUJIXQf@_@VQROh@]ZOv@a@f@Wd@UHEfAa@`@ORGZKZIf@If@KjBSBAl@Ed@EPCTAb@AL?fAC^?B?Z?bBFZBN@L@bD^~C\\~C\\hEf@p@Fn@Hh@F~@JpBRpFp@hBT`BR~ARH@d@H|Dt@H@|@HrBRfAHdAJdBRfAN^Dd@FxC^VB|BXNBhDd@h@Hn@HrATl@FnC^t@F`@BP@zCNnBCnAA~@?n@GNAh@G|@KLC`@Eh@In@KZEn@Mv@QbBi@p@Sp@Un@W~@a@~@c@f@Wr@c@d@Yt@e@r@i@VUx@k@lAeAhAaAfAaAJKp@m@j@i@XYfByAz@u@bCyBz@u@DEr@o@d@e@h@i@n@m@l@s@`@m@Ze@`@u@Ra@\\u@Pe@HSHWVy@Pq@R}@H[Ji@F]n@sDrAcIVaBLw@L_AJgAFu@Dq@?OB]@e@BaA@{@?o@@k@CoACeACm@Cc@AWASs@sKEs@Ek@QkCEm@Eq@K}AK}AO{BK}AoBqYc@yGKaBI{AEcAEkAAm@?YAcA?q@@o@@s@Bs@Bu@F{@D_A@ADq@Hq@LmANeALaALw@Jk@^sBRcAjA_FXkA?ANi@BId@_BRo@L]d@sAPg@d@mAVo@Rc@HSRe@N[r@uAt@sA^k@HQzE}Gl@{@^k@f@y@p@qAZo@Tk@d@wAL_@BIJa@VgAFWFYN{@VyALo@F]j@gD^uB@G^{BJs@RyABORiAPkABOHc@@CHg@n@uDDUF_@NcADa@Fg@NsAH_AF_AJqBB{@DqABq@BqC?I@_BBoC@cBByA@_BTmUB_B@uAAw@?m@Cq@EgAM}AEUIu@My@G_@G[Oq@Qq@_@sAESQi@K[Wu@w@oCo@wB{@sCQo@Mi@Oo@G[Gc@Q{ACYEg@Cm@Cu@Aw@@mABw@Be@?AB_@Fm@@MD]Hi@NaAFY@IHc@TkAXyA~@_FVoAF]Jg@Nq@P_ALu@Nw@Lu@Jk@Hk@Fe@Hg@Fk@Ho@Fk@Fi@Dk@JkADm@Fw@Do@Du@H}ADs@Bg@FoADiAHwBF_BB}AB_ADcBFuBFmDFwBFeDFiCDuD@gB?G?eC?_AE_CA[GaDAKGmCIuBKcDOsEIiDOyEAAE{AIoCGgBCe@E}AIeC?GCo@ImC?ACm@CcAAY?A?_@AO?WAiA?}AAU@Y?iA?S@o@?o@?E@i@DuA?I@Q@g@@a@D}@Bc@Bi@@ODw@FcAJqAD]Dk@Fq@BMLkA?ANuAJs@Hk@Ho@Fa@Ly@Fa@Ly@Fe@@GF]T{AHm@Fa@Lw@`@iCZsBNaARsAJs@Hk@Jo@XmBj@qD\\yBPoABIHm@Ju@N{@@IHm@VyAT{Ap@mEzAaKJw@NgAVcBTyAZ{BV{ARwAJo@Jq@Hi@DUNcAFc@@EFg@RqA@IPiABOL{@VaBPiANgAN}@BQD[N}@TuAT}APmAHk@He@Ju@BQRmAPmA@GPkABML{@F_@Js@PmA@EPkANaAHi@Jo@PoATyAJq@Jq@D[N_AF[TuABUTyARsAVcBVeBVcB`@eC`@sC\\}BPgAJo@Z}Bn@eEh@gDVkBPwAJaA@WFm@FgA@WBg@DmA?Y@Y?m@?q@?C?w@Aa@?SCu@Ao@Cw@Eq@Cs@Eu@?GCq@Cc@Cc@AKAk@G}@?WASCSI_BAOA]Em@?ACo@Ew@K}BC{@GeAEcAAWQqDI_BMwCAWEk@?CG}AAS?[IuB?YA[ASAc@A_A?i@Ao@?UA{AAmAAk@?s@AgAAeAAaB?m@A_BAo@?G?g@C{BCgDEgCGsDAKE{CGgCEcDA_AGeDEmBIqFCmBG}DG{CAu@Ck@Co@Ck@AKCc@?EEg@KsAAIGg@AEIk@E]EQKm@E[EO?AWkACIOi@a@sA?AQg@K[e@uAEIQg@EIM]Si@Qg@_@aAGMQg@Si@Qg@]{@?AM[EIGQUk@M_@CGSi@CG[cACEWu@K[m@eB]aAUo@q@gBCEQg@qBsFAC}AgEe@qACIcAsCSm@W{@IYYcA]wAEOMk@[sA?CUeAQcAQaAW{AM_AMgAa@iDaBsNa@gDeBmO_AcIOwA[oCm@gFCUCWc@yD_AaIeA}IoDaY_@yCq@oFcB{MWsBWmBKy@_@sCYwBQwAUiBWoB[iCM_AEa@YsBS_BE]QoAQuACQSuAKcAOkAEYMgAOgAK_AK{@QuAOkAQmAKaAM{@Q_BAAOqAMkAMgAK_AMqAOeBOuBQ{BO{BKyAMcBK_BCg@IiAYcEAg@GgAG}@Ey@G}@Cm@?MkBqYK}AO{BEo@?AGo@K}AK_BM}AW{De@{GK}AMsBEe@?GC]IwAAGCg@Eu@EcAImCEwA?c@Aa@CcB?{B?I?Q@wD?G?oA?_A?I@gB?mA?Y@aB@aA?Y@{C?_B?I@iC@_B@_B?yA@_B?sA@eA?g@?uA@{B?e@@aA@}B?}A@M?aC?C@{A@u@?oB?Y@gB?e@@o@?[?cA@oA?oB?M@qA@s@?iC@{A@_C?yA?iA@g@@uB?_A@oD?_@@mB@s@@iD?sC@S@iF?oA@oC@_B?}BByD@}BAg@?sA?g@C}@EmAC_AGmAG}@KiAC[Ec@Gk@U}AKw@Kq@[yBSiAE[UuAIq@ES[uBIm@EWUcBAMO}@YyAE[WyAEYg@eDSqAG[i@kDMw@SiASoAOeACSOcAEWKk@YeBEYEW]}BUyAKm@w@cFk@uDaAqGW}AKm@Kk@U{AKm@Ik@ACIi@_@gCKm@Im@Km@UyAe@}CYkBOs@E[Mw@AGIq@Gi@OaAMgAEg@E]Gy@Cm@AMCi@Au@AOA_@?UAcA@u@?o@?M@_@Bg@B_ABg@Ba@Hw@BU@UHm@?A@IFa@?EJs@N}@DOP_ARaA@CPy@No@T_ATaAFYNu@h@}Bh@_CDQTeAd@qB`@iBh@aC\\uA\\yAF[\\{A^cBDQp@yC@CVgANo@^cBT_Ab@mBDUR}@l@eCLm@`@iBl@gCp@}Cb@oBDOn@qCdAsEvAoGZmATgA^cB@Cr@_D`@eBP{@h@}Bd@mB^cBNu@T{@XoAFWJe@R}@VgATeATaANo@Py@R}@VcAF[R{@Z{APeA@I^uBP{ANiABYHq@Dk@B]Di@?GDg@@ODgAFyA@[Bu@@i@@UBsABq@HeEFgCB}@@a@B_BB}A@_@@W@U@u@DuA?CBo@F}CHeDDwBRmIPmIJ}DH_EJ}DDyBDuB@m@@i@Bu@Bo@@a@DoA@[HoBB_@RwCHcA@MLoAFg@Fo@Fk@Hs@j@gEp@eF\\gCHo@f@wDnBwNz@sG|@}GFc@Fi@Ju@Fi@Fc@Hg@D_@D]NmAFs@Fq@Hw@De@?EBSB[Dq@Ds@Bk@FcABq@@U@Y@a@@e@@m@Bu@?e@?GBiA?w@?w@?w@A}@?s@Aw@Ay@AE?]A]Ac@AYAWA]AYC]KmBGiAIs@I{@Ea@SmBE]Im@ACQmAWcBAGUqAi@{C[_BqBsJqAgGUcASaA[wAKk@mBaJyBoKqCsMuA{GmA_GQw@g@cC[wACKe@wBAAKi@Mk@_@cBI_@Mk@]wAEQm@}BM]KYK[m@_BEGsAwC?C[i@o@cAU]cBgCkAgBkAeBq@cAiEqG}BiDkAeB]i@g@aAWe@{@iBCIOg@Qi@m@iBU_AMk@c@gBQgAW{ACMWgCCc@I}AWmFAOGmDG_EAo@?S@{B?m@?ABo@D}ADiCBe@?EBi@JoCHeCb@uLRmFBw@HsB?QL}DF_BBo@Bo@HmCBo@VmIN}D@o@Bm@F_B@o@@K@c@PmF@]^mKB{@RqGL}DJ_EBm@D_BBo@Bo@@o@HmCBa@AM?o@?_@AOGuAIu@Eo@Gm@O}AYyCCa@e@yGEo@W{DEo@Em@Eo@Ee@Gw@c@iFOoBIkASmCEm@Eo@Y{DEo@Gu@SeCa@iFIgAOsBa@kFY}DYyDSmCAQGeAAEEo@Em@M}AGm@Eo@Gm@Gq@Gk@Go@MyAAAM}Ag@iFw@eIWoCEk@KkASmBUsBW{CAGO_BOaBOeBMkAOsAEWGg@O_AYgBOq@Mi@a@aB[cAAGeAwD[gAOc@w@qCK]Ok@_@sAK]}@{C[cAc@_Bq@_C]iAOi@uBqHc@yAa@wAI[_@sAQi@g@kBGSCIK_@_@mAOi@Ok@aAeDaAmD{@yCEOgAuDGWyAgFa@wAGSm@uB[iAOe@aAiDMa@gAwDMe@[eAs@eCAGs@cCm@wBQm@a@sAOk@Og@?Aq@_Ca@sAOk@_@sAGSY_AK[Ww@]}@GSy@wBSg@Sg@k@wAk@uASg@GQqA{CgAoCg@mAmAyC_B}DwAgD?AwAiDyBoFcBcECIgBgEcBcEqAaDwAkDu@eBiAsCg@oAWq@Ok@W{@UgAAMKi@Ku@E_@Ce@AcAAc@Ae@?U?S?E?W@]B}@@[?EBi@Bm@@M@a@Bo@Bo@Bo@FgBDuAF_BBm@Bo@@]@Y?M@Q?G@KBa@Do@Bo@@MFoABo@@]@Q@o@Bo@B_@?MDo@By@?CBa@Bo@Bm@?CBk@Bo@@e@JaCHsB?AF}A@U@YH_B?KLoB@QDm@BUDc@Dg@LcANaAJs@VsA@EVkA@ENi@Pm@`@oABIL_@DMRk@JUHSVk@DOP_@@ETg@@CVo@L[HU^w@x@iBXo@d@gAVm@Zs@v@gBRe@`AyBPa@x@mBDGf@mADKN[Re@Te@JUFQTe@h@mA@CPc@Te@d@gA@ETg@Re@Re@@ARe@Rg@f@gA@Eh@mAVi@Pc@Vi@Rg@@AXo@^}@\\w@Re@?A~@sBTe@Rg@FKLYRg@Xo@b@cAN_@BGTg@HQPa@JYTe@Rg@@Ar@cBFORg@Rg@L[DKRg@Xu@JYPi@JWFOPg@Ri@Xy@Vs@BKTw@J]Pi@DQHWPu@J_@Ty@TaAHa@@CJe@TiATaADUVsA`@}BBMV{AJk@Hm@TqA?GJm@DWBUHk@NiABSHm@@ELmA@IHm@?GFe@Fq@Dk@B[HaA@MHsAH{ABm@@WDaA?EBo@Bm@B_@HkB?CBo@F}A@OB_@DuADw@JeCBw@Do@?GFwA?ABk@@O@_@D}@DeABo@Dw@DmAD{@HeBFwAFcBBq@B_@B}@Bc@D{@Bg@Bu@@c@D{@Ba@JcCDgA@e@H}AFw@Ds@Di@L}A@CFk@Hk@Ju@He@Jm@?ALi@@IJa@H]`@}ARo@FUFSBIL]JYFODORg@LWDMf@eAP]NYFK\\o@b@_AVc@LSHOLU\\m@Tc@BETe@FKZs@Xq@Tg@DMX}@BEL[Ni@DMDOJ]H]Le@F[H_@@GJe@Jk@?CJm@Hg@@KL_ADa@D]@QFe@Bi@De@Bg@Bq@@GDsABy@@q@?c@@oAAaA?I?u@?g@A_B?G?_@?o@AwB?W?W?oA?OAuB?iBA{CAsA?M?eAAmB?kB?S?gCEkB?y@AKAq@C_AEu@Em@Ek@C_@Gs@Eo@Ga@AKEWKi@Ig@Kk@GYK_@I[Oo@Sw@?CUy@U{@Qu@Me@AE?C]mA_@yAES_@uAU{@g@mBIYc@eB]qAc@cBc@_B[kAU{@Ok@]uA_@uACG]uA_@yA_@uA_@uAK_@W_A]uA]qAU{@Ss@I[WcA[kACI[kAESYaAGUIQSg@GWW_ACKU{@[kAe@eBGSYgAEMMg@Ok@GYW}@AAa@{ASw@W}@U{@Oi@WcAACQu@Ia@CKa@kBMy@E]Im@AQE_@KcBCw@Ca@?w@?u@?o@?S?cA?w@@aA?{B?s@?k@@QEoBCs@GeAEe@Gg@Gg@Is@AAM_AQaAAECKAIKg@WmAIc@Ia@SgAIc@Kw@K{@Ea@Gq@AWGu@SyDOqCIsAM_CI{ACm@MsBI_BE{@IqABe@@Q@e@@II}AAECi@GgAKuBCc@?IEo@GsAAKA[KqBCWGmACg@AUEy@E}@ASA[IsA?IGcAGiAAMIeAIy@CWIq@Ky@O}@Ms@Ou@Ia@Oq@U_AMe@AEOi@Ma@CGIWQc@Qc@O]Qa@CG[q@Q]OWUc@S[We@EEKOSYMQQWMOQUg@m@a@c@SSSUUSg@c@CCQOc@a@c@a@g@a@USi@e@k@g@g@a@KMu@o@_Aw@e@c@IG{@u@wAoAi@g@w@q@q@m@e@c@m@k@WWUSiAaAeAaA_A{@EEYWo@m@m@q@UWAAY_@_@e@S[U[CEOU]k@Ua@[g@c@{@]w@M[k@uA]{@]aAM]g@wAUm@q@mBk@}A]_A}@gCy@}BEM_@cAQg@CEi@}AKWK]g@qAK]Qg@[}@m@cBAAy@_Ca@iAISa@kAa@kAg@wAKYSm@Uk@g@uAOc@GQg@uA[{@GS[{@AAYw@Yy@O_@Y{@Si@c@mACIYu@GQe@qAM[CKe@qAK[EKSi@[{@m@cB_BmEAEg@wAk@sAWa@c@qAg@uAi@{Aa@iAk@}Ag@wAW{@Y{@Uw@WaAUw@WgAScAUcAO{@Q}@SqAQqAK_AOkAIy@KcAIy@KaAG{@Gw@Ey@G_ACq@Cs@Aq@A_A?A?iA?aA@s@BgA@U@c@Bm@Do@Bk@Fq@Di@Fq@BMDe@LeALs@DWD[N{@R}@TiAZkAf@gB^iAFSZ}@FS^gAL_@Nc@Tm@L_@BIL_@Vq@L_@Tq@L]To@@C\\_AXy@Tg@BGZq@Xe@Zi@Xa@T]NSRWJMn@u@x@y@p@q@\\]BCnBmBDEr@s@TUn@m@h@m@r@w@BGT[JQRYd@w@DK^w@\\s@d@qANc@Le@DQBKH]BKRcALw@BMFk@Da@BSBYBOB_@Bg@@UBm@@a@?C@k@?]?Q?G?m@Aw@Aa@A?C{@ImAKeAMaAIg@AKIc@Ou@Ig@Mq@ESQ_AGYGYCQUmACKI_@G_@Q_ASaAKm@Q_AMu@AAOw@[gBQ}@Mq@WuASiACOQ}@GYO}@G[I_@GYQcAI_@Kk@CQG[GYKk@Ki@Mg@Ic@Ka@AAOq@K[M_@Oc@Oa@O]Se@Q_@[m@Q[OWIKMUOSW]a@e@a@c@Y[YWYUYWYUYWc@[_@Y_@WYS[UOMUOKI]Wc@Y{@m@[UYSk@_@m@c@_@U[Uc@YWSWQ]WKGMIUQWQc@[UOEEUO[W]U_@Ug@Ya@QECc@Qg@Qu@UsA[u@S_ASo@Ow@Sk@Mo@Oi@Og@Q]Ig@Q]Oa@Oc@Uc@Um@_@i@]m@c@o@g@i@i@YYa@c@Y]e@q@U_@U_@Wg@Q_@Wk@]{@?A[{@[aAUy@[cAOi@Uw@[aAe@aBMa@Qm@a@sAg@eBg@cBYeAY_AQi@I]g@aBEMa@wAY_AMe@Mc@Me@Ka@Mi@S}@Mo@Ga@Ii@Ii@Gs@E_@Ea@Ec@AO?ICe@Cy@Ck@Ao@?s@?}@@q@@S?UBo@Dq@Ds@F{@HcADm@De@Dg@Fq@B]D_@B_@D]B]Ba@D]Fu@De@@Q@KFk@F_AH_AJoAH_A?AJkAFu@BUDc@HgABSDo@JuAH}@Dc@Da@JiAF}@B_@LqADk@Di@LyAJqAHaAFq@JgADq@Dc@JkAHaANeBF}@Fi@L}A@IFu@Do@Dg@Fu@JeAFu@?GJkADu@FaABs@FqAB{@@]@m@Bu@@k@@q@@_@@k@?u@?m@@g@?{@?c@As@?m@Ak@Ae@As@Aa@Cc@A_@Cc@A]Eg@AOC]Ce@C_@Eg@Ea@AMCUEa@Gi@Eg@Is@Gg@?CE]M}@COIk@G]Q{@Ki@Me@Ka@Ma@CIEK_@y@KUIQKUGMOWMSCEMS[_@Ya@WUKMEEYW[U[Uc@Wm@Yi@Uu@Wm@Sw@W_@Mk@Ss@Ww@Wa@Mm@Si@Qu@W{@Yk@Si@Q[Ic@Oi@S]MGCi@OWIWGCAICa@IYIWIWIEA_@K_@I_@KWIA?g@MWGQIUEUIA?_@K}@W_@K_@Kc@K[Ic@Ma@K_@KOEMCk@Qq@Qa@Ii@Ok@O]IEAe@Ka@I_@I]GYG[GWEWEYEMCGAWEUEOCOCWG_@Ga@GoAWYE_BYk@MSEq@UcAe@_@Sm@g@y@w@q@{@_@i@k@{@o@eAIOiAaBg@q@e@i@m@k@?Ak@a@u@a@IEc@Ky@KE?c@?}@HC@a@HaA\\[Pm@`@UTSP_@d@u@dAMT_@j@}@rAGHi@z@y@lAABa@f@o@v@SRUTaAp@}@`@{@R_AJmA@oAOUGEAi@QSK_Ai@[[GGAAq@y@CEYc@S_@AASg@Sg@Sw@K]AEO}@YoAKo@Ky@c@qDIaASsBSyCAOC_@OsC[_HGeCSaH[wHAQAo@QuECiC@{AP_C@[DQr@sEBMLk@dA}EFUDU\\wAh@aCVkAR@DsAH]Nk@Lk@Lk@z@mDLk@hAyEx@oDLk@Pq@XiA@E\\sA`@wAf@mAh@oAn@_BnAgC^u@f@s@Va@Xa@Xa@JMVa@DGp@s@\\]Z]v@y@bCgCnAgAt@g@f@_@TKPIdAg@vDiAPGlBe@nAa@x@YlCmAxAmA`AkAhAmBl@yAf@}AFUvAeFr@cCDQxAiFPm@ZiArAmEFOlBeFDKb@_AVc@P_@|@qAdCcD?Ar@_AjA_BTYDELQp@aAXa@n@_ABEz@yAr@kBj@kBd@gCTcBJm@Ho@^{CBo@~CkUnAoJbBkMR{A@APkA?AHm@@CBSR{AP{Al@sEBQj@sD?A`A_F@Gl@}BLa@Ja@IY`@yA?Aj@kBDQb@oAh@}Ah@wAh@sAj@qAl@qAd@_A`@w@bAoB~@gBBG~@gB`AkBbAmB\\q@`@w@bAmB~@iB`AiB|@gB`AkB^s@^s@r@uAJQ`@w@^s@~@iBDIFMLUZk@Zo@Zm@HOTc@\\m@BEr@wA~@iB`AgB~BqE~@kB`@u@\\q@NWbAoBl@kAJQHOd@}@r@wABEx@{Ax@_Bv@}Ax@}Ax@}Av@}Ax@{Av@_Bd@y@Ra@x@_Bv@{Ax@_Bx@}Av@_BDK@CVk@^{@\\{@Z}@\\aAZgAZeAXiAPu@Pw@Nw@Nw@Fa@Hc@Jq@BS^kC@EL_ABOPsA@IHe@Fo@Da@@OFo@Bi@Ds@By@?]?[@IA[?_@Aq@Aa@?KAKCs@G}@I{@I}@ScBQiAQgAQw@Qw@Sw@Su@Oi@Sm@e@yAWw@Uu@Uw@Uu@m@iBm@iBe@sAQi@Sg@Yu@Yq@]q@]m@]k@W_@EIIMc@g@a@g@qAsAYYi@i@_AcAGEY[]]CAu@u@MM}@aAIIu@q@CEyBwBaA_AMMq@m@}@}@ECy@y@GGq@q@[YUUiBgBu@s@s@q@kBcBo@g@o@g@o@c@SM_@U_@UAAe@U]S[MCA]Oa@O_@O_@O_A[aA[_A[qAc@EAuAc@m@Sk@Sy@W[KUIUIm@QuAc@wAe@wAe@GCYK_@Ka@O]MSIQEAAWGUGm@SGAOGSGOEMGe@O_@MgAa@c@Oc@SeAe@}@a@_Ag@yBqAa@W_@W}@m@GEUOc@]e@_@UUc@c@c@c@y@cA]c@Ye@EG]i@a@s@c@{@c@gAa@eAWu@_@kAUq@KY]kAIWWu@_A{Cs@}BCEg@aBCEk@gBGQ[aAa@qAc@uA[eAEMY}@a@mA_@oA[oACGGa@Mk@?CIk@Iq@Gk@Em@Ey@Aw@?w@@}@@KBs@?MHcAHs@NaADWJc@Rw@XaA\\{@d@cAf@_Ad@w@lA_BFKx@uAl@_AdCoD|CwENUVa@Xc@DG\\i@~@wAhAcB@AVc@LSb@o@PYnAqB@AbAiBR_@BCrDmFHMfFcInAqBz@uApByC^k@hAgB`BkCb@q@pAcCf@aADGp@iAf@aAnByEF[d@iBTkAVuB@MLcBFwA?AAsBEgDAq@S_HEwAOuFK}DEgASuHK}DCc@MkECm@YcEk@oD?EqAmFy@oCuAqEQm@cB{FsAyEo@yBsAaFmAiEMc@m@wBe@uBi@{CEe@Is@IwACaAAmAAs@@oADyAJ_BReB?EPwAl@yD?AfA_ID[b@{CD]^kC\\eB\\gBf@aBh@aBDIr@wAr@mADGz@uA`CgELS~@{Aj@_ALQHK~AiC`BuCVc@FMLWn@uAP[Vc@?Ad@eABENi@FURaALm@^}CJuA?c@@{AKaEQcBYsBSy@Q_Au@qCaA{Cm@cBACi@sA_AqB_AgBIQqBmDQY_BqC}AkCcBsCeAkBWc@}DsGw@uAeGkKg@y@yCaF_C{Dg@{@uAaCIMsBqDgGmKCGqBkDgAkBo@gAMUmE{HmBgDuCeFqDgGmAsBuHoMyAgCqCaFOYa@i@u@aAq@{@]a@[]u@{@]a@Y_@wAgBkAqAoAyAuAoBgAwByAaD{@kCACo@wC]mB_@wBe@sFAEM{BC_CEaCAUEsDAuD?}AAm@@qC?oF@c@E{CO}P?YO_DYyC]_CMeAi@qCAIe@gB_AuCEKaBaEmBkDCCkBcCW]s@aAg@m@s@m@aB}AyAmAMK{CsBWQeDyB_Am@IEyAk@eCcAcA_@mG{BA?sE{A[KcBs@eBq@kAe@{@]iAa@mE{AcDkAg@QcA_@eC_Aa@Oa@OcA_@KCKEUIMG[Mm@WaA[s@Yc@YMImAq@cAu@wAqACEEEEGe@k@Y[i@w@IMQWOUW_@i@}@_@u@OYi@gAw@kB_AqCMc@Sq@CMiAyEI_@Ia@A?YwACKU_AQw@Ok@y@mDk@cC{@kDeAuEWcAY{ASeAU{AKq@Is@MkAMcB?AIgBAMA_AAsA@cA?G@g@BiBDsA?IBq@LuDBk@LoDBe@NqE@S@KB_ADeANaDNyCLsCLoCJ}BFgC?aA?wA?u@?UGkE?i@Ao@?AA_@EiC?u@AsAG{CIwIGeFEeDG_DCuCGkDCeDIiGGiCEeCAkCGeDGmCOiKAw@A_BM_KAm@CeDEkDGeDAgAMqICgDGqDGqG?ECwCC}B?QGoAEw@]oEWoBYiBy@{DoAsEIQqB{E]q@[g@Ua@QW{@oAgAyAa@g@mA_BuAgBiAyAW[}IcLu@_AAC{DcFu@_AwD}EY[o@{@_B}Bw@oAm@iAWi@c@cAEKCISe@Um@}@eCM[K[ACo@iBqAoD{AkESi@u@{B_CaH{CaJuBiGiAgDiAkDa@gAaBiEOc@kAiDyAoECG_@cASm@oEaMgA{CoE_MUo@}AkEkBkFk@{AiCmHcAqCsBwFaCcHiA{Cw@{BCGyAaEqBuFGMSk@o@iBmAkDk@iBk@{AGOYu@aA}BaAuBCGy@aBiBaDw@oA]g@_@g@[c@eAsAUYaAmAaAaAcA}@aAu@]YIEWQaAm@SMuBgA_@QAAyAm@e@SgA_@OGyAg@aBi@cA[mDeAeBi@IC{Ae@eA]qGuBSGs@UeCy@a@MiBk@cBi@kC{@cDgAaCy@IEi@Us@_@q@a@q@c@A?q@e@q@g@o@k@e@_@WYKIuAwAq@u@o@w@m@y@k@}@c@s@GIg@}@e@}@g@}@Yo@IOUg@y@mBu@sBWs@i@}Ae@}AUq@a@_BK_@UaAS_AO_AQ_Am@sDa@gCE[cB{Ky@kF_A{Fg@{CIe@y@cFk@_Ek@kDAIi@eDi@eDOcAKo@oA}Ha@cCm@wD_ByJs@mFCWACc@gCa@cC_@gCw@eFCKu@uE_@iCm@uDWaBi@iDa@uBi@eC_@uAGS_@mAk@_Bk@wAkAkCAE_AsBgBaE}BaFMY{AgDsA{CcDmHEGwCkGkAeCyCcHAA{DwIm@qAGMoB}E?A{@gBsA}CKY_@_AQc@c@kA_@sAEIESGW]{AS{@Gc@UoAG]QqACYC[Ci@CWEo@A[GcBAy@CoAB_A@cBHuBF_AHw@De@Hw@J}@PkABMF]P{@b@uBf@kCF[^cBb@sBlAkF\\{Ah@_Cj@cCZwAPw@DSDUBIJa@ViAZwAb@kBDSNo@lAuFnAaGR}@b@qBb@cCH[?CJm@Ls@TaBJy@PaBH}@H{@Dy@JiBBq@@o@?K?CBsB?eA?qBA_@E}AAo@?AEw@IoAQqCAOYmDEm@w@yJGw@C]IeAO}BOoBQ{B_@mFGm@Gy@Ec@COGg@Gg@QqA?EOgAMo@YqAGUCIs@kCIUMe@EKEQ]gAM[_@gAo@qAc@{@w@{AWc@sBuDWe@Yi@i@cAo@mAyAqCcAmBgC_FyAsCqB{DqAeCGM{AuCaFsJaAiBo@oAqByDyAsC{AsCqByDqByDm@kAuDeHi@aA[m@_@s@y@_BmG_M{@aB{AgC_EaIy@}AuBiEYi@_AeBq@sAm@iAwC{Fm@kAo@kAoAaCMWu@sAc@}@u@uAO[m@kAq@oAy@yAGKkBwDo@mACEoAeCEIk@iAeAoBm@iAQ]uGeMGOqAeCyAsC_ByCQ_@cAoB{AuCKSeBcDoCmFsAeCuJaRiD{GWe@eEgICEIQeGmLqB{DoByD{AuC_AkBo@mAsBwDk@iAeAoB?AUc@yAsCACmByDoB{DoAeC_@u@_E}H_@u@m@mAmBwDWg@eFqJqLaUUe@kF{JoCkFGMyBiE_CoE}CcGyFyKEI}@eB}CeGSa@gAqBwDgHACyBwDc@o@}AwB_AkA_AiAKMgCiCQQECmCyBg@_@OKSOuAaAoAy@QKy@e@gAk@qAm@QI{BaAgAc@eCeAyEmBUIwH}C_DqAYKqEiBe_@gOuDwAGEwCkAiBq@CA{GqCsB{@c@SUIuEiBa@O{EoB}GkC_Bo@kDqAA?MGaIaDiDsAcDqAoKkEECkEcBeBs@mBw@UKsGgCcEcB}B_AmBw@yOoGiEeBeCcAe@QaBo@gDsAk@SsGiCQIeBs@aBq@IC}B}@qCiAeHqCgEcB_DqAkAe@gOiGuBy@uDyAaHsCgDuAcDqAe@SmGeCiAe@eAc@}CoAwAk@qBw@gDsAOG}F_CeAa@iFuBcFqBg@U}BaAi@Sa@Q_@Qa@Oa@Qi@UKEICWKa@QUKICa@Qa@Oa@QoAg@u@YKEw@[a@QeCcAyAm@IEKCgDuAiKeE_EaBoCgA{EoBu@a@_@OA?_@M}@_@}@_@EAiEcBaAa@mHuCuL{Ec@QaBo@aDsA{EmB}CsAqGmCeGgCa@QeCeAq@Ys@YiFuBOGgMcFoHuCyN}FyKkEcDoAcBq@kFwBiFwBaA_@kBw@{Am@aKaEaHuCGCaDqAiBs@yHyCs@WiBs@kKsEmH_DcAc@aGcCkAe@gCaAe@ScDqA{D_BeIcDy@[}EoBqBw@qFwB{KmE}Aq@eDqAgBu@g@Q_@M_Bs@g@SwQmHECa@QcHwCICiDoAeBo@OGu@[aBq@uCiAwCkAIEcDuAiCiAQG_EeBaFoBWK_DuAm@[w@]CCkBcAuA{@YQy@m@CA_@Q]U_@WKGSOw@g@_@W]We@[wA_A}@o@MI_DaCw@g@gBuAuAaAcAw@aDaCo@e@qAiAqAcAqGiFMKKI_CcBoA_A{BcBkA}@{AcAy@i@iAs@MIKIe@YwAy@c@Sw@a@CC}Ao@_Bk@QG[MoCw@a@Kc@I{@SQEIAYGICq@KMCSCwBYWAq@AKAA?G?}A?o@?gABK?W@eABiAHgAFgDT{Kt@gCPuE\\c@DkBLSBs@DiBLoCNoBL_@BQ@SBcDV_@B{DVaAJ{AJuGh@kC\\gB^eB`@eBf@cA\\cA`@[Lg@Pw@\\_N~FQHaA^GDE@MFsAl@uF`CuB~@cBv@oBx@a@P_A^c@P_A^gBl@A?{Ab@_B`@{AVC?aANK@mALe@BI@I@M?K@K?cABA?gAAI?uAGaAEu@IEA_AKiASkAUYGq@QSEw@UKCKEUIM?]Ia@Ms@Sc@KcAYeAYuCw@y@UeAYSG[KSGGAEAyA]iBc@i@MiCs@cCm@mD_AiEgAg@MeAY}EoA}I_C}Cy@oCs@wCu@yAa@_AUuCw@y@UKCKEQCe@M{@UkEkACAaBc@a@KcCo@[IaAM}@UyBm@oBg@gAYo@Sq@SaBa@aBa@aBe@}@UuAa@uA]oDaA_AWkD}@_EgAOCw@UyDcAaPeEwFyACASGOEMC}Cy@WGm@QkCq@a@KwGeBcAWgEiAoGaBqPmEmEkAoCq@kA[qGcBeAYUGKCeAY_@KA?eA[a@Kc@M]KC?yI_C]Ig@O}Cw@uA_@a@KWIGAgD{@GCkA[_Ba@qCs@o@O_Cm@cEeAg@Oc@KqKsCyGgBcDy@yCw@gHiBoEmA{Bk@gBe@oA]WGg@Mg@OCAc@KQEm@Oc@MkD_AKCmBg@{Cw@wCu@uLaDqBg@SG{I}BmA[c@McCq@aFoA{Bk@mGcBmA[g@Ma@MsCu@qCs@QG{Cw@QE[IICmA[QCEAa@K_@KA?sDo@eBWc@IeAQqAUw@QCAa@KUGwCu@gBe@yA_@sBi@oA[oAUsAUy@Km@G}AI}AEcABaA@u@DuAJg@FkAVm@LuBl@G@w@VKDODCBaBx@MFiB`AmAp@EBiCzAoIvEuBlA}DvBo@\\cB~@MHa@RsAx@kAp@cDjBuDtBiDlB{AbAk@f@k@l@k@t@]n@Yj@EHSf@_@fA[jAc@fBaC`Kq@vCQt@aA~DmAdFYlAAFOn@iAlEGV_@rAa@hA]z@CFIXs@pACDIJOTc@l@_@b@_@Ze@^CBSLkAp@uAf@k@Ls@LgAH]?u@?OAc@AEAu@G}Dg@eAMaG{@KCWCyDi@_Dc@oAQ}ASKAiBWMCcDe@uAQaDe@iBUc@Ec@GeAQyAWq@SWGaA_@KGiAi@YOwEiCsBiAqC{AmDsBgAu@}@u@_@]YUo@q@u@y@y@gA}@sAwAiCCEw@iBc@uA]qAWmAUuAOcAEU[_CYyB[}BmAuI\\`DYwBU_BO_AK_AMsBKcCAwA?{A?aDC{@KqBKwAUiCOcBEa@MmAAQGs@IaAGeAMeDS{FY{F]iBS}@YwAACMWk@w@iAwAiEaFw@_A_Ay@q@i@QIOIEAKEQEOEa@ESAS?S@SBw@N_@FWFiATqBj@g@N{Ad@k@RoB|@wC~AYPuEhCsC`BoFtCmAp@{@d@E@{@`@}@Z{@Tw@L_ADm@@{@AkAGc@Em@IeASg@McBk@q@[IEoDgBaB{@IEyAy@s@a@kAw@_As@_BmAiAaAeBoASM}A_AcAe@y@_@iBu@mAe@oBw@qBu@uAk@eCiAgAk@wAw@SMy@e@sBiAiBeAsF{C[QoC{AIGw@c@WOeAi@GCiAk@{B_AgC{@uAa@iCo@aCm@iCq@aCm@eD{@wAe@_Bo@sEoBo@Yc@SwAq@_EuBiCuAaCuAeSsKyAu@iB_AeAk@OGsDiBm@[MGw@e@wDeBaAm@kAaAq@g@k@k@MM[]]c@Ye@c@u@MUGKs@wAe@}@c@{@MWMU}A{Cy@aBg@_A}EuJ]o@yAuCAA}A_D[i@qAkCe@}@wAgC[g@GM_@e@c@k@YYs@k@USo@e@YSgAk@e@Sg@Qg@MOEIA[EgAQcBM_ACMA_@Cw@CaDOkBGgAGoCKi@CK?cCKIAm@GSAE?gASu@Sm@Uk@Yu@c@iAaA_@c@e@m@[c@w@qA]q@GMGOCEKUACOe@Sm@M_@o@wBSs@[gAY_AUaAMq@SmAKs@Kw@mAoM[aD_@wDg@iFi@gFGq@a@}DQ{Ai@kFgDk\\KiA}AiOyB}Sy@uIYmCQiBMgAQmB?EIeASwB_@{DKy@w@}H]cDKeAGm@s@wGi@qFE][gDwA}M[eDM}AGo@QiBEc@Im@Gm@AEGi@MgAQkBi@wFe@mEi@oFs@kH{AeOO}AGo@WmCIm@Go@Gm@SkBGm@Go@SqBcB{PcA{JCOy@aIkA_MU{BO}AYkCGo@UsBCWO}AMkAYiCGa@Y_Ce@qCOs@S{@Mk@Uw@YeA_@oA[aA]_Ai@qAw@gBg@cA[k@s@oAq@eA]c@Wa@k@w@q@y@s@u@q@q@EEk@k@sCyByEaDwA}@_Ak@k@_@q@c@_@U_@U_@U_@Ws@c@k@]aC{A{DcCcBgAkAs@sEuCYSoBoAMIa@U}AcA_Ak@_@WgEkCyJgGqH{EwA}@OI_@Us@e@qBoAYScAo@oFgDiBkAoBmAqBoAuBqA_Ao@qBmAcAo@yA_AsBsA{BuAaBcAa@WwCiBo@c@c@YQI{AaA_DoBwIqFOK}E}Cm@_@QM}ByA_BaAyFoDoAy@s@c@a@W]Uy@i@e@YKIMGUOaAm@]UAA_Ak@QKOKCAmAs@QKmAw@MIoAy@QMmAw@MGOK_@Uo@a@c@Ys@c@KG}@m@qAy@sA{@y@g@QMkAu@MIoAw@a@WMIKG[Sw@e@SMiAu@IEsA}@uA{@wA}@{A_AwA}@}AaAA?cBgAICoAy@_Am@}AaASMyBuAuA{@}AcAkAu@OKmAu@yA}@uA}@wCiB}ByAyBwASMkBiAcCyAWUYQ{@k@OI_Ak@KGqBqAm@_@q@c@_Am@_@UmAu@eBgAgBgAyCmBqCgBcC}AmBmAuBsAuBqAsA{@o@_@oBoA_DqBeDuB}D{BwA_AiCaB_F_D{A_AaAo@OK}LyHeDqB}HiFgEkCcEkC_DmBcDuBs@c@_BcAcAm@{@k@mBmAQK}@m@oAw@yBuAkBiA{CoBeC}AcDuBSMcBeAg@]m@_@k@_@uEyC_F{CkCcBaGuD{E}C}E{C_Ak@}FsDMGqCgB_BcAsA{@iAu@_JuFk@]qIoFyCkBaGwDeLkHqEqCe@YaAm@}AaAg@[{AaAWQeBgA{BwAg@[mAw@YOUO[Qe@[s@g@_BaAgHqEsK}G_F}C_@WWQGC]U_@U_@WUOGE_@WMG_@W_@U_@U_@U]UAAgAs@}@k@w@g@o@a@uDaCUOmFgDQK_Am@sA{@]SAA]SgAs@o@a@OIeRsLkDwBgAs@_Am@_@U_Am@QK]WKISMy@g@_Ak@gHqEUMu@e@sA}@e@[y@e@g@[CAYSsA}@MIq@c@cAm@mCaBm@a@aDsBoEsC}DeCgFcDaAm@uCkBgEmCgBiAiBiAaAm@iCaB{CoBoCcBcB}@_Ag@}Au@wBaAyB_AmB{@gCcAsB_AeCeAsB_AaCcAmD}AkBw@UKwB}@UKwAq@}B_AcCeAuB}@qCoA}CsAiDwAWKkAe@aAa@_@OQIQIuAo@MEaAc@s@YoCoAuAm@eCeAmCmAqCoAwB_AmBy@uAm@sAk@KGqAe@qAi@}@]oAa@aBg@yBg@{@OiAQmBYQCiCU{K{@gDUaDU{AM{@GeDUeGa@aBMs@GoCUeBMm@GgDWqCUuBQaDQyBO{@Iw@GsBMk@Ga@Ei@EaAGi@C_BME?c@Ei@CeEa@IAmHk@}BQoHe@QAc@Es@E_BMaAG}@IIAeAGgAIe@Em@E{@GuAKmBOaCQcBMoBQ}BOcBO}AK_BMkBOwBO}AK{AKkAKyHo@iGg@gF_@aEYu@E}D[}AMgAKaBMWA}AIyBO_BQ_@Cc@E]CwAUaAMyHsBWImBm@w@]e@SSMy@_@iB}@oC_Bk@[cAq@yBoAUOy@g@_Ak@s@c@a@WsAw@qAw@{AaAoAu@uAy@{A}@uAy@uA_AcAq@[Wu@k@c@_@AAeBwAQOgA}@cAw@KK{@u@gB{AwAkAIIuBeBi@c@wAkAgB}AqAmAUQuAkAcBuA}AsAgAcA_@Y_@_@cAw@EC{@w@ECQO]Wi@g@QO[WACIGe@a@i@e@CCm@i@IG[]MKy@w@m@m@s@u@q@u@SSY]c@i@k@o@c@i@k@q@g@m@_@c@a@g@[_@CEWYOQe@i@?Ag@m@e@i@EEGIIIAA[_@W[QSIKY]QSGIWY[_@WWUWQSSYSW]_@{AiB]e@u@}@s@y@o@w@m@s@cBqBgAqA[a@c@g@k@q@WY_AgAUYk@o@}@eAeAuAu@}@y@_A}@gAgAoAiAsA}@eAcAmAeAgAiAkAiAkAQOq@m@UQQQEEc@]e@[KIc@_@uAeA}@q@]UaDcCgCmBaE}C}K}H{A{@aAi@_@Sc@W_Bu@a@O[MECa@OcAa@a@Ma@Ka@M_AYg@Oa@K_@KCAgA[KCEAGAeAM_@EC?c@Cc@CgAEc@CMAUAaAGE?}BGaB?}@?c@@E?]@c@Bc@BA?eABW@K?c@?}@@I?U@q@@O?q@B{@Bu@BcBFc@@u@?_BBI@kAFcABY@qADq@By@B}@BuBFsBFs@BgA@_BFcBBaBFoBHqBDcADw@BwAByBHQ?kBDwBFyBDoBDqBHwBFwBF{BHoBHiBBiCJyADO@e@@uBFwCLs@BoADu@BaBFgABU@gBB[?I?K?Q@iDH_AB_ADyDJA?c@B}AFK?cBDsA?gB@}BCaBE_CQiBSe@G_BUi@KqAW_AW_AU_H{BcDmAyAk@A?{Am@kAe@y@[ICIC}B{@uCgAyRoHwCiAq@W}B}@eAa@w@WgCaAgDqAy@YuDyAaA_@SIME}B{@u@YuBy@eBo@GCSIa@O}@]u@Ys@Y_@MmCcA]OeAa@oAe@wTqIuBw@cHkCWKqAg@yDuAmRmHkHoCc@QcJkDq@W}Am@oBs@CAwBy@{B{@MG_Cy@kAi@q@WoBu@eAa@uBu@m@W{By@MEuBy@c@Q_Bo@aBm@oBw@cBo@OIUKuDyAsAi@g@SYMKCgAa@CAMGa@O}@]g@ScA_@o@W_@M_Bo@eJmDeAa@oG_CqEaB}D}AuBu@_DoAeBq@gAc@]MgDqAeA_@{Am@yIeDWKICcAa@g@Q_Bo@mAe@{Ai@cK{D}CeAwAc@oBe@{A]{BYgQ}BuBYoAOcIeA}JoA}G{@eG{@mAOaAM_BSa@Gk@GeBW_@E_AMiC[m@IiBWKAy@MqAQ}@Ku@I{Ca@a@Gg@G]G_AKsASoAOgAOyAQcAMiAOkAOo@KaAM]EOC_Da@}AOq@G}AKyBGoBCiBA}DA}JC{B?eEGmDGsBGc@CO?gESeAGYCgBKwAQuAUsCg@mAYeEmAoAa@SIaAa@_CeASKoBeAqDyB_Ak@_DoBGC{EsCIEmJaGQIuAm@MEuBw@}@m@_@UIGw@c@eCwAuBuAgAo@_Ak@{CaBoAq@AAaB{@_@Qa@ScDcBKGqAw@cEeCq@c@mCyAy@e@SMkAq@qBmAWM_Ae@cBs@uAi@qAe@kBk@eBi@cBg@}Bs@gCw@wCaAyBu@gCwAm@]wA_AwAaASSSS_As@cF}Dy@m@_CgBiCcBaJcEmDwAqEmAqF}Au@UaC{@SG{CwAIG_B}@_Ao@SOw@o@mCmBYOWQIKm@s@cAaAs@w@u@y@}@gAw@cAs@}@UYMQOQqDgEa@e@UWw@_Au@}@[][_@w@}@]c@u@_AuBkCuB_DOUOUACuAmBs@aA]g@o@}@cCeDk@u@s@y@cAcAwA_BWYw@eAs@aAm@_AqAkBs@eAu@}@y@gAkAyAu@_AqAaBU[CCcAqAiB_Cg@q@[_@_AoAcAsAQS}@mAYa@Ya@MQw@qA_AgCIg@Iq@Ii@Im@?AOoCAQC]QgCGwCAqB?cA?m@?q@?q@?c@A_B@qC?M?oABaAJ_AJaAFy@HwALeBDq@Dg@JyAHaADa@DUHi@Jm@Hm@Hk@NcA@GFa@@MF[BQBQHq@Hm@L{@D_@F_@Ho@PqAHi@D]BUD[DYJk@Hm@Dc@@AFm@@ILoABo@@u@?ICa@Ii@G[GWEOIWKWISKQGMOQa@i@CCa@e@e@a@MOWSKIMIKGIGSMQKEA]UYMAAGCUIMGCAg@Qa@MKEQIo@Wa@Qa@Om@Ww@[_@Oa@Qa@Oa@Qa@OeBs@YKgAg@kAP"
                          },
                          "start_location": {
                              "lat": 41.0469065,
                              "lng": -73.5420051
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.3519217,
                                      "lng": -71.0550703
                                  },
                                  "name": "South Station"
                              },
                              "arrival_time": {
                                  "text": "7:50 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700355000
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 41.0469065,
                                      "lng": -73.5420051
                                  },
                                  "name": "Stamford"
                              },
                              "departure_time": {
                                  "text": "4:48 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700344080
                              },
                              "headsign": "Boston",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Amtrak",
                                          "url": "https://www.amtrak.com/"
                                      }
                                  ],
                                  "color": "#cae4f1",
                                  "name": "Acela",
                                  "text_color": "#000000",
                                  "url": "http://www.amtrak.com/acela-train",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 5,
                              "trip_short_name": "2254"
                          },
                          "travel_mode": "TRANSIT"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "cpvwFntobMwiJqlGkw@}_Agu@ioAac@aXwsB{`Aaz@_h@q~@o~Aq_DmtA}dAgqAiOwfAp@osB~\\_iCuAof@wn@iq@ywB_lCq_CirCiuAwuBce@_~Aqm@sdAcr@ifBaqA}cAw]g}Amy@sbAuRgv@cr@q|CyUwmEaa@}`Bam@gt@yx@eyBkw@uZmYwPuKg]~FkaBAie@gVkj@{YgoALgbCkNybBgSqX{n@_Vcu@kp@mQkw@qa@iwAefAqxCcWmiD|Oc|Bov@s~Ccg@o`Aga@kbA{B{oAqMgs@kr@{{@}nAkiBmRykBsImzBoKab@_{@bC{WeT{C}`@tAw`AdDarB_h@grAwPyX{t@klAaQk`Awk@uhDoz@seCkIyu@oFkcBid@wmAadDenFg_AurA{^clAu|A_tBehA{aBio@wWaXsk@eJ_g@ov@irA}Bcl@hRsh@~a@uNlsAfOn|@_Azm@wk@~EijAsAo_B~_@e}@vLk}@{IkzA`Fas@pAiaDzVuzBf]i}Bd@cnB_Lm`CyWgt@ie@{nD}]sxDqAoqCiO_`D_QapBjr@g|ChOq}CxNcgCyd@y{Bej@ijA`EciEk]kyDs_AocDkp@ocBx@{d@hRasAhk@erAhc@yuDrSqeAuVetBaZ}fBwM_lBsq@uaAav@seBm[{}@}D{w@pm@mrAmJ}nA}j@ot@og@mUyVyu@`DkwAxC{~AwNmYib@_Nu\\qIid@iXub@vTcO_GwFib@x@wcAxKue@vNs\\p]aT|n@}kA`^esBxoAgjC~Y}{@aEwl@y]ql@sh@wa@ud@cOme@}f@qPsv@vb@ay@nb@oq@xG_q@a]oeChb@wrAbCka@mZup@saBypCeWcr@oBajAiYii@kn@_Yop@_]eZikAjCivA_Ec_DmLiy@mh@oq@_s@ekB_eAqoCiaAke@is@sm@yc@uiCqt@m_CqWceAvWotA|A_lAoPa}@crCooF{~DcnHa}NgbG_pIkiDamC{|AmfAvBs~A`b@_m@bBitA}]kmEgjAgwEqmAcdAyIuiAzt@wRvv@gQrLcjAcQaf@{c@iIkm@uCip@sSia@s_Ap[eiAei@{wBeaAuv@ecAaRgQa`@sBgR_N{Iee@md@irEmYkuCo\\mdA_`BgdAulCacB}yCclBgwKe`HgpEswBeiEa\\ueB{\\u`Aks@u{@c}@mq@uv@k~@ki@ovBlC_mAfD}pBal@ocEa~AykCuz@u`B{SqeB}K}uAgv@u{A}w@moA_y@_u@aaA}S}]{@{b@tGop@iDa[c]eM"
          },
          "summary": "",
          "warnings": [
              "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
          ],
          "waypoint_order": []
      },
      {
          "bounds": {
              "northeast": {
                  "lat": 42.3519217,
                  "lng": -71.0550703
              },
              "southwest": {
                  "lat": 40.7410794,
                  "lng": -73.99730389999999
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "7:50 PM",
                      "time_zone": "America/New_York",
                      "value": 1700355000
                  },
                  "departure_time": {
                      "text": "3:39 PM",
                      "time_zone": "America/New_York",
                      "value": 1700339967
                  },
                  "distance": {
                      "text": "232 mi",
                      "value": 374157
                  },
                  "duration": {
                      "text": "4 hours 11 mins",
                      "value": 15033
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.3519217,
                      "lng": -71.0550703
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.7470868,
                      "lng": -73.9936585
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "0.2 mi",
                              "value": 270
                          },
                          "duration": {
                              "text": "1 min",
                              "value": 45
                          },
                          "end_location": {
                              "lat": 40.7451481,
                              "lng": -73.9950497
                          },
                          "html_instructions": "Bus towards 14 St Via Columbus Via 7 Ave",
                          "polyline": {
                              "points": "iluwFj{rbMJ[z@j@TNTNZR\\Tj@`@RLj@\\r@d@DBTNb@ZIV"
                          },
                          "start_location": {
                              "lat": 40.7470868,
                              "lng": -73.9936585
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 40.7451481,
                                      "lng": -73.9950497
                                  },
                                  "name": "7 Av/W 25 St"
                              },
                              "arrival_time": {
                                  "text": "3:40 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700340012
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.7470868,
                                      "lng": -73.9936585
                                  },
                                  "name": "7 Avenue & 28 Street"
                              },
                              "departure_time": {
                                  "text": "3:39 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700339967
                              },
                              "headsign": "14 St Via Columbus Via 7 Ave",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "MTA",
                                          "url": "https://new.mta.info/"
                                      }
                                  ],
                                  "color": "#1d59b3",
                                  "name": "Harlem - 14th Street",
                                  "short_name": "M7",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                      "name": "Bus",
                                      "type": "BUS"
                                  }
                              },
                              "num_stops": 1
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "0.2 mi",
                              "value": 277
                          },
                          "duration": {
                              "text": "5 mins",
                              "value": 277
                          },
                          "end_location": {
                              "lat": 40.7468641,
                              "lng": -73.99730389999999
                          },
                          "html_instructions": "Walk to 8 Av/W 25 St",
                          "polyline": {
                              "points": "}_uwFncsbM}IrM"
                          },
                          "start_location": {
                              "lat": 40.7451054,
                              "lng": -73.99496019999999
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "0.2 mi",
                                      "value": 277
                                  },
                                  "duration": {
                                      "text": "5 mins",
                                      "value": 277
                                  },
                                  "end_location": {
                                      "lat": 40.7468641,
                                      "lng": -73.99730389999999
                                  },
                                  "polyline": {
                                      "points": "}_uwFncsbM}IrM"
                                  },
                                  "start_location": {
                                      "lat": 40.7451054,
                                      "lng": -73.99496019999999
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      },
                      {
                          "distance": {
                              "text": "0.3 mi",
                              "value": 444
                          },
                          "duration": {
                              "text": "4 mins",
                              "value": 255
                          },
                          "end_location": {
                              "lat": 40.75016979999999,
                              "lng": -73.99478890000002
                          },
                          "html_instructions": "Bus towards Lincoln Center 66 St Via 8 Ave",
                          "polyline": {
                              "points": "wjuwFnqsbMKVo@a@KIWQqAy@KGEEMIq@e@e@YSOWO]UEEOIo@c@SM_@Ui@_@KGUOQMIGUQu@g@FS"
                          },
                          "start_location": {
                              "lat": 40.746845,
                              "lng": -73.99720000000001
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 40.75016979999999,
                                      "lng": -73.99478890000002
                                  },
                                  "name": "8 Av/W 31 St"
                              },
                              "arrival_time": {
                                  "text": "3:52 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700340766
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.746845,
                                      "lng": -73.99720000000001
                                  },
                                  "name": "8 Av/W 25 St"
                              },
                              "departure_time": {
                                  "text": "3:48 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700340511
                              },
                              "headsign": "Lincoln Center 66 St Via 8 Ave",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "MTA",
                                          "url": "https://new.mta.info/"
                                      }
                                  ],
                                  "color": "#1d59b3",
                                  "name": "Lincoln Center - South Ferry",
                                  "short_name": "M20",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                      "name": "Bus",
                                      "type": "BUS"
                                  }
                              },
                              "num_stops": 2
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "0.1 mi",
                              "value": 227
                          },
                          "duration": {
                              "text": "4 mins",
                              "value": 228
                          },
                          "end_location": {
                              "lat": 40.7517137,
                              "lng": -73.9957489
                          },
                          "html_instructions": "Walk to Moynihan Train Hall",
                          "polyline": {
                              "points": "{_vwFfbsbMoChGyCcA"
                          },
                          "start_location": {
                              "lat": 40.7502189,
                              "lng": -73.9947626
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "449 ft",
                                      "value": 137
                                  },
                                  "duration": {
                                      "text": "2 mins",
                                      "value": 137
                                  },
                                  "end_location": {
                                      "lat": 40.7509398,
                                      "lng": -73.99609359999999
                                  },
                                  "polyline": {
                                      "points": "{_vwFfbsbMoChG"
                                  },
                                  "start_location": {
                                      "lat": 40.7502189,
                                      "lng": -73.9947626
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "295 ft",
                                      "value": 90
                                  },
                                  "duration": {
                                      "text": "2 mins",
                                      "value": 91
                                  },
                                  "end_location": {
                                      "lat": 40.7517137,
                                      "lng": -73.9957489
                                  },
                                  "html_instructions": "Take entrance <span class=\"location\"></span>",
                                  "polyline": {
                                      "points": "kdvwFpjsbMyCcA"
                                  },
                                  "start_location": {
                                      "lat": 40.7509398,
                                      "lng": -73.99609359999999
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      },
                      {
                          "distance": {
                              "text": "232 mi",
                              "value": 372939
                          },
                          "duration": {
                              "text": "3 hours 47 mins",
                              "value": 13620
                          },
                          "end_location": {
                              "lat": 42.3519217,
                              "lng": -71.0550703
                          },
                          "html_instructions": "Train towards Boston",
                          "polyline": {
                              "points": "eivwFlhsbMYMlHi\\fFgPPi@bFyO`@sA`EgMNi@dAeD|CsJPi@`F{OZ}@FSlBaGNk@J]Ja@F_@Fe@Fg@Bc@Be@nAkUNmCd@gIvBw`@NmCH}AxA}Wt@cNF_ABw@@{@@aA@{@Ay@ASCiAEo@AUAWEq@MsAI{@Ky@M{@Kw@Os@SaAWcAYcASq@W_AkDeMKa@gBwF]eAiAsD}AeFY{@m@qBGQcAeDs@}BOi@[eAUw@Qi@GWGS]uAI_@Ia@WgAYyAO{@G_@]yBO}@Ku@SsAa@}COmAScB]yCSqBEYKaAK}@WaCGe@W}B[wCAGe@kEe@eEOqAQeBW_COqA]}CIm@WkC]}CYeCe@eEKaAKaAQ{AUsBKeAU{By@cIS{AS}AGe@AGE_@MoAK_AE[[}CIiACQMyBEo@MiCEo@Ca@AMIeASsBKeACQ[uBOw@GWCMQo@IUMe@ACQi@KY[s@Wg@Ue@Ye@AAWc@Ye@CCW[OQIKUUGE[[CA[Wc@[MIQKEEYMKGSKYKICa@MKEWGQGQC]ECAc@EQCA?a@Cs@GK?{@Ic@Ec@EeAMG?KAc@Ee@ESCa@Cc@Ec@EgAIC?wAOwB[eAKkBMIAa@C[?c@?s@@o@Hi@Lc@Js@ROF_@NeB~@k@XsAp@w@`@aAh@YLe@VmAp@mAl@y@b@u@`@s@\\C@iAl@m@\\yAt@gB`AgB`AA@_Af@w@`@g@XoAn@_Ab@kAp@o@^YLe@Xo@\\s@`@}@d@gAh@gAb@OJ}@h@eAn@oA|@w@n@{C|Bc@\\{@t@gCdCMJ{@z@{@x@A@gB~Bw@`Au@`Aq@`As@~@?@uAdBA@_B~B_B|Bo@~@A@s@bAABgEjGiAbBY`@Y`@W`@Y`@q@bAY`@q@bAW`@Y`@Y`@W`@Y`@W`@Y^q@bAY`@q@bASTY^QRe@b@A@YXA@gAz@[RKFSJSLKDa@PSJMDu@VMD_@Je@HG@YDA@YDc@Dy@Bi@?O?[?i@Cc@Ce@Es@KICYEGCSESGQGa@MYMe@S_@SQMOIWQUQCAQOGGGE_@a@OM_@]i@e@m@i@GGq@m@AA]Yi@g@a@]YY[YCCMKq@m@MMGE[WWWy@u@ECa@_@u@o@YWa@]e@c@_B{A{@{@c@e@OQs@w@]c@QSGIUYw@eAi@u@W]OW_@k@IMOUU_@u@oAi@aA_@m@kAsBQ[EGoAqBCE?AAAyA{BwAaCu@mAIOKOKMIOA?MOKQKMMMKKWYSUa@a@QQgBeBwBuBsBqBoBuBc@a@uAuAaCiCa@c@WUu@w@e@e@oAqA[[ECgAkAmAsAk@q@[_@w@eAm@y@[c@_@k@s@gAkAgBMSaAyAaAyA}C{E}AaCmCgEyDcGYe@}C}E_AyAsAsB[e@Yc@{@sA?Aw@gAe@k@KKg@k@gAkA{@y@[YqCiCy@w@eFcFEEAAqCoCQS[][]u@}@e@i@q@_Ai@y@a@k@_@m@iAgBWa@q@cAYc@U]AAYa@s@aAYa@U[CCQUk@o@k@i@MM}@q@OKaAm@e@WcAa@QIs@U_@IYGq@IkAMWCeHk@eCUm@G[EUEoBc@uAi@cAk@eAs@mA}@oBoAaD}BuDqCuJeHeDcCm@k@o@m@mAmAk@u@Y_@IK_@k@c@s@k@cAk@mA]s@}@oCQk@Qi@ESw@qCm@uBq@_Cu@iCSs@GSCGMc@_AgDqAsEi@kBW}@Oi@Oi@Qm@o@{BSs@[iAqAqEs@cCUy@GWe@oBe@yBE]]iCOeACQ?AUkCI}AIyA_@mIGwAOwCMsBm@iGk@wE_@eCAAM}@O_A?Ae@qCqBmLAEu@gEW}A]gBAA]cBc@yAg@{Aw@eB_@s@Ue@GKi@}@]k@]g@sAcBkAmACAs@o@a@[e@]WQu@g@[QUOIEo@_@{EyCCC}BqA}CiB_FwCcBaAwBsAa@]sBiBcBsBsAuBo@sAm@wA]cA]oA]wAiAaF?C[sAS}@UeAMi@k@cC[uAoCsLWgACOc@sBEOMk@_@}AYoAi@cC_@eBa@eBI_@m@_COi@Me@Qo@]oAAEm@yB]_BsAeGmBmIkAsEg@aBu@gB_@u@s@gAw@gAu@}@[_@Y_@MOMMY_@[_@Y_@[_@OQ}@cASWw@}@_@c@UYY]A?k@k@MKq@k@u@i@k@]eAk@y@a@IEwAw@kBaA_@SiB_AcCsAUKaB}@yAw@GCyAw@iB_AeLeGaB}@sAs@SKSK_B{@aB{@mXyNeJ}EkE}ByBkAcDeBmJ}EuC{AaCqAyBkAiAk@yBkAGEsDoBo@]_Ae@a@S_@S_@SaAg@a@SKGSIa@S_@QUKKE_@Qa@QeBu@eC_AeCaA}By@IEeBm@GC{@[a@Oa@QICw@_@_@QOGQI_@Sa@S_B_AiAq@wG{DcHgEg@[}@k@WOSKKG_@Uq@_@_@U_@S_@U_Ai@MIIEUMwA_AAA}A}@oDsBqAy@SMIG_Ak@_Am@QKSM}A}@IG[WAAWWCC[]QSQQk@}@EGUc@EG]s@Uk@]{@e@kAy@oBEOYy@]{@Wi@a@y@aAwA_AmAKKi@k@k@k@c@_@WQm@c@eAu@e@_@g@_@eD}Bi@_@q@e@q@o@?AiG}Dq@g@}@q@c@[mAy@s@i@eAw@_Am@[UCAWQo@g@]W_@WYSc@[UQa@YaBmAu@i@}@o@CAQMo@e@a@[wG{E_Ay@o@o@a@g@k@m@e@m@y@mAe@o@i@{@KOe@s@KQe@s@aBiC{BkDmAmBU[iAgBa@o@g@w@cLmQcEqG]k@eA_BMQwA{Bw@mAoAoBgBmCEGmAmByDmFoA_BaBqBgC{CQUyAgBw@}@u@}@UY{@aA[_@mAyAUWGIMQs@u@eAmAAAm@w@_AiAs@{@q@u@Y_@SSo@u@aAkA]c@[c@WWGI}DyEyCqDGI{BmCaAkAeFgGuH_J_@c@y@eAuCiDq@w@gC{CWYiByBa@e@kAuAiCaD_BkBwCmDMQg@m@Y_@[]e@k@OSMOMOy@aAKOMOqA{A[_@u@}@wAcB}AkBGIw@}@EGm@u@OQSUGG}@gAm@s@GImCcD}AkBIIu@}@UWUWu@}@KMOQy@_Aq@y@a@g@kAuAGGiAuAY]o@w@a@e@WYwAeBc@i@MQmB{BoA}AqRmUyEyFoA{AaBoBKM_AoAKSi@w@GKq@eAEIuAgCUe@iA{Bc@_Ao@oAk@iAq@wAeA_CmA_DCKWy@Ok@]wAGWKk@[eBQmA_@oCw@mGe@wDCYMaAIm@[iCg@aEGa@c@mDKw@M}@YaBEMIc@Ke@CKQu@Ok@Y{@So@Us@Ui@_@}@Qa@Uc@aAkB_@m@oAyBg@y@a@s@oAwBqHeMgB}CqA{Be@u@gAiBKQMSuBqDgDyFIOKOYg@QYiAmBqA}BGG_@s@_@m@gAiBw@kA]g@OWa@o@KQw@sAm@eAWc@mCsEcAeB[i@o@iAWa@gAiB?A[e@{@yAUc@e@u@IO}@{AeBwCYi@MUUe@OYUi@MWOc@Sk@AASo@Kc@Sq@AGOi@A?YqAWqAKm@SyAG]AOIm@QyA?AO}AC_@AMGm@M}AIs@a@mDYyA_@gBWiAQo@[cAk@cBGQ_@}@O_@MUIQACYk@q@mAi@y@eBeC[_@CECAo@s@mDoCGEm@g@cGoE{AqAo@g@i@c@w@m@s@k@_@Yi@a@AAQOa@[uAeA_Au@gAy@i@c@q@i@aAu@YSq@i@w@m@m@e@]YYSEC[WAA][GG[S{AmAGEqB{A][w@m@aBoAyAkAGEu@k@CCk@c@MKOMYW]Y{@q@QMiA{@MKo@g@UQ_@YYU]WCAa@[e@_@?Ac@_@USc@e@WWCEY]SWGGi@{@GKYg@?Ai@kACIO_@Qg@ACOe@Qk@AGKc@Mk@ESCMQkAI_@AMMmAQiC?QCo@Em@Ae@Eo@A]A]CYKsBC[GaAEm@?IGc@MmAM{@Gc@AIKk@Mm@Kk@CK_@uAI_@Oi@GY[mAWcAEMWcAACW}@c@eB_B{F_@kAQm@e@kAm@uAUi@We@a@s@]k@k@y@k@y@U[]c@CCs@{@MQKMMM_AmAOQs@_AIIqB_CwBmCyCmDe@k@}BmC}AiBuBiCOQe@k@yAeBk@q@oAyAmAuA{@cAs@y@mAuAwAaBiAuAy@aA_AkAu@iA{@uAYg@aAiBYk@q@uBQi@Yy@GSGSGUEUYoAScAG[Ga@S{AQyAI{@C[GaAAIEy@A[?EIgCAa@EgB?CAo@Ao@?CG}B?KCo@Ao@Am@IoCCaAAm@AWAWA]Ak@C}@AGA]?OC]AQAME_@C_@AOE_@MsACUCSEYCKUmAYwAYwAScAYqACOEQ?Cu@qDc@}B]{Aa@_BMc@Om@{@mC[}@u@{BoCiIsD}KgJyXkBwFGQc@uAGSe@oASk@y@iC[cAK_@CI]wAESGUWyAAGSsACKEa@Q{AK}@Q{AE]S{A[eCCOAQo@eFc@oDIu@Ks@q@oGCUq@}FS{AIu@WyBIw@Eg@KeBG}AAMEaCCkC?AC}DAsA?a@EwEIkLM}OGkJGmICwB?GA}@G}GAcACiAE}A?AG}AA]AQEo@EcACUAUUmCIcACWIm@KeAWoBU}AKm@_@gCKk@Im@OaAEUEUc@uC]_CAGwC{Ru@cF?CIe@_@gCIm@Im@Km@i@uDE_@Oy@QiA]iBe@yBu@qC}@qCm@gBiAiCEGw@{AkAqBi@w@mAaBQUs@{@m@s@}@}@qAkA{BcBiCiB_FmDsCsB_Aq@[[cAcAi@o@AAs@_ASW{@sAk@aAEI]q@Yo@k@sACE]}@EKUk@GWIYQi@Oi@Ok@Oi@Ma@CMa@sAQi@cAmDW_AQo@w@uCW_AaAiDo@_Cy@yCOi@?CKWYgA_@wAaAiDo@cCOg@_@sAYeAOi@EMCOc@}AOi@Ok@Uy@a@sAOi@_AuCg@cBy@qCc@oACGk@wA}@sBUc@MUKSm@aAACe@w@i@{@QWaA{AGKq@eAGIi@y@Wc@KQk@{@i@{@Yc@gAgB_@k@cA}AS[CGYa@ACW[U]e@i@MMUUGGSSc@_@s@k@{@o@y@i@eAk@cAe@m@UoAa@kA[iBa@kAScBYkAWmAUsAYoFoAeAUqAUSESEiB[C?aAQMCqA[qAa@u@Wu@[}@e@u@a@y@k@cAu@s@m@}@{@q@w@o@u@c@m@kAiBYi@[m@m@oAe@mAM[Qg@Y_A_@oAG[Mi@EU[}ASqAM}@KiAMyAIuAEiAEeBAqBBkBDsAFsA?CBk@Dq@LuBJoBJoBJ{AJqBRcDT_ERsDViEVmEN{CB[JqBJaBDi@Do@JiBHqADo@@OFmAJwAXgFJiC@M@o@@g@@wA?}AE{BGqAAQC[G_AE]Iy@OoAACg@yCWoAK]YcAe@wAc@iAk@oAm@oAs@qAKSyAeCgAoByAiCoAuBoA}BcBuCoA{BiAoBqA_CU_@Wi@Wi@Ym@Wm@Qa@[u@Wu@Ww@Wu@]mAe@kB]}AUsAQiAOeAOoAMkAKcAK_BOkC?QAQS_EMiCMaCE{@EeAKwBGqACg@?ECa@I_BCm@IqASiECs@YwGEkC?q@A}ABoC?a@FsD?YFwDHqEBqADqBFwCDiDH_EF}DHaEJuFNmJHgF@_B@_A?{CAaAAy@ASASCm@Co@AWGeAC_@G}@IgAOsBEo@CSSuCAUCUSiCSmCC]_@oE]qE]mE]wEW_Ee@_F_@aD_@_Cq@{CK[e@eB{@eCGMWm@g@eAg@}@_@k@OUa@o@s@eAk@o@u@y@y@w@k@e@a@[w@k@s@c@i@YwAs@c@OgAa@oC_AcCy@wCaAoC_AyBs@oC_A}Bu@SIkAa@_Bq@eAk@cAo@s@e@y@q@}@w@g@c@w@q@}AuAk@g@iAaAEC_A}@cBwAcA{@MMMKqAiAe@k@s@k@g@g@yAsAwAmAcByAIIIGUQwCkCuAkAGIqAiAmAmAYYUWAA?AMMQSU]W_@]m@ACQa@MY[{@a@uAKc@Q}@G[a@cDIm@Im@Im@Ik@Im@S{AS{AOoA]eC_@{BWeAKc@s@wCIWK_@a@}AOi@aAkD_@uAOi@_@uAAAI_@a@uAOk@_@sAo@_C_@uA_AiDEQEQo@_C_@uAaB_GiAgEGSEMg@iBW_AQq@y@uCgA{DmAoDKYg@yA}@aCKUKWsAyCu@{Ai@qAk@oAe@eAUg@iB_EcRab@i@mAiB_E}@sByEoKw@gB}BgFqCoG_@y@[}@mAaD?AOg@gAsD}@yDGSy@aECSCSe@}CCOS{AIg@W_C}@uHE]Gm@w@uG[oCCSa@cD]}Ck@wEYeC{AmMQ{Aa@iDCSCS_@wCQ}Ag@eE]_DYcDc@sGQeFG_B?CMyCA_@O}DKmCeAuYWyGCq@SmFMwDUuGE{C?sDBmBFwBFaAHwAVwCToBz@mGlAwHp@uE`@gCPiAL}@Jm@`@gCTyAnAeIh@eERuBN_C@KBo@F_B@[D{B?e@@mAAQAcBEyAGsBGiAGeA]mDa@aDo@oDCMs@aDsDyOk@aCESEQ]wAi@aCmAoFeDsNQu@?CiC}KuBgJcCkK]wA]uAI[o@{BGQa@kA_AmCa@cAQe@sBwEiF_K_ByCwAmCGKGKkCaF}AeDcAmBeAoBAEm@gAyAuCQ[[k@]o@OYk@eAKQKQm@iAIQKSi@eAcAyBq@oAk@iAMUMSm@iAUc@GKOWUc@e@{@GKGKcAoBUc@m@iAUc@eAoBuAiCGMGKoA_CYk@S]mFyJOW}@iBWo@Ue@Um@s@sBACYiAK_@Ka@Q}@Ki@Mq@OaAMgAMcAIkA?EEg@GwACq@As@?GCo@?WAQ?[AeAOcLO_LC}AAo@C}A?KEcCAo@?Q?QCs@EgDEeDAo@C_B?SGmBC{@Ae@Ew@Ci@Eu@AMIoAASAQGu@AKKcAAKIu@Eg@CWYyB]_C]sB_@uBYuAKg@Kg@[oAOo@Qo@Qi@CKOk@]gACK_@eAMc@Yu@Yu@c@kAe@gAs@aB]s@_@u@{@cBi@_AUc@IKGKWc@c@o@{@kAy@kAA?y@iAo@u@OQg@i@_@c@_AaAOOOOSSw@u@KIuAsAKIyEsEyEqEcD}Cy@w@mAoAmAsAg@m@MOs@_Ag@q@Y_@W_@eBkCyAyBuAsB]e@m@_Aa@i@i@{@Ya@kAcBkAeBsK_PgFuH_DwE_AuAqDmFoAkBm@}@yA{BIKkAeB_BcCcBoC_@s@]s@w@qBk@eBg@kB[_BYcB_@iCk@yDGi@G_@s@}Ee@oDQkA[kCc@cEMiB]kGIeCG_BG}ACo@?OC}@MoCMwCCc@MoCIqBA[AYKoCI}ACo@Co@EuAAGA]A[GkAI_CCm@Co@Co@Co@C[A]G_BG}AG_BEs@EyAI}AG_BCm@EgACo@AOC_@A_@G_BCm@Co@G_BAAI{ACm@I_BCo@ASCYCk@IkBCo@Co@KqBA[Co@Cm@Co@E_BCm@AQA]Co@AQAWCo@E_BM}DKoCAUEuAKmCM}DCg@?CCk@EmACm@Co@Cs@AUCWEc@Eo@Ec@AIGo@Gm@?AGm@I_@Mm@Kk@CKI_@Oi@AGQc@Qg@Ue@Ue@Q_@CEWc@IKm@s@y@s@WUa@UCAg@W[KSGk@C{@?Q@w@DOBoMnAq@HqAJc@DM@S?E?eBPkALyFf@eAJc@D[BoAFc@B[Bi@?WAo@Ec@Em@EYGmAW_EeBaAe@kBoAq@a@o@e@WS[[YWU[]a@[k@]o@a@{@Qm@M]EOOm@Km@WeBI{@[yCI}@G}@?AMmCGaAEmACk@EaB?UCuA?c@?iB?c@?cA?[@kA@cA?a@B}@BoA@}@B_BFmCBwA?GFoC@k@@q@D_B@o@@o@D{A@q@@m@@q@@SBkAB}A@k@@s@D_B@_A@]B_B@M@_@@qABo@B_BN_KTiLF_ETwK@cAB_BFmC?I@m@@MDiDD}AB_B@o@B_BBw@?Q@[@o@?KBmABm@B_BLiGByIKoDUcDKaAm@_E}AsHy@mCA?e@qASe@yAsCqC{E_HeLiJqOo@gA_@k@i@{@AEMS}@wAWa@iAiBgAiBSYEGo@eAMUIOs@mAo@eAo@eAi@{@_@m@KOIMaA_BgAiBeKwPU]kGuJu@kAS[qAgBKKa@k@iBsCiM_SqBsECGi@yB]uAOm@Ok@Kk@UoAWyAaFyYQaAEWWyAa@gCKk@WyAYaBm@mDWyAIi@AA_@iCUyA{@aFUyAW{AIe@AEKm@Kk@c@gCMs@uHqd@oD{TaBmKCI{@_FUmAIe@EUc@cCgAcGoAgIo@iEGY{@_FYcBYyAuAsFU{@EOmAcDYs@Ug@kGiOgAoDQc@WgAsAmFaBiIoAoGKm@gDaQCICOgAqEsAqEgAqCK]_@k@gAgBKOKOU_@o@kAeAmBS_@cHmNk@kA{@cB?AOi@K_@CKu@}BWu@WiAi@cC_@}AG[Im@EUAES{AKm@Im@E[ACIm@Gm@AQEe@C]I_A?CAk@Co@Ao@I}D?C?k@A_BAo@AoCC}DCiB?A?Y?Y?[CsBA_BMmLa@}a@UaIGuB}@eI]gBWyA_@qBGS_@uA_@sAq@_C_@uAQo@Y_ACEEOIQw@mB}@wBuBkFkDqJcGaOsHeR}GqM_DcGyAsCcAmBeDmG{IkQACuGaM_D{FcGcLKSaIaPsEiJuEuHqIuL_CgDsAkBu@gAqHuJ[c@s@aAaCcDwCaECCs@cAoCwDuFyHs@aAgBcCq@aAwU_\\s@aAi@u@c@k@MQIKeAyAs@aAgOsScB_C_DkEqDaFyHuKyAsBe@q@aCeDsDiFyBkEyAeD}BuGcDiKmAiFwFeTo@_CWcAGQQq@CGOk@k@iBUs@M]qAgDa@m@qPyRu@}@qA{Aw@}@u@}@]_@W_@SSGIqAaBqA}AoA}Au@_A[]MOIIw@aAu@}@yKsM[_@[_@oKkMm@cAgA{Ac@u@eAmBsIuOyBgE]q@e@}@Wa@CGaC{EUa@AC}@cBmAwBmEeIyAmCYg@CEo@qAa@{@OYIMeAkByAiCWg@AEyAsCWe@mAaCa@w@aDaGOc@oBsC[c@_CyCyBiC}DkDcA}@iD{CqCaC{@c@sAg@A?eAWeAWa@Kc@Ig@Iw@IQCEAKCgB_@eAUSEIEeBw@a@SyBcA{@e@OIqAq@MI_@Ua@S_Ai@_@U_@U{@k@iBmAUQKIyAw@]Ou@_@w@e@sA}@_@]SQYYu@}@_@k@IKs@wAa@cAe@wAg@{AWu@Og@Qg@Qk@Uo@[eACGQk@Mg@K]Mi@EOCMWmB?IGm@GaAA]CeA?]?i@?{@?mA?qAA_AE{@AWAWGk@Go@Ga@Ge@Kc@AGCOI[Ma@Kc@M_@KUGOSa@M[CEQ]S]c@y@MWk@aAs@mA[o@OYIKQ]IQKQS_@MSIOWc@IS]m@[k@Q[EGWe@CE]m@GMGKOW]k@]m@O[CEUe@k@kAiAcCQ_@[s@Wm@We@IM?A]s@c@w@q@kAEIiAgB_@m@a@k@u@gAa@i@m@s@k@q@e@k@MM[a@cAkAQUi@m@c@i@o@u@w@_Ak@q@Y_@Yc@o@eA[q@o@uAYy@Y}@Uy@YcAQs@Ig@UmACKQiAKo@AMKm@?AKaAMoAEe@CYEw@EmAE}@CoAAeAAoA?k@@]?S@i@@_@?A@_@B}@Bc@?ADk@Ds@Dk@?AHy@Hy@BUHm@@MNu@DUHi@Jk@H]FQ@MZmA^sA?Ad@}AXs@Xw@p@eBZo@\\q@Xk@Ta@Va@V]PYR[b@i@|@gA?AZ]r@u@\\]XUVUJIXQf@_@VQROh@]ZOv@a@f@Wd@UHEfAa@`@ORGZKZIf@If@KjBSBAl@Ed@EPCTAb@AL?fAC^?B?Z?bBFZBN@L@bD^~C\\~C\\hEf@p@Fn@Hh@F~@JpBRpFp@hBT`BR~ARH@d@H|Dt@H@|@HrBRfAHdAJdBRfAN^Dd@FxC^VB|BXNBhDd@h@Hn@HrATl@FnC^t@F`@BP@zCNnBCnAA~@?n@GNAh@G|@KLC`@Eh@In@KZEn@Mv@QbBi@p@Sp@Un@W~@a@~@c@f@Wr@c@d@Yt@e@r@i@VUx@k@lAeAhAaAfAaAJKp@m@j@i@XYfByAz@u@bCyBz@u@DEr@o@d@e@h@i@n@m@l@s@`@m@Ze@`@u@Ra@\\u@Pe@HSHWVy@Pq@R}@H[Ji@F]n@sDrAcIVaBLw@L_AJgAFu@Dq@?OB]@e@BaA@{@?o@@k@CoACeACm@Cc@AWASs@sKEs@Ek@QkCEm@Eq@K}AK}AO{BK}AoBqYc@yGKaBI{AEcAEkAAm@?YAcA?q@@o@@s@Bs@Bu@F{@D_A@ADq@Hq@LmANeALaALw@Jk@^sBRcAjA_FXkA?ANi@BId@_BRo@L]d@sAPg@d@mAVo@Rc@HSRe@N[r@uAt@sA^k@HQzE}Gl@{@^k@f@y@p@qAZo@Tk@d@wAL_@BIJa@VgAFWFYN{@VyALo@F]j@gD^uB@G^{BJs@RyABORiAPkABOHc@@CHg@n@uDDUF_@NcADa@Fg@NsAH_AF_AJqBB{@DqABq@BqC?I@_BBoC@cBByA@_BTmUB_B@uAAw@?m@Cq@EgAM}AEUIu@My@G_@G[Oq@Qq@_@sAESQi@K[Wu@w@oCo@wB{@sCQo@Mi@Oo@G[Gc@Q{ACYEg@Cm@Cu@Aw@@mABw@Be@?AB_@Fm@@MD]Hi@NaAFY@IHc@TkAXyA~@_FVoAF]Jg@Nq@P_ALu@Nw@Lu@Jk@Hk@Fe@Hg@Fk@Ho@Fk@Fi@Dk@JkADm@Fw@Do@Du@H}ADs@Bg@FoADiAHwBF_BB}AB_ADcBFuBFmDFwBFeDFiCDuD@gB?G?eC?_AE_CA[GaDAKGmCIuBKcDOsEIiDOyEAAE{AIoCGgBCe@E}AIeC?GCo@ImC?ACm@CcAAY?A?_@AO?WAiA?}AAU@Y?iA?S@o@?o@?E@i@DuA?I@Q@g@@a@D}@Bc@Bi@@ODw@FcAJqAD]Dk@Fq@BMLkA?ANuAJs@Hk@Ho@Fa@Ly@Fa@Ly@Fe@@GF]T{AHm@Fa@Lw@`@iCZsBNaARsAJs@Hk@Jo@XmBj@qD\\yBPoABIHm@Ju@N{@@IHm@VyAT{Ap@mEzAaKJw@NgAVcBTyAZ{BV{ARwAJo@Jq@Hi@DUNcAFc@@EFg@RqA@IPiABOL{@VaBPiANgAN}@BQD[N}@TuAT}APmAHk@He@Ju@BQRmAPmA@GPkABML{@F_@Js@PmA@EPkANaAHi@Jo@PoATyAJq@Jq@D[N_AF[TuABUTyARsAVcBVeBVcB`@eC`@sC\\}BPgAJo@Z}Bn@eEh@gDVkBPwAJaA@WFm@FgA@WBg@DmA?Y@Y?m@?q@?C?w@Aa@?SCu@Ao@Cw@Eq@Cs@Eu@?GCq@Cc@Cc@AKAk@G}@?WASCSI_BAOA]Em@?ACo@Ew@K}BC{@GeAEcAAWQqDI_BMwCAWEk@?CG}AAS?[IuB?YA[ASAc@A_A?i@Ao@?UA{AAmAAk@?s@AgAAeAAaB?m@A_BAo@?G?g@C{BCgDEgCGsDAKE{CGgCEcDA_AGeDEmBIqFCmBG}DG{CAu@Ck@Co@Ck@AKCc@?EEg@KsAAIGg@AEIk@E]EQKm@E[EO?AWkACIOi@a@sA?AQg@K[e@uAEIQg@EIM]Si@Qg@_@aAGMQg@Si@Qg@]{@?AM[EIGQUk@M_@CGSi@CG[cACEWu@K[m@eB]aAUo@q@gBCEQg@qBsFAC}AgEe@qACIcAsCSm@W{@IYYcA]wAEOMk@[sA?CUeAQcAQaAW{AM_AMgAa@iDaBsNa@gDeBmO_AcIOwA[oCm@gFCUCWc@yD_AaIeA}IoDaY_@yCq@oFcB{MWsBWmBKy@_@sCYwBQwAUiBWoB[iCM_AEa@YsBS_BE]QoAQuACQSuAKcAOkAEYMgAOgAK_AK{@QuAOkAQmAKaAM{@Q_BAAOqAMkAMgAK_AMqAOeBOuBQ{BO{BKyAMcBK_BCg@IiAYcEAg@GgAG}@Ey@G}@Cm@?MkBqYK}AO{BEo@?AGo@K}AK_BM}AW{De@{GK}AMsBEe@?GC]IwAAGCg@Eu@EcAImCEwA?c@Aa@CcB?{B?I?Q@wD?G?oA?_A?I@gB?mA?Y@aB@aA?Y@{C?_B?I@iC@_B@_B?yA@_B?sA@eA?g@?uA@{B?e@@aA@}B?}A@M?aC?C@{A@u@?oB?Y@gB?e@@o@?[?cA@oA?oB?M@qA@s@?iC@{A@_C?yA?iA@g@@uB?_A@oD?_@@mB@s@@iD?sC@S@iF?oA@oC@_B?}BByD@}BAg@?sA?g@C}@EmAC_AGmAG}@KiAC[Ec@Gk@U}AKw@Kq@[yBSiAE[UuAIq@ES[uBIm@EWUcBAMO}@YyAE[WyAEYg@eDSqAG[i@kDMw@SiASoAOeACSOcAEWKk@YeBEYEW]}BUyAKm@w@cFk@uDaAqGW}AKm@Kk@U{AKm@Ik@ACIi@_@gCKm@Im@Km@UyAe@}CYkBOs@E[Mw@AGIq@Gi@OaAMgAEg@E]Gy@Cm@AMCi@Au@AOA_@?UAcA@u@?o@?M@_@Bg@B_ABg@Ba@Hw@BU@UHm@?A@IFa@?EJs@N}@DOP_ARaA@CPy@No@T_ATaAFYNu@h@}Bh@_CDQTeAd@qB`@iBh@aC\\uA\\yAF[\\{A^cBDQp@yC@CVgANo@^cBT_Ab@mBDUR}@l@eCLm@`@iBl@gCp@}Cb@oBDOn@qCdAsEvAoGZmATgA^cB@Cr@_D`@eBP{@h@}Bd@mB^cBNu@T{@XoAFWJe@R}@VgATeATaANo@Py@R}@VcAF[R{@Z{APeA@I^uBP{ANiABYHq@Dk@B]Di@?GDg@@ODgAFyA@[Bu@@i@@UBsABq@HeEFgCB}@@a@B_BB}A@_@@W@U@u@DuA?CBo@F}CHeDDwBRmIPmIJ}DH_EJ}DDyBDuB@m@@i@Bu@Bo@@a@DoA@[HoBB_@RwCHcA@MLoAFg@Fo@Fk@Hs@j@gEp@eF\\gCHo@f@wDnBwNz@sG|@}GFc@Fi@Ju@Fi@Fc@Hg@D_@D]NmAFs@Fq@Hw@De@?EBSB[Dq@Ds@Bk@FcABq@@U@Y@a@@e@@m@Bu@?e@?GBiA?w@?w@?w@A}@?s@Aw@Ay@AE?]A]Ac@AYAWA]AYC]KmBGiAIs@I{@Ea@SmBE]Im@ACQmAWcBAGUqAi@{C[_BqBsJqAgGUcASaA[wAKk@mBaJyBoKqCsMuA{GmA_GQw@g@cC[wACKe@wBAAKi@Mk@_@cBI_@Mk@]wAEQm@}BM]KYK[m@_BEGsAwC?C[i@o@cAU]cBgCkAgBkAeBq@cAiEqG}BiDkAeB]i@g@aAWe@{@iBCIOg@Qi@m@iBU_AMk@c@gBQgAW{ACMWgCCc@I}AWmFAOGmDG_EAo@?S@{B?m@?ABo@D}ADiCBe@?EBi@JoCHeCb@uLRmFBw@HsB?QL}DF_BBo@Bo@HmCBo@VmIN}D@o@Bm@F_B@o@@K@c@PmF@]^mKB{@RqGL}DJ_EBm@D_BBo@Bo@@o@HmCBa@AM?o@?_@AOGuAIu@Eo@Gm@O}AYyCCa@e@yGEo@W{DEo@Em@Eo@Ee@Gw@c@iFOoBIkASmCEm@Eo@Y{DEo@Gu@SeCa@iFIgAOsBa@kFY}DYyDSmCAQGeAAEEo@Em@M}AGm@Eo@Gm@Gq@Gk@Go@MyAAAM}Ag@iFw@eIWoCEk@KkASmBUsBW{CAGO_BOaBOeBMkAOsAEWGg@O_AYgBOq@Mi@a@aB[cAAGeAwD[gAOc@w@qCK]Ok@_@sAK]}@{C[cAc@_Bq@_C]iAOi@uBqHc@yAa@wAI[_@sAQi@g@kBGSCIK_@_@mAOi@Ok@aAeDaAmD{@yCEOgAuDGWyAgFa@wAGSm@uB[iAOe@aAiDMa@gAwDMe@[eAs@eCAGs@cCm@wBQm@a@sAOk@Og@?Aq@_Ca@sAOk@_@sAGSY_AK[Ww@]}@GSy@wBSg@Sg@k@wAk@uASg@GQqA{CgAoCg@mAmAyC_B}DwAgD?AwAiDyBoFcBcECIgBgEcBcEqAaDwAkDu@eBiAsCg@oAWq@Ok@W{@UgAAMKi@Ku@E_@Ce@AcAAc@Ae@?U?S?E?W@]B}@@[?EBi@Bm@@M@a@Bo@Bo@Bo@FgBDuAF_BBm@Bo@@]@Y?M@Q?G@KBa@Do@Bo@@MFoABo@@]@Q@o@Bo@B_@?MDo@By@?CBa@Bo@Bm@?CBk@Bo@@e@JaCHsB?AF}A@U@YH_B?KLoB@QDm@BUDc@Dg@LcANaAJs@VsA@EVkA@ENi@Pm@`@oABIL_@DMRk@JUHSVk@DOP_@@ETg@@CVo@L[HU^w@x@iBXo@d@gAVm@Zs@v@gBRe@`AyBPa@x@mBDGf@mADKN[Re@Te@JUFQTe@h@mA@CPc@Te@d@gA@ETg@Re@Re@@ARe@Rg@f@gA@Eh@mAVi@Pc@Vi@Rg@@AXo@^}@\\w@Re@?A~@sBTe@Rg@FKLYRg@Xo@b@cAN_@BGTg@HQPa@JYTe@Rg@@Ar@cBFORg@Rg@L[DKRg@Xu@JYPi@JWFOPg@Ri@Xy@Vs@BKTw@J]Pi@DQHWPu@J_@Ty@TaAHa@@CJe@TiATaADUVsA`@}BBMV{AJk@Hm@TqA?GJm@DWBUHk@NiABSHm@@ELmA@IHm@?GFe@Fq@Dk@B[HaA@MHsAH{ABm@@WDaA?EBo@Bm@B_@HkB?CBo@F}A@OB_@DuADw@JeCBw@Do@?GFwA?ABk@@O@_@D}@DeABo@Dw@DmAD{@HeBFwAFcBBq@B_@B}@Bc@D{@Bg@Bu@@c@D{@Ba@JcCDgA@e@H}AFw@Ds@Di@L}A@CFk@Hk@Ju@He@Jm@?ALi@@IJa@H]`@}ARo@FUFSBIL]JYFODORg@LWDMf@eAP]NYFK\\o@b@_AVc@LSHOLU\\m@Tc@BETe@FKZs@Xq@Tg@DMX}@BEL[Ni@DMDOJ]H]Le@F[H_@@GJe@Jk@?CJm@Hg@@KL_ADa@D]@QFe@Bi@De@Bg@Bq@@GDsABy@@q@?c@@oAAaA?I?u@?g@A_B?G?_@?o@AwB?W?W?oA?OAuB?iBA{CAsA?M?eAAmB?kB?S?gCEkB?y@AKAq@C_AEu@Em@Ek@C_@Gs@Eo@Ga@AKEWKi@Ig@Kk@GYK_@I[Oo@Sw@?CUy@U{@Qu@Me@AE?C]mA_@yAES_@uAU{@g@mBIYc@eB]qAc@cBc@_B[kAU{@Ok@]uA_@uACG]uA_@yA_@uA_@uAK_@W_A]uA]qAU{@Ss@I[WcA[kACI[kAESYaAGUIQSg@GWW_ACKU{@[kAe@eBGSYgAEMMg@Ok@GYW}@AAa@{ASw@W}@U{@Oi@WcAACQu@Ia@CKa@kBMy@E]Im@AQE_@KcBCw@Ca@?w@?u@?o@?S?cA?w@@aA?{B?s@?k@@QEoBCs@GeAEe@Gg@Gg@Is@AAM_AQaAAECKAIKg@WmAIc@Ia@SgAIc@Kw@K{@Ea@Gq@AWGu@SyDOqCIsAM_CI{ACm@MsBI_BE{@IqABe@@Q@e@@II}AAECi@GgAKuBCc@?IEo@GsAAKA[KqBCWGmACg@AUEy@E}@ASA[IsA?IGcAGiAAMIeAIy@CWIq@Ky@O}@Ms@Ou@Ia@Oq@U_AMe@AEOi@Ma@CGIWQc@Qc@O]Qa@CG[q@Q]OWUc@S[We@EEKOSYMQQWMOQUg@m@a@c@SSSUUSg@c@CCQOc@a@c@a@g@a@USi@e@k@g@g@a@KMu@o@_Aw@e@c@IG{@u@wAoAi@g@w@q@q@m@e@c@m@k@WWUSiAaAeAaA_A{@EEYWo@m@m@q@UWAAY_@_@e@S[U[CEOU]k@Ua@[g@c@{@]w@M[k@uA]{@]aAM]g@wAUm@q@mBk@}A]_A}@gCy@}BEM_@cAQg@CEi@}AKWK]g@qAK]Qg@[}@m@cBAAy@_Ca@iAISa@kAa@kAg@wAKYSm@Uk@g@uAOc@GQg@uA[{@GS[{@AAYw@Yy@O_@Y{@Si@c@mACIYu@GQe@qAM[CKe@qAK[EKSi@[{@m@cB_BmEAEg@wAk@sAWa@c@qAg@uAi@{Aa@iAk@}Ag@wAW{@Y{@Uw@WaAUw@WgAScAUcAO{@Q}@SqAQqAK_AOkAIy@KcAIy@KaAG{@Gw@Ey@G_ACq@Cs@Aq@A_A?A?iA?aA@s@BgA@U@c@Bm@Do@Bk@Fq@Di@Fq@BMDe@LeALs@DWD[N{@R}@TiAZkAf@gB^iAFSZ}@FS^gAL_@Nc@Tm@L_@BIL_@Vq@L_@Tq@L]To@@C\\_AXy@Tg@BGZq@Xe@Zi@Xa@T]NSRWJMn@u@x@y@p@q@\\]BCnBmBDEr@s@TUn@m@h@m@r@w@BGT[JQRYd@w@DK^w@\\s@d@qANc@Le@DQBKH]BKRcALw@BMFk@Da@BSBYBOB_@Bg@@UBm@@a@?C@k@?]?Q?G?m@Aw@Aa@A?C{@ImAKeAMaAIg@AKIc@Ou@Ig@Mq@ESQ_AGYGYCQUmACKI_@G_@Q_ASaAKm@Q_AMu@AAOw@[gBQ}@Mq@WuASiACOQ}@GYO}@G[I_@GYQcAI_@Kk@CQG[GYKk@Ki@Mg@Ic@Ka@AAOq@K[M_@Oc@Oa@O]Se@Q_@[m@Q[OWIKMUOSW]a@e@a@c@Y[YWYUYWYUYWc@[_@Y_@WYS[UOMUOKI]Wc@Y{@m@[UYSk@_@m@c@_@U[Uc@YWSWQ]WKGMIUQWQc@[UOEEUO[W]U_@Ug@Ya@QECc@Qg@Qu@UsA[u@S_ASo@Ow@Sk@Mo@Oi@Og@Q]Ig@Q]Oa@Oc@Uc@Um@_@i@]m@c@o@g@i@i@YYa@c@Y]e@q@U_@U_@Wg@Q_@Wk@]{@?A[{@[aAUy@[cAOi@Uw@[aAe@aBMa@Qm@a@sAg@eBg@cBYeAY_AQi@I]g@aBEMa@wAY_AMe@Mc@Me@Ka@Mi@S}@Mo@Ga@Ii@Ii@Gs@E_@Ea@Ec@AO?ICe@Cy@Ck@Ao@?s@?}@@q@@S?UBo@Dq@Ds@F{@HcADm@De@Dg@Fq@B]D_@B_@D]B]Ba@D]Fu@De@@Q@KFk@F_AH_AJoAH_A?AJkAFu@BUDc@HgABSDo@JuAH}@Dc@Da@JiAF}@B_@LqADk@Di@LyAJqAHaAFq@JgADq@Dc@JkAHaANeBF}@Fi@L}A@IFu@Do@Dg@Fu@JeAFu@?GJkADu@FaABs@FqAB{@@]@m@Bu@@k@@q@@_@@k@?u@?m@@g@?{@?c@As@?m@Ak@Ae@As@Aa@Cc@A_@Cc@A]Eg@AOC]Ce@C_@Eg@Ea@AMCUEa@Gi@Eg@Is@Gg@?CE]M}@COIk@G]Q{@Ki@Me@Ka@Ma@CIEK_@y@KUIQKUGMOWMSCEMS[_@Ya@WUKMEEYW[U[Uc@Wm@Yi@Uu@Wm@Sw@W_@Mk@Ss@Ww@Wa@Mm@Si@Qu@W{@Yk@Si@Q[Ic@Oi@S]MGCi@OWIWGCAICa@IYIWIWIEA_@K_@I_@KWIA?g@MWGQIUEUIA?_@K}@W_@K_@Kc@K[Ic@Ma@K_@KOEMCk@Qq@Qa@Ii@Ok@O]IEAe@Ka@I_@I]GYG[GWEWEYEMCGAWEUEOCOCWG_@Ga@GoAWYE_BYk@MSEq@UcAe@_@Sm@g@y@w@q@{@_@i@k@{@o@eAIOiAaBg@q@e@i@m@k@?Ak@a@u@a@IEc@Ky@KE?c@?}@HC@a@HaA\\[Pm@`@UTSP_@d@u@dAMT_@j@}@rAGHi@z@y@lAABa@f@o@v@SRUTaAp@}@`@{@R_AJmA@oAOUGEAi@QSK_Ai@[[GGAAq@y@CEYc@S_@AASg@Sg@Sw@K]AEO}@YoAKo@Ky@c@qDIaASsBSyCAOC_@OsC[_HGeCSaH[wHAQAo@QuECiC@{AP_C@[DQr@sEBMLk@dA}EFUDU\\wAh@aCVkAR@DsAH]Nk@Lk@Lk@z@mDLk@hAyEx@oDLk@Pq@XiA@E\\sA`@wAf@mAh@oAn@_BnAgC^u@f@s@Va@Xa@Xa@JMVa@DGp@s@\\]Z]v@y@bCgCnAgAt@g@f@_@TKPIdAg@vDiAPGlBe@nAa@x@YlCmAxAmA`AkAhAmBl@yAf@}AFUvAeFr@cCDQxAiFPm@ZiArAmEFOlBeFDKb@_AVc@P_@|@qAdCcD?Ar@_AjA_BTYDELQp@aAXa@n@_ABEz@yAr@kBj@kBd@gCTcBJm@Ho@^{CBo@~CkUnAoJbBkMR{A@APkA?AHm@@CBSR{AP{Al@sEBQj@sD?A`A_F@Gl@}BLa@Ja@IY`@yA?Aj@kBDQb@oAh@}Ah@wAh@sAj@qAl@qAd@_A`@w@bAoB~@gBBG~@gB`AkBbAmB\\q@`@w@bAmB~@iB`AiB|@gB`AkB^s@^s@r@uAJQ`@w@^s@~@iBDIFMLUZk@Zo@Zm@HOTc@\\m@BEr@wA~@iB`AgB~BqE~@kB`@u@\\q@NWbAoBl@kAJQHOd@}@r@wABEx@{Ax@_Bv@}Ax@}Ax@}Av@}Ax@{Av@_Bd@y@Ra@x@_Bv@{Ax@_Bx@}Av@_BDK@CVk@^{@\\{@Z}@\\aAZgAZeAXiAPu@Pw@Nw@Nw@Fa@Hc@Jq@BS^kC@EL_ABOPsA@IHe@Fo@Da@@OFo@Bi@Ds@By@?]?[@IA[?_@Aq@Aa@?KAKCs@G}@I{@I}@ScBQiAQgAQw@Qw@Sw@Su@Oi@Sm@e@yAWw@Uu@Uw@Uu@m@iBm@iBe@sAQi@Sg@Yu@Yq@]q@]m@]k@W_@EIIMc@g@a@g@qAsAYYi@i@_AcAGEY[]]CAu@u@MM}@aAIIu@q@CEyBwBaA_AMMq@m@}@}@ECy@y@GGq@q@[YUUiBgBu@s@s@q@kBcBo@g@o@g@o@c@SM_@U_@UAAe@U]S[MCA]Oa@O_@O_@O_A[aA[_A[qAc@EAuAc@m@Sk@Sy@W[KUIUIm@QuAc@wAe@wAe@GCYK_@Ka@O]MSIQEAAWGUGm@SGAOGSGOEMGe@O_@MgAa@c@Oc@SeAe@}@a@_Ag@yBqAa@W_@W}@m@GEUOc@]e@_@UUc@c@c@c@y@cA]c@Ye@EG]i@a@s@c@{@c@gAa@eAWu@_@kAUq@KY]kAIWWu@_A{Cs@}BCEg@aBCEk@gBGQ[aAa@qAc@uA[eAEMY}@a@mA_@oA[oACGGa@Mk@?CIk@Iq@Gk@Em@Ey@Aw@?w@@}@@KBs@?MHcAHs@NaADWJc@Rw@XaA\\{@d@cAf@_Ad@w@lA_BFKx@uAl@_AdCoD|CwENUVa@Xc@DG\\i@~@wAhAcB@AVc@LSb@o@PYnAqB@AbAiBR_@BCrDmFHMfFcInAqBz@uApByC^k@hAgB`BkCb@q@pAcCf@aADGp@iAf@aAnByEF[d@iBTkAVuB@MLcBFwA?AAsBEgDAq@S_HEwAOuFK}DEgASuHK}DCc@MkECm@YcEk@oD?EqAmFy@oCuAqEQm@cB{FsAyEo@yBsAaFmAiEMc@m@wBe@uBi@{CEe@Is@IwACaAAmAAs@@oADyAJ_BReB?EPwAl@yD?AfA_ID[b@{CD]^kC\\eB\\gBf@aBh@aBDIr@wAr@mADGz@uA`CgELS~@{Aj@_ALQHK~AiC`BuCVc@FMLWn@uAP[Vc@?Ad@eABENi@FURaALm@^}CJuA?c@@{AKaEQcBYsBSy@Q_Au@qCaA{Cm@cBACi@sA_AqB_AgBIQqBmDQY_BqC}AkCcBsCeAkBWc@}DsGw@uAeGkKg@y@yCaF_C{Dg@{@uAaCIMsBqDgGmKCGqBkDgAkBo@gAMUmE{HmBgDuCeFqDgGmAsBuHoMyAgCqCaFOYa@i@u@aAq@{@]a@[]u@{@]a@Y_@wAgBkAqAoAyAuAoBgAwByAaD{@kCACo@wC]mB_@wBe@sFAEM{BC_CEaCAUEsDAuD?}AAm@@qC?oF@c@E{CO}P?YO_DYyC]_CMeAi@qCAIe@gB_AuCEKaBaEmBkDCCkBcCW]s@aAg@m@s@m@aB}AyAmAMK{CsBWQeDyB_Am@IEyAk@eCcAcA_@mG{BA?sE{A[KcBs@eBq@kAe@{@]iAa@mE{AcDkAg@QcA_@eC_Aa@Oa@OcA_@KCKEUIMG[Mm@WaA[s@Yc@YMImAq@cAu@wAqACEEEEGe@k@Y[i@w@IMQWOUW_@i@}@_@u@OYi@gAw@kB_AqCMc@Sq@CMiAyEI_@Ia@A?YwACKU_AQw@Ok@y@mDk@cC{@kDeAuEWcAY{ASeAU{AKq@Is@MkAMcB?AIgBAMA_AAsA@cA?G@g@BiBDsA?IBq@LuDBk@LoDBe@NqE@S@KB_ADeANaDNyCLsCLoCJ}BFgC?aA?wA?u@?UGkE?i@Ao@?AA_@EiC?u@AsAG{CIwIGeFEeDG_DCuCGkDCeDIiGGiCEeCAkCGeDGmCOiKAw@A_BM_KAm@CeDEkDGeDAgAMqICgDGqDGqG?ECwCC}B?QGoAEw@]oEWoBYiBy@{DoAsEIQqB{E]q@[g@Ua@QW{@oAgAyAa@g@mA_BuAgBiAyAW[}IcLu@_AAC{DcFu@_AwD}EY[o@{@_B}Bw@oAm@iAWi@c@cAEKCISe@Um@}@eCM[K[ACo@iBqAoD{AkESi@u@{B_CaH{CaJuBiGiAgDiAkDa@gAaBiEOc@kAiDyAoECG_@cASm@oEaMgA{CoE_MUo@}AkEkBkFk@{AiCmHcAqCsBwFaCcHiA{Cw@{BCGyAaEqBuFGMSk@o@iBmAkDk@iBk@{AGOYu@aA}BaAuBCGy@aBiBaDw@oA]g@_@g@[c@eAsAUYaAmAaAaAcA}@aAu@]YIEWQaAm@SMuBgA_@QAAyAm@e@SgA_@OGyAg@aBi@cA[mDeAeBi@IC{Ae@eA]qGuBSGs@UeCy@a@MiBk@cBi@kC{@cDgAaCy@IEi@Us@_@q@a@q@c@A?q@e@q@g@o@k@e@_@WYKIuAwAq@u@o@w@m@y@k@}@c@s@GIg@}@e@}@g@}@Yo@IOUg@y@mBu@sBWs@i@}Ae@}AUq@a@_BK_@UaAS_AO_AQ_Am@sDa@gCE[cB{Ky@kF_A{Fg@{CIe@y@cFk@_Ek@kDAIi@eDi@eDOcAKo@oA}Ha@cCm@wD_ByJs@mFCWACc@gCa@cC_@gCw@eFCKu@uE_@iCm@uDWaBi@iDa@uBi@eC_@uAGS_@mAk@_Bk@wAkAkCAE_AsBgBaE}BaFMY{AgDsA{CcDmHEGwCkGkAeCyCcHAA{DwIm@qAGMoB}E?A{@gBsA}CKY_@_AQc@c@kA_@sAEIESGW]{AS{@Gc@UoAG]QqACYC[Ci@CWEo@A[GcBAy@CoAB_A@cBHuBF_AHw@De@Hw@J}@PkABMF]P{@b@uBf@kCF[^cBb@sBlAkF\\{Ah@_Cj@cCZwAPw@DSDUBIJa@ViAZwAb@kBDSNo@lAuFnAaGR}@b@qBb@cCH[?CJm@Ls@TaBJy@PaBH}@H{@Dy@JiBBq@@o@?K?CBsB?eA?qBA_@E}AAo@?AEw@IoAQqCAOYmDEm@w@yJGw@C]IeAO}BOoBQ{B_@mFGm@Gy@Ec@COGg@Gg@QqA?EOgAMo@YqAGUCIs@kCIUMe@EKEQ]gAM[_@gAo@qAc@{@w@{AWc@sBuDWe@Yi@i@cAo@mAyAqCcAmBgC_FyAsCqB{DqAeCGM{AuCaFsJaAiBo@oAqByDyAsC{AsCqByDqByDm@kAuDeHi@aA[m@_@s@y@_BmG_M{@aB{AgC_EaIy@}AuBiEYi@_AeBq@sAm@iAwC{Fm@kAo@kAoAaCMWu@sAc@}@u@uAO[m@kAq@oAy@yAGKkBwDo@mACEoAeCEIk@iAeAoBm@iAQ]uGeMGOqAeCyAsC_ByCQ_@cAoB{AuCKSeBcDoCmFsAeCuJaRiD{GWe@eEgICEIQeGmLqB{DoByD{AuC_AkBo@mAsBwDk@iAeAoB?AUc@yAsCACmByDoB{DoAeC_@u@_E}H_@u@m@mAmBwDWg@eFqJqLaUUe@kF{JoCkFGMyBiE_CoE}CcGyFyKEI}@eB}CeGSa@gAqBwDgHACyBwDc@o@}AwB_AkA_AiAKMgCiCQQECmCyBg@_@OKSOuAaAoAy@QKy@e@gAk@qAm@QI{BaAgAc@eCeAyEmBUIwH}C_DqAYKqEiBe_@gOuDwAGEwCkAiBq@CA{GqCsB{@c@SUIuEiBa@O{EoB}GkC_Bo@kDqAA?MGaIaDiDsAcDqAoKkEECkEcBeBs@mBw@UKsGgCcEcB}B_AmBw@yOoGiEeBeCcAe@QaBo@gDsAk@SsGiCQIeBs@aBq@IC}B}@qCiAeHqCgEcB_DqAkAe@gOiGuBy@uDyAaHsCgDuAcDqAe@SmGeCiAe@eAc@}CoAwAk@qBw@gDsAOG}F_CeAa@iFuBcFqBg@U}BaAi@Sa@Q_@Qa@Oa@Qi@UKEICWKa@QUKICa@Qa@Oa@QoAg@u@YKEw@[a@QeCcAyAm@IEKCgDuAiKeE_EaBoCgA{EoBu@a@_@OA?_@M}@_@}@_@EAiEcBaAa@mHuCuL{Ec@QaBo@aDsA{EmB}CsAqGmCeGgCa@QeCeAq@Ys@YiFuBOGgMcFoHuCyN}FyKkEcDoAcBq@kFwBiFwBaA_@kBw@{Am@aKaEaHuCGCaDqAiBs@yHyCs@WiBs@kKsEmH_DcAc@aGcCkAe@gCaAe@ScDqA{D_BeIcDy@[}EoBqBw@qFwB{KmE}Aq@eDqAgBu@g@Q_@M_Bs@g@SwQmHECa@QcHwCICiDoAeBo@OGu@[aBq@uCiAwCkAIEcDuAiCiAQG_EeBaFoBWK_DuAm@[w@]CCkBcAuA{@YQy@m@CA_@Q]U_@WKGSOw@g@_@W]We@[wA_A}@o@MI_DaCw@g@gBuAuAaAcAw@aDaCo@e@qAiAqAcAqGiFMKKI_CcBoA_A{BcBkA}@{AcAy@i@iAs@MIKIe@YwAy@c@Sw@a@CC}Ao@_Bk@QG[MoCw@a@Kc@I{@SQEIAYGICq@KMCSCwBYWAq@AKAA?G?}A?o@?gABK?W@eABiAHgAFgDT{Kt@gCPuE\\c@DkBLSBs@DiBLoCNoBL_@BQ@SBcDV_@B{DVaAJ{AJuGh@kC\\gB^eB`@eBf@cA\\cA`@[Lg@Pw@\\_N~FQHaA^GDE@MFsAl@uF`CuB~@cBv@oBx@a@P_A^c@P_A^gBl@A?{Ab@_B`@{AVC?aANK@mALe@BI@I@M?K@K?cABA?gAAI?uAGaAEu@IEA_AKiASkAUYGq@QSEw@UKCKEUIM?]Ia@Ms@Sc@KcAYeAYuCw@y@UeAYSG[KSGGAEAyA]iBc@i@MiCs@cCm@mD_AiEgAg@MeAY}EoA}I_C}Cy@oCs@wCu@yAa@_AUuCw@y@UKCKEQCe@M{@UkEkACAaBc@a@KcCo@[IaAM}@UyBm@oBg@gAYo@Sq@SaBa@aBa@aBe@}@UuAa@uA]oDaA_AWkD}@_EgAOCw@UyDcAaPeEwFyACASGOEMC}Cy@WGm@QkCq@a@KwGeBcAWgEiAoGaBqPmEmEkAoCq@kA[qGcBeAYUGKCeAY_@KA?eA[a@Kc@M]KC?yI_C]Ig@O}Cw@uA_@a@KWIGAgD{@GCkA[_Ba@qCs@o@O_Cm@cEeAg@Oc@KqKsCyGgBcDy@yCw@gHiBoEmA{Bk@gBe@oA]WGg@Mg@OCAc@KQEm@Oc@MkD_AKCmBg@{Cw@wCu@uLaDqBg@SG{I}BmA[c@McCq@aFoA{Bk@mGcBmA[g@Ma@MsCu@qCs@QG{Cw@QE[IICmA[QCEAa@K_@KA?sDo@eBWc@IeAQqAUw@QCAa@KUGwCu@gBe@yA_@sBi@oA[oAUsAUy@Km@G}AI}AEcABaA@u@DuAJg@FkAVm@LuBl@G@w@VKDODCBaBx@MFiB`AmAp@EBiCzAoIvEuBlA}DvBo@\\cB~@MHa@RsAx@kAp@cDjBuDtBiDlB{AbAk@f@k@l@k@t@]n@Yj@EHSf@_@fA[jAc@fBaC`Kq@vCQt@aA~DmAdFYlAAFOn@iAlEGV_@rAa@hA]z@CFIXs@pACDIJOTc@l@_@b@_@Ze@^CBSLkAp@uAf@k@Ls@LgAH]?u@?OAc@AEAu@G}Dg@eAMaG{@KCWCyDi@_Dc@oAQ}ASKAiBWMCcDe@uAQaDe@iBUc@Ec@GeAQyAWq@SWGaA_@KGiAi@YOwEiCsBiAqC{AmDsBgAu@}@u@_@]YUo@q@u@y@y@gA}@sAwAiCCEw@iBc@uA]qAWmAUuAOcAEU[_CYyB[}BmAuI\\`DYwBU_BO_AK_AMsBKcCAwA?{A?aDC{@KqBKwAUiCOcBEa@MmAAQGs@IaAGeAMeDS{FY{F]iBS}@YwAACMWk@w@iAwAiEaFw@_A_Ay@q@i@QIOIEAKEQEOEa@ESAS?S@SBw@N_@FWFiATqBj@g@N{Ad@k@RoB|@wC~AYPuEhCsC`BoFtCmAp@{@d@E@{@`@}@Z{@Tw@L_ADm@@{@AkAGc@Em@IeASg@McBk@q@[IEoDgBaB{@IEyAy@s@a@kAw@_As@_BmAiAaAeBoASM}A_AcAe@y@_@iBu@mAe@oBw@qBu@uAk@eCiAgAk@wAw@SMy@e@sBiAiBeAsF{C[QoC{AIGw@c@WOeAi@GCiAk@{B_AgC{@uAa@iCo@aCm@iCq@aCm@eD{@wAe@_Bo@sEoBo@Yc@SwAq@_EuBiCuAaCuAeSsKyAu@iB_AeAk@OGsDiBm@[MGw@e@wDeBaAm@kAaAq@g@k@k@MM[]]c@Ye@c@u@MUGKs@wAe@}@c@{@MWMU}A{Cy@aBg@_A}EuJ]o@yAuCAA}A_D[i@qAkCe@}@wAgC[g@GM_@e@c@k@YYs@k@USo@e@YSgAk@e@Sg@Qg@MOEIA[EgAQcBM_ACMA_@Cw@CaDOkBGgAGoCKi@CK?cCKIAm@GSAE?gASu@Sm@Uk@Yu@c@iAaA_@c@e@m@[c@w@qA]q@GMGOCEKUACOe@Sm@M_@o@wBSs@[gAY_AUaAMq@SmAKs@Kw@mAoM[aD_@wDg@iFi@gFGq@a@}DQ{Ai@kFgDk\\KiA}AiOyB}Sy@uIYmCQiBMgAQmB?EIeASwB_@{DKy@w@}H]cDKeAGm@s@wGi@qFE][gDwA}M[eDM}AGo@QiBEc@Im@Gm@AEGi@MgAQkBi@wFe@mEi@oFs@kH{AeOO}AGo@WmCIm@Go@Gm@SkBGm@Go@SqBcB{PcA{JCOy@aIkA_MU{BO}AYkCGo@UsBCWO}AMkAYiCGa@Y_Ce@qCOs@S{@Mk@Uw@YeA_@oA[aA]_Ai@qAw@gBg@cA[k@s@oAq@eA]c@Wa@k@w@q@y@s@u@q@q@EEk@k@sCyByEaDwA}@_Ak@k@_@q@c@_@U_@U_@U_@Ws@c@k@]aC{A{DcCcBgAkAs@sEuCYSoBoAMIa@U}AcA_Ak@_@WgEkCyJgGqH{EwA}@OI_@Us@e@qBoAYScAo@oFgDiBkAoBmAqBoAuBqA_Ao@qBmAcAo@yA_AsBsA{BuAaBcAa@WwCiBo@c@c@YQI{AaA_DoBwIqFOK}E}Cm@_@QM}ByA_BaAyFoDoAy@s@c@a@W]Uy@i@e@YKIMGUOaAm@]UAA_Ak@QKOKCAmAs@QKmAw@MIoAy@QMmAw@MGOK_@Uo@a@c@Ys@c@KG}@m@qAy@sA{@y@g@QMkAu@MIoAw@a@WMIKG[Sw@e@SMiAu@IEsA}@uA{@wA}@{A_AwA}@}AaAA?cBgAICoAy@_Am@}AaASMyBuAuA{@}AcAkAu@OKmAu@yA}@uA}@wCiB}ByAyBwASMkBiAcCyAWUYQ{@k@OI_Ak@KGqBqAm@_@q@c@_Am@_@UmAu@eBgAgBgAyCmBqCgBcC}AmBmAuBsAuBqAsA{@o@_@oBoA_DqBeDuB}D{BwA_AiCaB_F_D{A_AaAo@OK}LyHeDqB}HiFgEkCcEkC_DmBcDuBs@c@_BcAcAm@{@k@mBmAQK}@m@oAw@yBuAkBiA{CoBeC}AcDuBSMcBeAg@]m@_@k@_@uEyC_F{CkCcBaGuD{E}C}E{C_Ak@}FsDMGqCgB_BcAsA{@iAu@_JuFk@]qIoFyCkBaGwDeLkHqEqCe@YaAm@}AaAg@[{AaAWQeBgA{BwAg@[mAw@YOUO[Qe@[s@g@_BaAgHqEsK}G_F}C_@WWQGC]U_@U_@WUOGE_@WMG_@W_@U_@U_@U]UAAgAs@}@k@w@g@o@a@uDaCUOmFgDQK_Am@sA{@]SAA]SgAs@o@a@OIeRsLkDwBgAs@_Am@_@U_Am@QK]WKISMy@g@_Ak@gHqEUMu@e@sA}@e@[y@e@g@[CAYSsA}@MIq@c@cAm@mCaBm@a@aDsBoEsC}DeCgFcDaAm@uCkBgEmCgBiAiBiAaAm@iCaB{CoBoCcBcB}@_Ag@}Au@wBaAyB_AmB{@gCcAsB_AeCeAsB_AaCcAmD}AkBw@UKwB}@UKwAq@}B_AcCeAuB}@qCoA}CsAiDwAWKkAe@aAa@_@OQIQIuAo@MEaAc@s@YoCoAuAm@eCeAmCmAqCoAwB_AmBy@uAm@sAk@KGqAe@qAi@}@]oAa@aBg@yBg@{@OiAQmBYQCiCU{K{@gDUaDU{AM{@GeDUeGa@aBMs@GoCUeBMm@GgDWqCUuBQaDQyBO{@Iw@GsBMk@Ga@Ei@EaAGi@C_BME?c@Ei@CeEa@IAmHk@}BQoHe@QAc@Es@E_BMaAG}@IIAeAGgAIe@Em@E{@GuAKmBOaCQcBMoBQ}BOcBO}AK_BMkBOwBO}AK{AKkAKyHo@iGg@gF_@aEYu@E}D[}AMgAKaBMWA}AIyBO_BQ_@Cc@E]CwAUaAMyHsBWImBm@w@]e@SSMy@_@iB}@oC_Bk@[cAq@yBoAUOy@g@_Ak@s@c@a@WsAw@qAw@{AaAoAu@uAy@{A}@uAy@uA_AcAq@[Wu@k@c@_@AAeBwAQOgA}@cAw@KK{@u@gB{AwAkAIIuBeBi@c@wAkAgB}AqAmAUQuAkAcBuA}AsAgAcA_@Y_@_@cAw@EC{@w@ECQO]Wi@g@QO[WACIGe@a@i@e@CCm@i@IG[]MKy@w@m@m@s@u@q@u@SSY]c@i@k@o@c@i@k@q@g@m@_@c@a@g@[_@CEWYOQe@i@?Ag@m@e@i@EEGIIIAA[_@W[QSIKY]QSGIWY[_@WWUWQSSYSW]_@{AiB]e@u@}@s@y@o@w@m@s@cBqBgAqA[a@c@g@k@q@WY_AgAUYk@o@}@eAeAuAu@}@y@_A}@gAgAoAiAsA}@eAcAmAeAgAiAkAiAkAQOq@m@UQQQEEc@]e@[KIc@_@uAeA}@q@]UaDcCgCmBaE}C}K}H{A{@aAi@_@Sc@W_Bu@a@O[MECa@OcAa@a@Ma@Ka@M_AYg@Oa@K_@KCAgA[KCEAGAeAM_@EC?c@Cc@CgAEc@CMAUAaAGE?}BGaB?}@?c@@E?]@c@Bc@BA?eABW@K?c@?}@@I?U@q@@O?q@B{@Bu@BcBFc@@u@?_BBI@kAFcABY@qADq@By@B}@BuBFsBFs@BgA@_BFcBBaBFoBHqBDcADw@BwAByBHQ?kBDwBFyBDoBDqBHwBFwBF{BHoBHiBBiCJyADO@e@@uBFwCLs@BoADu@BaBFgABU@gBB[?I?K?Q@iDH_AB_ADyDJA?c@B}AFK?cBDsA?gB@}BCaBE_CQiBSe@G_BUi@KqAW_AW_AU_H{BcDmAyAk@A?{Am@kAe@y@[ICIC}B{@uCgAyRoHwCiAq@W}B}@eAa@w@WgCaAgDqAy@YuDyAaA_@SIME}B{@u@YuBy@eBo@GCSIa@O}@]u@Ys@Y_@MmCcA]OeAa@oAe@wTqIuBw@cHkCWKqAg@yDuAmRmHkHoCc@QcJkDq@W}Am@oBs@CAwBy@{B{@MG_Cy@kAi@q@WoBu@eAa@uBu@m@W{By@MEuBy@c@Q_Bo@aBm@oBw@cBo@OIUKuDyAsAi@g@SYMKCgAa@CAMGa@O}@]g@ScA_@o@W_@M_Bo@eJmDeAa@oG_CqEaB}D}AuBu@_DoAeBq@gAc@]MgDqAeA_@{Am@yIeDWKICcAa@g@Q_Bo@mAe@{Ai@cK{D}CeAwAc@oBe@{A]{BYgQ}BuBYoAOcIeA}JoA}G{@eG{@mAOaAM_BSa@Gk@GeBW_@E_AMiC[m@IiBWKAy@MqAQ}@Ku@I{Ca@a@Gg@G]G_AKsASoAOgAOyAQcAMiAOkAOo@KaAM]EOC_Da@}AOq@G}AKyBGoBCiBA}DA}JC{B?eEGmDGsBGc@CO?gESeAGYCgBKwAQuAUsCg@mAYeEmAoAa@SIaAa@_CeASKoBeAqDyB_Ak@_DoBGC{EsCIEmJaGQIuAm@MEuBw@}@m@_@UIGw@c@eCwAuBuAgAo@_Ak@{CaBoAq@AAaB{@_@Qa@ScDcBKGqAw@cEeCq@c@mCyAy@e@SMkAq@qBmAWM_Ae@cBs@uAi@qAe@kBk@eBi@cBg@}Bs@gCw@wCaAyBu@gCwAm@]wA_AwAaASSSS_As@cF}Dy@m@_CgBiCcBaJcEmDwAqEmAqF}Au@UaC{@SG{CwAIG_B}@_Ao@SOw@o@mCmBYOWQIKm@s@cAaAs@w@u@y@}@gAw@cAs@}@UYMQOQqDgEa@e@UWw@_Au@}@[][_@w@}@]c@u@_AuBkCuB_DOUOUACuAmBs@aA]g@o@}@cCeDk@u@s@y@cAcAwA_BWYw@eAs@aAm@_AqAkBs@eAu@}@y@gAkAyAu@_AqAaBU[CCcAqAiB_Cg@q@[_@_AoAcAsAQS}@mAYa@Ya@MQw@qA_AgCIg@Iq@Ii@Im@?AOoCAQC]QgCGwCAqB?cA?m@?q@?q@?c@A_B@qC?M?oABaAJ_AJaAFy@HwALeBDq@Dg@JyAHaADa@DUHi@Jm@Hm@Hk@NcA@GFa@@MF[BQBQHq@Hm@L{@D_@F_@Ho@PqAHi@D]BUD[DYJk@Hm@Dc@@AFm@@ILoABo@@u@?ICa@Ii@G[GWEOIWKWISKQGMOQa@i@CCa@e@e@a@MOWSKIMIKGIGSMQKEA]UYMAAGCUIMGCAg@Qa@MKEQIo@Wa@Qa@Om@Ww@[_@Oa@Qa@Oa@Qa@OeBs@YKgAg@kAP"
                          },
                          "start_location": {
                              "lat": 40.7517137,
                              "lng": -73.9957489
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.3519217,
                                      "lng": -71.0550703
                                  },
                                  "name": "South Station"
                              },
                              "arrival_time": {
                                  "text": "7:50 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700355000
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.7517137,
                                      "lng": -73.9957489
                                  },
                                  "name": "Moynihan Train Hall"
                              },
                              "departure_time": {
                                  "text": "4:03 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700341380
                              },
                              "headsign": "Boston",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Amtrak",
                                          "url": "https://www.amtrak.com/"
                                      }
                                  ],
                                  "color": "#cae4f1",
                                  "name": "Acela",
                                  "text_color": "#000000",
                                  "url": "http://www.amtrak.com/acela-train",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 6,
                              "trip_short_name": "2254"
                          },
                          "travel_mode": "TRANSIT"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "iluwFj{rbMl@vUeKqGkEuCmAsAiHdErGw\\~N_e@tLk_@lLe_@tMs`CuByYy`@szAw`@ckDgy@aS{v@t`@uw@zu@ka@zh@qZg@w|@ieAkoB{bCue@wg@if@_Mgj@yj@s\\cpAwYohBu]yV{`@ol@ae@kgBmpD}uB}cB{_As_Bw}A}jGu`I}^azAco@amAmx@osBkvAcqAw]ifAswAy_CuS}gBei@ysBqHuhCsPcrAoSqn@qc@{_@iYa|@a]s`Awf@id@{}@qd@i@meDgj@upA_EubBu@qhBgOmbAyYkTqiA{r@wXyh@wgB}hFqZ{hCgE}~AnO_jA_b@wnC{o@ivAkg@abAcFggAcIc`A{\\io@gqAaaBc^_r@qIq|@kEcgAsC{q@uEcv@eKoLsi@hE{[wGqJ}Sc@{dA|CkeBoCk}@ug@{}@wdA}hBok@sjDorAgzEkL}fC_oC_lF}y@cjA}oAqbCqaAevAqgAulBieAmv@ed@kh@aFwh@ir@wjAuOmt@fJ{g@r]cYddAnGlgAlIvt@yc@~Swz@iIwhBfo@uzB}FakCrIikDpl@chF|He`C{GsbCgp@orCkj@gbFaR{kIqYo_Crm@_rCph@shHsa@a|Bcg@weA_IemApHy}BaZkxD}{@{aDen@o_BwI_r@zL}sAtfA_cDdJkfBzWc`AmM_kBcc@wkB}KqoBuc@cdAq~@edB_j@quBng@yvApIg_@cIek@eh@e_A{a@wPu\\_n@yCmwApH{dBeH{]kc@}Riz@qSuRyS_QdK_T|JsI_LEglBl]i~@te@_ZbS_n@|c@ueB|iAsrC`i@ckBaYcw@}i@{g@alAej@wXyy@vV_y@du@apA_@caAgVuhAw@gk@vQko@dO{W{Cim@{zAwjCed@aq@mNo{@{F_eAqa@cd@qhAmb@w[ew@{DepAeAqjCqAqjAkRuo@cbAaiBkiAwaDsp@}q@wgAcg@ufAsfF_u@}iBnMejAjOogAaL}mAadC{zEs~DmyHarB{iAmwCokAeaF_qB{jI{fDueDqiBkl@{J{qB|Yqu@lTun@}MgoFkvAkwEymAeaAoTwlAlc@ek@toAagAwAah@eToRq_@eNedBwS}Q_k@bVsXfC{c@sW}}Auo@_vAe}@er@{y@ml@{Sq{@gdIq[yzBmbAov@ahDivBoxKm`HiuCqiBygEuxBuaEoc@sqBeSq~@wk@ikAshA{nBkgBkaBaAssAtDesAsO}lF}qBw}Awl@{dCsc@{|AyI}xAij@gxDwpBs|A{{BpG}aBec@eT"
          },
          "summary": "",
          "warnings": [
              "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
          ],
          "waypoint_order": []
      },
      {
          "bounds": {
              "northeast": {
                  "lat": 42.3573044,
                  "lng": -71.056214
              },
              "southwest": {
                  "lat": 40.7569006,
                  "lng": -74.0005913
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "8:25 PM",
                      "time_zone": "America/New_York",
                      "value": 1700357100
                  },
                  "departure_time": {
                      "text": "3:30 PM",
                      "time_zone": "America/New_York",
                      "value": 1700339400
                  },
                  "distance": {
                      "text": "215 mi",
                      "value": 346541
                  },
                  "duration": {
                      "text": "4 hours 55 mins",
                      "value": 17700
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.35041529999999,
                      "lng": -71.056214
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.7569006,
                      "lng": -73.9902798
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "215 mi",
                              "value": 346541
                          },
                          "duration": {
                              "text": "4 hours 55 mins",
                              "value": 17700
                          },
                          "end_location": {
                              "lat": 42.35041529999999,
                              "lng": -71.056214
                          },
                          "html_instructions": "Bus towards Boston",
                          "polyline": {
                              "points": "siwwFffrbMn@b@cAxC]jA}@tCUt@CHCFEJKNEFY^MVMd@[dAM^GXMb@GXCLENCLCLKZGTWx@M^K\\e@`By@nCSt@e@|AWt@IVQf@Sn@g@`BIVm@pBc@lAg@|AcBlFI\\a@Y_@Ww@u@MOY_@c@u@m@y@OWkAgBKK[c@IMQSSSSSMMMMEEIEMKMICCAAg@]QKm@_@q@c@MKMIq@a@o@a@KIQKo@c@mAw@cBiAWQECaBiASMWQkAu@YQa@W{DiCKGEEIE[OQISISIOEA?KCSGSEEAKCe@COAA?m@EOAq@EQCMCQCA?OEOCOEMEQESKSIAAGEKISMYQQMeAq@EC_@WCAMICCWOUOSOe@[c@WCAu@c@ECeAk@ECUOc@UGCa@UGEIGCAECSOECOKCAc@Ye@[e@[i@]i@_@c@WAAwCmBEE[Se@[wDcCWSWQMG_BgA_@UIEa@Wc@W}@o@iAy@kAgAGEUUEGi@g@{@{@ACCAOMMMoCiBEC{AaAg@]_@Wu@e@w@g@eAq@c@Yw@g@{@g@i@]MIo@_@cAo@a@Ue@UGCOGQIYKKGWKWGc@Oe@O[IMCWGm@SgAYCAkA]KEKCSGcA_@y@Yk@UICKGSIi@Wu@]OGSK[OIEMIi@YMGc@W[SSM_@U_@U_@UYQc@[MIIGg@_@]WYS{@s@ECq@m@MKQOe@e@UUMM]_@i@m@]c@_@c@a@i@QUw@eAk@w@g@o@_@g@o@q@AC[[YWQOWSYQOKMGKE[MQIKC_@Mk@QoA[MEKAaEeAe@Mc@Kk@Oo@SKCA?o@W]MQIGC]OCAQKi@Wa@SAAs@_@KGc@UMIiAq@IGi@[o@a@k@]mAw@_Am@y@k@oAw@a@Ym@a@m@c@yAeAq@e@WSe@[g@_@o@e@cAs@g@_@_@YYSc@[gAs@s@g@e@[{A_Ay@e@_@UcB_A{Ay@UK]Sq@_@a@UOIUMYQ]USK]U[Sq@c@c@[g@]aCgBMIkAy@QMSO]Uu@e@UM[Q[Ow@_@WMOGo@Ya@Q_@OECUM]Qa@W]UAAm@c@_@Ya@[EEc@]WWIIa@a@i@i@A?sB{Bs@s@IIw@{@}@{@OOcAaAYUYWw@o@_@]a@]q@i@QQOMUQMKSOOMCCSQOKQMQMQMSOUO[WWQUOKI[Ui@_@YQa@[QMWQe@[a@Ym@c@AAWQ[UIGk@a@i@_@_@Ye@[UQk@a@MMu@m@OMOMUSKKe@a@OMWWc@_@]]c@a@ECk@g@[[][USGGIIa@]SQSQOMQQSSYWk@g@WUc@a@QOMMOMQQAAOMQOQOQOQMSOQMSMSMSMSMQKc@WYOOIWKGCKIYMIC[Mu@WSIUGi@Qi@Ok@MWGe@KUEo@OKAICkAU[Gc@Ic@IWGMCGCMCMCOCYGm@Kk@Km@MEAMCICwBc@}@Qq@Mg@Kg@KYGWGQEOGEAWKECSKKEIGECIGMIKIIGAAKIe@c@EEYWa@a@yAsAQOOOWS][SQKIWUOKUQSOa@[WQWO_@Se@Y]Qi@U[Oi@Se@SYKe@Oc@MYIQIy@Wi@IIAKAICMAQCOCw@KA?sAMYCm@CA?SAWAQAWAg@CW?o@Co@?c@Cm@A[AOAUCUAWCSCSCWEOCCAiAU_@Mg@OECw@[g@SIE_@Oq@WWMi@ScAa@CAy@]SGUGGCEACAUCWE[CMCqAOYEa@I]ESGKCKCSIQGSMSMIGKIKKOOQQMOMQWW]a@QS[]UUAASQKIWQCASMQM[Sc@YYQCC_@WUOq@a@WOAAGCQGSIEAe@OMEYI_@O]OECGEKGKIYSq@i@yBeByAkAMK]Yg@_@QOc@]{AmAkA}@UOq@g@KGCCc@[OKOMIIIGII?AGGIKMQMUMUMYISAES]OQGKUUQOWQWO[MMEOEQESCQC[CG?SCOCA?YGEAWIA?GEA?CAAAy@c@e@UQKGEq@_@ICSMSKSKSMUKOKSKSMSKSIUKWI{@UaAW}@UWGSGUIMCECSISIa@SYOSKSKSKC?OKUKSISKSKGEYKGC_@QUMOGMIECSKKGaAg@_@Q_@Sm@Yk@YaAg@cAg@UMGCA??AWMGC_@SA?OIGEGC_@SMGQKA?WOGC_Ai@a@SGEC?k@[i@WYMMIA?GEECOIMIWMi@[WMGEECYOWOAAGCu@c@IEk@_@GCKGUO]S_@U_@WA?GGMGIIGEOKEESQQOEGMMSSGGGISSKMU[SUAAOSy@gAe@o@[c@OUo@_Aa@m@U_@KOSYQ[KQKOOYOYIMIO]o@_@q@IOIOMSYc@MUc@u@c@u@OYGKWc@OUKOS]S[[k@[g@u@qAOYU]S_@S_@Wk@MYMYKUKWKSGKCIIKS]wAiBa@g@GGEG[_@eBuBc@k@SW{@cAUWQSCEKKOSOQQQKKCCCCOOSOOKk@a@e@[_@SYOSISGc@KUGKCIEEAQIA?OISMSKCCMKQOCCAAOOOQEGCECAMSGKGIMUMSKQAAOUGIEIOUQWMQKMCCGIKKOSOQQQOOQQOOSQSQSOWSKGEEIGSMOKWOUOQKSMSOECKIMKAAGGIGCEKKSUMSOUMUGIEIGKEICGIOGMEKCEGMKUACUo@IUKYKWSk@CEMUKUGMOUW]g@k@IGEEIGWQCCMGUKSIUISESESCWESAKA_@AA?C?OAU?G?O?}@@a@?]?C?K?K?A?Q?W?K?G?E?E?]?A?U?U?W?U?S?Q@WAI?O@AAU?g@?G?C?C?Q?S?M?UAK?G?UAS?S?WAU?WAC?OAu@CiAEC?G?i@CeBCSAC?WAQASAE?QAOAC?WCSAUCSCGAOASEUCSEUEWGOEA?UIOGKCAAIESIYOIESK_@UMIEC]WAAMKQOWUKIGGGIQOSWW[GKKOOWKQEICCGQSe@Yq@IYK[GYGYGU?EGYEYCQCICQAKCWIy@Ce@AGA[Ce@A[?CAWAU?U?S?U?[?U@{A?S@M?Y@Y@[B[@[?IDm@JuAB[@KBOHs@Da@BU@GDSBQFe@Hg@@I@EBQF[FWHi@@EBIBMJe@He@F[BKNq@Ji@BK?CDS@ELi@F[Fa@BI@EBO@IDUDYH_@DWF_@BU@GBUD[DY?GBUFw@?CBW@WB_@?U@_@@W?G?A?Q?E@[?a@AU?GAs@A[A[A[AUC]CUEa@AICOAKCOAMEQ?ECICMEWEUAEEQAEIYGYAAGWI[GOCGIYIUKYKWCIGOKWKU?AMUKUKSQ]MUMSMUOUMSIMEGo@y@GIGIOQOQQQOQQQQOAAMMQOe@_@QMSOQKSKSKSISIUGSGUEUCUESAUAU?U?U?U?S@U@U@UBU@UBSBOBE@UBSDUBSDUDUBSDUBUBU@S@U?U?UAUAUCUCa@I[IWASGi@QSGSISIQG?ASISIc@OECMGEAUISISIMGEAUISKSIOECCUISISISIUKSISIUISISIUISGUIMEEA_ASUCOCEAUEUCSEUCUEUCUCSEWCSEUCUCUEUCUEUCSEUCUESCWEi@IuAUk@IUESCUEUCUEUEiBYUCUEUEOCE?UESEUCUEUCSEaC_@UCOCEAUCSEk@Ic@IWEk@Mi@KWGSEUGSGMCGCSGUGSGUGSISGICKESISISIUIg@Ug@UKC]OYMOGg@Ui@Sg@Qi@Qg@QUGUGSEUGUEUCUEUCUCSASAWAW?SAA?_A?MA]?[AM?KAKAI?KASCUEIAKASEUGEAMEg@MUIUICAOGSKKEOGMGSKSMGCIGUM_@WECmAy@o@c@KGOKSMQKQKUKIEICMGEASIUGSGSGUGa@I]GSEk@I_@EC?GAi@E]AEAO?OAS?CIA??AMAUAOAKACAGAOCGCSGECICGCIEKGKIGEIGEECCCCCECECEEGACACCECEAGCIA?EOAGAICIAGAG?CAE?IAI?C?E?G?I?I?I?KB[@MBUB]?ACIB[Dg@@KBY?E@W@U?S@S?M?G@o@AW?[?AAm@C[Ck@Eq@CWOuAEWE[E[EYAEESG]CQAIGYGWG]IYGYGYI[EOCMKYKa@EKKa@KYEMCIUo@O_@K]g@yA_CmGIUc@iAm@aBKWKYIWIYCKCKCMCKCMCOAMCMAKAG?GAMAMAM?MA[?]?M?K?]?O@Q@UBYBYD]H_@?CNo@J_@DOXo@L[JQLQLS^i@T]V_@LUNULUNUJS@ANSLUNWJULYJUJYFQ@ETu@FYFYF]FYD[?AFYD[F[Lu@D[FYF[D[BKJm@BM@ILy@DYFYD[F[D[Lu@BM@Gj@oDXaBl@sD`@aCTyAFYD[F[DYRsALu@D]Lu@D[D[D[BS@GD[D[D[B[D[BS@GD[B[D[D[B[D[?IBQB]D]LuADg@Fo@HaAHaAB_@B[BYB[BY?ABY@K@OB[D[BYB[B[B[BYB[B[BW?CBW?AB[B[DYB[@O@KB[B]B[B[D[B[?GBUD[D[D[B[@CDWDYD[F[Jm@Jk@DUDUBMFYFYZoAHWFWFSXkAPq@DQPs@Po@@CFYFSH]FYHWPq@FUFWH_@FUH]Nq@H]FYFYDWFYF[D]TuAF[Ju@DWN{@PqALw@D[DWF_@D[DYF]Ju@BYBMBODYD[NmA?CBY?C@]@I@U@w@@[?_@@qA?uA?K?S@[?]@Y@[@]@[B]@[@I@QDYHw@F]D[F[DYRy@DQDS@C@EHYHY@C@CBG@GTo@n@iBVs@Pi@h@yADK`@kATq@JUFQd@qAHUJYJYHWH[HWHUH]FWF[F[DWF_@D[Ju@DYPuATkBVuB@EHk@BUFa@BYLy@B[F[BWBOP{AD[D]Da@BU@]@e@AM?A?U?I?]AW?OCc@AUAMAMCQCUGWG[EOCIK_@Oa@GOO]IQAAAAOYa@k@SW[W_@]y@m@_@YUOkBwAUQ}@q@GGUQYSYUIG]W}@q@a@[YSa@[q@g@k@c@e@]g@[YQEAm@[q@[AASKi@Wg@UQKSMSKQOSOOMQQQQMOAAY_@IMIOAA[g@k@aAMU[i@[k@OUMSACOQOQOQQMQOQMUMSKSKSGSISGWIEAa@Mc@MUEYISGUGSGSGUGUGSEUGUGSGSEUESGUEUEUESEOAA?SAUAY?S@S@U@U@U@SBU@U@W@]BW?S@UAUAUCUCUEOCOEICGCYKMKWKq@[SKQIUKSKSKoAm@SKUKSK[Os@[g@Wg@SSIWKg@Si@QUISIUI_@KGCSIUGUISGUISGSISGSGQGEASGSIUGSIUISKQKQKSMSOQOQOOOQQQSMQOSOUMSa@y@GOIQKUK[IYIYIWIYKYIWI[IYIWIWK[KWKYKWMWMYMUMUOUMSOSOSOSQQ]]QOWUOMUMGEOGMISKOIKESIOGEC_@KCASGYGOCEASCA?QCk@IcAMSCSCi@Ge@I[EUEUCSEUEUGSEsA]UGQECAUESGUGSGUGUESEUEUCUCUAUAU?S@I?M@UBUBUBE@OBSFUFQFSHULQHULSLSJKF]PGBIDQJQHQJSJUJQHSFUFODE@SBSDWBA?M@E?W@S?a@Ai@EKASEUEUGKCGC}@]QIA?SI{@]UISIKEGCUISI_@OGCSIUISISISISISKOGCAOICASMQKSMOMSQQMGGGGQQOOCCKKACGGAAEECCKOCCKMCEKOMSACMSMUMWA?KUKSMYIUKWIUGSAAGQAAOe@ACCIQe@IWIYKWIYIW_@kAu@sCMc@Kg@Me@GYI[EYGYCKCOG[GYEY?CGYE[G[EYE[Gc@CIAKE[CMCKE[AGE[ESEUCMCIIe@GYG[EMESIYOo@So@Ka@GSUs@GUAAUs@KWKYKWKWMYIWMWKUMWKWMWMUGIEKMUMUOU]i@OSEIMOOSKQQSEEKMMOCCa@c@]_@WUOOQOQOIIIGOMe@c@A?c@a@OMUQKKKIGGOOQQOOA?QSQSMMQQOSSUOQMQKOGK]c@MUGGEIMSOWS[IOQ[IOQ_@GKQa@IQO[KWGOACM[IQK[M]Yy@Mc@Mc@GSK_@GYQs@Kc@Ki@ESIa@AIESEWGc@Ee@Im@AYAAC]A[CWC]Ey@CWGy@C_@CYC_@E_@Iu@E_@CSK}@EYIs@EW?ACSCIOeAGc@ESAOESAMEWE_@CUGe@MiAASGk@KoAIy@?ECU?EE]CU?EEW?CEW?ECOEQCSG]GSAEEUAEGUGWK]IWCEIWCESi@IQAEEGCICEIQCCIQCEMUKOCEIMEGOWOSQSKOCCCEKMIICECCMMAAACMMCCMKCCMMCCMMCCQOEEIGCAQOKIA?EEKICCSMKGGEMKWOGEGC?AQKKGIEQKCCOICAMIUMSMCAMIECMICCOICCMKCAMKCCEEGEQQCCMMCAMMCCIKCCMQCCOSOSKOCCMUKOCEIOCEIQACIOCGIQCC?AIQACIQAEIQCEGSACISM]GSCEGSACAGEKAEGSAEGSAEGUACEUAEGSAEEUACGU?ECKCGAEEUAGESAEEU?EEUAEEUAECSAGCSAGE[EU?EIq@AECUAEASAGCOEa@C[?ACSGu@?AAKASCW?GAS?AGaA?EASAY?GAQ?EA]?E?WAa@?G?[?]?C?Y?Y?]?U?G@I?I?G?W@Y?C?C@S?G@U?E?U@GBmA?GF}B@K?I@Y?[@]?[A[?[C]A[C_@C_@AGGg@?CCSG]?AEYG[GYAEGSI[EQCEIYIWKWCGEIAEMWEICGMUMUOWOUCCKOOSQQOSQOQQQOQOMIWQSMQKSMe@Ye@[g@[QKg@[g@[QKSMGEe@[cAm@SOk@[CCQKAAMIOKQMCCAAKISQMMAASSQSKOCCKOCCKOAEKMAEOUIQCCIQAEIOAEQa@ACEKGSAEGQAEEMCKGUIc@G[I]EWIi@Ii@Km@EWGa@G[G[Ms@GYG[ESI_@CMKc@K]ESIYEMCKAEACGOAEIWGSCEGSAEGOM_@MWEMQa@M[GMCGKSMWMUKSAAIQ_@o@KQACKQMSCCKOOUOSMSCEEEEGCEKMCEe@k@CEMOUYEEKKCCKOSSMMCCQQMMCEQOMMQOUSMKQQSOUQ]WAAECMKCCQMQMWO_@WsDgCw@i@eAs@KIKGQMOKCCQMA?MKCCSOQMMICCGGEEGEIIMKEEa@_@WUOQGG[[KKOQWYOQIKCCOQCCOSKOSWGISWQYOUOSGKGGOUm@}@EIEEACKOCEKMCEKOQYQSKOCCMOOQOQCCMOOOQQCCc@_@MKEAQOQMSMEEMGMKOIIESMs@c@WOq@a@IEs@c@aAm@a@UQMGEu@c@u@c@YQUM?AMIEASMKIYQOKSOOKCCOKCCQOQOGEEGCAMMUSMMCCMMCCMMCEKMEEKKCCMOACUYEECEEGEEOSCCGIGI[a@e@m@EEGIaAqAq@{@KMOUOSCAMQo@y@CCYa@CCOSOSOQQUAAMOe@q@Y]OSQSOSOSOQOSOQ?AOQOQQSQQQQOQSQQQOOQOSQQOOMSOSOQM?ASMSMQMSMSKQMSKg@WUMSIQKUISKi@SSGUISGUISGSGWGSEUGSGUESEAAi@KUGUEi@Mk@MSEmAUs@OwBe@}@U_@K[IcCu@}@W{Ae@GCq@Sm@SEAaAYYKKEi@OyAe@e@OKCa@OA?{Ai@]Kg@Oa@Mm@Qi@QiA[WIOCSEAAWIk@Q[KYISIw@UWKA?gA]C?UI[KYIYIo@UWIMEaA_@s@UeBi@GCWI_AYc@OSGUIWMEAKGWMIEECQMOKA?QMCCMKSQOOQQOOGIGGKMGKKMOUOUIOQ[MWMUKWISIWAAIWIWIYGYIYG[GYAEKm@EQCMMs@Ow@AGCMKk@AK?AI_@AKCIEUKm@CKG]?AESG[GYEOCQGUGYI[ACEWIYGYIYGWIYGUK_@IYK]GUOg@Oc@Sq@EI_@mAOe@I[KWIWI[IW?AI[IYGY?CGUG[CUAACSAKEYE]E]?CCWC[C[AYA]AU?GA[?]?]?U?_@@]?U@I@]@]@Q@KB[BWD]@MBSBUDUD[F[FW?ANu@FY@ADYHYNu@Nu@DSHa@HYFYF[FYF[DYDSBQBOD]DYB]@?B[@YB]@W?E@[@[?]?]?[A]AUAc@CYC]C[CUEa@E[G[G[GYGYIYI[IWACIUGQAEKWKYMWKUKUOWMUMSMUOUMSOSOQQSKOSUQQOQEEKKOQQQOSCCKMECKMOQAAOOOQAAMOMOSUOQOSOSOUMS[i@OWKUKUKUMYKWGQCGKUIYCKEKIYGQAGGYGSAEGYG[GYCSIc@EWC[E[CYGi@AMA[CSAc@AQAKCu@ACA[Cy@Ey@A[Ey@Cu@IiB?AGaACc@Em@E]AMGc@G_@COIa@EQCOGSMi@CIIWM]KYKUKWKUMWMSOWOWMOOUOQWYMOOO[[e@][USM_@USIQIAAUKe@Ug@UQIi@We@USKMGaAg@i@YUMKGUKSMUMOISKAASKQKUOQKQIw@g@WMa@WSKQKSKSMe@WWMWOe@Uo@[i@Yq@[WM]OECSKUKQICAa@SECk@YEEe@W_@Ua@UWOQKQKwA{@UMy@e@g@[y@e@IE]SMICAQKy@e@WOMICCMGCCUMSKMIGEIGyBoA_CuAm@_@{@e@KGaAk@c@Wk@]o@_@_@UCAMIQKCAe@YSKSMSKQMSKy@g@SKe@WAAKGECAAGCA?AAOGKECAOEEAOEEAOCEAGAKAQCC?C?MAE?MAC?C?I?K?A?A?Q@K@I?QBC?UDA?ODC?QDC@OFE@KDGBSJOFUHIDC@SJC@C@A@C@A?A@}@`@SHE@MHUHA@eBt@A@OHMDEBC@SJA?A@A?MFQHQHE@ID]NOHC@SHA@MDCBSHQHC@QHQHA@QFMFIDOFWLo@XUJKDSJOFC@i@VMFA?g@TSHWLMFA?C@OHC@OHE@MFE@MHQFA@E@c@RSJUJQH}@`@QHSHWLOFUJSHSJSHUJQHE@OFSHC@IBGBC@ODC@QFSDSFUFC@QDC@OBC@UFI@GBWDG@IBOBG@QDk@JA?SBSDE@WDM@C@UBQDC?MBA?C@QBC@A?e@FUDuAPi@HC?g@HC?UBOBC@I@G@E?OBC?QBA?SBYDo@HOBQ@I?I@C?M?G?YAMAC?QACAQCCAIAEAWIQGEAOGAAOIOGCCUOA?SOMIQOEE_@YQMy@q@CCc@]IGCCKKECMKCCMKA?CCMKCCMIQOAAAAu@i@OMSQCAMKQMUSOKCAQOQMMKWQMKCCGEIGMKECMIQOCAOKCCGEECCCMKCAOKAAOMEAMKCAMKAAAAOICCCCIGOKYSSOQMSMIGGESOQMOICCSMSKQKUMSISKSIUGSIUEUGSEIAMCSEUCOCQCwAK_@CUASCUAUCUAOAEAUAUCSAUAUA}DSQAYCuBK_AE[Cc@AUAUCk@CUAk@CYAQAUAUAIAKAUAUAk@CE?MAk@Ck@Ci@CW?UAUAUASAU?UAUAUAUASCA?UCSCUCUESEUEUGSGSGUGSISGUISKSIQKSKUM_@UaAm@KEe@[y@g@g@Ye@YSMSKQMSMSKQMSKSMQMg@YQKSMe@YCAOKSKQMSKSMAAQKQKSKSKUKSISIUIWIUGKCcAUYEg@I_C_@y@MiAQ[GYGIAUECAOESGOEEASIWKa@QCCUKEEMGc@YQOYSKKQOQQOQQQOSMQQSOSOSMQQSOSOSOSGIGIOQACMOOSOQOSOSAAMQOSOQOSOSMSOSOQGGEGOSOSOS_@e@OS_@g@OSOQOSOSMSQSMSQUQUMSOSKMOUOSOSOSOSMUOSKMCEOSQWMSOQOUOUIMQWOSIKEGKQCCOUOSSYcCoDiEiG}@oA_@i@]g@OS_AuAIMOUOWMSISACMUKWKUKWCGGQGUGQCIGWI[GYEQGWAIG[E[E[CWYqBC[OgAGc@E[E]EYE[E[E[EYEYEY?CE[EYEYE]CWACCYE]EYAECUE[E[E[C[ACCWE[E]EYEY?CEYE[E[AIIm@E[E[E[AGCSE[E[E[E[E[Ku@K}@Iq@Iu@Ga@CUQqAE]?CEYEYEYE]E[EYCYG_@C[EYE[E[E[AICQE[EYE]CUAGEWC[G]C[E[C[C[?CAY?]A[?]@]@[B[B]BWD_@D[BOBKFYH[HYHYJWJW?AJWLSNWLUJM@AFMNSLQNUNSNSLSNULQPWLQNSNU^i@@CJOLQ?ANSNUPWJONULQNSNWLQNUFIFKLSNSNULQFKHILSFGDKPS?ALQXa@RWNUNSDGHKLSNS\\e@PULST]FG^i@LO@CZa@R[LQPSNQ`@c@NQNQNQRS^a@NSDEJKPQNQNQ`@e@NQNQHIFINQJO@CNULSNULW?AJSLYHUJYBGFQHYFYHW?EFUFYF]DYB[D[B[@W@C@]B[?[@]?]?[A]A[A[C[C]AIAOE[E[CUO}@EU?CG[G[EYG]E[GYE[EUG]EYG[?CEUKs@G]G[E[GYMu@EUG_@Mw@EWAAE]GWE[GYE[G[E[GYE[GYE[Mu@G[G[EW?CMs@G[EYG[E[GYE[G[ES?EGYE[G[GYE[EYG[GYE[EWAAG]EYMu@E[GYG]EWMw@G[EYEYACEWG[EYG[GYGYGYI[GYKYGWIWKWKWKY?AISMUKWGMS]MWKQMU[k@EGGK[k@MUMWCGU_@MUOWMUCGGMMUMUMUOUIQk@eAyB_EQ[OWKSMUMUMUMUMUMUKUMWKWKUAAISKWKYKWKYIWIWIYACIWGWKY?CQo@GSACGYIYIUI[IYIWGYIYAEGQI[IWIYGYKYGWIYIYIYGWK[GWEMCMIWIWGUACGYI[IYIY?AGUK[GYA?IYIYEQCGIYAGGSIYIYEMCII[GSAEIYIYQq@AEIUIYIYEMCMIWIYGYKYCKEMIYI[IWIYIYI[IYGYCGCQG[G[CUAEE[E]EYC]E]AYC]A[?MAO?]A[?]?E?U?Q?K@]?C@S?A?Y@E@y@?C@Y@]@[@[@S?I@]@[B_@@Y@[@]B}@@[@[@]?]@Y?A@[@]@[@]@]?K@O?]@[@]@[?M@M@]@_@?[@[@K?O@]@]@[?O?O@Y@[?]@]?M?M?[?[?_@?[?K?Q?[?[A]?]A]?[A]A[A[?]AYA_@AQCe@Cy@AW?GCw@AQ?IA]A[?SAI?A?YA[A]AY?SAKA[A]?[A]AM?MA]A[A]A[A[?AA[A]A]A[?OAMA_@A[Ai@Ck@As@A]A[Cu@Eq@AUCg@Aq@EmA?MGoBEyAA]A[A]A[Cy@AGCs@?YCa@Cw@?UCc@A[Aa@?MAMA[A[A]A[A]CiAEaAEgBAOAQ?KAMAMC[?CCYEYE[E]EYGUI_@GYGWKYIWKYIU?AKWO]KWKYGMCIMYKWKYKUEKEKKWIUMYKWEIEOKWKWKWKWACIUKWKWIQAEKWKWKYKWKYKYKWISK[MYWq@KUIUKYKWIWAAKWIWKWKWKWKWKWKWKWKWMYKWKUCEGQMWKU?AKUMWMWIQM[Yk@_@w@Wg@Yk@O]GKMWOYKUAAKSMUMWKWMUKUMWKWMWKWKYISMYKYKWKWKWKWIWKYIYKWIYEMEKIWIYEQCIKWIYIYIYIW?EISIYIYIWIYI[IYIYEOKa@K[Sq@IYIYQo@KYI[CGEOIYIYIWMa@EOIYKYGWACIUGWIWACIWIYIYIWIYIYK]m@oBEMIYIWIYIYIYUs@IYIWK[Uq@Sq@EMEKIWI[KYGUGSCGIWK[IYCIEOIWI[IWEKEOIYMc@YcAIWI[IWI[A?I[EOCIIWI[Qk@Ka@GUEMa@wAW}@GQGYIYIYIYIYIYGYIYIWI[GW?AIWGYQq@g@gBQu@K_@GUESSu@IYK]Ok@GYSw@Ss@Qs@EOCKIWI[GYIWI[GYIYIYIWI[IYGYKYGWI[IWI[GUK]IWGWI[AEGSI]GUI[IY?CGWIYG[IWEOAIIYGYI[GWI[IYEMGUGWGWIYGU?AGUIYGUI[GUKa@CKIYGUGWGWIWGYIUGWCKCIIWGWGWIYIYIYGYIYCIEOG[GWG]AGEQEYE[E[AECSE[E[C[C[C[C[A[A]AU?EA[A[?]AS?W?]AW?E?[?Q?[AY?Y?YA[?U?[AY?u@?[AW?[?C?UA[?Y?YAY?O?G?[AY?[?YA[?YAY?Y?[AY?Y?Y?EAS?W?A?[AS?_@?O?KAY?Y?[AC?S?Y?AAY?Y?YA[?WA[?Y?EAU?WAY?YA[AY?Y?[AY?YA]?[?S?GAy@?QAM?W?]AY?G?Y?Y?Y?[?W@]?W?W@[?Y@Y?G?Q@[@W@Y?I@Q@Y@Y@W?A@YBY@Y@Y@E@SBY@]@Q@E@YDs@Dw@Do@B]@YFu@@WDu@BY@YBY?I@M@YBYB[@[@O@I@YBY@[BW@[B[@WBY@YB[@YBY@YBYB[@W?A@WBYDu@Ds@HoA@[B]B]Dy@BY@M?EBc@B_@@YB]Fy@Bm@@KB[@YB[Bc@@UB]@YB[@UBe@@YB_@?CFiA?C@UBa@@Q?KB[@]BW?E@W@G@[BYHsA@]Fw@@Y?CB]B]?G@QB[B[@S?EB[B[?I@SB[?C@WBS?G@Y@A@]B[B_@?ADe@@KB_@@YB[B[Dw@B[B[B]@YB]B[@]Dw@BY@]BYB_@@Y@[B]@]B[@YBi@@OB]?CB[@Q?EB]@YB]@Y@]@[?]?[?M?OA[A]A[C[C[C]C[EYG[E[G[GYEOAII[GYG[Ok@Ic@ACEQGYEQIc@EMS_ACIEUG[IYGYGYG[WmAe@uB}@gEa@iBAEOu@GYGYGYGYCKCOEOAIIYCMCMGYOu@IYCQCIWoAGYEOIc@Mm@CMMu@Ow@I]Kk@IYG[EUGYCIUeAWkAIa@G[GYG[I[GYG[GYI[GYQu@IYK[Om@EKGQEMCIK[KYKWKWCCGSMWKWGMEKMUMWKSAAMUKWOUACKSMUMUMWMUMWMWACKOMWMUKQGOCCCEGKGKMUKQACOUMWMUOUCEIQQ[CGGMMWMUMWMWMUISCCKUMWMWOWYk@MUOWKUMUMS?CMUMUMUMWKQACMWMUOWKSAAMUKUOWKUKSCCMUMUEKGIMWMWMUIOCEMUMWMSMWMWGKEGMUOWMUMUOSMW?AKSKQc@w@CGMUMUKWMUKSACMWKUMUMWEIGMMUMUMWMUMUMWMUMWCEe@}@]m@[m@MU[m@KUMS]q@[k@]o@IQ[k@O[MS?AUa@a@u@KSIQCEk@cAIQCEKS]m@MU_@u@We@GMEGMWKSCEGKQ[o@mAIOKSUc@O[Ua@MUKSGMGKMUQ]GKGKKSc@y@IOEGEIIQMSKQ?AKQMSKQKSKQa@y@a@u@[o@GKCEEMMWKUKYMYSm@K[IUACIYIYIYI[Ic@EUEQAGGYGYCOAII]Ow@UoAG]WoACSSeAESGYG[G[GW?EGWCMCMEYGYCKCOG[G[EQCMMq@ESAEMs@GYCOUoAAEAGCKESACEWEUO{@ESEQCOCMAEACG]COI]Ga@CMAEACG_@GWG]EUCOAEKe@G[I[Ke@EUGUEUEUESESEWGW_@qBUkAOy@G[AICQGUG]WsAOy@Ms@Ou@EUYaBEQG[G[G]ACEYG[G[?AGWE[G[GY?AGYE]GYEUAGEWG[G]EWGYG]EWACEYG[GWAIEQG[E[EOAIG[GYGYG[G[GY?EGUGYGYG[G[?AGWOs@CMCMG[GYG[GYAIEQMu@CMCOEQG[AGGYEYG[AGESE[G[GYE[EUACG[G[E[?AGUE]G[CMCMGYG[?EESG[G[CGCSGYG[AEESCOIg@GYCMUkAEUEYE[G[E[E[E]CYE]E]CYCWE_@E[C]CWE_@E[AGASE[Is@?CC[E]CWC[AAI{@ACGs@E[C[E[C[CQAKEYC]E[AGASE[C]AGCQC[E[C[CS?AAEE]CYE]CU?EEWCYE[CSAGE[G[EYG[G[GYIYEQAGIYIWKYIYGOCGKYKWKWMWKUQ[IQMUMWKUMUMWIQCCMUMWKWMUMUKWEGIOEKEKMUUi@EG?AO[EICEKUEIQ_@CGMYACKSIQMYQ]GQMWMYq@yAMWKWMUKWMUKWMUKWQ]CCKWGKKWMWKSMWKUMYYk@MUKWIOOYEKEIMWACKSMWMUKSy@gBk@kAi@kAaAqBISIQEKMUKYIQO[EICEKWMWKWYk@OYAEIO}A_DEMCGq@uAy@aBACYk@e@cASc@We@IQEKUa@MWKSMWKUOWGOCEMWWe@Ue@_@y@s@{A]o@_@y@[o@KWEMEIKUGKEKKWMWACKSKUKWMUKUMYMUKUe@eA[o@EIGKYm@MWKWAAKSKWMUYo@MUGOCG[m@MWGOCEYm@MWYm@MWQ_@Q][q@KUIOO[EIAES_@KWMUGMEGKWMUMWMUMUM[Yg@kAcC]s@ACKSOYEKEIKSCGEKKUMWEGISUe@MYMYEKKUMWWk@M[Sa@GOGIKUUe@MYWi@Sc@AAMUEMEIMYS_@O]MUKWSa@MUKWIOCEACYm@[o@KUEGGQYm@MWKUMUGQYo@KYCGQc@CIMa@EKK[CKOe@CMEMYkAA?Ou@G[GWG_@GWEYG_@?AEUEe@Im@E_@Ea@Go@I{@E[Ee@CSAMC[?ACWCOCWAM?AC[AMAKE[C]E[C[AOAMC[E[C[E]C[C[E[C[?ECSE_@C[CYC]CU?EC[C]?KAQC[AY?OAMA]A[?[A_@?[?]?Y?a@?Y?[@[@_@?[?Y@]@]@w@?[@aA@i@B}ABuB@Q?g@@]@[@[?UBoA?UBeABgA@uADuB@kADkD@]@gB@a@?[@]?[@]?[@]@[?[?K@Q?[@[?]@]@y@@y@@[?S?I?Y@[?_@@]?Y@Q?a@@[@]?[@]?[@Y@_@?[@[?]?K@O?]@[?]@Y@]?[@]?[@G?U@_@?[@Y?E?U@[@[?]@]?K?O?[?Q?[?]AU?EA]A[A[A]A[A[AK?EAKC[C[C[C[AKAOE]E[?ECUE[EYG[E[G[EYG[G[GYCOAII]COGWE[GYG[EQAGG[GYG]AECSG[GYESAEG[ESAEG]EYG[CMCKG[GYE[ACEUGYG]EQAIGYG[EYGYG[G[EYG[G[EYG[EYAGESG[E[GWG[G]EYG[CKKi@G[EYG[G[GYG[EQAGG[EYGYG[G[GYAICQG]GYEUI]EYGYG]GYGYG[EYG[G[GYE[GYIa@Ou@SiAWwAe@_CCUYwAOs@UqAOu@G[Kc@CMG]_@gB?AGYG[Ou@EWQ}@G_@SaAAIKk@G[EYG[E[GYCMCMEYGY?AG[UoAEYGUG_@AGMq@Mq@WsAES_@sBQ}@SgAOw@Ow@Mu@e@eCkAmGOu@G[Ms@G[GYGYAE?AESGYG[CMCKG[GYEUA??CG[GYG[GYQaAMq@Mq@Ki@Ia@AKMo@WwAE[EYOu@My@ACKg@O}@Ou@ESIa@Mw@Kk@A?Ic@[eBQ}@Ig@Ki@G[G[ESESCKE[GYOu@G[Ia@Kk@I_@Q}@Q}@Ic@Ke@Km@I[?CKg@ESEYAEG[EQIi@Mk@Q_AG]I]GYI]GWIYIYIWIYKYK]KUIWKYKUIQEMKSKWWg@MWOWKSOWOUKQOUQWGKGGKO?AOSQSKOSUOQQSOSOQIKGGOQOSSU[a@a@e@_@e@SWMOOQOSOOa@g@a@g@OQOSWYIKMOCEMOQS_@e@MQUWMOKMCCOSQQOS_@e@QQ_@g@GISUUY_@c@_@c@a@g@QSOSa@e@_@e@W[AAEGQSa@e@_@e@_@e@a@e@GIW[_@e@QS_@e@q@y@EEY]a@g@QS_@e@[_@QUQSa@g@a@e@_@e@a@e@_@e@_@g@a@e@Y]_@e@GGOSOQOSQQMQQUOSOQKOCCOSOSMQ]a@EE_@e@Y_@[_@Y_@Y_@Y]IISWOQGGGKQSMO?AQUOQOWKOAAKQQWMSKQO[MUQ[IOO[KUIQO_@IUKWUk@M]IUMc@ACOi@Qk@CGEOEQGUESOk@GSMg@Mk@IYEQWcA?ASy@Qs@Qu@Qu@Qu@?AQs@EQ?EI]IWOo@I_@Su@Qw@[sACGMi@Kc@?AYgASy@Qw@Sy@Sy@EQMe@Qw@[oAKc@AGEQGWMm@I]UiAG]Mk@AKIa@CQOy@CMc@cCKo@ESKk@Mw@G[EWCKMq@?AOu@Ms@AIMm@Mq@QcAKo@Ou@G_@Mu@Oy@G]Oy@Ko@Mw@ESCQCOG[CSGa@G_@Mu@?CESE[I_@E[GWMy@Ow@CMQcAMw@G[G[EYOw@QgAKi@Ow@Mw@Ia@CSOw@O{@Ms@AIKm@Ow@E[Ou@Mw@UmAO{@GYI_@ESGYIYI[IYIWKWKYEKEMKWKUMWMWKWMUOUMUMSQUOSOSOQOSQQOQQQQOQOQOQOSMQMSMSMQOSMe@[SMAAOKSMSMQMSMSMQMSMQMSOSMSMSMQMQMSMSKSMQKSMSMWQ[SSMECQKSMQMe@[e@[CCQKQMa@WWSQMQOQOQQQOOQQSGIGGOSQSS[Y_@OSIMEEOSCGKMIMoAeBEEOS_@g@_@i@SYYa@OS}@oAA?]g@W]Y]_@e@OQk@q@EEQQOQQQQSOOQQCCMMQQOOQOc@c@QOQMQQ[WIGQOCAOKQOQMQOSMSOQMQMSOSMSOOMSOSOQMSMQMSOSMCEMIQMQMCCOIQOA?WSMIa@[UOSOQMSMQOAAQMSMQMQMSOe@]QMSOSOQMQMIGIGSMSOQMQMQOSM?ASMQMSOQMe@]IGIEUQOKQOUOOMUO[UCA]W]WSOkA{@mA{@QMkA{@SMSOQMSOQMQMA?QOSMQOSMQOUOy@m@a@YYSq@g@ECmA_AOK[WUQUQa@]QOCAMMQOQMQOKIEESQQOOOCCiAaAMMQOWSIISQQQIIGGQOQQQOOOOMCCOOOOg@c@OOQOQOOMSQSQGGGGSOQOQQSOIIEESQQOQOQOQQIGGGQMQQSQGGIGQOAAOOQOOMWSKMSQc@c@OQQQOQOSCCKOOSOSGIGKMSMSOUMWEGEKOWKUKWMWKWKWKUM[IUKWMWKWKWKYKWKWKWKWKYKYKUKYKWIWMYIWKW?AKWKYUm@AAKYKUIYKWKYIWIYCIMi@CEOo@GWG[G[EYG[EYCMAME[E]EYGm@?KE[C[AYAMCS?IAOAIASACIqAE[C[E]EYE[AICSGYEYG[G[AEGQI[GYI]IWKe@CGAGSu@GWI[IYGYI[IYIYGYIYG[IYI[IYGYIYIYGYAAGYIY?AIYG[IYIYIYGYI[GYIYGWAAG[G[EYE[EWACE[C[C[E]AO?IAOAMA[A[C]A[A[?AEy@?KAOA]C[A]A[A]A[A[A]A]C[A]A]A[A]A[A]C]A[Cw@C]A]A[C]A[A]A[C]A]A[C]A]?IAQE{@Cu@?CC]A[A_@C[Cy@Ew@K{CEs@A[A]C]A[AU?GA[A]A[A]?O?I?]?]@O?M?[@Y?A@]@[@M@MB[@[BY?EB[Bg@RkDB[B]@O@KB[@[B[B]B[Fw@Be@BSBk@@MF{@@YFy@@[@G@UB[B]@[B]B[?CHqA@]Fy@B]@[B[B]@[BW?C@[@[@[@[?[?]?YA[A[A[?AAYCYC[E]CYCSG_@G]ES?CQy@CMCOG[G]I[G]G[WsAOu@GYG[I]Ms@GYG[G[GYEUAEOu@WsACMCKOu@Ow@Ow@GYGYG[G[GYG[GYG[EWG_@EWE]E]C[E[C[A[C[ASCe@A]A[C]A]A[C]?MAMA]C[A]A[AOAMA]A[Cc@?KCg@KsBA]AY?AEy@ASCe@A[C[C]AOAKC[C]Q_CKgAC]Ea@KwACUUoCCa@CWCU?ECYCYCYCYC]AKCSCa@YmDIy@C]WaDAK_@sEQuBScCAKSmCGs@Ea@CWCYCYCa@OgBC[C[E]C]C[SoBEk@?AO_BGw@Gi@Ek@C[C[C[C]COEq@Gm@ASCe@MeBM_CC]C]C]G_AIwAGs@Gw@ImAAGEo@E]C[Eo@KcBCc@IcAG}@C_@AYAI?SAMAMA]?[A_@?_@?S?]?[?[@[@]@]@[B_@?A@YB]@[B[Ba@?A@[B[@]B[@[?AB[@[B_@HwAFuADk@Dy@Be@Bm@BW?K@KFqAD}@FeAFiADs@Bc@@U?EB[@W?E@[?]?E@U?[A]A[A[A[C]C[E[E[E[CSAGG[EUGa@QgAEOUsAKq@GYE[GYGa@EUCQKg@?AEWAGKu@EUCYE]EYC_@EYC[C[C[A]AGASA[C]A[A]A[?[A]?[A[?I?S?[@]?[?]@c@Bu@@W@]@Y@QBk@Be@Dq@@]B]@[D{@@[Dw@Dy@?AB[@[@S@YBg@B]@]B[@_@@YB[@[?AB[@]B[?A@Y@]@MFeB@]@[By@@]B[@]@]@[@[@]B[?K@Q@YB{@@[?I@o@@G?U@_@@U@]?]@[@]@[?]@[@]?[@W?]@[@]?SB{B?S@I?]?[@]?W@_@?]?[?A@[?]@i@?O?[?]?[?]@[?g@?o@?_@?I?Q?[?O?M?[?[?C?Y?[?]?K?Q?[?]?[Am@?K?]?[?A?[A[?]?_@?YA]?[?]A[?[A]?]A[?]A[?_@AY?]A[A{@AY?]Ae@AUAY?]A[A]A[A]?K?OCo@?IA]A[?GCq@A]A]AYA]A]A[A[A]A[AO?KA]C]A]A[AO?KC]AWAa@A[C]A[A[C]Ew@A]C]A[Ce@Eo@A[G_AAWC[A[C]C[A]C[C[IuAAUAEAWEa@C_@AYC]CUCa@C]CYAKASC[CYC]CUAQCQKqAC_@Ee@AOE]AMAOKgAMoAMqAKmAE[C[AECUC]E[AOE]AEGo@Gi@EYEa@Iy@Iq@E[E[C[E[CKAOE]EYE[E[E[EYE]CQAKEYEYQsACOAKEYE[CMAME[G[E[E]Ig@CKEYE[E[AAEYEYE[G[E[G]EWE[AAEYE[GYG[E[GYE[G[AECSG[G[Mu@G[G[Kk@?AIa@G[EYG[AGESGYG[GY?CGYGWG[E[GYG]GYG]AEEQGYG[G[G_@EUGYG[G[GYG[GYE[GYMm@AGG]Ic@EQCMCMGYGYE[G[G[GYG[GYG[CQCGE[EOIc@YuA?CKm@Mk@Kk@Oy@Mq@GYGYIe@UgAKk@G[COEUGYGYG]GYAEAKEQG[CMAKI[G_@EUGYKk@GYWuAEUQ_AAGKi@G]Kg@a@sBs@wDACIg@EUGYIe@CKMo@ScAG]G_@?AMs@Mq@?EG_@G]Ik@E]E]E[Iy@Iw@E]MaBAGKwACe@C_@?QA]AYAYCuAEqCCuAAw@A}@AS?_@?AASC}BA[?[A_@A]Aw@AmAAcACu@GmEA{@?UAa@?[Ao@AQAaBCeAAaAC{BAWA_@?]AQ?EAw@A_@A[A]A]C[A[C[A[C]C[A[C[AGASC]EYC[AMCOC[E[EWE[CWG_@E[EYG[E[G[EYGYCICOIa@GYGYGYQu@IYGYCIEOI[GWGUM]IYIUK]IUEKEKUq@KWKYKWKWKUMYKWKUKWMUIUOYKWKWMUKWMWKUMWMWKUAAKSMUQ_@?AMUMUMWMUMWIOAEMUMWMUMUMUOWKSMUOWMSCGKOQ]Ua@Uc@U]a@q@w@qAe@s@EGg@w@AAs@iA_@i@_@k@]g@KOOS_@g@SYQYIIOSOSCE[c@SWSWGKOQOSIKKKOUY[CC_@g@g@k@KMOQCEMOOOSWCAMOm@q@QSCCQQOQQQQSIIGGQQQSa@a@MMSS[[CCc@c@KIOOWWEEOOSQQQQOGGGIQOSQQOQOQOQQQOQOMKECQOQOQOQQQOSOQOOMAAQOQOQOQOSOQOQQQOQOQOQOSOQO?AQOQOQOQOQOQOSOIIGGQOQOQOQOSOEGc@]IIQOQOQOSOQOIIGEQOSOQOQOQOSMQOQMSOQOSMQOSMQOSOc@[e@]e@]SOCAOKOKAAQMSMSOQMSMQMQOQMA?AAOMSMQMQOQMAAQKIIGESOQMQMQOSMQOQMQOSOOMSOQOMMCAQOc@]QOe@_@GGKIc@_@c@_@WSKKe@_@QOSSOMc@_@YYIGAA]YCCc@a@c@_@c@a@c@a@c@_@a@a@c@a@c@a@CC_@]c@a@a@a@MMUSc@a@a@a@c@a@c@a@QOOQc@a@c@c@WUKKa@c@c@a@c@c@a@a@c@c@a@a@QQQQIIWWQOo@k@c@c@EEc@_@QQQQa@_@MKSQQOQQOKAA][]YWUk@e@GGIGQOc@_@c@_@c@_@c@_@QOQO[WaBwA_Ay@]YCAYWs@m@iAaASQSQ{AqAk@g@kAcAEE[WOMIIIGYWGEIISOOOc@_@MKWUQO_@[USc@_@EE]Yu@q@u@o@QOc@_@gA_As@m@yCiCCAWUQOQOOKIIMKSQKIEEOMOOOKOOWSu@q@GEIIc@_@QOe@_@a@_@SOQOQOOOOMAAQO[WUSGEOOQOEE]YQOc@_@c@_@a@[AAc@_@QMSOc@]e@]a@[GEQMUOSO[Sm@a@e@YYQi@[SMUMIGIESKIGm@[QKWM]QIEUKSKWMw@_@e@SCA]Oi@SWKOIYKaA_@WICAGCo@UkA_@k@Oi@QICi@Ms@SYGc@Kq@Os@OeAUe@IWEq@Ki@IEAg@GKAYEg@Ia@Em@Ie@IWE_@Ec@GQC_AM]EaAMQCo@KSCE?a@Gc@G]GcAMC?{@MiAOIAi@ISC]Gc@EWEa@Gw@KgAO]Eo@I]GiAOqAQcAMo@IAAc@G_AOw@MMCe@MKCUGQEA?UIQGUIQGWKQIUICAa@SUMSKQKg@[k@]c@]OKUQg@c@IGSSSSUSWWWY]c@]c@MQQUYc@ACWa@KOIOMUMSEKGKg@eAKSWo@Wq@KWUo@Sm@K]IYK]ESK_@COGSKi@Mk@G]QcACMEWKm@QcA[mBG_@c@mCAKq@}DGa@a@aC?Eo@uDKq@Km@Ga@Y_BKo@EUCO]wBEWEUCKcBiKKm@AICMEU?AEUSmAMy@Mu@Ms@E[G[u@uEe@qCy@aFE[EQeAoGCQ]sBa@eCMy@{AgJYeBCMAIAAKm@AKQcAEYG[?AMk@EU?C]eBAGMi@IYGYYoAMa@GYGSK]K]I[K[GSK]GUKYAAQm@KYWs@Uk@EOu@iB]y@Sc@Sc@Q_@Sa@]u@IOUa@Q_@]k@c@w@U]S_@EEUa@SYOU_@i@AA_@g@_@g@W]]c@gAwAwAgBw@cAy@eAW[o@{@wAgBOUUYOQW]GGk@u@GIMOUYAC]e@q@{@KOs@_Ae@s@[c@Y_@ACa@m@g@s@GKSYW_@q@cAi@w@KMS]]e@QWAA[e@CCWa@GIi@s@[e@W[ACIKw@eA]c@IMeB{BCCIKKMiAwAIIo@y@KMs@y@_@c@_@e@oAwACEY[g@m@[_@o@u@QSmAwAY_@ECq@y@CEo@u@CCc@i@IIyAgBa@c@]a@_@e@IIu@}@CCSWMMUYGI]a@e@i@_AgAAA[_@EGOQCCUWEE?Ao@s@CCCCY_@[_@EEGIi@m@OQQUIKII]a@g@m@y@aAa@c@QSe@m@Y[QSY]EG_@c@{@cAEE[_@]a@UWOQa@g@AAGIIKc@i@GG?Ak@o@]c@Y]QSUYMQQSIKOQW[WYa@g@ACi@o@s@y@SYQSc@k@y@aAgAqAo@u@W[EGo@w@iC{CY]_BmBcAkAAA_EwEoA{Ae@i@e@k@q@u@CE[_@m@q@CCo@s@Y]k@q@]_@u@}@i@o@GGGIEEi@m@ACm@q@c@i@g@m@AA_@c@OQSWo@s@OSy@aAEGECMQMOCCMOGISWCEKMCEAA]e@KOCEMUOSKQYg@S_@MUIOYm@KWM[ISKUEK_@eAGOa@uAEMMg@Qs@Oq@GYGYGY?EESCKIe@?C?AKu@AESiBGe@_@yD?EMmAIo@AMC]Ea@ACSsBGg@KiAAIE]Gm@AKI}@OuACSIw@AOAGAECYIw@Eg@Io@Gu@E]E[CWKy@AKCQEYCWAEIq@G]E[AGCSMu@Kk@Ga@Ia@EUAEGUEWACGYEUS}@ESCMESGSIYQu@IYK_@Mc@K_@Ma@[eA]cA]gAIWEQIWGQGUKYIWAEQm@Ww@ES[_AGWQi@Y_AOg@Mc@Qk@IUI[IWa@qA_@qAWy@u@eCg@aBSs@A?Oi@a@sA?AK]CIw@gCe@{ACKGSOi@Qi@So@AGGQUu@AEQi@I]GSISQm@CKSq@a@sAGSSo@K_@GOK_@GQGSEKIYIWIS?AK[ISKY]}@CEQc@ISAAKUEKSa@Sa@EI?AUc@CGAAYi@S_@KQ[m@EI]m@aDaGyAkCKUQ[Wi@[o@KWWq@M]IWCIEOIYEQCIIYGWAGESGYEYG]EYE[EU?EE[C[CQ?C?ECQ?IC[A]CYA_@?[AS?G?[?_@?]?C?W?]?]?wA?[?gA?S?e@?I?Q?m@?_AAy@ASA]A[C[AMAMC[CUAIEYE[EYEUKa@EQAGGYKYGUMa@Um@GOQ_@MWMUKSOWKOW[OUGGGIAAk@m@e@g@u@y@AAs@w@CCq@s@MOUYMMKKEEMQGEGIKKY[EEY[e@i@KKs@u@KOu@y@Y[YYOQq@s@AAa@e@[]UUSU_@a@c@e@q@u@IIUWKKEG}@_AAAm@q@c@e@MO[[k@o@y@}@}AcB_@a@eAiAo@q@GGg@i@OQCEa@a@KKa@c@KMe@g@c@e@k@o@WYUWWWIKY]IKGGMQQUKOQWQWUa@CEOW[m@Yi@[k@]k@?As@sA]o@KQ]o@Q]We@MSACS_@c@w@]o@i@aAm@iAm@kA[k@_AgB_@q@[i@EKS]e@}@AAGMMUMUMUMU[k@KUIOCEMU}@aBIQk@eAIOsAgCe@{@GM_@o@Q]OWO[KSUk@Ui@EOs@wBUy@S}@Kc@Oy@SiACOIe@AEKi@?CKm@Kg@]qB?AQ_ACQGWAEGa@UmA?CCOEQAG_@qB?AAGCMGYWwAESAGAGCOKg@]mBWyAe@eCAGMo@Q_ASgAIa@SaAMe@I]U{@Qs@Qi@Oi@Yw@K[[y@Qe@Qa@ISEIUg@KUGMQ_@Ym@MW]u@AAc@{@q@wAAAqAoCAAGOO]Sa@Ue@MWGMk@gA?CWe@MWgA}BA?a@}@_@s@Q_@m@oAu@}AQ_@[q@_@s@KQWe@QYU]CCIOMOQUWYW[_@e@a@e@CAMO]c@UWMOQQOSQQOQ]a@a@e@s@y@mB{B[]KMSUa@e@MO]a@KKOQ?ACAGIOQMOEEKMOQCCk@o@CEOQOQQQOSOQQSOQAAQQMQOQKMECOSQQOQEGIKQQ?AOOOQSUMQQQOSOQOQA?OQQSOQOSQQMOACQQAAMQQQOQOQMOIIIKQSOQOQIKEEQSQSOQOQQSOQOQQSOQOSQQOQQSOQQSOQQQOSQSCCKMOQQQOSOQQQOSQQOSOQOQQSOQQSOQIIGIOQIIGGMOQSQQSSOOOM?ASQQQQOOOSQQOQOOOSOSOQOQMSOGEGGSOQMSMQMSOSKQMUOQKSKSMQKSMSKSKSMSIUMSKQIUKSIQIUKSKQIUKUKQIUKSISKSIUKSKSIQIUKSKSIIEKEQICAOISIUKSKSISKSISKUKSISKSIg@USKSISKSISKQIC?QKUKQIUISKUKGCIESKSIWMQIUKSISKSIUKQISKQIMGUIs@[QKSIEAMGi@SUISISGUIUISGKC]KSGUGUGi@OSEUGSEk@Mc@IGAUEEAMCUEUCSEi@ISEcAOkJ{Am@K_AOg@IWEWESESEA?UEMA{AWkB[aC_@UESEWEGAKASEi@IcAQi@Ig@Ic@Ii@Iu@Mc@IgAQKAUEQCOCe@Ia@Gs@MaAOSEw@MGAm@KUEqASm@KUEUCi@KUESCUEOCEAUEcAQIA]GUGSEe@KYIC?OE{@Wa@K]KOGGAy@[e@Qq@Uc@QSISGi@SKEUIMGSGgCaAYKUIk@UQG}@]SGsAg@{Ak@_@Oi@QSIsAg@g@SSGUKKC]MSISIUIUKQGAAQGUISISIMEo@USISIUIi@SUKm@WKEUISKSIMGYOSKSK]Q]SSKQMSKSMSKSMQKg@[QK{@g@AAUMQMOISKQMSKMIYQSKc@YQKUO{@g@SKe@[SKSMSKSMQKg@[g@YKIYOSMSMQKSMSKQMe@WAASMSKQMSKSMSMQKSMA?UOIEWQg@Ye@YSMSKSMUMOKSMSKOKUMUMOIUMSKSKSKSKg@Uy@_@WKSIOGIEMEUISIUISGSIUG}@Yg@OSG{@WIAsAc@A?gBi@iEqAeCu@MG[IOEi@QSGy@WYIUGeA[GCYIc@O[M_A[e@QWKUKOEUMQGe@UAAQIQKUKa@UIEe@Yg@[KIi@_@e@]k@c@e@]IIKI_BwAw@s@QQQOYUIIQQOOSQECu@s@KI][{@u@QOQOOKeA{@yAgA{@q@m@a@w@i@QM?ASMSMSMSO]UEAeAq@GEe@YQK[QgAm@c@We@UuAw@SKi@Yy@c@g@WGE_@SKGUMQKSKYOe@W}@g@_@QGEUMMGUMQKSKECMGWOa@UUMi@[WM_@SQKQKWMQKUKKGYQSKUMQKSIQKqAs@OIi@YWOc@U_Ag@OIQKOIWMSKQK_@S]SoAo@GEGCCCQIWOa@USKmAo@UMSKSKg@YQKSKSKSMQIAASKSKSMSKQKUKSMQKUKQKSKGEIEg@YSKSKCAQKQKQKYOYMIGSKECMGWMeCsASMSKSKUMgCuASKECMGSKSKQKSMSKUMQKSKSKSKi@YQKSMQKSMSKSMSKQMSMSMQKSOSKAAOKSMSMSOSMEEKGSOQKQMe@]QOA?QMKIGEQMCCMKQMAAQMQOe@_@QOQMQQQMQOSQc@_@QOQQ][y@u@i@g@KKQOQQSSOOQQQQUW_@_@OOOOOSQQQQOQQSOQQQOSOQOQQSQSOQMQQSMQQSQSOS_@e@OUOSOQOSMSQSOUMSOQOUOSOSMSOSACMQOUOSOUCEIMMQOUMQACOUMUKMCEOUKQOUOUMUOUOUMQMUAAMQMSOUOUMUOSMSOWMQMSIMEGMSMUKOGIMSMSOWCCIMOUMSOUAAKQOUMSOUMQOWMSMSGIKOMUMS[e@]i@EGKQQWKO]k@IOEEMSMUOSCEKQOUKQOUKSMQEGMSMSMSMSOWQWMSMSOUEGGMOUMSOSIOCEOSOUMSOUMUOSOWOSEIEGMUQWMSIKEIOUMSMQu@mAe@s@OUk@{@?AOUMSIMc@q@OUMSAAKQ_@k@CEIMOUMSKOCEMS_@k@MSQWWc@QY_@i@GKU]MS[g@ACEEKQKOS[GKa@m@IMCGm@}@{@uAOUc@q@IKMUOWOSCGIKOUMUOSOWMQm@aACCKOa@q@AAGKMQOUOWOUMS[e@]i@ACAAMS]i@QYCCS]MQCGOSMUOSOUMS]i@OSCGGIQWIKQWm@_Ay@mACCSYOSMQU[MQMQCCGK[c@IMKMCEIKU[OSOS_@e@a@k@kE_GOSKMOSCEOQKOCEOSKMOSCEKMCCKOCCKOCCKOCCOSOSKM?AOSOSOSOSOSSWKOGIKMOSEIIIKOCCKOCCKOOSGICCIMKOaAoA_AoAwAmBsAgBKQOQEIIKGIW]]c@[c@[a@[c@a@i@MQEGW[GIOUi@s@QU_@g@CCOSa@k@QWQUAAU[e@m@?A]c@KOAAOSOSOQCEAAMQQWQSEGIMEEQUMSOQ_@g@OUOSOSOSa@g@OSMSq@}@MQQSKOCCOUOQOUOQOSOSOSOSOUOQOSOSQSOQOSAAOQOQOSQQOQMOCA[]WWEE]_@SUMMa@a@?AQOQQKMWSQQOQQQOQQQMOACOQQSOQOSOSOSEGIKOSMUGIGIOU[k@]i@[i@OWk@_AOS]k@MUOSOUOQOSQQQQQQQOQOKGGESOQKKGGESKSKUIIEICUISGIAKEUEUE]GKAUAUCUAC?Q?U?U?U?I?K?U?c@?]?U?K?K?kACa@AUAUCUCSAUEWCUEs@G]CWEKC_@Ei@KWE_AOk@K{@OKA[G_@GKCOCSCMCSC?ASCSCGCIAKCG?GCIAIAIAGAoCe@]Em@KYGQEQEg@Me@Q_@QUMISQM_@Uw@e@CAm@]IGe@WCAIGYQe@WWQKGIE_@QCAUKYMCAMG]Oe@OYK]KWIMEWIYKECSIMGMGAAOKMISOKMKKMMKMKMQAc@u@u@wAOUSc@KQGMc@{@Yk@KUMUKQ[o@MWMUKSOYMUMWMUMWKUMUg@aAMWMSMWYk@MWMWg@aAOWKSMWMWMSKUMWe@_As@sASa@MUYk@u@wAu@{Aw@yAO[c@{@w@{Au@wAw@}AGK[o@m@oA_AkBIOOY]o@Wi@]q@Wg@Ue@]q@OY_@s@e@}@IS]m@OY_@u@OYGMMUAAIQ]m@ACQYYg@U]AEOSWa@a@k@KO]c@OUKMm@w@u@{@o@q@WU]_@a@_@QOQOc@a@CCa@[e@]?Au@i@iAu@k@]q@_@a@UMG{@a@[Oq@][Oo@]C?{@c@CAy@a@AAw@]g@WcAg@CA]OCAgAi@k@YYOe@SECmAk@c@UKEWOGCKG}@a@YMMG_CiASKaAe@UMUKcAg@k@Wk@Yk@Yk@W[O_@QqAq@a@SSMSMg@YIEcAq@YSSMg@_@i@a@u@m@ECWUs@k@SUCAWW][c@e@QOq@u@UW_@c@a@e@o@w@OSMQ[c@]e@W]U]KSc@o@S[Wc@U_@S_@Ua@a@u@?AOW[o@MYMYQa@c@}@AEUe@Uk@a@}@Ui@Uc@Se@_@{@[q@GMEK?AUe@Sg@mB_EkA_CSc@aBqC_BoCgAkBkCsE_BaCyAoBGIo@{@k@u@{@gAo@u@UYMOGGII]a@_@c@SSaAgAa@a@EEY[e@g@USMOs@q@SSs@q@USKKSQ[Yy@s@KKSOGGc@]GGMIOOQMMIAC}@q@IG]Wq@g@MK_Aq@s@e@WQQMSMy@i@i@]s@e@]Ui@]QMECSMKIa@Wk@_@_Am@c@Yy@k@KGw@g@MIq@e@kAu@YSMGu@i@OKcAs@e@]QK_@YOKYUIGSMs@k@y@m@WSyAiACC[UWSMKIGeAw@[WcDgCIG{@o@e@a@a@Yi@c@]U{@q@ECy@o@UQe@]_@Y[SSMQMQMSMQKSMSKQMQKUKSMSKQIUMSISKCAu@]UKQICAOGEAQISGIEKESISGUIQGUIQEWIQGCASGUGOEA?WGGCIASGC?OE[GQEUEICICm@KSE[EQCOEWEOC]GIAKCYEm@MYEUE]GWE_AQq@KA?_BYoB_@m@Kk@Kk@Ks@M]Gc@GgASSEo@MeAS]GWEUEWEQC]G[E[GUEOEC?UEUGIAMCSGUGWGOEe@MYI]KEAWISGUIKCIEk@Ua@Og@SOGWKIE_@Oi@WQKQIIEOIEC[QQKWOOIUK?ASKUMc@We@YOIq@a@UMa@WSKYQsAw@AAEAc@WGEq@_@SMm@]qAu@g@Yu@c@w@e@a@UaAi@u@e@QKWOq@_@WQUMSMSKQKECSMa@Uk@[]S_@SAAc@WMGUMSMQKMIw@c@WQMGa@UOKc@W]SkAs@YO[Su@c@WMUM_@UIGoAs@GE]SQKWOA?c@YSKIEIGUMQKOIa@UUK_@Sa@WSM]S[Si@Y_Ak@c@We@WQKo@[q@YUKQIUK_@O[MqAg@AAg@SQIMEOG_@OKEGCUKUKe@UKEGCUKUK{@a@A?eAi@CAs@]o@]YOq@]UOSKSMm@[kBkAc@YQKcAm@MIQKQKUOYOaAo@cAs@_@Ug@]a@YOMA?QOSOOMSOQOAAOKSOIGGGe@]MMCAQOOKAAQOSOCCs@k@cAy@uAgAm@e@m@g@UQk@e@_@YCAQOSQOMSOQM?Ae@_@A?c@]OMOMOMOK?Ae@]OMMKWSi@a@UOQMIGGESOQMQKUMIGGESKSMQIAAg@WEEMGu@_@ECQISIECMGQIWKMGMGe@SKESGGCMGQGWKICEAYKQGUIA?SIQEQGk@QKCQM_@MUGSGSISGSGA?SIQGC?SGGCKEUGSISGUISGSGUISGSGSGUIUIA?QGSGUISGMEGCQGOEEAQIk@QECOEQGSIUKSGSKSISIECMEUKIEIEQIUKQKSKSKSKQMUKQKSMSMQKA?QMQMSMQMSMQMIGGESOQMMKCCQMCAOMQOQMQOQQQOCAq@m@QQOOGGGGQQQQOOQQs@s@IIGGQOOQs@s@SSWWYYQQQQs@s@MM[]IGa@a@KKEEMMACQOQQq@q@SSQQOOQQg@g@KMOOQQkBkBMKuAwA[[GGQQOOQQQOOQQOIKkAkA[[GGOOQQQOQSOOQOQQQOMKCCQQQOQOQMc@_@s@i@]USOQKSMSMQMIEIGUMQKSKi@YCAOISKSKSIUKSKSIUIg@S{@YUIYKSGUGSGUGUEg@Mk@MWGSEUEUCUE}@Me@Gs@Km@GkBUaAMqAOuC_@_@EWCSCUEUCUCUEUCUCk@IUCEAOASCUEWCUEi@Io@Ku@MIAg@KIA_B[YGOEE?UGSEKCICSEKCICSEUGUGUGUGSGSGCASGUGUISGA?SGUISGGCMESIUGSIUISISIUICAOESISIUISISIOEAAYKEAOGUI]MKCSIAAg@QSIUKSISIi@Ua@Oa@SgAi@y@a@k@[i@YOI[QUMQKOKSMg@YQMCAUOQMSMSMGEKGSOQMSOQKQMUOe@[QO{@k@MIOK[We@[SMQOMIECQMUOQMQMSMGEKGQOA?QMSMQMg@]QMSOOKAASOQMGEKGQMQMQMAASMQMSOSMKIGESMQOSMMICASOQMKGGGSMQMSMSOQMGEIGUOQM_@WGESMQMGGIGUMSQQKQMSMQOMIECSMQOCAOKSOSMSOSOOKUOQMQMQMIGIGQMQKAASOSMIIGESMSOQMSOUOCCMKQMSOQOSOQQQMSOOOGEMM_@[GGKKSSQMQQQQQQQQQOQQGGEEQQSSOOQQQQOOSQMMQQSSQOOOAAMMUUQQEEm@k@SSQQQQQQQQSSUU]_@QOGGIIc@c@OOSSQQQOOQSQMKUUQOSQQQQMQOSOSOSMSOwA_Ai@[WOSKOGECQKSICAOIUKQISIWMOIUKIEOGUKg@Sg@U{@_@u@a@g@SaCgAYMOGCAUKSKGCMGc@SCASKg@UUKSIMGECUKSIA?e@UUKc@SWKSKu@[eAe@SKUKQIIC_@QUMQIKEIESIUKSKMEGESISISKKEGESIUKQIUKGEKESISIGEOGQISKi@UMGYMk@WSKSIUKUKIEYMs@[GEUKSISKECOGi@Ui@UoAm@UKSISKg@UUISKg@UA?QKUKeBw@}@a@UKSIyBcA]Qo@YSIUKSKSKSKOGEAQKUIYKSIUISGSIUGSGUGUIUESGUEQEWGUCWE]EKAUCSCUCIAKAUCUAUCUAUAUAUAUAU?KAI?U?U?U?U@U?U@U@U@S@U@UBM@G@UBUBUBSBUDUBI@IBUB_@FK@SBUDWBaALSBUDSBUBUD_ALUDUB[DaBTq@HSBq@Jm@Hu@He@Fy@LI@UBYBSBk@HUBUDUBUDg@FUDUB]FM@SDUBUDaAPSDUD[FODSFUFSFUFSFUFUHMDaCx@SHc@RkBt@UJUHa@R]NGB_A`@OFq@XKDaAb@k@Ts@Xw@\\q@Xg@Vi@Tg@TEB]N_@Ra@PA@y@\\{@^YLg@RQFa@Ng@P]JcBf@_AV[FWFg@J_APk@JSB}@Ne@Hw@LoB\\m@Ji@HUDc@Fs@LQDm@HIBa@F]DYFWDSFSFA?c@L]LQFgAb@GDg@Vg@ZYPc@ZA?k@b@_@ZSRABo@l@KLQR[`@MPGFW^c@j@y@fAq@z@{@jAaBvBcArAQVk@v@OR?@MPUZILMR_@h@KRSZa@l@MTCDSZ?@g@x@ABg@z@u@pAYd@S\\a@p@o@dAaAbBS\\GJ_@l@[j@OR[j@AB{@xAW`@KPGH_@h@U\\a@f@KLe@h@MNKHQRC@u@p@A@[VIFSPIFA@UPc@Xk@^QJg@VWNc@RKDQFA@[LUHWJc@LSFYFc@JuAXG?YDSBYD]BO@O@Y@E?S@[@{@Am@?cAEiAKMASA?AWCMCGAUE[Gc@ISG[I]KEAm@O}@We@MEAc@KQEAAe@M}@Wu@QSGSG_@KSGKC]Kg@My@SKCe@M[I?AWGSGICMEUIKEGCICQGSIgAg@k@Y}@e@QKMIWOGEQKKIe@[e@_@q@g@gA}@CCMKYSEEIGSO{AmAw@o@oAeAcBqAECSOSMa@UWO{BaAGAUISGSGAAUGICICUEc@Kc@I[EMCEASCWCi@C}@GyA?sABeAHUBUBUBSBWDSDOBEBUDKBIBUHSHUHSHIBKDSJUHQJSLSJWNOJSNSNQNQPKJEDQPQPONSTOPEFKJOPOROPQROPQROPORKLEBOPEF[^_@b@UX[\\OROPQREB?@IJQPOPMNQRORQN?P?@?BADCFMROPQRGFGHQPA@MNQPQNOPSP{AvAED]XONC@IHgA`A]ZYV]XSPIHIHQREBGHMPABKPILO\\CFADGN?BA@GP?@GR?@CNAFAFAFAJGj@ATAVGtACTCRAPERCNCLADA?GVOb@[`AU|@IZGXEPADCLCJEZG\\Q~A?DGf@Gb@Kx@KfAEd@CLALAXCV?@El@M~AEv@CNEZAHCTOdAALG^UzAS|AKj@GVI\\GVGRCJCHEFEFGFGFURSFQFI@ODC?C?E@C@C@E@CBCB[?I?IAKCKAm@KWIe@MQEG?I?I@G@G@IBa@N]TEBEFGF[`@Oh@ETGdCCbAKnAKpACTETEJENMZS`@Y`@c@h@MJIFMLC@MFSJYNWLk@RsCbAWPwBWc@Gc@GOfCIxAXDXDn@JrARCf@CNM~ACXC^Ad@En@Cn@Cn@El@C`@?DGr@Eh@Gl@Kl@?BFZRdBBpBbBPx@HL@\\DL@D?F@b@DD@\\DB?TDh@F@?P@G{AGq@?AG{@Ig@E]GWK]GQQa@OUSYMOUSWOOKOI_Aa@o@]UJ_@U[OAAA?{Aw@oAo@CA{@e@a@SSMSMSOWSIKOOQSOUGGGKMUMUKWKWKWIWIYI[I_@Ko@E[C[C[AYA]A[?a@?]@_@Dm@B_@?EBU@G?ADSD]F[HYF[HYJWFQn@eBXs@HWJYHYHWHYH[F[H_@H_@@KBKBSJkA@Q@M@g@BwD@cAB_B?sA@iB@_C@Q?K@Y@WBm@FqBJcD@U@_A?aB?C?a@?e@AW?}@?[?Y?C?o@@o@?s@?qF?wG?a@?a@?sB?u@@c@?WBi@@a@B[D_@@ID]?EHi@DSBODSBOJe@DQJ_@J]HWHWJYJWVo@JUJUBGHMHOb@s@LSLQNUNSNUNQPQb@a@?AjAiAv@s@VU`@a@HG?AJIPU@AHKNQPUJQLUHQDGJSDKDMHUJYFSBKFSDWDQRqAFu@@[@W@Q?I?I?m@@_@?[?]?}@?oA?_@?m@?mA?m@?O?m@?g@Am@@y@?]@q@B}@B[@_@Bm@@]J_BJc@Fy@HaADYD]D]@I@QF_@Jw@N}@Ls@?CHe@FYXyAJi@He@f@kCLq@V{AJk@Lu@TaBD[TkBLkAH}@Hu@Ds@Ba@Dw@Dy@@[@]Bm@?K@y@@w@?O?aA?mA?mA?mC@iE?_E?cB@]?C?o@?_BEiBCo@?ICu@Ei@Ci@Ee@Gu@I_AM}@CUEU?AE_@Ie@CQCIGa@CMI[G[?EAEAC?EKa@GY?AGWACGSEQOe@K]GSQe@GQGSQe@A?MMIWGQMa@Oe@Sk@M]M_@EOEQI[Kg@Ow@WuAScAQeAUqAaA}FMy@iBkKKm@SkAy@sEk@cDIk@aAwFo@{D_@}BG[QeAIi@SmAKk@s@kEcAoGy@_FaAwF}@qFaAkGWaBKu@Gc@EYAMGa@Io@[yCM}AIy@MaBa@mFs@mJSsCMwAYkDGu@Gs@Eo@Cc@MoAEk@CSC]Iy@C]?ACYC]C[C]C]C[C]E[C]C]C[C]C[AMEk@C]C]C[E]C[C]C]C[ASAIC[C]C]Gk@Ek@C[CY?CC[C]C[A]Em@AQC]A_@E_BCaCAKAkAAsBA}@?qC?MAqEAoC?A?m@?AAaC?kAAs@AmBKcCA_@KyAGs@Cc@CWOsAAEQoA?AUyAIe@G_@G_@Ow@S{@EUYqAAAYmACKW}@EQGQMc@Mc@k@iBYu@k@aBWq@Yq@M[Wm@Wk@MWk@iA[k@[k@U]u@oAa@o@]e@gAyAe@m@s@u@[]QSMOWUa@a@i@e@}@u@eAy@mAy@CCc@WMIs@c@eGwDmAu@qAy@_@Ui@]WQ}AaAOIwEuCkAu@WOgDuBQKQMm@]a@YwBsA_BcAiC_Bq@a@q@c@QKq@a@m@_@YQm@_@CCUOUMeAq@e@Yy@g@SMQMSMkAu@y@i@y@k@u@e@IG_CcBwAcAUOwB_BqGwE{@m@OMw@k@eAw@y@m@iAy@{AgAAA{B_Bw@m@{@q@o@c@][UWUS_@a@_@a@a@e@_@e@k@w@OUi@w@e@y@k@gA_@u@Se@i@mAc@oAIUM_@EOKYUu@Su@Mi@S}@Kg@Mo@G]Kk@My@Io@Im@Gi@?Ca@cEi@aGI{@Iu@KiAEg@KiAIw@UkCIaAEe@Gk@O}AEe@CUE[E]Iw@E]E[CWGa@AMKo@Gg@M}@CMGe@E]OaAKk@E[G]G]CMCKCSG[G[CMAKEOCQCIG_@Q{@G[Ic@I[Ie@Oq@Qy@CEIc@CII_@Ok@I]U}@U}@?Ae@iBa@sASq@EMIWCGKa@[cA[_AIWKYKYEMCIa@kAUq@GOMa@Wq@IWm@eB_@iAa@iAKWs@uBEIu@{Ba@iAUq@a@kAEI_@eAM_@M]g@{A]aAUq@Qg@Qi@]eAYaAa@yAMc@UaAI[a@kBG[YoAAGSiAOw@G[m@aDKg@[_BG_@?AWsAOu@Kk@CQQw@EUQw@YmAMi@AC_@uAOm@M_@Ss@_@kAIUIYM_@Sg@IWWs@i@qAa@cAYo@O[Yo@]s@ACc@{@[k@EIc@u@KO_@o@MWW_@u@kAQWk@y@S[a@k@KOoAiBkAeBUYMUo@}@i@w@OSGKa@o@QUOS_AsAW_@m@}@CC_@k@a@m@oAgBkBqCKOc@o@MQ[c@Yc@a@m@AA[c@w@kAA?S[Ye@]m@ACYg@IMISKSISc@eA_@}@KWKYGSAEKYQo@GQKa@I[GYEMCKGYGWEQCMI]Ii@Ic@CQKm@a@iCCKIq@ESEYG_@O}@EUG[Ii@ESSwASmAIg@Mu@?AIa@Ko@UyAIg@Ge@CMM{@UyAO_AKs@Mw@ACUyAQmAIa@_@eCKm@YeBUsAU{AMw@Ms@?CG_@EYMw@G_@Mw@E[O{@QeAW_BIe@]_CE[Ki@Im@G]EYG]E]CMAGO{@E]GYE[AIGYCUMy@G[EUGa@AIKk@EW[oBUyAG_@QiAGc@EWG]SsAGY?ASqAKo@AGSmAIe@Ko@YmBe@{CYgB?AMq@Kq@?EGYKs@G_@OeASyAMy@Mm@Ki@WyASoAO}@SgAO}@SmAKs@UuAu@gDS{@IYKa@GYSs@IWSq@_@qAUo@Us@IUK]Uo@ISWq@?AWo@MYO_@c@cAKUIUKSKWKWe@cAMYMWAEIOKWWm@EIQc@Yo@MY_@}@s@_B]w@Wk@KY}@wBEMUg@]w@]s@KWKUMYEMEIe@gAKWAECG[u@g@iAM[MYGQM[MWKWIQYq@KWKYMWYo@o@{ASc@Qc@MYKWKUWm@EKQ_@GOKWKUKUISYq@KUKWKUWm@MYEKQa@KUISM]IQO]Wo@a@}@O[M[MWUk@A?EMcA_CEOSa@Qc@CEQc@GO[s@IUi@mAYq@Yq@ISMWISAECEKWKSOa@Wk@Wk@ACO]M]IOKWKUGQCEKUEKCIMYACISKUKWAAM]IQCEGMM[ACKSISEKQa@AEMWISMYKWMYQ]KS[s@gAgCIQu@}AIMMYMS]o@Yi@ACIOMUOUOWCCGKo@aAOSOWQUu@cAAA_AqACG_@e@MSSWEGEIOQAAOU_@e@Yc@OSe@m@g@q@QWq@}@W]g@q@_AqAa@i@m@y@o@{@_@g@MQm@y@i@s@k@u@OSGI_@g@e@o@Ya@QU]e@[a@_@i@W]g@q@IKKOQWKMi@u@U[]c@e@q@q@_A_@i@c@m@AA[e@[g@IOUa@Wc@OWYi@i@mAQa@[w@AAK]Qg@k@kBc@aBU_AYoAMs@QaAM{@Im@Iq@E_@Iw@AO?AGs@Gs@A]Ey@Eu@?WCq@C}@?_@?aA@m@?C?k@@m@@ID{A@_@BYBcABm@@]BY@[B]@a@JaBJ}AH}AF}@?APiCBa@@O?KB]Dq@Di@Be@NkCDm@Ba@@[B[@[@]B_@@]?C?W@W@c@?[@Y?S?I?c@?_@?AAw@?oA?IAu@?u@CqD?y@?OAuAAyA?g@A_B?KAcBA{@?Y?A?_@Aa@?[?w@AoAAaA?g@Ak@AuA?m@?YAW?YAe@?OCi@Co@Ce@?IEc@AQGm@CYAICUGg@Ii@E[AGEWESACG]Ia@Kc@Qy@Oo@AEUaACOI_@S}@Ow@?EIg@CUIa@AKAIEa@AECYAMCa@AMC_@AO?GC]AYA_@?IAS?Y?c@?[?u@?M?Q@]@y@@Y@]Bc@Di@Ba@?CBYHaAHo@Hk@BQ?CDSHk@BKDWHa@FYLk@H[BMXqALg@P{@ZwA\\{ALi@No@d@{BViAPy@F[FWFYFYD]Jo@Fg@D_@D[B[HaADs@F{@Bw@?a@@[?c@?iA?g@A_@?_@Cu@?ACc@C[C]G{@AMEa@Ee@E[Ii@Ik@EYMq@Gg@Ig@Ie@O}@M{@AAg@_D?AGa@]qBIi@Ic@UwAO{@Mu@E[Kk@G_@?AWyA]uBGa@M{@Ic@YaBIk@AG]wBCQUsAO{@Ge@UqA[kB?AO{@Mw@WyAESG_@CMOq@I_@I]K_@ACGWOg@AAK_@K[Qe@Qe@Um@Yo@Wo@A?Ui@MUEIUa@Yk@_@q@EKa@w@]o@AASa@a@u@i@cAi@cAS_@k@eAOYMWIQe@_AEGYm@Wo@MWEMEKYs@KSGSA?O_@Qg@ACi@wACIM[EO[{@Uk@a@iAKYWu@IWGOCIKYM[e@oAk@aBm@cBSo@M[AEOa@c@mAq@kBM_@[{@a@kAKYYy@Um@Og@Qe@[{@Qg@Yw@M]ACGSQg@KYKUK]Um@_@eASk@Uq@GQc@iAK[Uo@Qg@KWi@}ASk@GSISUm@Ws@Y{@aAqCk@_BGOw@{BIWc@oACGIUi@yAQi@e@oAUs@KWKYIYM[IUUq@IUYy@i@yAACM[Sm@M[K]KW_@eASm@Uk@Wu@Oa@GSYw@CI[y@Yw@Wu@EMc@qAKUMa@Sk@GSQc@EOCGKYEMM[?CUm@o@gBCIISOe@Oa@AECEOc@IS?CYu@ACOc@ACM]Ws@KYEOQe@ACQe@Us@Yy@EM[}@GOk@}ACGCK_@cASk@K[EKy@}BcB}E_CyG}AmE}AiEACY{@_@eACEUs@IQm@gBCIe@qAEKYw@CKCGc@kAK[K[q@mBEKYw@Qg@M]EKEM_@cAQi@CGsAwDOc@GQc@mAISIWSi@c@oAQe@g@yASg@Qi@g@uAOc@?AUm@a@kASi@M_@Uq@Si@Sg@Ww@Uq@M[Sk@Ws@Uq@c@kAAE[{@s@oBUo@Uq@ACYw@KY[}@AEKYM[KYUq@a@iAM_@KWIWGQCGEMOc@K[KWGQoAmDeAyCGQYu@CICGO_@IWQe@Ma@c@kAc@oA[}@Oa@Sm@KWGOWs@Qg@M]k@_BSi@Yy@g@wAM_@Yw@KWSm@M]]_AM]GSGO[{@oAsDWq@Wu@gBcFWu@Sk@Si@M_@ACa@gA?AEIY{@CG]_AIYEKIUkBkFCGi@}A]_Au@sBe@sAIUOa@kAgD{@_C_@gAQe@Uq@Qi@Wo@K]Oc@Wq@_@eAu@yBm@cBIUoBwFe@qAQe@Si@MYWm@IUQ]IQMWQ_@U_@O[k@}@QYQUSY_@g@IK_@c@a@e@AAMOWYiAiAc@c@m@i@a@_@UUe@c@UUGE[[[[SSOOWUSSCAaAaAa@_@k@k@oAuAUWc@e@o@w@a@i@[c@a@o@[i@k@cAWe@Ue@Yo@Wk@Si@KYM_@Sm@Qk@EQAEUw@GUEUOm@?CESMi@G_@Ms@Ka@G[E[I[G]EWGYKi@c@{BIc@AGc@yBOo@AIGUGYK]Ok@K_@K[IYAAIWOc@Qi@GOCGKYIWMWSg@]w@Yk@S_@Ue@MSMUOWMU_@i@OU]g@QWMQQUMOW[k@m@SWSSQQMMQQQOQMw@o@][QMy@q@a@[USi@c@e@_@UQUS]WQOe@_@g@a@k@c@]YUQMKOMg@a@c@]WUOKUSo@g@UQOMc@_@u@k@y@q@AA{@q@A?]Y]Yk@e@w@m@e@_@g@_@a@]QMe@a@e@]e@_@e@]OM]Y[UQOMKoAcAk@e@]W}AoAMKq@i@gBwA]YCAMKGEQQKGUSSOKKMKOMKGGE_@[s@k@m@e@{CaCgA}@CAQO_@Yc@_@c@[e@a@o@g@]WCCIGSOOKa@]{@o@w@k@SO{CaCg@c@_@]]_@e@e@AAMMOQQSMSUUW]AAW_@W_@[e@KQ[g@OYOUO[IMOYWg@GMGMYi@O]KUIQM[KWO]Uo@[w@ACe@mACIUm@a@kAa@kASg@Ys@Oc@AAUk@Wm@K[Si@w@yBkAcDmBoFYy@y@wBw@sBM]m@aBc@iAACUm@EKq@iBQc@AEO_@eC{GWs@Yw@q@kBg@oAWs@ACK[Sg@a@gAo@eBWs@c@iAWs@EIg@uASi@a@gAOa@Yw@Qg@a@cAQg@EMy@wB_@gAEIKWIWKYKWCIi@uAc@iA[y@e@oACKM]g@qAg@oAe@qAw@qBSk@Sk@g@qA_@cASi@CISk@Um@O_@Qi@ACWu@KYSk@K_@CEUq@Qm@_@mACEKa@Qi@Wy@Ok@[cAAEOk@EMQm@g@iBUw@I[Qm@IWSw@CIEMI]]kA?COe@CK[iAOi@ACa@yAMc@EQ_@oAKa@[eAe@eBk@mB[iAYeAACaAkDOg@GQ[gAe@cBm@uBEQCIK[K_@[eAI[[iAUw@I[GWIYK[AG?AEOIYIYIYIYEKEOGWIYIYIYK[GYIUSu@IYSs@GWGSAGOe@Qu@Sq@GWOk@K[Ka@]mAU{@?AEMi@qBOk@A??AI[IYIYIY]mAQq@_@oASs@Uu@Uy@_@eAIWIU?AAAUo@Ws@Ui@M_@MYKUIQO]Wo@Ue@EIO]IMMWUe@CEOYAC]o@OYS_@CEWc@KSOWOUMUW_@MSMSKOu@iAIKOQOUg@o@KMQSOSQQQQOQe@g@SS[[KKWWQQQOOOQOWUWUYUOMc@]UQWSEEk@a@OKkBwAAAQMECa@Y_Aq@WQi@]]U_@WKKIGwB}AOMc@Yy@k@_@Wk@_@[Ug@_@qBsAcAs@GEa@[_@WYQ]Wg@_@[UuAcA]Um@c@UOWQgAu@a@[i@_@_Ao@]WQMa@YWSi@]u@i@aAs@QMe@[_@Yc@[A?QMa@YIGiAw@SM]W[SWSo@c@sByAc@[a@YYQe@]{AeA[UEEcCcB}BaB{CwBGEMIQMWSGEOKGE_@WUQGCIGmA}@a@YAA_@WCAYUIEiAw@gAw@k@c@QMYSe@[IGSOqA_Au@g@wAeA_@WsAaA{@m@KI}@o@QMi@_@mA{@GG{AeAk@_@o@c@MIw@i@QK_@YOIaAo@UMk@]IEAAIGYOYQa@U_@Qy@e@{@c@m@[]Qc@WkB_As@a@YMe@WMGIEgAk@q@_@{Ay@QKw@a@IEKE_@Se@YQIKGAAo@[QKECQMYOm@]UMKGe@YcAm@a@UGE{@g@MIYQ_@U[SgAs@[S_@U[UAAy@g@k@a@QMSMQMSOQMSMSOQMQMSOQMSOKIKGa@[QMSOQMSOSMQMSOQMSOQMQMSOcAu@e@]e@]GEg@_@SOu@i@SOQOe@]SMQOCAOMQMQMUOe@]w@m@QMSOQMOKSQg@_@QKSQa@YUQg@_@wB_ByBaBs@i@YSc@[]WQOA?i@a@YSc@[]YECa@[UOYSw@m@KGYUk@c@SMAAeAu@WQkAw@a@W[Sa@UQM_@UYQg@WYQEC_@Sy@c@w@_@q@]s@]GCMGSKe@Ua@Q[QWK]OIEiAi@MGk@WMG[OQIo@[uCsAqAm@uAo@oAm@qAo@AA]OCCSISKSKQIOGSK{@c@uAs@qAs@o@]]QeB_AKGOI_@Sg@YSKSMe@Wo@]_@Uc@UWOe@WAAaAi@c@WWMAAk@]g@YWOm@_@GE[QQMWMSMy@i@c@Y{AaA_Am@a@WGE_@UmAw@IG]UUO}@k@KIWOSMSOSKSMSOe@[SMy@i@SMOKIGKGg@]OKUOCAOKSOKGECIG}@m@[SSMe@[IGKGu@g@u@g@ECQMSOQM]W[UIGGGQOCC]YAAYYIIQOWYEEQQKMQSW[]e@QWQYIKS[_@m@S]CE]i@[k@EG_@m@e@u@S_@GI]k@g@y@OWIMMU{@wAS]a@o@MUQYIMQYQ[Yg@U[y@uAc@u@gAiBc@s@oAuBQ[Wa@S[k@aAS]a@q@Wc@k@cAw@wAa@u@Ua@]o@MUk@eAo@oAQ[EIEIi@cAMWQ_@AC_@s@IOKUm@oAUc@Sc@[o@Yg@IOEI]k@OWS_@IOm@{@MSY_@W[MO]_@WWWUa@_@a@]m@g@k@g@y@q@YUGEYWa@]_@[_@[WUOMIIYUYUOM[WAA[Y]Y]YSQIGoAiAuAqAKK{@{@OOUUQQ?AY[CCWYSUY[q@u@KMCC_@e@a@e@SU_@g@MOOS_@e@QU[c@Y]c@o@Ya@QWU]Ya@Wa@QWWa@e@o@ACq@aA_@e@Y_@S[g@m@W[W]UW_@c@SU[]k@o@g@g@a@c@i@i@OOMMk@g@c@a@WUYUCC]Ym@g@]YOMm@e@EEuAaAEEg@[_@YiAs@{@e@YSq@_@[Q_@Ss@_@]QgAk@]Qu@a@}@e@MIYMg@YSKg@We@Ws@_@UOWMA?a@Wq@]WMMGSIe@Wk@[YOGEc@UOI}@g@g@[AAWOg@[[Sa@Y]UCA]UQOg@]k@a@c@[[S]WIGUOi@_@q@e@w@k@QKs@g@EC]W{@k@i@_@YSMI[Ug@]OK[UOMQK_@Wk@a@c@[MIQMm@a@w@k@e@]c@]_@Yi@c@e@a@MISSg@e@c@_@a@_@c@c@_@_@YWIIc@e@UWYYKMKMIGEGMMGGKMSWUWAAUWOS_AeAk@q@AAUW]a@_BmBGGc@g@g@m@KMY[a@e@GGSUY]]]CCUUUUWW]]AAc@a@QO_@_@AAa@]]YSQ_@[KIYW]WYS[W]W[U[UQKIGSOSMOKUOQKYQMIQKSMUO[S]Se@[o@_@UOOKq@e@_Ak@y@e@_@UIIQMe@WKIMI[U]WCAQMa@Ye@_@OMSO?Ac@]SOOOQOc@a@_@]OMYWOOGE[[e@c@QQIIGGOOQOOOQOQOOOOOCCMMQQKKEEc@_@OOQOKMy@w@g@e@QQAAMKMMEEGGQOQQSSOOQOOOc@a@OOQQOOQQc@_@OOQQKICEKKII_@]e@_@QOGGGECCGECESOOMAAa@YMKCCQMSOc@]IGGESMQOQKCCQMSMQMUO}AcA{@g@QKg@Y_@SQKSKSIe@WCAOGSKSKQIC?QKSIQIECMGQIUKKG[OQISKOIWKSKA?QISKECIEUKUKQIQISKSKKEGCSKWKOIQISKSIUKQIQK]OIESKUKA?iAk@kAi@QIWKQIAAOI]OKESKSIQIg@USKQKUKQISKSISKSKSISKQISIQKUKSIQISKQKYMOISIQISIUMQIQICASKOISKUISKSKSIQKUKUKe@USIQIUMSISKQISKEAKGQIWKw@a@UKQGCAe@USISIQIi@Sg@SQGUKe@OUISGUISGSGi@QSGUGKCWIWISGGCMCUGQGOEm@QSIGAKCSGSIEAIAICOG_@KMEc@Mg@OKCGCi@OOESIYI[I_@MKEIASGEAa@MSGUGAASGQEUIQGC?QGUGECu@SGCs@Si@QSGUGSGQGA?UGSGSGSGSGUISESGQGUGSGWIg@OME]KUGUIo@QKEYI[IA?SGUGk@OQESGSEEAOCSGSEUGOCUGUEKCIAUGQCAASEIAKCSCUGSESCSEUEUESESEQEWE_AQSESESESEUEUEUESEUESESEQEC?UESESEUESESEQCCASEUESESCCAsFeAo@Mo@MYGy@Qi@KaAUe@Km@OCAg@Kq@Q]KaBc@UGa@Kc@M_AUA?s@S{A_@MEe@Kk@OmBg@_@Kg@Mk@OYIsA]s@U_A[{@]c@QoAk@c@Wu@e@i@_@QMSMSQCCYUi@g@OOk@k@_@c@a@i@S[o@}@IOOWACKQKSOWCGQ]_@y@[q@e@kAAC_@{@Wq@kAsCw@mBcA_CUe@c@y@Q[ACIK?CCCQW_@g@e@i@UUi@e@QMe@]UMAAWMa@Se@QOG_A]cA_@_@MKE{@[UIKE]MEC_@MGCKEMGMGAAMGIEEAUK?ACAMISKSMGCCCEEUMSOQMQMMKYSQQKG[YQQQQIISSY[w@{@kBqBa@c@GIc@g@_AcA{@_AGIWWMQMOq@u@EGcAgA?Au@w@EEs@w@]_@[]OQg@k@II]_@[_@QSe@k@Ya@e@o@KOU_@MSOWS[Uc@MWGOEEGOGOA?Sg@CEKWIQCEGQAESi@AAKYK[KYACIWESK_@CEGWEQMc@EOAKEOI[GYAGEUG[EYGYE[Gc@EWSkAKm@AGGe@Km@?A?AQgAOaACMCKAEAEACGIM_AGa@Ko@_@kBQ}@I_@GWCKCKI]GUAEOs@Ka@EQ?CI[G[GUaBsHa@eB]yAiEcREUwBmJWkAUaAkAmFOk@i@eC_@aBa@sBKg@Kc@GWMs@Oy@GYG[?AEWG[G[E[ESGa@G]G[E[G[E[G[G[G[EYG[E[GYUsAG]E[G[GYE[GYE[G[G[G]EY?AG[EWG[G]E[Ow@G[EYEYAAE[G[G[E[GYE[COCMGYEWG]G]EYGYMs@AEG[GWOw@WqAGYQw@I[GYGYIY?AGYIYI]GWK_@ESa@aBa@wACKEKOk@CIIWcAsD_A_DIYIYI[IWI[IWIYIYEQCIIYIYKY?AGWIYKYIYSs@I[EMCII[Sq@IYIYI[IWIU?CIYKYIYIYI[IYCIEOIWI[IYIYIYUq@GQEOIWK[M_@CGGQGQSm@IUK]AASm@IQAGKUKYKWKYKWISAEWo@CGGQKWIQO]KWKYKWO_@GMMYWq@KUEOEIMYKWKUK[KWKWKUKWMYKYKUKYMYIUKUYs@Wo@KWKWWm@IQCGWo@KYMYKUKYACISKUKYYq@KUKYKYEKEKKWKWKWIYWq@Ws@IUKYIUK[K[?AGUUs@IWIYK]Qo@IWI]GQAEGYIYI[GWI[G[EOCKGYGYG[IYG]GYG[Ow@G[G[EWG]EWG_@EYG[CSAGE[G[E[E[E[EWAMCQE]E[Kw@E[QuAOqAE[E]EYE]E[E[E[E[CYG_@CYE[CSGg@EWE[E]E[E]AGCSE[CYE[E]E[K{@Ky@EWKy@E[Kw@E]CYE]EYGe@Is@Ks@Ky@Kw@E_@E]Iu@Ku@Kw@EYE_@E]EW?AE]E[CYKw@Ky@E[E[E]E]E[E[E[Kw@E]AMCKC]E[E[E[E[E]E[E]E[E[E_@UeBEa@CMCQE[CUE_@Ku@?AE]E[Kw@Ee@COE]G_@CYE]AECUEYE[E]Iu@E]E[Iy@EYE[C]EYC_@CYE]CYE_@Gy@Gy@AKAOGw@C]E_@Eu@C[C_@C[A[Gw@A]A[C[A_@Ew@A[C]?SCg@A]A[A[A]A_@A[CuAA]Cy@?]A]?[AAAw@AwAA_@A]?]Cu@?S?GAa@A]?Q?MAo@Ae@A[?A?YA]A_@?]AY?[?OAM?]A[A]?[A_@A[As@?G?WAK?SA[A]?_@Au@A_@?]A]?CAWA]?_@Au@AYAa@Cy@Ao@?KA]C[A]A[C[A_@C]C[A[C]C[AQAIGy@?AGy@CYE]C_@EW?AE]C[EYC[E]E]Kw@Ks@Ga@E[EYG[Mw@G[E[G[G[GYAIEQG[GYGYGYI]Qs@I]GYQo@K_@Qq@Ss@K]Ss@KYSq@KYUq@KU?AK[KWKWKYWq@KYMWKUIUO[KWIQACKWMW_@}@EIMWKWKUMWKWKWMWKWMUWo@Ym@Yq@MWKYKUMUKYKWMWKWKUM[IUMWIYWo@ISM]KWKYKWKYIYEGEQUm@K[IWKYUs@IWK[GQKa@IWIWCGe@aB?AIWKYI[IYSo@I[KYSs@Su@IWKYGYe@}AMa@I[_@mASs@_@mAK_@Qk@Ss@K]IUSu@Us@Ss@Ss@GQK_@Uu@i@gBSs@EMMe@Uu@Sq@Ss@Sq@Og@CKIYUs@Uu@Sq@GQM_@Sq@AAQi@AEWu@Uo@Uo@Wq@Wq@Wq@Yq@Ys@ISk@wAQ_@Ys@Qa@EKg@iAUm@e@gAYo@Yq@Yo@Wo@Yo@Wo@Yo@Wo@Yo@Wo@Yo@Qc@EIWm@M[GMCEWo@e@gAWo@Yo@Yo@Yq@Wm@Yq@Wo@Yo@Wo@Yo@Wo@Yo@Wm@Yq@Yo@Yq@Wo@Yo@Yo@Wo@Yo@Wo@CGQc@CEOa@GMUo@Ys@Uq@ACQc@CGKYUs@Ws@]eAUo@I[q@wBAGQi@?AMc@o@_CCEYkASw@GUIYUeAKa@G[EUCKGSOs@AIEQ]aBI]Oy@Ms@EW]gBAEU{AIa@EYCSM}@OcAIk@]gCCW[_Ck@uEUmBQwAe@{DGe@ScBS{AM}@UkBQiAKs@[sBOw@?CMq@SmAG[YwAWqA?C_@eBMo@I[]}A]wA[kASu@c@cBEOACOk@K]Ss@IWI[Y_AKa@]kACIOi@IWOg@?CcAiD?AIYSo@_@qAOg@_@uAGQOi@Oe@Kc@GUYcAYgAMg@_@yAGYWcAYqAI_@Ow@_@kBMo@_@mBOcAMq@Ks@YcBGc@EUCOE_@EYSuAAKU}AEa@Ga@e@kDm@kEOeAE]G[WmBk@eEe@oDEWKs@OkAG_@S}A?AAG]aCMaAOiAUwAKs@G[EWUsAO_AQ}@E[q@wDu@cE?CKg@cAwF[iB[eBW{AEUk@_DAGc@_Cc@gC?AKk@q@uDWuAg@mCUkAEUCGOq@I]Ss@CMI[M_@Oi@Ma@GQM]Qi@m@kBISi@cBWu@Wy@c@qAo@mBSm@k@iBGOs@{BQi@Uu@c@eB[mAEOQ{@Ig@]kBYaBIe@CSKm@?AOaAI{@CKMcAGm@Go@Eo@Ec@KsAC[Ey@A[AIGgAA]Cs@Aa@Cm@Co@EgACeAGyA?WAGG}BA]C_@?QIqBEaAIqBG}ACk@Ca@Ei@Cc@G_A?AGm@Gs@CUQ_BCSOeACS[yBG[Mu@G]Ic@Kc@Kg@Ow@q@oCK_@ESAEIWAC?A[gA?Aq@yBUw@Uw@Uu@Qi@[eAi@cBw@aCa@oAIS]cA_@iAc@qAIUo@gBWq@Qe@ISm@}Ac@iACGa@cAOa@GM]y@KUIUIQSc@GKKQKUq@uAYg@Q[KSWe@Wa@S_@OYCCMUS_@QYMWOUCGS_@Yg@S_@U_@?AWc@]m@Sc@MUEIUe@Sa@Se@O[IUCIO_@O_@Qc@Sk@Qi@So@Qk@ACOk@Og@Mk@GUESMk@Qw@Ia@Ic@I_@Ig@EWEWEYOgACUCQEWGq@I{@M{AEg@Gm@SoDSoDAOIqAKaB?IGaAIyAYqE?OG}@C[[mFCo@KyAEu@Co@Gw@AUC]AYEw@IsAMkBUqDOiCQ}CGw@IoAEm@?ACWIgAKgAAQMqAKaAM{AMiACWIo@OoAE_@SaBa@aDIo@MeACSE[Gm@a@eDAAGm@Y{BIu@[cCK{@MiAIk@?EQyACWCOK_AKaAC]Gc@C_@O}AKqAEg@Gq@G_AOoBAMMqBE}@Ek@GuAAYGgAA[Cc@Ac@Cy@Cc@Cy@As@C}@C_AAs@Cu@?ECgAAo@CwACuAAy@?EAw@Ac@Cy@AaAAs@Aa@Au@Ac@CuA?GCeA?ICo@Ai@?a@?EC}@AgAAk@AYC_AAqAAUAYAiAEqBAOAYCk@Am@Ck@G_AAWMuBGu@Ei@Gs@Iq@Gg@CSIi@CSCQCSCOM{@Mu@?CSiAAGIc@I_@AIQy@CMKg@GYKe@Kc@Qo@CKEQIYIWOi@CKMc@Og@K[Sk@GSM]Oc@[y@KWu@eBM]CGCGGMACSe@Se@c@cAWm@Wk@[w@g@kAi@mASg@KSWm@KU]{@GMg@kAGOGMQc@Ug@GOO]KUc@eAWk@Wm@?AWk@[q@Uk@IQMWQc@q@_BKUIQM[Ug@ISCGM[IQIQ]{@Sg@GIK[Se@GMKUISMYEMYq@O]KWIQQa@O_@IQO_@e@gAO[CEO_@O]y@mB[w@Se@Yo@GOi@sACG[s@O_@O[ISOa@KUSi@KWEOKYSg@Qe@M]M]GSKWUo@KYAEK[g@{ACIOa@W{@[aAMc@GQMc@YaAGUW{@K_@W{@Qs@Qk@[qAWeAMe@EQOo@Qs@CKMg@I_@I_@UcAI_@GYGYMk@]aBUmAI_@Ic@O}@Mo@g@uCMs@QgAOaAIk@G_@Ge@OeAG]Kw@Is@Ik@c@sDEc@Gg@AECSCSAQGk@E[Iu@Gq@Gs@I{@Gs@AGEo@E]AQCUGy@?GIkAEe@IiAMqBCi@Ee@AYAUCg@Eo@Ey@AYCc@EuACm@EgACk@?CAY?UCk@Aa@Co@CmA?WE}BEwBAsBCyAAiCAO?K?c@CaB?_AAa@?_@A}@Ae@?SAqACmBCyB?_@CiCAeBC_BAqAAgACwCCeDCmB?a@A]?e@Au@EcD?QAeBAsBCyCAkAAm@AgAAeACiCEaFG_F?KEsEEyD?_AAu@As@AiA?a@CkB?e@Aq@?SCaDE{C?ICwDA_A?KAgBASEkF?YC{AAk@Am@?[?AAc@CcAEoAAKA_@ASIqBGmAC]AUImAIoAGu@Eg@AMEk@Gg@O}AGq@Gg@Ky@?EOqAKq@Ec@EUKs@Ga@EYEUGc@AAIm@O}@Ke@AGm@iDUgAIc@O{@Ki@k@yCI_@mAoGCKE[g@iCGUIc@Ou@c@cCACIa@WqAMo@G_@GYQcAYcBKo@SoAIk@QyASsBGo@KiAG_AGeAG{@?CCcAE}@CeACy@Aw@Am@?}@Ai@@m@?kA@m@BeDB}A?O@_A@wA@o@?K@e@BkC@y@?E@[?UBuA@y@@q@?S?[B_A?_@B{A?u@@q@@o@@o@@g@?W@iA@G?g@?G@O@iA@m@?OB}B@Q?]BsBBkA?[@}@BiBDqD@}@@_@BeCFcFByB@W?o@@w@BcBFmFBiB@}@@{@@o@@gA@y@@k@BaBBuBDyC?y@@[?W?k@?O?sA?SAmAA{@Aa@GwBI}BCm@KwAIiAM_BEa@Go@AESmBSyAE[Ik@?AMaAMy@QwAQqAG_@E]Gc@S{AS}AOiACUQ{AQwAIy@?EIw@IcAGeAIoACm@EkAGyAA_ACkAAwA?}@?kA@mA?a@ByADiBBc@Bo@Bi@@GBo@Do@J{BB[DaAJiBDg@JmBBi@Bo@@EFuADs@Do@@SJuBHwAJqBH}ADm@LaCBa@D}@NwC@ML_CDs@Dw@FmADw@JgBBi@B[DaAFcABc@FiAJuBFgAHsANmCFoABe@Ds@JkBD{@HwAHyAH{AJmB@e@Bo@Dy@BqABcA?e@@}A?o@?cA?]Aq@AqAA}@Ai@IgBC}@Eo@G}@E}@CWIeAGm@Ek@Q_BCSQoAK_AIc@k@uDW{AM}@O{@CQg@aD[sBUsAEY[oBEYIc@Ik@CSCIAKGYIk@Ks@EQ[oBGc@Ie@[sBa@{BIi@I_@Mm@_@gBYkAIYe@gBg@eB]cAGSSi@a@gAGQQa@AEk@yAO_@IOIWMYe@kAUm@Uk@[w@[w@sBiF]{@i@yAe@kAc@gAQe@Si@Ys@c@kAGOKYO_@c@gA?AYq@Wq@Yu@KWKWGOs@kBMYCIO]g@qASg@GOKWUk@Uo@]y@EKc@gAAGCCM]AEm@wA[s@EMYo@c@cAm@oAO]Wi@EGQ]Yk@_@s@KUwAaCWc@IMyAeCWc@U_@Wc@U_@OWe@w@g@y@QYMUaBmCWc@Wc@Wc@SYQ[q@gAe@w@]m@CCWa@Yg@Wa@s@kAOYm@_Ak@}@Yc@k@y@eA{AEEa@k@[_@SWKMc@i@MOc@i@SWgAkAMOYYUWcAcAc@e@k@i@GGu@o@e@c@sAmAm@k@YUk@g@MM_@]GGoAiAk@i@eA_Aa@]]]{@u@cA_AUS_@[MOIGYWw@s@YUMM[Yg@e@WUiAeASQKIKKqAkAOOA?}@y@_@]WUc@a@[W_@]EE[WUU[YSQeA_AUUuAmAIIc@_@SSa@_@][MKw@s@WWs@m@KMKK_@]m@i@a@]aA}@u@q@eEwDSQsAmAAAWUCAACoAiAg@e@YWc@a@WUMOOMW[KI_@c@c@g@EEQUUWOS_@e@_AqAa@m@g@u@IMkAyBWa@O[IOWi@Ug@ACKWO[_C}FKUMa@Qg@IUQg@i@cBo@kBY}@Qg@AAIWu@{Bi@aBw@_Cu@yB_@iACIIWKWm@kBo@oBe@wAWs@Ww@Qk@[}@K[oCkI_AwCu@yBEMq@qBM]Uu@IWY{@[_ACI?AEOKYa@oA]aAUs@]kAQo@YgAMg@GWI[Oq@S{@Ms@GWG]Mu@EYO{@YiBEQSsAACGa@AIKk@ESQkA]sBE[Ms@E[UyAQaAM}@CMMw@SkAAEG_@AMG_@CGCSCQW{A?AIk@_@wBCWUuAIc@SsAIa@QkAW{AW}Aa@iCcAoGUyAKq@a@aCGe@O}@W{AE]COKm@m@yDo@wDCWUuAGYIi@?Co@wDSsASqAIa@c@uCGYCS[kBc@oCa@kCSmA[kBE]o@}DMy@ESSmAYiB]uBAGYiBkAkHe@uCQiAQgASmAM{@EQO}@QmAIi@QeAW}AMy@O_AM}@Mq@G_@?A]uB[oBO}@Mw@SqAYeB?Cg@yCSqAg@aD}@uFKo@Kq@W_Ba@}BkAuGWuACOa@wBACq@qDc@cC]gB?AIa@e@gC_AcF]mBGYACIi@ACSeAKk@Mq@SeAEOk@aDa@uBG[Ic@Q_A?Ac@aCMq@G[EQEQIc@_@sBa@uBCQi@qCa@}BKg@G[Q}@]eB[yAQw@a@aBYcAIYe@_BW{@i@}As@sB[w@e@kAEKw@gBQ_@[q@]u@KSGKo@iAUc@QY}B}DiB}Cg@{@c@u@MSq@kAU_@kAoBWc@S_@iAkB[i@O[_BmCQY{@sAOYGKEGi@}@KSKQQWy@sAo@gAo@gAGOa@o@a@q@CE?AIOEEeAiBc@u@EIEIOU_@o@MSWc@Ua@S]IOmAsBiB}CIMUa@Q[y@wAIMcBsC{AiCeAmBk@gAa@}@_@}@Yk@AEk@{AEOg@{AACIUQk@GUCIIYI[IYIYGWGWGUCQGUG[I]E[G[EQCOE[EWIc@Ky@Ea@EWAOIk@CWGq@Gs@KcAE_AGy@EwAAa@S{GWeK?ICcACk@E}BMcFEqAA[AW?IA_@E{A?SIiCAa@Ac@CkAC_ACk@?a@C[?YEgA?[Cg@?[Ag@Cw@AOGmCAe@AUEeBCe@Cs@Ag@Ca@Gw@AUEe@IkAAAGw@_@gDc@gD]qBY}ACMACe@_CAAAIGSOk@CMQm@Og@I]Uu@[iAOc@e@uA[y@k@wAWk@O[O]IQISQa@GMIOS_@Q]k@gAa@w@qAgCMW[o@mA_C[q@IM_@u@[m@q@sAm@mA]q@IOO[EIy@cBq@{AGKM[Um@a@iAUm@i@iBMa@Oi@U}@Mk@AGOq@Q}@GW]mBKs@Mu@QkAMu@Ig@Ii@UyAW{AIm@AGOaAUsA[qB?AEYKm@k@sDMw@i@kDG_@G[o@_ESqAE[UsAa@kCCMSsAIc@e@yCSsASoA_@aCAEMw@Io@Kk@?AKm@SsASgAAKk@sDQeAGe@W_BSsAIe@UuAQgAYmBQgAm@wDCMQmAMs@k@wDG_@Kk@OcASqAQgAKm@Ik@CICSO}@[oBE]YiBE]My@M_AK_AI_AIy@KeAA]CWIyAKaB?EG{ACgACeAAo@AiC?[?[?q@?E@a@@w@@o@?A?C@k@?E@c@B_@@k@Bs@@Q@[BYBi@Fu@B_@BW@Q@KB_@?ABWBWJ_A?E@CBUDe@@I@ORiBNoA?C@KJ_ANwA@KHq@NuA@MDY?IVwBHu@@KBO@MBQLkAD[Fo@D_@@QLiAFq@BKFs@@QBO@O\\{DDi@PuB@ORaCFm@BWHgATmCPwBBWb@kF^mEV{CDg@?EDa@JkANoBDk@TmCTqCFm@@I@Q@MVsC@O^oEFw@VeDHaADc@ZwDF{@JcAD[Fs@HkABOHcAFw@H_AFs@De@Di@L{ABWJkAH_ABa@D_@Di@De@Di@B_@Fg@FaAB]?CB[@YBa@?AB_@Be@@Y@S?QBm@?E@i@@q@@Y?W?]@W?a@?g@Ag@?E?u@A]Ae@AYAu@A]G{AEk@G}@Ca@AQAGCUCWIcAGk@Iq@EYAGE]Gc@Ik@Ki@?AG[AOG[EOESGa@Ia@GUESKa@Oq@WaAMc@GSEOIYCGGSK]GQQe@K]ACO]Qg@O]IQM[O_@O[ISS_@MYQ]IQQ[g@cAy@}AYi@Uc@S]MSSa@OWGOIOIQKSWo@KSISAEKWO[ISIUISUq@Y{@M_@IWGSSs@GYEOGUOk@I[Ki@K_@O{@Mo@Ii@Kk@M{@G]Ec@Ga@Gg@Ee@Gi@Ei@Gs@IeAIiACYIgAIgA?AMqBGo@SuCC[MwAGu@?GIu@Gi@Is@Ii@E_@SyAMq@SsAQy@AGUkAWgAMo@Mc@e@iB_@qASs@EMkAkDy@uBw@gBo@sAAA}AuCOY[g@Ua@AAg@u@KQIMSYm@{@MOa@i@_AsAw@iASYe@m@}@oA[e@CCs@aAU]_@g@i@u@SWS]_@e@MSW[]e@CE]e@_@i@Ya@IMm@y@]i@IMa@q@U_@c@u@c@u@Ua@_AiB_@w@Wi@M[Sa@O_@Sg@s@gBEKGOAEa@gAOc@Us@EMQg@?Ao@iBWw@Oc@K[CE[aAOc@Yy@]eAM]s@wBACk@_BGQc@sAEKQi@So@Uq@a@kAYy@Ww@]cAUq@eAaDy@_CGSYw@EMIWUw@y@iCQc@Si@Ma@Ys@i@_BIWY}@q@mBa@qAm@uBMa@e@qBGUQs@AGOq@ESIa@WwAUoAYiBWkB?AUmBQgBKcAQ{BAM?CEu@Es@E}@Ca@AQCy@Cq@Ao@CoACwA?o@?O?_C?E?aA@aA?i@?[@y@?M?k@?_@@o@?m@?cA@gA@{B@yB@{A@o@?EA{A?o@?i@?_@?[?QAYAaA?GEwAA_@Ag@AQE_BAECm@Ey@Ee@A]Eg@Eq@Gq@AMOsAGu@MiACWCUCSACGk@EW_@_DEWCU?CIo@OgAGi@COGm@AIGc@AMOmAIk@CQE[Gk@CSE[CSIm@EYCSCWEWCYCSIo@E[c@mDCQE[E]?AE]ACAKAKAGOiA]sCm@cFIo@McAS}AMmAIs@Gs@K_AC]IiAACGcAEm@M}BQeFQkFQqGGwCG_CEkAGeB?MEu@EoA?ECg@OkDA_@A[Aa@A_@A]Aa@Ac@?W?a@A]?a@?S?I?U?Q@q@?C?[@c@@y@?[?C@_A@U?I?_@B}A?[@c@@_A?a@@]?K@S?]@]?c@@[?_@@a@?]@_@@}@?c@@w@@g@@_A?Y@a@B_B?_@?O@I?_@@a@?_@?_@?[Aa@A_@?GAUC_@AMAQC_@E]E]G_@G_@G[I[I]GUCGIYKYIWM[O[KWOWMUOYOW[o@KQcAkBIM]o@]i@Yg@OYMUMUMUMYKWKUYu@KWK]IUIYIWI]IYG[G[G]EUI]G]EYG]E[EYG]Ia@EYIi@AGG]G[E[G]E[G[G[G[GYESAGG[I[IYI[IYKYK[Uo@MYKWMWCISa@OYMWEEIOMUAAIMAEKOq@kAOUMUMUCCKQMUMWOUACIQMWMYCEGQKU?AMYIWK[KWI[IYACGUG[IYGY?AG[GYE]G[?CEYE[CUEc@E]?KCOA]C]C[A]A[ASGiA?CIuBAOGgAIwBAUE{@A[A]C]MsCEeAEmAUmFGqACq@C]AOA[A_@K}BCm@Ca@EaAMqCCs@Ck@Cs@A[Au@C}@?CCiAAkAA{BAg@AkB?CCy@Cu@C_@AYIqAAUKoAMsAIiAGm@C]CWGaAC[IuACc@IkAGiACq@E{@AQEeAE_AC[C{@AUGoAKkCKuBCu@AGCo@AUCg@Ac@GoAC_@Cm@Cs@AQEaAAKCi@IyAEo@I_AAYGg@Gy@AGIy@MoAM}@AGASG[E]AM]aCe@eD]iCGYMcACQKo@AOQkACQYqBQoAKw@Gg@Gk@C]E_@K}@Gq@Eu@KwAY}DSwCKsAIsAG}@CQCe@AMKuA?EOqBGcAEa@YyDKoAMyAWiC?AK_AIu@S}AMeAEa@M{@Im@Ko@Is@Ig@ESM{@Ks@O{@Ms@SmAMm@Ie@AEOu@UkAa@uBWoAg@gCOy@Qy@WwAQy@Ki@Ki@y@gEKi@ACCQCKMm@g@gCIc@WqAUsAEYKi@Kq@G_@U}A?CIi@AMCMEYCYE]OcACWGc@EWEa@a@_DM_AWqBM{@?CGg@Io@CSS}ASiBC[MmACQIw@Gw@Ea@WeCCUKcAIy@Ky@K{@QyAEUIo@Ky@Ge@WoBG_@QsAKy@E]My@Gi@Ik@Gc@AEIm@C[G[Kw@E_@Ik@AIKy@Iy@I{@Gw@Ei@AYC]AWEyAAg@?SAU?m@?U?]?e@?W@w@B}@?g@@i@@{@?Q@g@B}@@w@@{@@{@?AB{@?g@@o@Bo@VqQ@O@_BBuA@m@@c@@aB@oA?w@Be@?}@?mA?iAA{@A}@CqDKeIC{BAs@?s@WmUAcAAaAQyPAgAAsACmAA{@?_@A[?g@Aq@?]Cy@?]A[A]A]A[Ae@AWC_@A]AYG_AA[OuBGw@G_AA[AAAWC_@A[C[EuBA_@?a@A[?{@@[?[@[?a@@YBy@D}@Do@?EHcAB[Dw@Dk@Do@@SBa@JyAJ}A@YToDNwBFy@@WN{BLqBPoCHkADq@Fw@?EF{@BYVmDBa@XaE?EL}A@U?CB[B_@VqD@SXuDLsBF}@B[Ds@Bc@?ABa@@e@@m@?w@?}@A_@A[?YAYCg@Gu@A[E]CUCUAOE[Io@G[CUEUW_BAIEYKs@Ga@G[CYMy@AKAOE]CS?GIs@C_@C]AYC[A]A[C_@A[?_@AU?SAi@A]A]?[?_@?[@]?]@A?[@Y@[B]B]B[BWBY@IB[@IHk@H]F[FUBKBGBKHW@ABGDKDIFMJSJQDIDGBCLSNQDGDG@?@CPQPOBCHG@ADCHGLIDCZSRI?AXOVMl@YBCh@U^OBC^SROPMJIFENONOLODENSNSHKBGNWDI@ADIP]JSJUHUJUFMDMLYN]HQJWHQPc@Re@JU?AFM@EHQXo@\\w@BIJUHQ?ALYJWFOFMFQ@CDI@EFMFSBGDKHW@EJ]H[DM@GFSBI@GBIBOBEDSDMDKJ[L]Na@DI@EZq@@CHQz@iBz@iBJS@CRc@HQHSDGJWBIFMHSFOBG@CNe@J[DKHWBMDKRu@BOBGF[FY@AFWDSFc@DSJq@@G@EJq@D_@D[Da@BU@IBWBWF]BWBUToB@KDa@ZqCBSLmA@ED[BUD_@?AJy@Da@Hs@D[B[DWB]Hu@@ID]Hy@@U@ADu@D}@Ba@@U@]?[@I?Y?]@[?[?a@Aq@?[?uA?CAm@AyB?A@O?a@Ak@?]?[?]?]?[?]?[?]?]?]?[A]?]?[?]?[?W?UAcI?I?]?[?K?G?W?wA?GA]?]@]AO?O?a@?s@?Q?g@?s@?[?_@@Q?c@@[Bm@@U@I@WFy@BUDUBg@B[@U@UBeA?W?E?Y?YCkFA]A{@AsECyF?q@EeK?[C_B?g@?yA?y@?{@EqFC}BGoGAaBAq@EaE?A?o@C_B?q@?}@?uB?u@?_@?qBAiA?q@@qB?U?E?]?]?uA?W@c@DuAB[JyABY?IBS@[B[B]B_@B[B[@[B]B[B[D[B]BU@ER}ABQD[FYD[D[F]RqA@KPcAD]Fc@L}@RyA@EL_AX_CE_@@Q@UJ_BDoAB{@@Y?k@?OCy@Ce@Ea@Io@UaAIWSg@GUGIMUMQOSSQUWKIECQIMKAAOIICECKE{A]_@IAAc@K_@IkBa@UIA?QGA?S?KEKEk@Wk@Ua@O_@ODW"
                          },
                          "start_location": {
                              "lat": 40.7569006,
                              "lng": -73.9902798
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.35041529999999,
                                      "lng": -71.056214
                                  },
                                  "name": "Boston, MA"
                              },
                              "arrival_time": {
                                  "text": "8:25 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700357100
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.7569006,
                                      "lng": -73.9902798
                                  },
                                  "name": "Port Authority Bus Terminal"
                              },
                              "departure_time": {
                                  "text": "3:30 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700339400
                              },
                              "headsign": "Boston",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Greyhound",
                                          "phone": "1 (800) 231-2222",
                                          "url": "https://www.greyhound.com/transit"
                                      }
                                  ],
                                  "color": "#004963",
                                  "name": "\"New York, NY - Boston, MA\"",
                                  "short_name": "\"Greyhound\"",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                      "name": "Bus",
                                      "type": "BUS"
                                  }
                              },
                              "num_stops": 2
                          },
                          "travel_mode": "TRANSIT"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "siwwFffrbMmPfm@{EfOsH|@aIuJmc@wX_RyFweAws@g{@yc@mpCcfBugBymAwlBal@kvAq|@kiAk|@kcA_kAm]}O}d@}D{J}k@lHwj@kQue@ug@aFs|Aa]gg@mNuFgOqQg{@nOwm@h^gcCp[caCyo@mm@cf@wJkj@o[od@y[kd@`CeYsVaq@szA{[exAe\\om@q@kj@o^u_@mN_f@ea@ca@o{@{w@wc@kb@qfAoZw_@ob@aMgo@vDkr@_Wgc@_Qqv@yu@ea@oi@aYmWjJq}@xVi`Aqa@ot@iMwl@qW{\\od@a^m`AaJav@vTif@d[mf@}Hgu@wj@mdBkLezAmJotB}k@_|Acj@goBqNozAfGakBvD{p@kKe~@{i@uzAcx@o|Aot@ciE}pBqmEgMir@TelAiIs_Bug@eoCcSecAu_@uh@yl@mt@sW{u@mUwlAqY{}@kkAaeAcpAobAee@ayAmHcnBwL_xBuMqrDyC{xEqu@c|FkE}hA_V}l@ogAimAc`E{dDcdAgRen@mf@ab@_gCaj@shA{dBmwBy`A{iAySu`Amp@ccCeSe`Ay^on@mr@w|@{e@{oAqf@muAwc@ei@g_Amz@asBsh@kmBsv@k|BqlAgaB}|@i`AifAkeCgsDsaA}hAgq@wH{c@i_@}n@gnAe`Ako@__CkoCacAos@cn@uOolBs{@ykDcoBkn@em@_|@uRepAkm@_bA{x@{dBcy@wf@eEe~@fRyhAb_@gq@faAyt@tBqw@o`@gi@zVwWfa@eOlt@{LlNsFfHqLbH|C|E_@|UdKdA}TcWcGoWnGqe@zJgwAfPi_AdGwkBgi@otC_NgbBgCsaAgV{n@osBevAod@}k@iJqz@{YwjA{f@ycBer@ujAgWy_B}|@_iD{}@{lBas@cqAxBqpAoGenAdKmcAsQ_bBs`@y`A}hA}`Do_BgrEg|AqkDeoBaiBor@ewAwp@aiBuz@stCw|BijBkhG_xDkp@oe@gr@ylAmqBcnBk_Ea`D}`D_iA{nAsc@uj@yn@al@gr@ySyaAcu@{hDyk@}bBef@a}F_`CggHogC_eNy]k}@iTcnCsHacBuQ_iAecA{rCeRsmG_WekBOcsBuHyjCtK_mCqVkyBul@qyAycAwsAieAk`Aox@sqBi^upBei@egDyl@miC}dA{jBuKqgBqe@ueBgb@}}ByNwiBvO}cBpL}eByT{_AoUyrAmx@i|Aem@moBiEyfBgRy}Dii@mfBwW{kE}o@weFPolGQktAzNua@te@arArCqjE|GaqAcX}R"
          },
          "summary": "",
          "warnings": [],
          "waypoint_order": []
      },
      {
          "bounds": {
              "northeast": {
                  "lat": 42.35141,
                  "lng": -71.05542
              },
              "southwest": {
                  "lat": 40.7569006,
                  "lng": -73.99999249999999
              }
          },
          "copyrights": "Map data ©2023 Google",
          "legs": [
              {
                  "arrival_time": {
                      "text": "8:40 PM",
                      "time_zone": "America/New_York",
                      "value": 1700358000
                  },
                  "departure_time": {
                      "text": "3:00 PM",
                      "time_zone": "America/New_York",
                      "value": 1700337600
                  },
                  "distance": {
                      "text": "230 mi",
                      "value": 369883
                  },
                  "duration": {
                      "text": "5 hours 40 mins",
                      "value": 20400
                  },
                  "end_address": "Boston, MA, USA",
                  "end_location": {
                      "lat": 42.35141,
                      "lng": -71.05542
                  },
                  "start_address": "New York, NY, USA",
                  "start_location": {
                      "lat": 40.7569006,
                      "lng": -73.9902798
                  },
                  "steps": [
                      {
                          "distance": {
                              "text": "186 mi",
                              "value": 299093
                          },
                          "duration": {
                              "text": "3 hours 35 mins",
                              "value": 12900
                          },
                          "end_location": {
                              "lat": 41.824893,
                              "lng": -71.41701399999999
                          },
                          "html_instructions": "Bus towards Providence (Bus Terminal), RI",
                          "polyline": {
                              "points": "siwwFffrbMsA}@e@xAYz@q@vBAHADs@|Bu@zBMZ[~@Ux@ENQf@Ur@cCrHa@nA]fAoAzDIZOd@Oj@e@tAOJKXe@zAM`@Od@ITSn@IXKXQh@GPGXMb@g@|AM^Y_@c@u@m@y@OWkAgBKK[c@IMQSSSSSMMMMEEIEMKMICCAAg@]QKm@_@q@c@MKMIq@a@o@a@KIQKo@c@mAw@cBiAWQECaBiASMWQkAu@YQa@W{DiCKGEEIE[OQISISIOEA?KCSGSEEAKCe@COAA?m@EOAq@EQCMCQCA?OEOCOEMEQESKSIAAGEKISMYQQMeAq@EC_@WCAMICCWOUOSOe@[c@WCAu@c@ECeAk@ECUOc@UGCa@UGEIGCAECSOECOKCAc@Ye@[e@[i@]i@_@c@WAAwCmBEE[Se@[wDcCWSWQMG_BgA_@UIEa@Wc@W}@o@iAy@kAgAGEUUEGi@g@{@{@ACCAOMMMoCiBEC{AaAg@]_@Wu@e@w@g@eAq@c@Yw@g@{@g@i@]MIo@_@cAo@a@Ue@UGCOGQIYKKGWKWGc@Oe@O[IMCWGm@SgAYCAkA]KEKCSGcA_@y@Yk@UICKGSIi@Wu@]OGSK[OIEMIi@YMGc@W[SSM_@U_@U_@UYQc@[MIIGg@_@]WYS{@s@ECq@m@MKQOe@e@UUMM]_@i@m@]c@_@c@a@i@QUw@eAk@w@g@o@_@g@o@q@AC[[YWQOWSYQOKMGKE[MQIKC_@Mk@QoA[MEKAaEeAe@Mc@Kk@Oo@SKCA?o@W]MQIGC]OCAQKi@Wa@SAAs@_@KGc@UMIiAq@IGi@[o@a@k@]mAw@_Am@y@k@oAw@a@Ym@a@m@c@yAeAq@e@WSe@[g@_@o@e@cAs@g@_@_@YYSc@[gAs@s@g@e@[{A_Ay@e@_@UcB_A{Ay@UK]Sq@_@a@UOIUMYQ]USK]U[Sq@c@c@[g@]aCgBMIkAy@QMSO]Uu@e@UM[Q[Ow@_@WMOGo@Ya@Q_@OECUM]Qa@W]UAAm@c@_@Ya@[EEc@]WWIIa@a@i@i@A?sB{Bs@s@IIw@{@}@{@OOcAaAYUYWw@o@_@]a@]q@i@QQOMUQMKSOOMCCSQOKQMQMQMSOUO[WWQUOKI[Ui@_@YQa@[QMWQe@[a@Ym@c@AAWQ[UIGk@a@i@_@_@Ye@[UQk@a@MMu@m@OMOMUSKKe@a@OMWWc@_@]]c@a@ECk@g@[[][USGGIIa@]SQSQOMQQSSYWk@g@WUc@a@QOMMOMQQAAOMQOQOQOQMSOQMSMSMSMSMQKc@WYOOIWKGCKIYMIC[Mu@WSIUGi@Qi@Ok@MWGe@KUEo@OKAICkAU[Gc@Ic@IWGMCGCMCMCOCYGm@Kk@Km@MEAMCICwBc@}@Qq@Mg@Kg@KYGWGQEOGEAWKECSKKEIGECIGMIKIIGAAKIe@c@EEYWa@a@yAsAQOOOWS][SQKIWUOKUQSOa@[WQWO_@Se@Y]Qi@U[Oi@Se@SYKe@Oc@MYIQIy@WQSMGWKIC?AWKQIi@Ue@Sw@_@OGQIAAKEIIECIECCIIIIAA?AEEMOQSEGQSGGGGKMKIECKGAAIEAAACCCCACAg@OeAY}@OUCg@I]CUASAOAM?I?I?Y?Q?c@CY?AAC?K?QAKAI?KAEAEAE?g@IA?KCm@KSCUEg@ISEC?A?KCEAMAOESEOCMEIEMGGCEEECCECCCGGMEQAIAEAE?E?GAK?M?M@SDe@B_@BSDm@L}B?QR}ALaAH}A?ABU@M@IDg@PuAD_@Da@F_@DUBWBODUBMHWDMPk@Ne@Nc@?AJ]FSHWRk@?Ab@uA`@kA?A@ALc@@CNc@Pi@@CVs@Ne@Pc@BIL[?AVm@@APi@@?Vw@HUNi@FQL]?AN]J]Ng@JWBIBG@GJa@@OBODe@?]?M@o@@g@@a@@[@c@NkAHk@NeABQ@I@EFc@@GDYDU@M@CNaAN_ALIBCFMHODGBCDIHKHKFIHKLOHKJMFI@AHMFMFMFODQBO@I@I?M?G?OAMEWCMEICGEGEEEGGGCACCIEGCGAICE?EAG?G?I@G@IBG@GBGBGDGDEDGDIHYXURGDIBI@I@I?K@G?GAGAEAGAGEGCe@UOGQISMECUMm@[AAk@]_@UQKOKIGEAq@e@YQ}@s@g@_@c@_@_@[[YEEIKg@a@GEe@_@MKQOA?OOQQOMWUCCc@_@y@s@mAiAw@q@KKSOMK]YQOAACAGAKA}@w@s@q@}@y@MMsAmAaA_AUS][SSm@g@SSIG_@[CCGGGEQMMKQMe@[SMSKSMSKSKQKOGECSISKSISISG?ASGUISGUGg@QUGSGUISGKCgA_@GAKE_@OICQIg@UUKOIGEe@YMKSMQOSQOMQOAAOOUWk@s@m@{@a@k@MQMSm@{@OS]i@]g@OUOSOUOSAAKQOSOSEIGIOSOUMQAAOSEGu@cAg@s@W[_AeA}@eAcAcA_@]c@a@a@]e@_@OIWQg@]IC[Ss@_@i@YoAi@IEUISI]Mq@UUIQGg@Oi@Qi@QSGeA[CAWIYK_@K]KcA]]KGCOEQGAAe@OUIc@OYMi@Q[MKEmCaAoAc@}@]}@[oAe@s@WEACAUI_A]iAa@EA}Am@GA]Mc@Qk@WAAcBs@SKQIWKSKYKYMGCKGUIEAe@Sc@OA?e@QQGYIKCWIc@Ku@SuA[s@QAAMCKC_@K_@K[KSIGCWMOIi@[SOWSWUiAgAsBkBSQSSGGc@a@a@_@CASQMKUQ]Y_@[y@q@MKKI]YECWUc@]OKQOc@_@MKiByAGGSOu@m@{AoAQOMKUSIIk@i@CEKIQSOQQSMOOS]g@OSOSGKSY_AsAOSGKEGa@m@GIEGOUAA[g@IKQY_@m@EGGKQ[IOMSCGUa@KUKSMYGMISUo@Qc@KWIUIUQk@IUCKEOIUIYI[Qo@WmAGWEUCKEWKi@Ig@G[E[AKCOGYE[E]GYAMCME[GYCSESY_BG[GWQq@I_@K[GQM]Sk@IUKSKWWk@OWMWMUMSW_@GKe@m@GGg@o@GIg@k@o@s@i@k@OQ[[QQSUUUk@i@g@i@SS_@]OOaA}@e@e@g@g@c@a@eAaAKIQQEG{@w@k@i@eBaBSQMMu@s@_A}@GEm@k@YY_@[c@]qA_AOKg@WSKUMQISISIUIQIECe@MSIOGICGCYIUESGUEUGC?OEUCUEUEUCUESCaAIuAMUCUC[CUCSCC?QCUAUCUCUCUCUCSAk@GUCUCUAgAKe@EUCSCUCUAUCUCGAMAk@Go@Ge@E_AIUCUCUAMCG?UCYCUCUCUC]CUCUCUCUCSAUCUCUCUAAASAUCUCUCUCUAUCUCUCUCE?OAUCSCUCI?uAOOCUCEAOCUESEEAQEUISGECOEUIWMOIYMa@U?ASKUQQMQMQQWSKMSQOQQSOSQSa@g@OQOSCEMMOSa@g@OOAAOSECKMQOQQSQQOQMWQMKSKSMSKECKGg@YSKSKSIQKSKQISMSKSISMSKSISKSMSKSKQKSKSMQMSOQMCCMKQOQOQQQOOSUU?A[_@SYQQGIa@m@i@u@qAoBc@m@MSc@o@[e@KOYa@gAaBMS[a@QYa@m@OUKSWa@?AOWSa@Sc@IUKWO_@K]ISAEQo@Qm@Oq@IWAKQm@EOEUEM_@{A[oA_@}AMe@Ke@Om@K]EQAGEMWw@Sk@ISGQEIEKMYMSMWMUMSOUMSOUOSOQeBoBOSgDyDQSQQOQq@w@QQQQOOSQOMGGAAOMMIQMSOMIECSKSMSKSISKQIWISISIUGUGSEg@MWEUCSCWCi@GkBSWCmBSyFk@cD]k@EsBUw@I{AOIAaAKq@GmD]mAMq@IOAGAw@Is@Ie@EQAKCg@EUCQCe@EkAK_AI[CMAaAG_@Ca@C{@ES?[AGAYAY?i@?oAAwA?kA?gA?wAAk@?E?]AEAc@AGAwAKCAe@GWCq@MMCOCA??AWEWIUGa@KCA]KKCUIa@K{Ae@UGqAa@k@Oe@OGCKCYIMEGAi@OMCYEIAq@KQAWCm@Eo@Ag@@]?U@w@FE?WBk@HODo@L[Ju@TODm@V[Nc@Ta@VOJA?[T_@Xe@`@QPg@h@GHSRo@x@OVk@|@GHU`@q@rA]t@[l@cApBGNS\\Ud@EDMV[f@a@h@OR[`@QRe@d@ONGF[XIFIFUPQJOL_@TOHKFg@Vs@XA?YJA@UHQDGBA?KBIBI@GBg@JUBQBUBSBQBK@M?I@E?G@G?I?G@K?I?I?G?O?KAO?I?I?CAE?K?UCKAI?GAGAG?GAKASEUCSESEWGAAQEUGQGICKEOEAAGCICGCKEIEKCIEGCKCOGMGICKEGCGCOEQIECC?GCOGEAOGA?SGKEKEIAICMEICICGAUE?AUEKCGAKCMCOCUCSEE?CAIAG?EAGAGAC?EAKAK?KAIAC?CAQAM?KAK?IAA?O?CAI?E?G?M?SAG?e@@E?O?e@@E@G?G?E@G?I?G@I?K@A?O@I@QBI@G?C@E@E?G@I@G@K@E@M@MBIBI@KBQBC@KBI@KBKDG@IBKBOBKBKDSDC@i@LQFUDMDE@UFSDUFUFSFUFUF]HKBUFSFSDUFODE@SDsA\\KDI@UFIBIBKBI@UFSDKBI@SDWDQDWBSBI@OBU@I@K@K@K?S@Q@O@G?U@Y?Q@O?E?U?YAQ?YAOAKASAKAWAQCYCSCYEQAKCKAGCC?CAIAEA[GWGICA?EAICMCICGCGAOGQEKEICICKEWKOGYKOIECOGQIECOIOIGCKIGCMIOKIEa@Y_@YGEOKQMQMeAy@aBoAe@_@c@]cEaDg@_@YS]Wq@i@mA_A_@YQOOKw@k@ECc@YyBuAIEWO[SA?_@SYOIESKiAk@{BaAgAc@SIWIe@SGAg@QCAw@Ug@QUGu@SKCi@MaAUeAU_@IuAUsASOCkAOgAKE?m@G{@Gy@EKAA?u@CYAuAEkAAc@?gA?I@O?e@@A?i@@K?}@BU@k@B[Be@DaAFI?iBNsAJa@BYBE?cBLcEXk@DYBSBk@D[B_@BC?W@K@c@DO@U@UBK@_@BS@QBY@M@G@WB_AFS@UBG?M@U@UBo@BE?]@U?W?U?S?SAWAM?G?IAK?IAKAUAUCUCQCG?IA[EYEQEUEUEA?WEc@IWG]Gs@OUEo@KQEQEUEWEUEUEUEQEWGSEWESEUEg@KWEUEWE[GKCSEc@I_@IYEQEEA_@GUEICKCKAWGMCOCUEUEYGOCSEA?OEWEWGWE]GEAm@MQCWGUEYESEKCeASC?[G[GEAYGOCcB[gAUOCm@KUE[IQCUEg@KWESEKC_@Gk@MUEw@OQC]GYGSEUGWGSEQECASGQGOEGCSISIQGAASIUKIEICSKSKSMUMQKSMECKIQMQMMIIG[WYWQOMMUQKIEEQOQQQMSSCCCCIGOMAASQSOOKe@YIG]QUMGEIEUMECKEGCMGICIEOIKCIECAGAIESGIEGAUIUGSGUGOCEASGSEWESEUCUEE?OCSAUCIAKAUAWCUAUASAUCK?KASAUASCSAWAG?OAUCSAWASAWCQAWCWASCSCA?SCUEWCSEUCSESEWE_AUUEICICuAa@SISGu@Y]OOGUKWKUMUKOKSIOKGEKESMSMSMCAOKQMSM_@WECQMSKSOQKOKAA[SOIQMQISMQKOIYMSKMGKEGCKEQGSIUIEACAGCKCICECKCUGUGUIYGOEA?MEYIQEk@OSGUGUGSEUIC?QEWIQEQEUGUGWIA?QEQGSEMEe@M]IICMCKE_@ISGKCYIgD}@WGwCw@WGoD_AgEiAKCo@QaAWi@O_A[QI{@]k@YKECCYOe@Yw@g@wCqB_@WUO[Uc@Ya@YMIWQUOe@[SOKIYQ_@WAAk@[WOYOAA]OSKQG_Aa@CAa@Mi@QUGUGi@MSEUEg@IUEOCYCa@E]Ca@E]CwBQWCm@EkAI_BIYC_AIaAIc@E_AI]EYCQCk@I[Gi@KOEMCe@M]KWG]Mk@U}D}ASIeBq@g@ScC_AyAg@c@K_@KYCSEUEEAMCUEUEUCSCUESCE?QAUCUCUAUASAUASAE?Q?UAU?U?U@U?U?U@S@U@W@UBU@UBSBWBUBSBSDWBSDUDUFUDSD}@TA@SFA?OFSFOD[LQEA?mC~@QF_A\\ODOB?@QBO@K?K?E?GAMAQCEAOGCAMEECECECECIGCCCCECEEKKIEGEGIGKEGGIGMEGCIIQEMEKEMCMESG[EWAGEWEUGWG[GSEOIUAAK]KYc@mAAAA?MCQk@IUIYGUI[IWI[EOCIGYG[GYEQCKEWG]G]E[CUESCUCUC[C[?ECUCa@AYAY?SAa@A]?]?[?_@?a@?O@]@[@U@E@]Dq@Bc@BW?E@[Fw@@M@MBe@@S@UFw@@]B[B]BYJiBLoBBi@Di@HoA?ABm@Dg@Bg@B[@YJ_BH_BJaB@ABg@@OTaEDy@J{AH_BF}@F}@Dq@Dm@Ds@@]BWBa@D]@SJy@DYDYF]Fa@DSJg@Lk@HUJa@DKJ]J_@JWDKDKJWHUDGRc@NYLWLUJQ@ANULUNQFKDGNQNQTY\\]PSTQBCXWNMJGDEROPKPMRM@?PKVK@A^QZMLEh@Qf@OTIRGRGDAv@WXKd@Of@ORGh@QXId@IVIPGRILERGTKRGTKTKNIRITMRKb@WVOPKRMPMPMRO`@[TQNONMRQFEHIPQPQLOPQNO@CPQBEJMNSLOJMDGPUl@}@LQLULUNUFMBGZk@NYJUJWLU@EHQJYJUJYJU?CHU@CHWJYDOBGHYHYHWH[FYFWHYP{@FWDYF]FYDYF]DYD[D[D]BYB]D[B[B_@@G@Q@[B]B_@?G@S@Y@[By@?_@@[?uA?A@_@@U?_@DwB@{@@u@@QBqA@s@?E@{@By@B{@Bm@?OBY@]BWB]B[BYD_@B[D[D[BYDWDUD[Ls@F[F[FYFY@EFUHYFWHYFUJ]Pi@f@uA\\{@JUN]lAkCb@}@b@}@Rc@JWNWHSJUN]?AHQVq@?AHUHYNc@Li@H[FYFUHa@F[F_@Lw@BKHy@D]BYBc@Da@Be@@i@Bc@@Y?I@w@AwA?AAeACc@Cq@AGAUEk@C]IiAIw@Ee@CUEYAECYIm@CYCWESCWMw@Iq@CIIm@Ms@AGQiAIc@G_@ESIc@CSWyAMq@Oy@Ow@Qy@Mu@Qy@O{@Qy@Ou@Q{@Oq@YsAI]Os@g@}Bg@yBMk@Mk@c@kBYoAGYG]EUACEYG]EWCOAMC[CSAGC[A_@CYA[A[?]A[?[@]?Y?A@[@]@[B]B[B[D[BYD[@EDUDUF]FYFYHY@AFYJWJ[JWJWJWJWLULWLUJQNUNULSPQNQNQPQNOPORORQPKRMPKRKRKRKRKFCHERIPI|BaARGTKTIJEFETKRKRKTMPKBCNKPMNKVSRSRQHKRQPSNQJMHMBALQNULUHOLUJOJUHON[LWL]L[HUJYPk@Po@J[J]h@cBJ[Vy@DQJWHYHUJULYXo@Xk@NYBCJSLQNU@CNSNQHMDEPSLORSFGJKNOZWHGLKBCROTMPMBAb@WFCJGTMPIf@Wh@Sb@Ud@U\\Qf@WRKRKRKRKZOj@WZQf@WPKHGJEDE`@WXWHEb@a@TUPOZ]`@c@l@{@Xc@\\k@LWHMLYN]JSHSJYTk@J]L]DODMH_@J]H_@H_@Fa@H]D]F[?CFa@B]Da@Da@FiAFkA?E@_@@a@@s@?S@YByABmA@[@y@FsCB_B@m@@K@c@DyADo@Dy@Di@L_BNuADc@D]Jw@RoAN_A?AHa@Jg@Nu@Nq@^}A`@{ANi@\\gA`@kAZ{@HQTm@p@{A\\w@BKDIBGDIDIRg@LYhAmCh@kAHU|@uB`@aAh@kAj@sAZs@Xq@Zs@v@aB\\o@\\i@Zg@^i@^g@`@g@`@e@^_@`@a@`@_@`@]PMNMb@[d@[b@Yb@UrAs@hBaAhAo@HEzJmFz@c@dDgBXOHGj@Y\\Qt@a@l@]dAk@p@e@TOVS\\Yr@q@FGNOLOLOFGRWT]DGZc@DIj@cALUTg@N]Vm@Vs@Pi@@CRq@H_@Nm@H_@FW@I@EJk@Hm@Jy@?AFe@Ba@BY@SBWBk@Bi@@U?[@q@?a@?[?]?o@?O@g@?c@?W?wA?{A@qA?C?C?kA?O?A?m@?o@?A?A?o@@i@?O?_@?A?aB?k@?q@@uB?aD?C?m@?o@?A?k@?S?C?[@]?G?C?C?i@?W?a@?y@@_@?Y?W@a@By@@m@?A@I@g@@O@YHuA@K@G@[JiABY?CBQ@OTkB@ONgABKJu@F_@Nw@DWH]Ns@ViA@ELe@Je@Pm@Nc@HYPo@JYn@eBTo@Xq@Vg@BITg@`@y@JQh@aAv@sAJOJQPWBEBCT]@AT[FK`@g@LOPS\\c@@A^_@@C`@a@b@c@LMVU`@_@`@[XWz@u@NMTQFG\\YvBiBDCXWZW\\YDCRQRQLMd@_@PO|@u@h@e@b@]BC`@]TQNOVSRQNONMROTSNODCFGPOTUFGHIRULK^e@LMRW\\e@^k@DEVa@NUJU\\m@FIRa@Te@DKPc@Xm@Tq@To@@ARq@J_@HSH_@FUH[FWPu@Nu@@EJk@D]BIHk@F_@Js@@AJu@RoAJs@Ls@Fg@DSTwALw@Lw@BQHe@F]DWFW?CH[Ns@Rs@Pq@FSL_@La@FQDMPc@Tk@@EDIJUFKXo@Ra@DIDITa@\\k@\\i@\\g@`@i@@CHI\\c@DC@CJMJKTWPQPOHIZYLKDELKHGNKJIb@[d@[FETMFE\\QHENIVMJG`Bs@jAg@lB{@VMZOh@UTKd@Sh@WTK|@a@hBy@JEb@Q|As@hBw@j@Yz@_@tAu@TKRMNK@?ROFEHGPOPQPQPQNQNSLSLSNWLWBCHSNYJUJYJYh@}AJWJYTo@t@wBfA}CFQTo@FQNc@Nc@FQZw@^eAJWPa@JYJ]FUF]FYDYDWD_@@G@U@Y@Y@_@?]Au@A]AUAMAMAIEUEUIe@GUGUIWIWIUO]O]_@}@i@eAa@}@]k@S[KQU[S[A?W?MSu@aAc@e@UYYYY]IIiAoA{@_AEGg@g@eAmAGIc@c@i@m@_AeAc@c@m@o@GGi@k@MKe@g@e@g@a@e@CCUWUWa@c@m@o@MO_A_Ag@i@c@e@OSKKW[GK_@e@_@c@s@}@IIq@u@EEY[}@aA[a@[]k@o@c@g@o@s@qAyA[]sA{AQQMO_@c@e@g@oByB]_@OO]_@SUgAkAQQcAiA{@_AcAeAu@s@q@o@[Wc@_@[Wm@g@QKIGcAu@]U?Ak@_@SMQMUOy@m@wHkFeD{Bc@[YUWSm@g@w@s@k@i@GIc@e@KKAAQSUY_@e@eBqBaDyDc@g@KOEESW]_@cAmAKM?AwDoEo@w@{@cAcAoAw@_A_@c@uAaBW[mB}BEGMMKMeBuB[_@SU_@c@mAwA]a@_@e@Y]oA{AAAY]ECEG{@eAOQgBwBSW_@e@a@i@k@}@EGc@w@CEUg@EIACGMWi@M_@Um@CEI[Sk@?AK]IYMi@Ka@COGUKq@Kk@COIk@?AEa@Ge@IcAAMC_@Co@E}@Aa@Ag@GoBCy@Ak@Cs@?ECm@EmBACGyACi@IqAI{@CYAEC]EUE_@E[Gc@Mw@Mo@GYKg@[wAUaA?CGQMm@EQGWUcAKe@GYUaAS}@]yA[wAk@eCaAmEa@eBQy@S}@Me@mBqIg@mBOk@Oi@Qk@Mc@Qk@Uq@Qi@c@oAWu@IW]_AYy@M_@_@iAi@{A]cAg@{A[_AUu@IWc@_BQs@Ka@Oo@UgAGSGYCQOs@CKc@cCKm@QcA]kBMu@SeAO{@SiAUmAOu@G[Os@I]K_@I[Oe@Oc@K[]y@KYg@eA?A[k@[k@QYAAKQe@q@IKKOa@e@a@c@SUKKUUMKQOc@]QOA?_BiAWS]UoBsAqByAw@i@]WyAaAYSSQECYSe@]QOKGg@c@UUUUe@e@c@g@]c@a@i@c@o@CEIKIMIOS[CEOYS]O[Wi@Sc@]y@ISCISi@Qg@Oc@IYSq@Qi@U{@{@wCOi@k@qBg@eB_@qA{@wC]kAs@gCCIWy@U{@CI_@qAMe@Oi@Og@AA_@sAOk@k@mBa@uA_@sASw@Qm@]oAQ{@UgACIMs@Kg@G_@EWCOCQM}@Gk@QkAIk@Ky@Ku@QqAQsA[}BGc@QsA_@mCIs@EWM{@UqAMs@EUS}@Me@EOIYK]GWIUIWKYWw@mAkD_@gAGQc@qAQg@]cA{@aCK_@M_@o@kBAG_@sAa@{AKg@G[Oo@c@}BIi@SmAEYCOCQMkAAKWeCQuB?CCk@Eu@Ey@C}@A]Ae@CeBAo@?C?uABkC@}@Ba@?WDw@@[ViGD_AD_APqDLsCD{@D}@L_CDy@HoBFsA@]@o@BiA@kA@]AcAAeA?GAc@C{@GaA?ACg@Ec@Gy@COEc@CYM{@EYE[Kq@EYKg@Kc@Os@a@mBu@iDWoAa@mBMi@EUS}@UgAKg@k@sCScAMk@UeAWmAc@uBAKc@qBOu@Om@G]I]]cBa@qBYuA[_BEOCOGWe@{BKi@Mk@G[ESQu@Su@Me@Su@Oc@Og@IWGQO_@AGIQIU?AWo@Us@Wq@?AIUMa@K_@Mg@Ok@Oo@Oo@Os@Qu@Oq@Om@I[I[K]GYIUIWY_ASk@IWUo@M[M[Se@O_@KWIOMYGOQ_@MSMWIQAAMWMWOUUa@a@q@OWIOOWk@cAa@q@OW]q@EECGISMWO_@EIACKWGQM_@Uq@K]ACKe@Oi@EUMi@G[Ie@I_@Im@Ga@KeAMcAE]CUCUIy@Gg@?Ag@qE[uCIq@CSO_BE[E[CYCWIo@Gm@K{@WiCOmAEa@CQI{@E]E[C[E]E[CYE[C[E[CQAIC[E[C[AECSE]E]E[E]EUAGEUG[GYG[GSAEI]I_@K]AAACCIW{@Qi@EIO_@e@gAO[Uc@KQGMMSOUQWMSMSQUMQs@y@WYOOMOMKaBuAMMQOQMEEMKQOQOSOOMSQQOQOSOMMg@a@OOQMQQWU]WYWMKMKYUe@a@k@e@a@]YUQQQOSOQOUS_@[iA_As@o@GEUQWUk@e@MKOMA?SSYUIIa@]CA{@u@[YSOSQEEGGSOAAQOQOECQQIGe@e@QQOQQQMQQSCCKOOSMSOSOUMSMUEIGKMUMUMYKUIQMYGMEIIWMYIYKYIWIYIWI[K[EWIW?AGYG[GYGYE[Kk@Ky@AOCUE[CYC]C[C[A[AMCg@Aa@Aa@Ai@Ai@?]?Y?_@@W?]@[@]@]@[@Y@]@_@@Y@_@BY@]@[@]@[?C@YB]?YB_@@[Bw@Bm@@i@Dw@B{@@_@@Y@U@c@@[@g@?Q?Y?]?]?k@A[Ak@E}@Cs@Gu@CYCWCWCWEYEWCUEUGa@Ic@Ow@I]G[EMAIIWIYCICII[IWGQGMKYUo@Sm@GOACKWIUIUIUm@_BOe@GQi@yAKW]cAKWKWAE[}@EKAEIWIWGWCEEOGUGWGWACESEQI]ESG[GYEUIg@Ii@G_@Gc@CYCWEYCYCYCYAQC_@AWCYAYC[?OAKAUCw@ScEIuBCg@Co@KeBGcAGo@E_@Ge@?ACYEYEYEYCOAGEWEUG[Km@GYEYEUGYQaAWyAYyAIe@EYG[GWG]E[G[EUI_@E[Os@G[E[UoAWwAa@}BKg@UsAMq@[cBESQcAKi@EUESGUI[EQCIIYIYIUK]Uq@Um@MWKWMWIQCGKUMUOWS]GIMSMQOUMOQWSYOOMOOQQQSSSSOMIGSQYUUOKICCWQQK_@UQI?AYOu@a@gCwAs@a@MIOKg@YUMc@W_@S}@g@o@_@s@a@eAk@OIQK]QWQo@]s@a@GE_@UWMSMSKOIq@a@EAo@_@aAk@GC{A{@g@YYOeBcAAAKGMGGEKEYQMIUMGCGEs@a@g@Wa@Wm@]oAs@YQQKUMYQKI_@Yk@e@QOSSKKKKOO]a@W[KKKOCEMSQUOUOUQYS]CGGMMWACEGO[Qc@EIGSM[Qg@M_@M]GSCMCGEM]{AGWYkAK_@COa@_BI]YqAI[GUKe@Qu@GWI]Kc@CMIWGUI[I[K]K[GQOe@m@}AEMKSAEMUGOEIGMKUQ[KSOWU_@CGQWACOUQYGISYKO[_@EGq@w@EEe@i@q@u@UWOQk@q@GGKMAAQQQUOQWWW[QSOQQSOQOOOSOQQQOSQQOQKMCCOQOQQSOQOQQQQSOOOSOQOOSUMQA?MOOQa@e@QQOQOQQQOQUWKM_@a@QQg@k@[a@[a@?A_AoAS[QYIOIMAAKQMSMUOUKSOUMUOYIQMUMUMUYm@KUMWMWISMYCEGOKWKWCGGOOa@GKK[AASk@KWIUMYIWQa@AESi@M[Oa@_@_AIUOa@i@wASk@Yu@Qa@Sk@M[Oa@[y@_@cAQa@wBwFQi@}AaEKWGS_@aAO_@Qg@Sg@ACi@yAUo@Uq@IWGWI[EOMc@CQCIGSI]UcAMg@I_@GWm@iCESIa@Qw@ACI]Qu@Qu@Qw@EWACa@gBGWKc@G[G[EWCOG[CQGe@CWE[E[C[C[C[ASAOCa@AOCm@EyA?Q?oA@g@DaC?MBiBBsA@_@BeB@Q?[BwAD}A?a@@y@?C?i@?[?e@Aw@AYAi@AYCa@Cc@Ce@Ee@Gq@K{@Gi@Km@Ge@AEM{@QqAMu@{@{FQoAAIKm@?AKu@G]E]OaAM}@QcAU{ASuAQiAWwAMw@E[Ic@ACCMESIe@I]Ke@GWCIEMK_@?AK]CKK]EKI[kBkGs@_Cc@wAGSEQIWUw@Qo@W_AKg@IYMk@Oq@Mg@G_@Ia@Mm@ESMu@G_@Ic@EUKi@EWKm@SkAE[ESSoAQ_AIc@Ig@Km@Ie@AGKo@Ii@GW[mBKq@Ic@Ie@Ga@G[EWCO?CIa@G[G[GYG[GYG[EOIc@I]CIOm@GYGUGYK[Qq@GQAGUu@IUEOCISq@Ws@IYKWIYKWIUISCEIWWm@Wo@IQO]]y@EMMWIQO[KWKUISACMWKWMWGOQ_@KWEGO_@Q_@MYISIOO]Wm@MYO]a@}@KWMWKU?AKUUe@Se@CGKUc@cAO[Qc@Se@Sc@Sc@Ui@KUKUCGyAgDi@mAQc@O[KUAAKWKWMWIUMYMYYm@Sk@]}@CGK[EOSs@U_AKa@I[ESIc@CSKg@M_ACUEa@Ee@CUAMCe@Gw@?AA]AUC}@A]Cu@AWI}CCaAE_ACyAEiBCcACw@EuAE{AA]A[?GA_@Ag@EcAAe@E}AE}A?GEqAC}@AQAi@AWKkDA_@?I?EAOGmBA[?OCk@AYA]A[A]CY?QAKA_@CYA]C[AM?MC[C[C]Ci@IgAC[C]C[IiAAKQyBEo@AKCc@WaDIgAKeAIgAGy@CYEe@ASC[A[KuAEy@C[GuAC[A]Eu@IsBIuBCw@AO?MC[KqCEsAE{@Cu@Cg@GiBGuAA[AS?KEsAGuA?ACe@EkACo@?EEwACm@EeAGsAA]AKAi@Cy@Eo@?IA[Cw@Ey@Cu@?AAOA]C_AAEEwAEy@Cw@Cy@Ey@Cy@Cy@Ey@Ae@Cm@Ce@ASAe@GkAAk@EkB?SAw@?A?m@?I?y@@[@gABiABy@Bw@BY@_@BYB]Bi@B]Dg@Hu@Dc@Ho@NsA@KJgAFe@RkBLqAD[Fs@Fg@Dg@Fg@BUJ_ABW?CHs@De@@ALkAJu@D[Js@BSJq@?AHk@Lq@Lu@Ns@He@R_ANs@TgAF]H]F[F]Jk@BMLq@FYF_@@IJk@Lu@Fc@DSJu@H{@Hu@Dm@JsA?OFuA@E@q@@a@@[?y@?G?m@?_@?[Ae@Co@Cw@C]Cg@Ek@Gw@C[E[C[Im@Ge@Ks@G[Ms@G[Qy@Ke@WaAIYKYGSK]IWQg@ISEKSi@Yu@GOQe@Wo@Wo@Um@?Ac@gAWq@ACGOIUISSm@KUOa@GWMa@K[CKGSOm@Qs@Ou@Mu@AGKm@EYG]Ga@CUQqAGa@ESEYKw@YmBKw@EYMw@AMIg@OgAIe@Im@Ii@QsAKq@ACCWGYMw@Mu@Ou@AIEOUkAAGOq@IYG[Qs@CIMi@i@eCEMKe@Qu@Qs@Os@GUAEGYGY[oAQs@GUACOi@I[c@qAIWEKQe@Uo@Yq@Wm@Ym@MWYm@MUi@aAIQGIEIS[a@o@IMa@m@Ya@EGIKSUMOMQa@e@CAKMu@{@QQMMQSAA[[u@{@yB}B}DiE_CeC?AYYWYIIMOmCsCKMs@w@o@q@KKY[OQQSa@g@KMQUQQOSOSMSOS_@g@OSEGU_@KOQWU]GIEGKOIOk@y@_@k@_@k@_DsEOS]i@OSOUOSMSOUSYc@q@c@m@]g@_@k@U]U_@yAuBCCYc@q@cA]i@]g@OU[i@IMQ]MUMWYm@KWKWGQAAK[KYOe@Oe@Oo@K_@GWOs@Ie@O}@MaAIk@AIC]Ek@CUGmAA]EeA?_@EeBAeACmAAUGmDC_AAiA?MEuBCiA?e@EiBEuB?EE}B?UIaEG{DGmAEmACk@Ei@Gy@C[Gw@MsAEUOsAEa@G[M}@AGMu@My@ACCKCSQu@Q}@[sAm@aC]{Au@}COo@Kc@i@uBWkAs@uCg@uBu@aDqAmF[sAYqAWaAU_Ae@qBa@cBqAqFgAsE_AyD{@oDMm@EOm@cCSy@a@cBWiAK_@WaAUu@[aA[}@O_@]}@Qa@Wg@KWMUSa@q@mAq@iAg@u@QUGKQSIMKMQUOQ[a@OOg@i@MMAAw@s@g@c@_@[g@_@{@m@s@c@g@YSKMGi@WUMy@]_@Oc@Ow@Uo@Qy@SSEw@O{AQ_@Ei@G}@KaD[y@Mk@IaAUYIQG]Kq@WOISIQKUKIEGESMSKQMSMQOA?OMSOQOGGIGOOQQQQQSc@g@MMUY[_@q@w@q@w@OQOQOSIIEGQQSWKMa@e@OSQQOSMOAAOUSUKOEEKOMSOSEGGKOUMSOUMUMUMSMWMUMWEIGKKUYo@MWKUKWKYKWKUGQCGKYKWIYIU?AIUK]IWAGEOKYI[G[YeAKa@I]GWCICOIYIYGYQu@IYGYIYEOCKQs@Qs@I[GYMc@EOG[IYGYEKCOIWGYQs@EQEKGYGYIYGWI[IYGYI[a@_Bo@iCa@_BOo@CIGYa@cBMk@EWG[Mw@G]E[CWE[C[C[C[E_@A[C[?AAWCs@?QAe@?[?i@?k@?S@]?W@[@Y?O@[Ba@@YB[@IBYBW@QBSBSBSBUDYDWD[DQJg@R_AH_@Ny@b@sB@GLk@P{@DSDQDQNy@FYFYDWD[DWDYHo@Fe@Dk@B_@Dg@FaAFw@DyAJoCLsCPmEDqAJ{B@_@@]Do@@[@[@Y@}@@w@?_@?y@A]?YE{@Cy@QuEIcBEaAE_AMaDWoGCk@Ck@AUA[CWKwACSGw@Ga@C]?AIk@Gc@Ge@COMw@Kk@ESESIa@ACESGWKc@Ka@W_A[eAIYOi@]oA]iAI[Qm@Uy@W}@W_AEOIYK[GSKa@K[GWCIIWQm@Qm@Me@AEMc@EKKa@GSGUGSGQYcAI[_@qAEMK]Og@WaAYcA[eA?CSq@IWQq@AA?ASq@Uw@Qo@Uw@K_@IUIWM]Oa@GOISSg@Uc@Sa@KS_@s@e@w@]e@QWQUOS]c@SS_@a@OOIIOO[WSQw@o@UQQOOKMK[WGCc@_@OKo@g@u@m@YU_@Y[WMISQ[Y]Yc@_@SOOMe@_@QMWSMMQQWUQSIGQSMQQU]g@OUQWO[GIGMGMa@w@MWGOGSKYOc@Og@GUMg@EUI[CQOu@CWG]E]EYC[C]CYC[A]C[Ac@AU?[A]?[?]?[?]@K?O?[@]@]B[?G@SDk@@MB[D[@Q@GD[F[D[FYF[BMBKHYHWH[HYHYDMBIHWHYFUHUFWHWHWHYNg@H[HWH[HWHYHYJYHYHYHYHYFSJ_@FQL_@Po@@CHYDQLa@HYHYDMBKHYJWFW@AHYHYHY@CFUHYHYHYHYHYFYH[DUH]F[FYF[FUJq@Jg@BSDSBSBOFa@D[D[B]D]DY@Q@ID[B]B[B[D[Dc@BWB[B[B[D]B[BYB]D[B]F{@HuA@E@Y@[B]?M@M@Y@]?Y@[?E@u@@]@[?[@]@]?U@a@@]?[@SBeA?[@[@]?[@]@[?Q?M@_@?A@W?Y@]@]?[@]@[?]@]@U?K@W?[@]@Y@q@?U@[@_@?[@[@]?]@[?O@K?[@]@_@?Y?_@@[?]A[?]A]?[AOAO?SG_ACa@CYC[C]AIIo@E]CYG]E[WmAG[G[IYGWCMOg@KYAGGQKYQe@CKKWMWKWGOCGQ[IQMWQ[KOQYKQMSKOW]KOQSQSMOACOOOQOQAAOQSWMMQSMOAAOQOQQSOQOOMQMOOOMOMOIKGGW[SSMQEEOQOQQSOSEEIKQQOSQQOQQSEEIKQSOQOSOQc@e@OSOQQSOQOSIMGGOSKQOSMUOUMUCEWe@MUMWMUKWMYKSKWKWMWAEIQKWMWKYMYKSIWMWKWKWMYKUO]CGEIWo@Yo@c@gAMYKUYo@Wo@CGIQKUMYMSGMGMKQMU[k@QWMSOSMSQUOSOQOSOSQQOQc@c@OQSQSQOOc@]e@_@SMQMSMSOc@Yg@]o@a@[USOSMSMe@[e@[e@[g@]e@[y@i@e@[{@m@WOKIs@e@ECe@[KIGEQKSMIGIGSMQMSMQMGEIGUOQMSMQMSMSMSMQMSMQOKGYQSOQMSMQMSMQMSOCCMKQOQQGGIIOQA?OQAAOQOQKMCEOQOSOQIMEGMSOUMSIKEIMSMUEIGKMWMUKUMWISAAKWMYKUIWKWKYIWIWKYIYIWI[GYIWGYIYEYI]EWG[G[EY?AEWG[E]E]CWE[C[C[E[C]C[?ACYC[E]Ce@CQC]AIAQCYC[C[CQCYCYE]E[E]CQAGE[E[ACEUG[EY?AGYG[UaAGUI[EOI]GSEMEKIYKYIWKYKWEMEMKUKUKYKSACKWKWKUGKEKMUMWAAKSMWMSYk@AAMSOUMUMSMSOUOUEEIMU]W_@_@e@SWMO]a@[]IIUWWWACSQSSQQOMQQWQQMc@_@c@_@wAiAMMw@k@OMa@[SQWSq@o@WY]_@EISU_@g@A?]k@IMQYIOS]MWCEIQMUYs@Yq@KWKYIWQk@Me@IYOo@I[G[GYE[CICQMw@Ow@Km@AIMu@G]E[Ia@Km@EWAEEYEYG[G_@EU_AuFy@}E_@}BCIYcBCOKk@Ms@Ik@G]Mu@EWG_@M{@EWMy@Ga@CSCSKw@Iu@K}@CYC]C[E[AKAQC[C]IqACa@IoAEy@Gw@Ce@CSA]C[AQAKA[Gu@Ca@GiAGaAKwAIcACSE[Ea@COESIg@GYKi@Kg@I[G[IYCGQm@Oc@EKSm@KWKYO]GOKW[o@We@]m@QYKOCEOSQWKMQUMQQSSS_@a@KIk@g@IIy@s@UQw@q@aBwAqAeA_Aw@wAkA]Y[Yk@e@YYu@u@eBmBcAuAm@{@g@y@c@u@EGCEy@wAk@cAKQ}@{AgAmBc@s@i@aA_@q@QW]k@OS_@k@c@k@_@c@a@c@GI]]UWIGOOWSMMg@_@SOe@[QMg@[AAMGk@[m@]ECi@YGE{@c@}A{@sEmCSKSIQKAAQIQKCAo@[eAm@gAm@iAm@QK]QoCcBkDuBcAq@{@g@YS[SKGoAy@mCcB_@Us@c@kAu@a@WMIQKi@]SOSMQKSOSMQO[WKIc@]QOCCKKSOOQMKy@y@_@a@W[ECu@_AEGUYKOKMMSOSQWEIEGGIGKCAOWMS[e@MSQUMSMUgAaB_@m@S[QWu@iAIMOWMSYc@KQQ[GKMQKUKQEIUc@[m@[m@Yo@IOQc@Wm@GKEOWm@[y@Oe@ACM_@ISK[K]CKMa@IYM_@Sy@EQIYQu@I]GWI]CMCKQ}@SgAUmAKu@CIE]EYIk@AKG]CWAKCQC]ACCWC[ACCYCS?GCYAMCWGy@Eq@AOCc@C{@AQCk@A]AWAa@?AAy@CiAAqA?gA?e@@w@@{@?k@@]@e@?EBu@@]B{@Bg@@SB[@_@@ODc@?IB[@SB]@O@OD_@Hw@Hw@B[Jy@Da@D[DYRqABQ?ABOLq@Jm@ReAH_@BSLk@DWF[H_@\\kBNs@Nw@Nw@d@cCF]@GHa@Lo@^uBLq@Z_BP{@F[F]F]^iBNaAR_AF]H_@Jm@DQF[Jk@Hc@N{@j@wCRaAZ}AN{@DSNu@P_APiADYJm@Fk@B[F{@Dk@@GBo@@K?KB}@@a@@[?_@?g@?]?c@Ac@A{@AUM{B?CGm@Gm@Iw@?CQaAIk@SaAAES{@Mg@GSUs@Uu@]{@GS_@aASg@Wo@Yy@[y@]}@u@mBSi@s@iByAyDKYISKYu@mB]_Ac@eAGQaAiCeAoCs@kBcAiCOc@Qa@?AUi@ACYu@?A}@sB[}@c@mAk@qAOa@{@oBKS}@qBw@aBq@sAIQS_@Sa@a@w@mAwBe@{@k@cAGKCGGKMUaBwCk@cAMUg@{@GKkBgD_@s@e@{@e@y@c@u@e@}@m@cAKQGMGICIi@_Aw@{AiAqBaBuCi@cA]k@[i@_@q@GMe@y@s@oAy@{AGMmAwBS_@g@{@e@{@MSS]Q[U_@k@_Am@_AWc@S[k@{@U]QU_AuAcA{Aq@aAgA_B[e@QWa@k@MQIMe@q@GKa@k@MQWa@QUOSKQwAuBm@{@KOCEc@o@wAuBSYU]QUq@aAACq@aACEuAoBKQQWU]QWo@}@c@o@EGCE{@mACEc@q@[e@U[y@mAg@q@EIi@y@GIi@y@GKW_@GIIKm@}@GI]g@MSW]S[OSU_@GI]g@OSGIW_@QWMSS[CECE]k@[i@OYMS[k@Yi@[o@MWKSKUMUOa@IOMYKUM[GQMWM]IUISWq@O_@GSM]M[O_@CGKWK[CEKYKW]_AEIUo@Ui@Oc@Qa@EMOc@c@eAOc@GMe@oAISGSWo@O_@GQM]i@uAM]GQIQQe@Yu@KYM[a@gAIUQa@GQGQACq@eBIQM_@GQGMQg@KUIUO_@GQM[Sg@M]M]EM[w@Si@Ws@Um@Uk@Ws@O]Wq@O_@Wk@Wm@Ym@OYWi@]m@IOKQGIKS[g@Wa@GIW_@g@q@_@g@o@{@c@e@a@c@MOe@e@_@a@QOUSUSKIc@_@m@e@mBqAq@_@SMmAq@IE_@U{Aw@c@Ua@S}@e@a@UYMq@]q@_@mAm@u@_@QKUOMG]U_@Uy@q@o@k@USm@q@KOaAoACEQWYc@[i@S_@a@{@ISO]O_@AAWs@Qe@K]a@oA_@oAIUMc@_A}Cy@kCs@_CMa@So@a@mAAGa@qACKM]Qk@Ma@]mAWu@m@oB_@oAm@oBg@}Ak@iBg@_Bi@gBa@sAc@uAc@yA[_ASs@]eAc@wAIU]iAACK]AGCIM_@Qi@Ss@GOAGWw@W}@IYm@mBOi@IYK[Mk@K_@SgAEYIi@EYKw@MoAEu@Ce@A]C_AAW?e@AM?K@U?i@@m@@e@@WB[Bi@F_AFi@@QD[Hm@?AHk@Jm@PiAD]DYFa@DSJu@L}@DYHi@Fo@B]Be@Bg@@ABu@@_@?G?k@?O?Q?y@Cu@CiAAs@A]?OAQ?OAe@AYAs@CaAG_CAs@As@I_CCo@Ce@AYIsAAIEm@WwCI_AIcAQiBMuAACSsBi@oFI}@WyCMsAC]Iw@I{@CUIw@Ec@?EIm@EYGY?AG]GYI[IYIYSo@CGSk@Ym@IQQ[OWOUOSMSOSGGGIQQQQEEy@{@CAUSQOQOIICCQMSQi@e@o@i@[YGEc@a@UQKKm@g@IISQQOc@_@w@q@g@a@MMqAgAMMUSSQSQQOQQoB}AGIOMu@o@SQQQQOQOOMAAQOSQOMQOSQIIGEQOQOOMQOCCyAmAc@c@c@]qBaBw@q@UScBuACCQOQOOOQMOMOMQMEECAQM[S]SYQ_@UUKSKUKSKWKSISIUGUISISGWGkBe@w@SWGmA_@SE_@OKEWKQIQKSKWOMKc@_@ECKIQQa@c@IKUYOSAEYa@ACMQAE]q@GMKUKWKYIYK[GWGWGWSgAGc@E[E[AQA??IC[C]A[A[A[?Q?_A@}@@c@@Q?EB[?CBY?CBS@G@Q@EBUF]?CDYDSHc@FWH[F[HYHUHY`@mAXk@JUDIFKBIHMLUNWLSLSV]FILSNULQPUNSFKDGPWl@y@@CLOLSNSLQ@ANUNU^g@NSFKDGNUNSNSHKDINSLSNSNSFKFGLSNSPUPQHIVWPODEJI@ANMPMRMPMBANIRKRKRIRITIRGRGTGTEJCFATETEREBA@?PCTERGTCXGNCTGTERCTETGTEREBARGTGRIRIZMJGTKRKPMTMPMRMNMRQPONOPSPSPQNSLQPULSHM`@o@`@q@JQLWLULWLWVi@Pc@HSLWJY@APc@Tk@BIJYPe@La@J]DOX_AFSPq@F]Li@J_@Ha@H_@DYFYDSDSBOHk@Fg@F]?ED]Fg@Hs@?EHy@Fi@BYH_A@WJiA?CDi@RyBDg@Fq@BUBWh@}GLqAT{BHq@J{@LiAFa@LiAF_@Fg@Ho@NcARuAJq@Lw@Ly@F]Lu@F[F[F_@FWPcA^iBf@mCb@uBF[Hc@FYNw@@AF_@Ji@H]Lq@VsAP{@BKF]Lo@Jg@Lk@Ha@DSb@_CTkAd@}BRaA\\gBH_@`@sB@CLq@F[BM@ELq@f@eCLk@Ha@TaAFSNo@FYDO^uA|@eDT{@T{@\\mA^uAb@_BJa@VcAd@aBT{@DULe@Ja@Z{ADYJw@NsA@KDeAFkA@_@?m@?G?Q?q@AWCs@E}@IiAMkB?CYaEIkAEo@?AIqA?CEg@KyAWmDOqBSkCOoBMcBMmBO}BG}@?AK{AKkBUsDQsCMoBKaBIgAQiC[oEq@eIScCGs@M}ACWs@qIE_@M}AS_CQqBMwA[yDKkAQuBO{ACe@E_@OcBASI_AKgACa@CUUmCCUCYEo@Iw@Gu@KgA?EEa@McBE_@i@mGGy@Iy@I_AC_@WuCIy@MaBOeBW{CCWEc@OaBKyAKkAE]C_@SeCGi@I{@UkCI_AAEKkAMqA?A?ACYGo@Ca@Ea@CQM_BMuAIcACUEg@Eg@Ec@Ek@Go@AIGq@Gw@Iy@KwAKiAIcAAG?AGy@C]Go@SyBa@gFIu@E]CU?AE]Ks@E[E[AGEUKq@Ia@Ow@Mq@Qu@GWI]GQCMESEM?COk@EQAEESQs@IYMi@CMIYOm@I]GYACGWGWIYI[GYSs@AG?CEOI[GWIYESEQACKa@I]IYIYOs@Qm@EQCMAEI[Mk@G[G[Ia@Ko@Ia@ESEYE]EYE_@CKAME[Gg@?CGe@I}@KmAGs@Ea@MsAWuCIcAGm@OiBIaAo@iHIaAEm@Go@M{AEg@AGOiBQqBQoBKyAUkCIu@?CGs@Gw@COIeAMmAI_AKiAUkCAKCUI_AGi@Ca@O{AI_AGo@CYGy@Iw@Gw@OuACa@Gs@C[Gy@E{@AWEuACo@?KCuA?e@AmA@gA?C?M@a@@s@B}@?S@_@FgADk@@YB[B_@BYB[B[B[D[B]Ju@BULkABOLeAZkCD]BWFe@D_@@IBWBU@Q@K@KHcADm@@S?GBY@c@D{@@Y@s@@e@?e@@u@A{@?Y?]Cy@?[AYCg@EmAKwAMkB?AKkAEs@COKcBKoAIiAEu@IcAIcAEm@?EEg@Gu@AMCe@Ee@Eu@C[C]C[C]ACAUC[C]C]C[C[C[C[C]?CAMCUAMCg@C_@AA?GGo@ASAOCYIiACQGy@Gu@C_@KiAM{ASmCGcAGu@GeAIgAIcA[mE?A?EAIGs@AUKuAKqAGw@QoCACMcBAOEm@QkBUkCU_DMcBC[IsAGy@EeAQyBGeAE]YkECUA[AQCg@Es@AS?MEw@C{@CiA?GA_@?UAe@AkA?]?[?C?G?GAkAAoA?O?q@Ay@CeFAwB?qA?EAo@?{A?CAmA?Q?O?M?Q?o@Ao@?Q?K?iAAcA?cBA[AmDA{AAmA?_@AgAAgAAqBAwAAoAA}@?qAAO?iAA}@?G?m@C{B?SAuA?E?W?a@AU?s@?a@A[?[?[?[A]?[?a@?YA[?[?[?[A[?]?{@?a@AI?O?y@AY?k@?k@AuA?OCyD?CA_B?o@?Y?[A[?M?O?_@?Y?G?MAa@A_B?M?_@?AAsB?[?]AuA?]AsA?G?U?[AqBA]?[?[?[AY?}AAU?[?]?]AY?_@?Y?a@AY?Q?I?y@A[?]?a@Ay@?Q?i@?UA]?y@?ECwC?eAAy@?w@Ag@?U?]?_@?A?IA}A?Q?QAS?s@A{BAoB?KAyBA{A?_B@m@?m@?W?_@?W@cA?C@q@?K@]?[@e@?[?AB}@@_@@u@@c@?E@E@o@H}BDuADcA?GBq@Bi@@i@Dq@@i@@Q@YB_@?C?QFqA?IBk@Bg@BcA@O@_@B[By@By@HoBFwADwA@WFsA@W?OFyA@[HcC@]@[J}BFgBP_FPeF@O?M@[Dw@@]@Y@S?MDsABm@Be@DcA?KBc@@]?I@Q@]@E?M?ED_A@U@[@U?ED{@@Y@]By@@YB_@@[@]DkAPcF@I?A@a@@K?ADyA@CDyAJoCFkBFwADsA@[B[LmD@]HkCDy@@]@]@Y@[@[D}@Bq@@m@?I@K?Q@W?A@[D{@@]@[@U@U?C?K@W@S@K@]@YBo@Bg@@Y@a@@[@[@I?O@[B[?Q@K@[Dw@@[?ADy@B_@Do@DYB]B[D_@DYD_@BW@ED[BSFa@D[FYLw@BQHc@FYNs@@EFWFYDSH[Rw@FUHYHW?AHWJ[FYJY@EFWTu@HWHWH[FSBGd@cB@AHYf@eB@CZiARq@Tu@?CHUHWH]Rq@h@gBPq@J]HU@ERs@HYFS@EHWH[HYHUJa@\\iAHWHYBIDOHYH[HUH[Ro@H]HWFWH[H[BKDOF[FYFYF[FYF[@K@IBKDSHg@D]@ID[F]?ABYD[@MBMHy@?CBUDa@BY?GFm@@Q?GB_@B]@[D_A@WBsA@I?S@]@]?O@I@]ByA@Y@]Bq@NsF@]@a@NaGB{@ByA@[@Y@_@@[?ABy@?I@KB_A@g@@o@By@@[?I@S@a@@[@]@]@]@u@@]B{@Bu@@y@JsD@y@HoCDsBBy@@]@w@Bw@@a@@y@@{@@y@?{@@y@@s@?W?}@@}@B}D?a@?MBoF@u@?Y@gA@eC?y@@y@@{@@wA?[?i@?Q@y@@y@@{@?y@?c@@S?{@@{@?y@@i@@gC?]@_@?[?_@?c@@O?]?Y?A?[@]?C?Y?[?Q@K?]?U?G?[@]?[?E@sA?]?]@Y?]?]@]?]?[?]@]?[?]@_@?[?[@a@?O?K?[?]@_@?]?[@[?]?]?[@]?]?]?]@]?[?[@_@?[?]?[?]@[@yA?C?W?]?]@[?]?]?]@]?[?]@]?[?[?C?[@]?[?]?]@]?[?]@]?[?]?[@Q?K?]?Y?A@_@?]?[?[@]?]?[?M@m@?[?]@[?W?E@]?_@?[@[?]?]@M?M?]@]?[@]?[@]?[?G@W?]@[?]@]?[?W@m@@g@?g@@c@@g@?e@@i@?e@@g@@c@?g@@g@@e@?W?Y@[?_@@]?]@U@_A?_@@[?]@[?]@]?[@]?_@@a@?W?E?W@[?]@]BsBFgHDsC?k@@k@DwC@s@@}@?w@@{@By@?y@HaH@m@BiC@eABgA@gA@aA?i@@[@o@?g@@w@?y@@_@?Y?SAaBAwAAo@Ai@?IAk@A_@AGEoACy@CYA]C[A]C]?EKqAGy@I_AC]Iw@AOE[E_@EYAMCOE[EYIo@Ge@Kw@WkB_BeMIm@g@wDEYe@mDGi@Ii@QqAGe@]iCQuAIg@Ky@OgAWoBAKWgB]oCK}@Gi@I}@K}@K{AE]MoBEgACo@AUCm@C[?A?CAo@Co@C}ACqB?eA?eA?C@aB@oADoC?KB_B@_@@_ABoA@k@D_EJcIBaA@w@BqB@_ABwA@w@D}C@m@BmA?CFyEBgB?E@a@@Y?a@FsCFwE@g@@YD_A@SBk@@SFy@Dw@Hy@BYB[Hs@Hq@Js@Jq@D[Hg@Hi@BKDWPmAdAsGv@cFl@wDLu@DS@KBKBYViBFa@Fe@?ATqBB[J_A@SBQ@WNeB@Y@K?I@I@K@OBi@Bm@Dw@B_A@W@e@@GBaB@w@@w@DcIBkEDkF?q@B}B?Q?IBuE?o@@{@?w@@C?w@BmD@g@?O@]?]@_@@_@@[?S@KF{B?_@DyAB}@@_@@]@[@[?[@]?ABy@@]@[?[@U?G@[@]@]@]@[?]@[@[@]@]@]?[@O?K@]@[@]@[@]?C@W?]@[@]@]@[?[?S?I@[?[?]?[?[?]A]?[?IAU?SAE?[A]A]AQ?IC]AU?IEw@AYA]AIAWAYA]A[C[A]A]AQ?GCa@AQ?GA]C]AYA_@C]AYA_@AO?KC[AYA]A[C]AYA]AO?KC]A]A]C[A[A]C]AW?GAYA[C]A[A]AMAMA]A[A]C[A]?KAOA]C]?EAUA[C]A_@AS?EAYC_@A[A[A]C]?GEaACe@?EAYA[ASAIA[A]A[C]A[A]C[?KAQA[A]C]A[A[C]A[A[A[AKAQA]AW?GA[C[Cu@?AA_@A[A[C[A]A[?IKmCImBCmAAGA]AaAEgBAm@AQAs@CuA?a@As@CuAAwACqAAwA?wAAwBA}@?qAAkB?g@?G?g@?k@?C?w@Ag@?I?e@?s@?k@Ao@?G?o@?wA?AAy@?y@?cA?CAoA?eA?o@Au@?s@?K?wAAy@?{@?{@A{@?y@Aw@?_@Cs@Ay@Cw@Cu@AICm@Cw@C[A[CUCi@Eq@Gs@Gu@C]E[C[C[K}@Io@C[EYE[EYIi@M_AEWG_@EYG[EYMo@Ow@G[Oq@GYESGWS{@Kc@Og@GYQq@IYIYIYIYGS[kAc@aBQq@YeAm@yBa@yAEUK[WaAGSe@gBGUCI{@aDYgAy@yC]sAEOG[[{AWoAKq@QoACMC[Ks@C[CQ?AGg@Em@IaAEi@AME{@Cu@Ce@Cy@A}@AiAAgA?iA@K?u@@a@@YB}@?CBw@Dw@Bq@LiBFm@Dg@Fm@LcAFa@Fg@DYRsARuALy@?GLs@NkAT}ARoAL_AFa@Hk@Ly@F_@@MNcAHi@L{@NiAXkBb@yC^gCNiAJm@PoAL{@NiANcAHg@DY@CHo@RsA@KL_ALiAFo@Da@PeB?CDm@BOJ{ABa@@_@Du@FgA@g@Dy@@w@B_AB_A@}@?_B?sA?oAA}@AaAAm@Cq@Co@C}@A]EiAI}AE{@Ey@Y}FE_AEu@IyAIyAE}@IeBEy@GwAE{@Ca@Ck@Ek@EiAGcAEw@I}AEcAAI?IC]?EAWC[Aa@ASE{@AQCu@E{@AY?YAYAa@A[AiAAm@A{@?[?Y?c@?]?[?A?[@_@?[ByAB}@Bu@DaBLaF@_@FuBHsCDwADqB@MDeB@[?MHmC@YBy@FwCBo@?C@[?O@OHmCB}@JuDDgB@i@FmBB{@BwABy@By@DwAHoCBy@F{B?U@_@By@B{@By@@g@Bs@By@D}A@q@By@@]?CHmC?ABw@JmEDkA?ANcGHiCDuA@y@DwAFyBB_AH}C@W?]BkA@}A?A?i@?_CAuACy@As@Ag@AS?EA]Cy@Cm@Ca@?GA[G_AGeA?AGs@Em@KgAC[CUE]I{@E_@Is@Kw@E]QiAMy@OaAEQIc@EYEUMo@]cBYwAMk@[yAKk@G[Q}@EQGYYwAMk@]cBIa@ACKg@Km@WmACOMk@Mm@[{AEUWkAOw@_@kBKg@Mi@Ms@GUIa@WoA[_BOs@Mq@EQAEMk@?AOw@UiAQ}@GYQ{@WkAWsAk@qCKe@G[Ou@[}Ao@_Dc@wBOu@m@wCKe@GYG]Kg@AGKe@YuA[yAI_@I_@GWOq@K[I]ESK]]mA]iAUs@Ww@Um@Ws@Um@[w@Qa@Ys@[q@]u@]w@qBqEO]]w@gA_Ci@mA[q@MYm@uASa@AGa@{@AEGI[s@Wo@e@cAg@iAi@iAKWYo@e@eAs@_BSa@O][u@c@aACEWk@Se@Qc@i@sAm@iBKU]gAOc@Uy@Uy@Su@YeAESOg@Mg@[kA[kAQq@WeAs@oCI[Ma@u@yCIWa@aBW}@[mA[oA[mAUw@}@kDk@yBe@eBSw@[mA[oA]qA]mASq@Oi@Og@CGGMGSQi@Si@AEGSKUa@gACGSg@CGO]ACQa@Qa@Ug@Uc@_@y@[k@Ym@_@o@Q]GIOUOWOWS[g@y@]g@U[m@aAwAuBAAkAiBOUu@iAcCwDkAeBqAoBWg@uAyB{A}BU_@]g@AAWa@]g@KOs@iAa@o@Yi@Yg@g@gAMW]{@IUYu@Qi@ACUu@Ok@GWMe@G[I[Ie@I_@Mq@EWGc@AGGe@Gi@Gk@CWQmB?EM{AGw@WiDIy@Gw@Ek@_@{Eg@mGg@eGAWI{@Gs@?CEo@I_A[{DGm@AYUkCKkAMaBKyAC[QqB[sCMeAM_AKo@G_@COWsAKm@SaAIa@GUQu@Su@Ok@GQMk@_@eAK]Oo@Qk@a@yAs@mCOi@e@eBg@iBQo@s@kCo@aCSo@]sAMm@I[Oq@?AMs@Mo@M_AKm@CWKcAGq@IgAAACq@C[A]Ag@Co@AgA?_AAS@c@@w@BgAD}ABg@Fu@B[D]BSFg@DYLeAFg@Da@ZgCTqBZiCNmAVsBJ{@Fi@Hm@XcCf@cEJ}@BSHk@LiABSZkC\\qCPyARiBDYJ}@NkAJw@BYD[PsAB[D]BOFe@D]D]PuABUHw@DUFk@Fi@@CD[Hy@DYJ{@Hs@Fk@Hk@NsAD[J}@Hq@Hm@f@kERyAJaAD[LeAPsAB[Jw@PqANuAJu@D_@Jw@NsAHm@JcAPqAHy@Jw@D[BYBSNkABOJaAR{ANqAHm@@KXiCFc@BQLcAB[Hi@@OJu@D]BYDUB[@GHm@?AHm@JcAJ{@Ju@Ho@Dc@Fe@D]Hk@NoAD]ToBBKFk@Hs@J}@DYHw@Hk@LkAHw@NoAPwAD[Fg@Fi@B]BWBYFq@Bc@@K@M?KDo@@a@@a@@U@e@@iA?iBCaAA}@IcBGmAG{@Iq@Gs@G_@Gi@YkBSqAWgBKm@Im@Ik@U{AU{ASqAAG[sBCUQmAEQGg@_@iCEWEUG_@QqAMw@SsAc@uCAMWaBWgBSoA_@gCIm@Km@QoAIm@UyAKm@E]COU{AIk@Ik@AAQoAAKKk@?AKu@Ge@Kk@M_AEUYmBYkBM_ASmAQkAKw@WeBKs@Km@E[E[G[E[EYE[G[E[SqAEYE]G]EWE]AICOEYG[E]E[GYE]EYG[E[AKCOEWE]G[E[EYG[E[E[E[EYG]E[EYIe@Ik@E[G]EYE[EYE[G]EWAEE[E[EYE[QgACMCUG[E[EYG]CUCSIc@E]G]EYG_@E[E[EYG]EW?AEYG]EYG]EWG[EUACGYE[I[AGCQI[GW?EEOAGI[GWIYGYI[IYGYI[AEEOIYI[GYI[CIEOGYIYIYGWGUAEGYI[IWG[IYIYI[GWI[IYGYIYI]GUI[K]GYIUCOEKIYKYIYIUAAKYIUKYA?IUMWEIGMKWMUMWMUIMCGMSOUKOQWOUMQAAQUOQOSOQOOACQOQQQQMKACSOQOOMSOSOWQOISMQMSKSKQKA?SKSKKEGCSKGCMGQIUKUKSICAQISIUKSKSIQISIWMSISKA?QISKUKSIUKQIWMQIUKSIUKSISKWKQISKUKSIUKSKUKQGMGGCQIUKQIUKUKMGGCSKSISKSIUMSIIEKEQIUKOGCASKUKQKUKEEa@SOIUQQKSOQMQMSOQOQOMKII]][[KMAAKMEEIGOSKMACMOUYMQMQAAOUMSOUKQAAOWKQ?AOUMUMWMUOWMUMUEIGKMUMUKUMUOUMWOYMUEGUc@MUMU]m@EIGKMUOYKQMWA?MYKQOYMUMUMUMUOWMWMSMWMUIOCGMSOYMWMUKQOWMYOWMUMUMUMUMUOWKUOU?AMUOWKSMWKQCCMWMUMUMSMWOWMWMUOWMUMUMWKQMWAAMSKUAAMUMWOWOWKSMUOWMSOWMQOWOUMQMSOUOSOUQUMQQUOSMSOSEEIMOQOSQWOQMSQUOSQUKOOUA?MSQUOSOSMQKOEEOSOSOSOSIKU]QSMSOSQUOSIKEGOSCEKMMQQUOUOSAAMQQUEIIIOSOUOSOSKOSWOSEGKMOSOQQSMQQSOQQUOQQUOQQSMQQSOQQSOSQSOSQSMQQSQSOQMQAAQSOSQSOQMQCCMQQSOQAAMOQSQS?AOQOQEEKOOQOSOOACQSQSMO?AOQQUQSOSOQOQQSQUQSKMSWQSOQOSOSOQQSQSOQQSOSQSMQQSOSOQQSOQOSQSMQQSQSOQQUOQOQQUQSMQQSOQOSSUGGEGOSQQOSQSQSOSOSQSMOOQQS?AQUOQOQOQSUa@g@OSOQQSW]GGQSQUOQMQOQQSOSOQMOOQOQGIOQQSOQa@i@OQQSOSQSOQGIGIQUQSMOSUOQKMGIIKSU_AkAQSOSQSGIIIOQEGIKQUMOQSQQQQMOUQOOSOQQSMQOQOQMA?QOQMi@a@e@_@CCMIIGQOa@[A?o@g@SOSOQMGGIGSOQOSOOKUQQMSOQM?ASOQMSOQMSQQMQMQMSOQOSOQOQKQOUQQMQMQOSOQOQMSOQMSOQOQMSOSOQOQMSOQM?AQMQMUOOOSOQMQMSOQMSSQOQOOOSSQOMOQSQSMQIKGIMQAAOSMQOUOSOUOUMSOSOUKQQUOUOSMSMQSYKQMSS[MOMSOUKMCEOUMSQWKOA?MUOSOUOUMSQUMSMSMSOSACMUOSEIIMEIQa@GMCGMWGOEIKWKWKWCECGCGKYIUACIYKYEOMa@Su@I[CKCI?A?AQs@Ow@GYG]CMCIE[E[G[?ACYE[E]CMAMC[AIASC[C[?AC[CYA_@A]C[AYA_@?[?KAQ?]?Y?_@?]@i@?g@@W?W@S?Q@U?C@[B[B]@[B[B[B]BO@MB[D]DY@QBMBWLw@D[FY@CDWF]FWF[BQ@GFYH[F]FWF]F[FWF[F]FYF[F[FYFW?AFYF]Ns@FYF]F[?AFWDW@AF]F[F[FWF[F[^gBNy@Nw@FYF[FYF[FWH_@F[DWFYF[BG\\gBBMBKDYH[?AFYFYDYFY@IFUDWH]FYF[DYFYBKBOF[H]FYF[FYF[FYF[F[FYF[?AFYFYF[F]FW?CFWF]FWF[F[FYF]F[FWFY?CF[H[DWFY@GDUFYF[H[DYF[F[FYF]FWF[F[F[FWF[F[FYF[F[Nu@n@aDH[BOBIF[F[FYF_@FU?AF[FYFYHg@DSDUF]FYF_@DYDYDYF_@DYD]D[F]BYDW@GBWD]D[B[D]PqB?ABWB]B]B[B]@[B[B]@[B_@@[@[B[@]@]@]@[?]@[@_@@[?]?[@]?[?]?[@[?_@A[@]A]?Y?_@?[?]?[?]?[A]?[?]?]?[?]?]?YA[?_@?Y?A?]?]?a@AW?]?]?[?]?W?E?]A[?]?[?]?_@?Y?[A]?[?A?]?[?]?]?[A_@?]?[?]?EAW?[?[A]?]?CAWA]?]A[A_@A]A[A[A[A[?AA[C]A[Co@Cg@A]C[A]C[C]?AAYC[C]CS?GC[Gy@E[C[C]E[C[E[C]E]CYE[C]E[?ECUIw@E]C[AMCOC[E[C[E[C]E[Iy@C[E]C[C[E[?AC[C[E[C]E[C]C[C[E[C]C[CY?AC[C]E[C[AWAEC[C]CYKuAIkAEe@Gy@Ey@Gy@G{@Eu@C[A]C[Eo@Ce@Ey@MqBEy@CYC_@C_@AWGy@C]Eu@Ca@CYC[C[C]A]CYKyA?KAOCYAMAKAMAMAWAIY{EIgAIqAC]C]Ew@C[C]Em@Cg@C]Gw@C_@A[C[KuAEw@UkDG{@A]Eq@AE?MCi@C_@Cy@Ay@?]?G?U?]?Y@_@@y@@[B[@_@@QBc@D]B]B[DYD]D[D[Hm@Je@DYJc@P{@BGVmABIF]Nq@F]Lu@Jw@F[DWJw@Jm@BMHc@Ji@Ha@F_@FYFU@GViAF[Li@T_AFa@Ni@BMJ_@BKRy@Po@XoAb@gBFW@ENi@ZqAZsARu@H_@n@kCjA{EXiAJe@~@wDFWBK@ELc@Ry@VeAH]No@~@{DLk@@GR}@Li@BONo@Je@?ENm@Ji@?ANs@VmA?ADQFW@CJk@BIH]Ny@H_@DSFULo@BMFUZ}AJi@Pu@\\cBRy@R{@RaARaAPy@R_Al@sC@MBMBMD]Fo@H_ABa@Dm@DqA@gA?y@CoACqBAi@A]?[AWAsAC}@CyBAc@AgAAe@Am@A[?_@Ai@Ai@Ao@Cs@?[?GAi@A_@?a@Ak@Ak@Ak@Ak@CeBCeACmB?EAm@CqA?MCiBAIAmAAm@EwCAg@Ak@C{A?C?IEuA?CMyGIoECcCG{C?i@Ao@?]A[CoACkAAmAC}@A}@CoAImDE_CCaCEqCCqBAoACoAAkAEiBCeBCyB?gCAq@CoB?oC?IB{@@y@?U@a@DmA@_@By@Bo@@Y@_@D}@RoCB[LoANkAFe@D]F[NaAFc@Nu@DWDSBSNw@\\iBLw@@EBGBOJi@?ELk@N{@X_BJg@XyAfAkGFYl@_DDU\\yANi@BMDMv@kCDMDKDO@GFSr@}BDMLc@To@Rs@FQBI@CFSHYRo@La@@ENc@DQDMHU~@yCf@aBLc@Lc@Lc@FWLc@DUJe@Jc@NaAF]BU@IDYHq@?ED_@D_@@OHwA@YBu@?O@I?u@@a@?c@Aq@Ac@Ae@A_@A[C_@A[C[A[C_@A[Gw@Ca@ScECa@IwAOcCC]E_AG{@EaAIsAIqAC_@Ey@Es@?AGw@Ce@AUIuAE{@MoBQyCQwCGgAE}@G_AGiAC]Ey@Ce@Ca@KwA?OIsAAIKkBIqAEy@Ey@G}@MsBI_BUaEEe@A_@Ca@Eu@C[C_@C]A]Ew@CSE_AG}@Ew@AGCq@C[C]Cg@Ce@AG?CCc@AKCc@AYC_@CYA[CYC]A_@AKAMEy@Ew@C[C]?CImAA_@C[Cc@CWA[C_@Eu@MwBAKEgAMoBC]A[C]C[A]C_@C[A[C]AGAUC[A]C[?AC[A[C]A[C]C[A[C]C[?GASC[C]C]E[?AC[C]EYAIASE[COAKE[E[?AEWE]ACEWEWMw@SaAUiAOo@Su@Qu@AEGSK[IUMa@AEEKUq@Ww@Y}@Oa@IWKWACIYa@kA_@kAKWIWUq@KYIYEMg@yASm@Us@o@kBQi@KYIWM_@GSa@kAAASo@i@_BCGKYu@_CUo@IWy@aC_@kAk@cBWu@GSUs@KYIWK[IYw@{B_@kAQe@Qi@Qi@y@cCe@uAgAeDGQCGK[i@cBM_@Qi@A?Sq@a@iA[aAOc@Sm@GQc@wA]gAU{@IYK_@[_AKc@GYOu@COCKEYG[GYE[CSCKEYEYE[E[E]C[EYC]CUAEC[C]C[C[C]A[C]A[C]A]A[A]A]A[A_@Aw@?]?]?[?S?I?]?[?]@[?]@e@Bw@@UB_@@Y@[FwAB]Bm@Bg@B]@[B]@]@W@C@[B]@[PsDDu@@WBc@B]Bs@Ba@B[J_CPcD@]B[@[B]Dy@@OBs@H{AFeA@[@OBi@B[@]B]@[B[@]B[N_DDk@@[B[LeCBg@@]B[@_@@]@Y@[Bw@@mA@wAAw@AuA?KAi@Aa@Ai@E{@AUAe@Gy@A[C[Gy@CUEi@Iq@I{@Iq@E[E[G[E]ACG_@EUMq@Oy@Mq@I]I]Om@I_@Qu@WaAc@gBU_ASw@I_@Mk@Qq@Om@COU{@[qAI[Qs@U_AWcAQs@GYOo@i@uBCMSu@I_@Ka@EOESOo@EKOq@Qq@G[EQIe@CGEWIe@Ig@CSGc@Ii@AOCUAOGk@C[CWCe@Eq@ASEiAAUA[A[?]A_@?Y?K?Q?s@?c@@]?Q@g@@_@@[@Y?UB_@@WBc@B]@UDg@B]@MH_ADk@PyBHiAJmAJsAHmAHaA@MDe@H{@@YD]B[B[BY?CB[B[B]BY?CB_@BWB[B[@KBSBYB]Fy@BYBYB]@UD]B_@BY?EFs@B_@B]B[BYB[B[Fy@D]@YD[B]@YB]D]@[B[BYB]Fw@D_@B[Fw@JsABYB]Fy@BYD_@BYB[B_@BYB[?GBSBYB_@BYB]B[B_@BYB]BYB[?ABYJsAJuAToCFeADm@JuABW@WDa@F{@Ba@@MFgADu@@YB]?M@Y@QB_@@Y@_@@[@]@[@_@@K?O@YBuA?]@[?[?Q@I?]?S?I?]@K?O?[?_@?[?[?C@Y?WA_@?]?[?]?IAS?[?YA_@Am@Ae@A]A]?AAY?Q?IA]Cg@Co@A[?EAWC]A[A[Ek@?MGw@IwAIoA?ACYC]C[C]C[E[Ec@Gs@C[E[CYAECUCW?ECUE_@E[CUGa@?AE[Ee@CSEYE[C[EYE]EYC[E]E[?AE[EYC[E[AECSE[E]C[E[E[E[E[CWE]E]EYE_@CWE]CUAAC[Ga@E]CYCQAGE]Iw@EYE[C]Ku@UoBCMAMEYE[CWCSGg@E]CYEYE_@E[E[C]EY?CKs@E[?GCUEYE_@EWCUCIEYE[E[G]EWG]CUG]GYOy@Ou@EUEQCKI_@GWEWQu@Qq@IYSs@Ke@EMK[IYAGIWMc@Qg@eA_DCGIWUs@IUCGGQK[AGEMKY]aAK]ISAEUq@K[GSCGIUIWKYGSKYIWyAoEUo@K[So@IWCGGOK[EKMc@EKEKK[Uo@_@gAK]Sk@Wu@_@kAa@kAUq@Ma@}@kCK]IWISa@kAUs@IWISAGEIGSWu@Oe@K[Us@ISI[KYKWIYKYCIEMKYIWKYIYKWIWKYEKEMIWUq@_@iAKYK]ISIYIUEMQe@IWK[IWIWK[IWEMCKIUI[IYIWSs@GYIYESKa@GYGYGYI[G[GYG[AEESG[G]EYG[G]EWKu@CICSEYMu@My@EYAGIk@G_@G[CUIa@Ku@CMAGGa@E]EWGYE_@GY?AEYEWG_@UqAE[EYAISkAKu@G]EWMy@Kq@?CEUG_@Mw@G[E[G[E[Ms@Ou@Ki@CMWmAQy@I[GWQu@GUK]IYSs@K_@ACOo@Wu@K[So@Sk@KWOa@[y@Se@KWSg@AEKUUi@CGEIIQISIMGOOYOYSc@MUMWi@_AKSKMOYKOS]]i@o@_Ac@o@Wa@iAaBeBaCKQ[c@_@i@aAuAY_@k@{@_@g@_@i@QW]g@OSOU]e@_@i@OUOSKQGKIImAgBOS]g@OSOUOSEGIKOSOSMSQUMQMQSUIMOQUYOSOQSYKKOSOSA?OQOSOQOQQSOQQQACOOKMa@c@UUa@c@OQOMOOSUQOQQeAcAQQQOOOCCMKQQOOIIGEQQSOq@m@y@s@USwAkAg@_@MKy@m@GEKGQOc@Y_@W[Uw@g@QMe@YSMQMSMQMQMSMSMaEmCe@Ye@[SKSOECMIQMCAMKQKSMQMg@[QMSMi@]AAy@i@_@Wg@[SMOKUOoA{@IGsAy@MKIEGEUOUOSMOKMKCAWQQKOKSMk@_@gAu@OIECQMmAw@AAOKCCYQYQe@YWQSMIGGCSOQKSMOKg@]UOiAu@QMOMAAQKSOSOOMMICCe@_@II_@Y_@]AA_@]QOc@a@QOOQSQOQCCMMOQc@a@OQGEIKOOQSa@c@OOa@e@OOc@g@OSOQQS_@e@OS_@e@SU[a@QUMQQSMSQSMQOUOQOSOSMSOUOSOSCEg@u@OUOUCCk@}@KQMSOWMSOSIMCGMUMSOUMUMUMSMUMUMUCCKSKSMU[m@MWMSMUKUMWEIS]MYMWMWKU_@y@Ue@CGKUCG[q@ACWk@KWKWYo@IUMWKUKYKUKWIUa@eAe@kAKYKWAGGOKYKYIWIUKYIYKWSq@IW_@kAKYIYIYAECGCKSq@IWI[IWIYIYAGGSQq@IU?CQs@IYGWI[Qs@CGEQG[CICMSu@CMCMGYGYAAGWGYCMAEAGEKOu@Mk@GUGUAKEQIYGYYqAOs@I]GWI[GYGWG[I[GYAEMo@IYGYAGESIYGYYoAG[GYEMAII[G[IYGYOs@I[k@eCMk@Oo@UgAI[COAEKe@]yAG[I[AGGSGYG[GWGUAGOq@I[Ia@CMOo@Qw@S}@CKCMIYGYG[GYI[GYGYKa@AICIEQACI]Mm@AGI[AGEQGYG[GWI[AGESGUGW?AGUAGIYAGESGYQs@CQCIIYGWG]IYAKEMGYGYQu@GYQs@Mi@CMGYACEUGYESK_@G[CMCMIYGYCMCMGWI[Mi@Mm@GUAEMk@IWG[IYGWIYIYGYIYIYIYQs@IYIYIWI[Sq@IWK_@Sk@IYIYIWEKOg@KWGWWs@IWK[KUUo@KYIWKUK[IUM[IUKWKYM_@_@_AKYKWIWWo@KYKWWq@IUCGGMKYIUKYKYKUKWKWKYWk@ACe@gAWk@g@eAMWc@y@CEMWWc@EGOW[k@QYGK]k@OUOSOSMSOSOUMQOSOSOS_@g@MSOSOUW[CCCGEEKMACi@u@MOCEOSOSMSQSMQMSOSGIW_@OSKMCEMQQUOSW]EGQUOSIMSYMQQUOSOS?AOQOUMQCAKQc@m@AAIKOS}@oAOSOSOSOSMSOSOSOSOSACMOMSOSOSKMCEOSMSKOIKYa@OS[c@KKGKOQGKEGOQOSOSOUKOACOQOUMSQW]i@[g@MSOWAAKQ]i@MUMUAA[g@MWMQKQMUMUOWMSOUMSMUMUMUKOAEOUMSMWMSMSOUACKSMSOUGMEGOUMUMSOWKSOUOUMU[i@GKEGOWMUMUOU]i@MUIOS[MUOUMSMUOWOUKQMUOU]m@MQMUMUOW[k@KUMWKWIOOa@KWKWKWKYKWUo@Uq@Qi@CIi@_BK[]iAAAIWK]Sq@CGWw@CKUu@IUM_@M_@GUEMIWMa@So@KUIYKWKYMWKWKWYo@[m@g@aAOWMUMSQWQYi@u@_@g@GIGIQS_@c@OSs@w@s@w@UWIKQS]_@s@y@OQSSa@e@_@c@q@w@s@w@a@c@OQeBqBi@m@GIa@c@c@e@_@c@GGY]s@w@[_@UUs@w@o@u@s@w@QScAiAo@u@QSa@c@aAiAi@m@IIm@q@CCQS{@cAUYa@c@a@e@SUMOOQQQaAiAQSa@c@QQOQKMUWMOSUOQa@c@a@c@GIIKOOQSQSOQa@e@OQQQQUcAiAk@q@QQo@s@m@s@IIm@q@UWa@e@a@e@a@e@oAwAy@}@k@u@q@{@W]Y_@GGc@o@]i@k@}@OUKSOW}@wAi@}@]k@Wc@c@q@i@_Ak@}@m@aA]k@g@{@S]MSMSOWMQyAcCMSOUMUOUKSOUOUOWKSOSMWOSMUMSOUMUOUMUOUMUMSOUGMEGOUMUKQAAOUMUOUAAKQKQACOUMUMSOUMUOUMSOW]i@k@_Ay@wAy@qA?AOW]i@OUMUU]Ua@m@aA[i@{@uAe@w@S]]k@MS_@o@[g@OS[k@Yc@CGS[u@oAOUMUOSMUMUOUMSOUKSOWOUMSOUk@aAMS]k@MUMSAAMSOUMUOUMUOUMSMUOUMUOSMUMUMSOWOSMUOUMUGKEIOSMUOUMS]k@Yg@MSa@q@MSOUMUMSOWMSOUMUMUMUMUOWMUMUIQAEMUEIGKKWMWIOCEKWEIGMKUKWIQCGKUKWKYKWKWKYKWIQM]KWM]IUQc@Qa@IYKUKYKWWq@KWEMEIKYIUM[KYIUKWKWWo@KYK[KUGOM_@KWKYKUEMAEGOGMK[KUIWEKGMIWKWKWKYIUAAKYKYWo@KWM[CIOa@KYKUi@wAmA_D[}@CEc@gAWu@ISKWUm@AAIWKWKWKYUk@M]KWISM[u@qBg@uAUm@CEKYWq@ISIWMYKWIWMYGOYu@a@iAWo@CIGMSg@_AeCKYSg@M]ISAEKWWq@KWKU?AKWK[KUKWKYKWCKQe@KWKWKYKWYq@Yo@KUKWMWKWMUMWKUMWGKEIMUMWMUMUCEACcAgBKQKQQYMS[k@[k@MUMU]k@[k@[i@]k@Yi@OW[i@]k@[k@[k@]k@MUMU[k@]k@[i@[k@MUWc@EGMUMUIMCEMUOUQ[Wc@]m@KQ_@o@EIOUMUMUMUMSMU[i@QWYi@]k@i@_A[k@]k@MUMSMUMUOUMUMUMUMU[i@OUYk@OUGMS]MSMWMU[k@MUMU[i@m@iA]k@[k@]m@[k@[k@MUm@cAk@cAi@aAmAwBWc@]m@MSOYMU[i@[i@o@iAi@_AQYQ[CEKQS]KSMSMUOWMUMU]k@MUMUMUMUMSMWMSOWMUMSMWMUOUMUMUMUMUGIEIs@mAWe@MUMUKQOUMUMUMUMUOUMUEGGMMUOUMUOUMUMWMUOUMUMUMUMUMUOUMUMUMSMWMUS]q@mAQYc@u@_@q@g@}@e@y@MQMWi@}@e@y@S]MUOSMSOUMSOSOSOQOSOSOQQSMOa@c@i@g@OOMKUSSQq@i@e@]QMAAQKQMSOSMSKcAi@_@SSKQKSMUKSMMGSK]S]QYOc@Ue@WmAo@OI{BmAGEe@WQK_@S[QSKUMQI}@e@QIs@_@m@[?AyAw@MGGCa@UUMu@a@s@_@YQOGSMi@WSKe@YQIAA_@S]Q]QWOKGUKYQi@YSKSKSKSKSMECCA[Qi@YSKc@WWMMGWOQKQICAQKSKSKSKq@_@IESK[Q_@SKGa@Sg@W[QWOIE_@SSKQIg@WSKSKCAOGSKUKSISKSISISIUISISIUISIEAOGSGSIUISGSIUIy@YCAUISGc@QWIe@QWIa@O]MSGSIWIGCICUISIUGSIGCKEUGKE[KSISIUGSIUIUIQGSGUISISGSIYKOESIWIQGSIMEGASISIYImAc@SGIEGAUIg@QWKUIQGSGUISIQGaA]SGg@QUISIUG[M_@MUIa@McA]OGIEGA[MUGIEc@OQGQGUIKCGCKEICSGIEICA?[MOGe@SYKQG{@Yq@UAAEAwBu@]MUGQIg@QUIUISGk@SOGo@Uy@Yi@SUISIgA_@_Bk@oCaAkAa@o@Uu@WaA]{@[k@S{@[q@Ua@OaA_@g@QaA]mAc@{@[q@W_@MUIg@QUIg@Qg@Qg@S_A[k@Se@Qi@Qk@S[KSI_@Mc@OECkAa@aA]YKu@Yc@QWKk@WYMa@Qg@We@Ue@UECw@a@cAi@m@][Qs@c@g@Wg@[[Q[SSMw@c@y@e@QKWQMG}@g@]Ss@a@{@g@c@W{@g@y@c@y@g@g@Yg@[[Q]Sy@e@_B_AcCwAgAq@o@]g@[UM}@g@{@i@{@e@k@]cAm@YOeAo@eCwAcAk@aAi@aAi@a@USKg@[AAOIs@_@SMYQg@Yy@e@UKQKUKSKuAo@y@[QIUISISGSIc@OYIi@QSGUGUGUGSGUGKCGAUGC?OEUEUEICKA]GKCUESEWCUESEUCUCUCSCSCWCSCUCUCUAUCSCYCi@GUASCWC_CSUCk@GUCSAm@GE?MCUA]EMAUCQCQAyCYa@EyAM_@Ei@EeAKSCy@Gq@IcBOoBSq@EkAMmAKWCk@GYCg@GiAKkBQ[CcD[A?eCUEAsCWGAuCWe@EaAIw@IiAKiAKIAg@G_AIe@E{@GyAGUA_@Ca@AmACs@AaAAw@?wA?gA?O?qA?qA?c@?uA?wB@Y?mA?eB?a@?e@?wA?W?U?U@M?[Aa@?Y?Y?G?m@?kA@{@AuA?kA?sACq@AA?cACeAEi@Cm@CmAIsAM_AIA?_AKWCa@GE?QCc@GUCq@Ku@Ms@MKAc@ISEwAYc@K_@Io@OIAsA[}@WSGmBk@mA_@cA]g@QmAa@GAMGUG[KAAUIgBk@a@Mg@QKCOGk@Qg@QsAc@KEe@Oo@UyC_AyAg@i@Q[Kc@Oo@Ue@Og@QuAc@a@Oa@M]Mi@QiA]]MWKWKWISIy@]uAm@cB{@y@e@MIm@_@{@i@y@k@_Ao@c@]a@]UQWUUSq@m@y@w@a@c@KK]]WWs@y@k@q@k@u@cBsBEE?AIK[_@eAsAeAsAo@y@m@u@e@m@mBeCmA{Ao@y@q@{@_AkAGGu@_Ag@k@q@w@c@i@]_@s@w@k@m@kAkA]]g@g@A?YYi@e@}AuAiA_AKGcAw@q@k@w@k@o@g@iA}@]Wa@YACc@]mByASOg@_@k@e@g@]]YMKgA{@w@m@k@e@{@s@WUk@g@YWi@e@k@g@WYQOOOSSQSWW[[EEUWQQQQSU?A_@a@e@g@SWACUWSU]c@QU}@iAu@aAKOOSGIOUIKMQYa@[c@CESWYc@_@k@i@u@IMi@y@o@}@IMU]KOk@y@ACcAwA[e@QWGKEEU]OUu@eAU]W]OSSWo@u@QWKKi@m@[_@[[]]YWWUIIWU[YOMAAc@_@q@g@s@i@ECsA_A]Si@_@aAm@CAeAo@UOWQy@g@_@Uc@Yw@g@SOu@k@o@e@WUIGOOQMWY_@]SQ_@_@IIEESSg@k@Y[[_@UYQSOSY]MOg@u@CC[c@QYOUOSIO_@k@e@u@e@q@U]}AaC_@m@q@eAKOGIIOo@aAOUW_@]i@c@q@m@}@e@u@mAmB[c@u@mAMQEIU]g@u@QWCEu@iA]i@m@_AGI_@m@a@o@_@k@OUMS[c@KQS[OUAEKM[k@KOAEMS?AMUUe@EGYo@Wo@c@iAY{@e@{A[oAWoAOu@Ie@Ge@EWC[Gs@Ea@AOEq@CUAa@Cm@C_A?g@?[@}@@o@@a@@[@YHoB@_@HqBB{@DaABk@@OFcBHuB?EFmALgD@c@Bw@Dw@H_CBe@Bk@@]Bi@F{APqEHcCLyC?ABy@Ba@JwB@a@@M?K@]B[@_@@[@]B[@[@]@[@K@i@Ba@@]@]B]@[@]@]@[B]@]@[B[@]@]@[@]B]@]@[@[@_@@a@@W@]?[@E?W@[?]?[@]?C?W?]?[?]?_@?Y?]?[?[A_@Aw@?]A[A_@A[A]A[Ac@AUA[C]A]A[C]C[AO?MC[C[C]C[AMAOC[C[C[E[AMAOEYC]E[E[AKCQCYE[E[E[EWE]G[E[G[EW?CG[GYE[Ic@Mm@GYKe@EWKa@CKGYGYI[I[GYIYIYIYCMCII[IYIYIYIYIYIYGYIYIYIWI[IYIYIYIYQs@Mc@EOIYIYIYIY?A[kACGOk@I[Ss@IWIYIYIYIYGYIYIYI[IYIYIWIYI[GW?AIYIYIYIYIYAEQo@EQK_@EOMc@IYIYIYIWEQCIIYGYIYGUACI[I[IYK[I[I[Us@GYKYIYI[CKCKIYIYIYIYI[GWSs@IYIY?AGWIYIWIYGYIYIWGYIWIYIYGWEOCKIYSq@GUK]IYIYIYIYIYEOCIIYIYIYIYI[AGGSGYIYIWG[IYIYGYGYI[GYG[EMCKGYG[GWCQCKGYGYE[ESAGGYG[ESAGEYG[E[E[GY?CQoAG[E[E[E[E[C[EYE]EYC[E]E]?CCWEYC[C[E]AKAOC[C[AIASC]CQ?GC[AUAGC[A]C[C[?CAYC[A[C]A[C[A]A]A[?CAWA[AM?OA[A]A_@AQ?e@A[?OAK?[?]A]?[?OAM?[?]?G?S?]?[?]?[?]?]?[?O?K?]?[?S?I?[?]?[@[?A?S?G?]?Q?O?y@?M?}A?{@?[?Q?O?W?]?A?_@?[?[?]?[?[?{@?u@?iC?g@?cB?M?{@?q@?E?{@?y@?y@?C?w@?E?o@?_@?y@?E?s@?{@?w@?K?o@?y@?w@?_@?[?[?s@?G?[?]?[A]?]?[?]?]?[?]?[?]?EAU?]A]?[A]?EAo@?CA[A[A]?EAWAW?CA[Cw@A_@C[A]C[A_@C[A[C_@Es@C_@C[C]C[AKAQC[C[C[E]C[C[E[CYE_@E[C[?AEYE[CYE_@E[E[E[EYE[G]EYEYG]EYG[E[G[EYESAGG[EYG[GYG[G[GYGYKe@CKI_@GYIYGYI[GWI[GYGSAEI[IYIWQs@Ss@Ss@GQK_@aBcGOg@EMIYGYIYSs@Ss@IYCKCMIYIYIW[kAIYCGOm@Ss@AEGSSs@CKMg@Sq@_@oAGWIUI]Y_AMe@KYSu@Ss@GWI[IWSs@Su@Qq@I[GWGYI[G]GWI[EYGYG[G[G[G[EYG[E[EYCQAIG]E[E[E[E]C[EWCYAECYC]CYE]C[C_@CWA[Ec@Eq@Aa@Eu@A[A]AKAk@AC?YCy@Ay@Aw@A{@A_AAs@?]?]A]?YA]?_@?YA[?S?IA]?[A_@?Y?a@Ak@?_@AW?]A[?c@AW?[?]CqAAyA?_@AuACuB?a@AWAwA?OAOAu@?KA]AmBAcAEmEA[Aq@AcA?y@CuA?{@CwAA{@AuA?]Ay@?y@Ay@As@?YA]?]Ay@?[A_@?[?[A]?[?]A]?e@Ao@?[A[?]A[?]?]A[?]A[?a@?WA]?]A[?]A[A]A[A]A]A[A[C]A[C]AYC]C]C[C[E[C]C[E[CYE]E[E]EYG[E]AICOGYG_@Ms@G]Os@I[GYGYIYGYI[IWIYIYI[KYIUK]K[M]GSCGKWKWIWMWIUMY?AG[Yo@O[Wi@OYOWKS]m@]k@]i@[g@_@g@MQQUQU_@e@QSOQOOQUQQAAMMOQSQOQa@_@SOQOQOAAOMSOOMSOQMSMQMSOSKQMA?QMSMSKQKUMSKSKQIUKQIUIUKWIQISGQIWISGQGUGUGUGSGWGUEQEUEQC]G]Go@MQEgAIMAYCUAUCSAWAC?e@AU?UAk@?S?W?U?S?]?O?i@?g@?W?k@@U?S?U?U?U?U?U?U?i@?W?i@@U?I?K?U?S?U?W?S?U?W?S?U?E?O?U?S@W?S?U?U?U?U?U?i@?W?i@?U?Q?C?k@?U?U@S?U?U?U?U?U?U?Q?W?g@@I?O?M?]?S?U?U?U?k@@W?gA?]@E?U?Q?W?W?U?U@U?U?U?U?U?W?U?Q?uB?a@Aw@Ag@AmBIaAGs@Es@Gm@G_AICAe@E[EWCUEWCYEUEKAWESCUEUECAc@GWGu@M_@ISEUGWGk@Mi@MgAWqAWKA]Ii@Kk@MSEUGSEA?GCKCKCIAUGUESEk@MSEm@O}@SUE_AUi@Ku@Q]I_@IOEg@Ko@OQEWGMCYGSGg@Kq@Oa@KUEk@M{A]GCYGUEeB_@OESEOEYGcAUa@IA?y@SQEWG}Bg@]IkCk@gBa@qA[SEm@O_@K[GSEmAY_ASi@MUEUESEUEUCUEUEUCSEUCMCq@IWESCUCSCk@GWASCUASCUAC?UCSAUAWCUAS?m@CUA_AC[ASA}@?aAAU?S?W?uA?K?_@?k@?WAQ?YAQ?m@Ck@Ck@Ek@Gi@EKAa@Gi@I]GKASE_AQOEE?UGSEi@OUGg@MWISGQGA?i@Qg@SSGSICASGSIQIWKSKSI_@Q[Qa@SECe@Y[Q]Se@[g@[e@]c@]KIWUc@]SQa@]EE_@_@EEMMMM]]EEa@c@EGOOKMW[IKi@o@e@o@_@i@[e@AA]g@_@i@]i@_@i@u@eAiKsOe@q@AAEISYMOQYKO_@i@[g@GIW_@U[g@u@]g@_@i@MSYc@c@o@_@i@]g@_@k@]g@MQs@eAi@y@_@g@]i@_@i@]g@_@i@]i@QWk@{@OSOS_@k@]g@]g@Wa@}AeCGIy@oAKOiA_BGKS[U]CCU]]g@GKOU_@i@]e@]g@AAMQQUMSa@g@OSa@g@_@e@_@e@QSOQOQEEKMQQOQGIIGOSQQQQQQy@y@KKOOQQc@a@OOSOQQQOUSg@a@SQQOKGGGQMQOSOQMOMAA_@Yk@_@CAOKSMQMQMUMMKCAQMSMSMSKIEIGSKQKSMSKSKSMi@WAAs@]k@W}@c@e@Qe@SCAk@USIUIQIUIOECASIi@QEAKEC?SIUGSGA?]Mo@Q}@W{@Ua@MSG{Bo@y@U{@Wi@Ok@Om@QOEi@OuAa@QEsAa@MCICQGUGSGEAc@Mi@OSGi@Se@Og@Sa@Q[MAAWMUKOIWMOG[Q]SCAQKk@]OKAASMKIk@_@e@]QOQMMKEEOMc@_@e@c@EEIGQS_@]EE_@_@QSQQQSOQOOOQOOeAiASUOQQO[]{BcCyCcDc@c@IKOOm@o@KMu@w@u@y@OOQSQQOOc@e@OQSSOOWYGISSOO?AQQOQSQAAMKQQQQOOWS_@]SOMKCEQMSOAAOMSMQM?ASMQKIGIGSMQKSMCAOKSKe@WAASKQKSKUKg@UQIk@UA?QIA?i@SSIA?SIUGSGe@OCAUGUGi@OSEQGC?UG_AWSEEAOEc@Ma@KMCo@QgA[EA{@Sm@QUGSEmA][GKEgBe@}@UeAYUGSESGWIg@Mi@MMEq@Qy@U]I]KGAOEsCu@CAWEECOESEUGQGk@MSGUGg@Oi@M_AWSESGk@OSG_AUi@Ok@O{Bm@UGqA[IC[KEAa@KEA]Kc@K{Bm@gD{@SGKC]IsCw@m@OSGQEWGUGk@OmA[[IYI_AUa@K_Cm@g@MwA_@YIa@KYIa@K[IUGUGOEUGWGQGUGOEICMEWIGAQGSGECMCUIA?SIQGUIQGOEGCSIaA_@y@]QISIUKQGCAg@UQKSIUKWMw@a@SKSKSKSMQISMUMYQKEQMSKGEUOOIOKSM_Ao@QMe@[QMSOSMQOQMSOSOUS_As@USUQ][KIMKGGGGOMMKOOKKGIGEQQc@c@SQOQOOUUQQSUOSOOIIGIQSa@e@MQOSQSOQOSOUQUOUMQQW_@k@OUKSMUMUMUOYKQOYMWKUMWISMYKYKWKYKUUs@I[IUACIWEOCMIUIYK[IYKYAAIWKWSi@CEKYKWMWKWKUKWYq@IUO]IQKWYq@Wo@MWKWKUKYMWKWUk@[s@c@gAKUUk@]w@ISMYKWKUKUKWACKUKWKWYo@KWKYKUKUAEKSYq@KWKUKWACISKWYo@Wo@ACISMYm@wACGIUKS[u@GOMYAGMWCISc@CGGMKWMUAEKSIMEIGMKMKQKOIIGIOQQOQQSOQMAAQKSMIEKESISISGSEWEIAKCUCUAUAU?C?Q?U@K@I?UDUBOBODK@UFSFWFE@KBSF[FODSFi@LaAVk@LSF_@HoBf@A?g@L}@Tq@P[H]HC@C?GBWFA?C@[H_ATE@]HA@C?MDMBSFMBE@MDMBC@I@SF]Hi@Ls@Ra@JK@GBg@LWF[HWDKBMBI@S@UBU@[?M?UAUAWCOCUCUEo@IUESCSCI?SCYAS@MAg@@M?K@S@c@FO@WDA@_@HQFQFq@Xo@XWL]RMJk@`@eD~B[VYRC@UPQJc@ZWR[TKHQLa@^IJSTWZCDILQVINKRMVEJCBMZKZITIXIZAD]`BKf@On@A@KRETe@tBAF_@dBMj@Qz@]pAGVKZGTUp@Ob@Qh@KXITKVUl@GJ[t@Q^Uf@EHGLMTOXi@bA_@n@m@bA]l@w@pAOVA?U`@]h@OT_AvAk@z@OPg@t@GHMPUZQTA@EFORUX]`@QTML[\\A@YTMJGFUPWP_@RIFo@Zq@TuAZQKC?O@W?MAE?eAGYE]IMCMCOGMEm@Ss@UGCGCs@WKE_A]OESGe@OIMMGMIKGMMKGCCEEAAOOECOQY[KOIMCGIMCGAA?AEGGOEIAGEOEQAA?EESCUAC?IAOAQ?E?O?O?U?k@?A?q@Ai@Ac@?OAOAO?EEe@Ee@AKE[~@i@FC\\U`@UZxABFAhA?^?NBxB@bBI?"
                          },
                          "start_location": {
                              "lat": 40.7569006,
                              "lng": -73.9902798
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 41.824893,
                                      "lng": -71.41701399999999
                                  },
                                  "name": "Convention Center, Providence, RI"
                              },
                              "arrival_time": {
                                  "text": "6:35 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700350500
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 40.7569006,
                                      "lng": -73.9902798
                                  },
                                  "name": "Port Authority Bus Terminal"
                              },
                              "departure_time": {
                                  "text": "3:00 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700337600
                              },
                              "headsign": "Providence (Bus Terminal), RI",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "Peter Pan Bonanza Division",
                                          "phone": "1 (800) 343-9999",
                                          "url": "https://peterpanbus.com/"
                                      }
                                  ],
                                  "color": "#3c974d",
                                  "name": "NEW YORK - PROVIDENCE Express Service",
                                  "short_name": "Peter Pan",
                                  "text_color": "#ffffff",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                                      "name": "Bus",
                                      "type": "BUS"
                                  }
                              },
                              "num_stops": 1,
                              "trip_short_name": "0220"
                          },
                          "travel_mode": "TRANSIT"
                      },
                      {
                          "distance": {
                              "text": "0.5 mi",
                              "value": 731
                          },
                          "duration": {
                              "text": "12 mins",
                              "value": 710
                          },
                          "end_location": {
                              "lat": 41.829293,
                              "lng": -71.413301
                          },
                          "html_instructions": "Walk to Providence",
                          "polyline": {
                              "points": "m|g~Fhs{rLAaBC{B[@CASDc@@a@@AAM?A?OAC?O?C?OASAAC@O?QIk@]FK@M?U@G?W@]AYCgAGIAUCOAG?@W@a@ICCACAGGA?CESYWa@OQq@cAY_@a@i@g@s@OQGCKAI?A?A?AAIQWPII]YSH@?V["
                          },
                          "start_location": {
                              "lat": 41.8248736,
                              "lng": -71.4170134
                          },
                          "steps": [
                              {
                                  "distance": {
                                      "text": "302 ft",
                                      "value": 92
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 74
                                  },
                                  "end_location": {
                                      "lat": 41.8249049,
                                      "lng": -71.41590029999999
                                  },
                                  "html_instructions": "Head <b>east</b> on <b>W Exchange St</b>",
                                  "polyline": {
                                      "points": "m|g~Fhs{rLAaBC{B"
                                  },
                                  "start_location": {
                                      "lat": 41.8248736,
                                      "lng": -71.4170134
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "0.1 mi",
                                      "value": 164
                                  },
                                  "duration": {
                                      "text": "3 mins",
                                      "value": 204
                                  },
                                  "end_location": {
                                      "lat": 41.8260308,
                                      "lng": -71.4155042
                                  },
                                  "html_instructions": "Turn <b>left</b> toward <b>Francis St S</b><div style=\"font-size:0.9em\">Take the stairs</div>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "s|g~Fjl{rL[@CASDc@@a@@AAM?A?OAC?O?C?OASAAC@O?QIk@"
                                  },
                                  "start_location": {
                                      "lat": 41.8249049,
                                      "lng": -71.41590029999999
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "0.1 mi",
                                      "value": 158
                                  },
                                  "duration": {
                                      "text": "2 mins",
                                      "value": 149
                                  },
                                  "end_location": {
                                      "lat": 41.8274964,
                                      "lng": -71.4154576
                                  },
                                  "html_instructions": "Turn <b>left</b> onto <b>Francis St S</b>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "uch~Fzi{rL]FK@M?U@G?W@]AYCgAGIAUCOAG?"
                                  },
                                  "start_location": {
                                      "lat": 41.8260308,
                                      "lng": -71.4155042
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "59 ft",
                                      "value": 18
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 33
                                  },
                                  "end_location": {
                                      "lat": 41.8274804,
                                      "lng": -71.4151682
                                  },
                                  "html_instructions": "Turn <b>right</b> onto <b>Finance Way</b>",
                                  "maneuver": "turn-right",
                                  "polyline": {
                                      "points": "{lh~Fri{rL@W@a@"
                                  },
                                  "start_location": {
                                      "lat": 41.8274964,
                                      "lng": -71.4154576
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "0.1 mi",
                                      "value": 229
                                  },
                                  "duration": {
                                      "text": "3 mins",
                                      "value": 186
                                  },
                                  "end_location": {
                                      "lat": 41.8290026,
                                      "lng": -71.41348069999999
                                  },
                                  "html_instructions": "Turn <b>left</b>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "wlh~Fxg{rLICCACAGGA?CESYWa@OQq@cAY_@a@i@g@s@OQGCKAI?A?A?AAIQ"
                                  },
                                  "start_location": {
                                      "lat": 41.8274804,
                                      "lng": -71.4151682
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "49 ft",
                                      "value": 15
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 12
                                  },
                                  "end_location": {
                                      "lat": 41.8291181,
                                      "lng": -71.413566
                                  },
                                  "html_instructions": "Turn <b>left</b>",
                                  "maneuver": "turn-left",
                                  "polyline": {
                                      "points": "gvh~Ff}zrLWP"
                                  },
                                  "start_location": {
                                      "lat": 41.8290026,
                                      "lng": -71.41348069999999
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "23 ft",
                                      "value": 7
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 7
                                  },
                                  "end_location": {
                                      "lat": 41.8291735,
                                      "lng": -71.413517
                                  },
                                  "html_instructions": "Turn <b>right</b>",
                                  "maneuver": "turn-right",
                                  "polyline": {
                                      "points": "_wh~Fx}zrLII"
                                  },
                                  "start_location": {
                                      "lat": 41.8291181,
                                      "lng": -71.413566
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "building_level": {
                                      "number": 0
                                  },
                                  "distance": {
                                      "text": "102 ft",
                                      "value": 31
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 27
                                  },
                                  "end_location": {
                                      "lat": 41.8294168,
                                      "lng": -71.413437
                                  },
                                  "html_instructions": "Walk for 100 ft",
                                  "polyline": {
                                      "points": "iwh~Fn}zrL]YSH"
                                  },
                                  "start_location": {
                                      "lat": 41.8291735,
                                      "lng": -71.413517
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "1 ft",
                                      "value": 0
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 0
                                  },
                                  "end_location": {
                                      "lat": 41.8294168,
                                      "lng": -71.413437
                                  },
                                  "html_instructions": "Head",
                                  "polyline": {
                                      "points": "{xh~F~|zrL"
                                  },
                                  "start_location": {
                                      "lat": 41.8294168,
                                      "lng": -71.413437
                                  },
                                  "travel_mode": "WALKING"
                              },
                              {
                                  "distance": {
                                      "text": "56 ft",
                                      "value": 17
                                  },
                                  "duration": {
                                      "text": "1 min",
                                      "value": 18
                                  },
                                  "end_location": {
                                      "lat": 41.829293,
                                      "lng": -71.413301
                                  },
                                  "html_instructions": "Take entrance <span class=\"location\"></span>",
                                  "polyline": {
                                      "points": "yxh~F~|zrLV["
                                  },
                                  "start_location": {
                                      "lat": 41.8294117,
                                      "lng": -71.41344309999999
                                  },
                                  "travel_mode": "WALKING"
                              }
                          ],
                          "travel_mode": "WALKING"
                      },
                      {
                          "distance": {
                              "text": "43.5 mi",
                              "value": 70059
                          },
                          "duration": {
                              "text": "1 hour 15 mins",
                              "value": 4500
                          },
                          "end_location": {
                              "lat": 42.35141,
                              "lng": -71.05542
                          },
                          "html_instructions": "Train towards South Station via Ruggles",
                          "polyline": {
                              "points": "axh~Fb|zrLDKs@{@_Ay@q@i@QIOIEAKEQEOEa@ESAS?S@SBw@N_@FWFiATqBj@g@N{Ad@k@RoB|@wC~AYPuEhCsC`BoFtCmAp@{@d@E@{@`@}@Z{@Tw@L_ADm@@{@AkAGc@Em@IeASg@McBk@q@[IEoDgBaB{@IEyAy@s@a@kAw@_As@_BmAiAaAeBoASM}A_AcAe@y@_@iBu@mAe@oBw@qBu@uAk@eCiAgAk@wAw@SMy@e@sBiAiBeAsF{C[QoC{AIGw@c@WOeAi@GCiAk@{B_AgC{@uAa@iCo@aCm@iCq@aCm@eD{@wAe@_Bo@sEoBo@Yc@SwAq@_EuBiCuAaCuAeSsKyAu@iB_AeAk@OGsDiBm@[MGw@e@wDeBaAm@kAaAq@g@k@k@MM[]]c@Ye@c@u@MUGKs@wAe@}@c@{@MWMU}A{Cy@aBg@_AkCkFqAiC]o@yAuCAA}A_D[i@qAkCe@}@wAgC[g@GM_@e@c@k@YYs@k@USo@e@YSgAk@e@Sg@Qg@MOEIA[EgAQcBM_ACMA_@Cw@CaDOkBGgAGoCKi@CK?cCKIAm@GSAE?gASu@Sm@Uk@Yu@c@iAaA_@c@e@m@[c@w@qA]q@GMGOCEKUACOe@Sm@M_@o@wBSs@[gAY_AUaAMq@SmAKs@Kw@mAoM[aD_@wDg@iFi@gFGq@a@}DQ{Ai@kFgDk\\KiA}AiOyB}Sy@uIYmCQiBMgAQmB?EIeASwB_@{DKy@w@}H]cDKeAGm@s@wGi@qFE][gDwA}M[eDM}AGo@QiBEc@Im@Gm@AEGi@MgAQkBi@wFe@mEi@oFs@kH{AeOO}AGo@WmCIm@Go@Gm@SkBGm@Go@SqBcB{PcA{JCOy@aIkA_MU{BO}AYkCGo@UsBCWO}AMkAYiCGa@Y_Ce@qCOs@S{@Mk@Uw@YeA_@oA[aA]_Ai@qAw@gBg@cA[k@s@oAq@eA]c@Wa@k@w@q@y@s@u@q@q@EEk@k@sCyByEaDwA}@_Ak@k@_@q@c@_@U_@U_@U_@Ws@c@k@]aC{A{DcCcBgAkAs@sEuCYSoBoAMIa@U}AcA_Ak@_@WgEkCyJgGqH{EwA}@OI_@Us@e@qBoAYScAo@oFgDiBkAoBmAqBoAuBqA_Ao@qBmAcAo@yA_AsBsA{BuAaBcAa@WwCiBo@c@c@YQI{AaA_DoBwIqFOK}E}Cm@_@QM}ByA_BaAyFoDoAy@s@c@IGWO]Uy@i@e@YKIMGUOaAm@]UAA_Ak@QKOKCAmAs@QKmAw@MIoAy@QMmAw@MGOK_@Uo@a@c@Ys@c@KG}@m@qAy@sA{@y@g@QMkAu@MIoAw@a@WMIKG[Sw@e@SMiAu@IEsA}@uA{@wA}@{A_AwA}@}AaAA?cBgAICoAy@_Am@}AaASMyBuAuA{@}AcAkAu@OKmAu@yA}@uA}@wCiB}ByAyBwASMkBiAcCyAWUYQ{@k@OI_Ak@KGqBqAm@_@q@c@_Am@_@UmAu@eBgAgBgAyCmBqCgBcC}AmBmAuBsAuBqAsA{@o@_@oBoA_DqBeDuB}D{BwA_AiCaB_F_D{A_AaAo@OK}LyHeDqB}HiFgEkCcEkC_DmBcDuBs@c@_BcAcAm@{@k@mBmAQK}@m@oAw@yBuAkBiA{CoBeC}AcDuBSMcBeAg@]m@_@k@_@uEyC_F{CkCcBaGuD{E}C}E{C_Ak@}FsDMGqCgB_BcAsA{@iAu@_JuFk@]qIoFyCkBaGwDeLkHqEqCe@YaAm@}AaAg@[{AaAWQeBgA{BwAg@[mAw@YOUO[Qe@[s@g@_BaAgHqEsK}G_F}C_@WWQGC]U_@U_@WUOGE_@WMG_@W_@U_@U_@U]UAAgAs@}@k@w@g@o@a@uDaCUOmFgDQK_Am@sA{@]SAA]SgAs@o@a@OIeRsLkDwBgAs@_Am@_@U_Am@QK]WKISMy@g@_Ak@_BcAgEmCUMu@e@sA}@e@[y@e@g@[CAYSsA}@MIq@c@cAm@mCaBm@a@aDsBoEsC}DeCgFcDaAm@uCkBgEmCgBiAiBiAaAm@iCaB{CoBoCcBcB}@_Ag@}Au@wBaAyB_AmB{@gCcAsB_AeCeAsB_AaCcAmD}AkBw@UKwB}@UKwAq@}B_AcCeAuB}@qCoA}CsAiDwAWKkAe@aAa@_@OQIQIuAo@MEaAc@s@YoCoAuAm@eCeAmCmAqCoAwB_AmBy@uAm@sAk@KGqAe@qAi@}@]oAa@aBg@yBg@{@OiAQmBYQCiCU{K{@gDUaDU{AM{@GeDUeGa@aBMs@GoCUeBMm@GgDWqCUuBQaDQyBO{@Iw@GsBMk@Ga@Ei@EaAGi@C_BME?c@Ei@CeEa@IAmHk@}BQoHe@QAc@Es@E_BMaAG}@IIAeAGgAIe@Em@E{@GuAKmBOaCQcBMoBQ}BOcBO}AK_BMkBOwBO}AK{AKkAKyHo@iGg@gF_@aEYu@E}D[}AMgAKaBMWA}AIyBO_BQ_@Cc@E]CwAUaAMyHsBWImBm@w@]e@SSMy@_@iB}@oC_Bk@[cAq@yBoAUOy@g@_Ak@s@c@a@WsAw@qAw@{AaAoAu@uAy@{A}@uAy@uA_AcAq@[Wu@k@[YGEAAeBwAQOgA}@cAw@KK{@u@gB{AwAkAIIuBeBi@c@wAkAgB}AqAmAUQuAkAcBuA}AsAgAcA_@Y_@_@cAw@EC{@w@ECQO]Wi@g@QO[WACIGe@a@i@e@CCm@i@IG[]MKy@w@m@m@s@u@q@u@SSY]c@i@k@o@c@i@k@q@g@m@_@c@a@g@[_@CEWYOQe@i@?Ag@m@e@i@EEGIIIAA[_@W[QSIKY]QSGIWY[_@WWUWQSSYSW]_@{AiB]e@u@}@s@y@o@w@m@s@cBqBgAqA[a@c@g@k@q@WY_AgAUYk@o@}@eAeAuAu@}@y@_A}@gAgAoAiAsA}@eAcAmAeAgAiAkAiAkAQOq@m@UQQQEEc@]e@[KIc@_@uAeA}@q@]UaDcCgCmBaE}C}K}H{A{@aAi@_@Sc@W_Bu@a@O[MECa@OcAa@a@Ma@Ka@M_AYg@Oa@K_@KCAgA[KCEAGAeAM_@EC?c@Cc@CgAEc@CMAUAaAGE?}BGaB?}@?c@@E?]@c@Bc@BA?Y@k@@W@K?c@?}@@I?U@q@@O?q@B{@Bu@BcBFc@@u@?_BBI@kAFcABY@qADq@By@B}@BuBFsBFs@BgA@_BFcBBaBFoBHqBDcADw@BwAByBHQ?kBDwBFyBDoBDqBHwBFwBF{BHoBHiBBiCJyADO@e@@uBFwCLs@BoADu@BaBFgABU@gBB[?I?K?Q@iDH_AB_ADyDJA?c@B}AFK?cBDsA?gB@}BCaBE_CQiBSe@G_BUi@KqAW_AW_AU_H{BcDmAyAk@A?{Am@kAe@y@[ICIC}B{@uCgAyRoHwCiAq@W}B}@eAa@w@WgCaAgDqAy@YuDyAaA_@SIME}B{@u@YuBy@eBo@QGIEa@O}@]u@Ys@Y_@MmCcA]OeAa@oAe@wTqIuBw@cHkCWKqAg@yDuAmRmHkHoCc@QcJkDq@W}Am@oBs@CAwBy@{B{@MG_Cy@kAi@q@WoBu@eAa@uBu@m@W{By@MEuBy@c@Q_Bo@aBm@oBw@cBo@OIUKuDyAsAi@g@SYMKCgAa@CAMGa@O}@]g@ScA_@o@W_@M_Bo@eJmDeAa@oG_CqEaB}D}AuBu@_DoAeBq@gAc@]MgDqAeA_@{Am@yIeDWKICcAa@g@Q_Bo@mAe@{Ai@kI_Dw@[}CeAwAc@oBe@{A]{BYgQ}BuBYoAOcIeA}JoA}G{@eG{@mAOaAM_BSa@Gk@GeBW_@E_AMiC[m@IiBWKAy@MqAQ}@Ku@I{Ca@a@Gg@G]G_AKsASoAOgAOyAQcAMiAOkAOo@KaAM]EOC_Da@}AOq@G}AKyBGoBCiBA}DA}JC{B?eEGmDGsBGc@CO?gESeAGYCgBKwAQuAUsCg@mAYeEmAoAa@SIaAa@_CeASKoBeAqDyB_Ak@_DoBGC{EsCIEmJaGQIuAm@MEuBw@}@m@_@UIGw@c@eCwAuBuAgAo@_Ak@{CaBoAq@AAaB{@_@Qa@ScDcBKGqAw@cEeCq@c@mCyAy@e@SMkAq@qBmAWM_Ae@cBs@uAi@qAe@kBk@eBi@cBg@}Bs@gCw@wCaAyBu@gCwAm@]wA_AwAaASSSS_As@cF}Dy@m@_CgBiCcBaJcEmDwAqEmAqF}Au@UaC{@SG{CwAIG_B}@_Ao@SOw@o@mCmBYOWQIKm@s@cAaAs@w@u@y@}@gAw@cAs@}@UYMQOQqDgEa@e@UWw@_Au@}@[][_@w@}@]c@u@_AuBkCuB_DOUOUAC[c@y@iAs@aA]g@o@}@cCeDk@u@s@y@cAcAwA_BWYw@eAs@aAm@_AqAkBs@eAu@}@y@gAkAyAu@_AqAaBU[CCcAqAiB_Cg@q@[_@_AoAcAsAQS}@mAYa@Ya@MQw@qA_AgCIg@S{AEWCU?AOoCAQC]QgCGwCAqB?cA?m@?q@?q@?c@A_B@qC?M?oABaAJ_AJaAFy@HwALeBDq@Dg@JyAHaADa@DUHi@Jm@Hm@Hk@NcA@GFa@@MF[BQBQHq@Hm@L{@D_@F_@Ho@PqAHi@D]BUD[DYJk@Hm@Dc@@AFm@@ILoABo@@u@?ICa@Ii@G[GWEOIWKWISKQGMOQa@i@CCa@e@e@a@MOWSKIMIKGIGSMQKEA]UYMAAGCUIMGCAg@Qa@MKEQIo@Wa@Qa@Om@Ww@[_@Oa@Qa@Oa@Qa@OeBs@YK[OQ~@"
                          },
                          "start_location": {
                              "lat": 41.829293,
                              "lng": -71.413301
                          },
                          "transit_details": {
                              "arrival_stop": {
                                  "location": {
                                      "lat": 42.35141,
                                      "lng": -71.05542
                                  },
                                  "name": "South Station"
                              },
                              "arrival_time": {
                                  "text": "8:40 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700358000
                              },
                              "departure_stop": {
                                  "location": {
                                      "lat": 41.829293,
                                      "lng": -71.413301
                                  },
                                  "name": "Providence"
                              },
                              "departure_time": {
                                  "text": "7:25 PM",
                                  "time_zone": "America/New_York",
                                  "value": 1700353500
                              },
                              "headsign": "South Station via Ruggles",
                              "line": {
                                  "agencies": [
                                      {
                                          "name": "MBTA",
                                          "phone": "1 (617) 222-3200",
                                          "url": "http://www.mbta.com/"
                                      }
                                  ],
                                  "color": "#80276c",
                                  "name": "Providence/Stoughton Line",
                                  "text_color": "#ffffff",
                                  "url": "https://www.mbta.com/schedules/CR-Providence",
                                  "vehicle": {
                                      "icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/rail2.png",
                                      "local_icon": "//maps.gstatic.com/mapfiles/transit/iw2/6/us-boston-mbta.png",
                                      "name": "Train",
                                      "type": "HEAVY_RAIL"
                                  }
                              },
                              "num_stops": 10,
                              "trip_short_name": "1814"
                          },
                          "travel_mode": "TRANSIT"
                      }
                  ],
                  "traffic_speed_entry": [],
                  "via_waypoint": []
              }
          ],
          "overview_polyline": {
              "points": "siwwFffrbMk\\t{@mVgMkt@__@gcCc}A}uCkjB{eBucAgnAkh@|Aij@`Q_u@gz@es@ceBahAi}@wa@ei@in@m[ox@wx@sd@}oA}_@qnAmcBg`BwLy[iGsZrUs`@zTeW{Guv@bJqh@mUmmAm\\agBeGsjA__@yeBei@acAqZex@oIoVaJ_E_q@nPonAri@aYrc@utBuIklCjgA_jAtTsjArV_u@~q@yj@jVg\\jAwa@lDibAjn@yz@x[cz@df@_k@pm@qz@qm@o~@aqAsmA_dA_wA}ZumBaf@wwAaw@wuAwc@cpBaEyyBgz@ucDwRy|@cl@_g@kQ_n@qAm{@af@aiCg{AgsAy~@y|A{b@{oAgHesAaq@eyCs^w_A_FkwAeDgaEzBknAgW{iAk`BwkCgP{qBib@}cBg[e\\}v@w`@sTco@uIg~@pEqrB_ZshAqi@{n@a@}r@bPup@aCwkBmx@}nAsm@kb@}Qih@uu@q}AcRqzAws@sgA{pAa`Acd@in@_MuaAtQwpApGol@gTsu@oeAywBe}AaiCyb@edAkf@w\\iZgn@k^qbB{BufBch@eq@ws@oc@yE}o@r[_`@pa@qYtS_xAra@wlBuTenDsc@wuD_Mm~D{TwfElHwgJx]_yBlKczDdAmjBlBkhBeRqrBfQmdGwAugBoH}eDg[_~AhSmoBjAu{FcLciByb@slBiqByzEoYm}BcOwy@~KufAnTajB|IsvAgh@smDwh@wlA}}@ou@spBiqCccAi_A{d@mpA~Z{dBvNqqB_Ne{BcCklAt^q`BrLezAyCqvCl\\s_BuBkcBgUwpCak@adBiFy}@~Dm|AcWioAnO_mCmHslB{m@ybCug@yxBk_BojBysAikAal@{dBed@qnBkz@e|A_y@m|AwsBolCm_CiwEkiAaxB_pAshBueFwsBkkCahAonEs`@w{AyiAcdAi`AmmBo~BsEyjB|Asy@w]ieBs[s`Bw@wvBad@e|BgHqxCcPiv@sf@m\\ckB{CydCu`@sq@{]u`AgwA_bBw|@e{A}eAicC}s@o~@yzAcZy_@{l@fN}l@pVyd@lbAq`@wKKkIlCjF{MoHkLyKqx@bQi~@yX}`Biq@gqAm~@go@kt@ml@yTgb@qvDiu@{hGwuDagCqvHe{EuoKaxGo`Byr@orB{YcaEk]aqB}vAadAklA{cAix@of@sFcpCtHepAoMc}Agl@mnFyrB{aC}c@mpAoJmu@aHsp@o^anAco@igB{|@kr@a|@io@i_ArAc`AnE}c@}NqNmQaF"
          },
          "summary": "",
          "warnings": [
              "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths."
          ],
          "waypoint_order": []
      }
  ],
  "status": "OK"
};
