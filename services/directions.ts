import axios from "axios";
import { NextResponse } from "next/server";
import { Direction } from "readline";
import { create } from "zustand";

import "dotenv/config";
import { useTravelStore } from "./travel";

type GoogleDirectionsResult = google.maps.DirectionsResult;

export type DirectionsFormData = {
  origin: string;
  destination: string;
  mode: string;
};

type DirectionsStore = {
  directions: GoogleDirectionsResult | null;
  embedUrl: string | null;
  updateDirections: (formData: DirectionsFormData) => void;
};

const urlConverter = (val: string) =>
  encodeURIComponent(val.toLowerCase().replace(/[^a-z0-9 _-]+/gi, "+"));

async function getDirections({
  origin,
  destination,
  mode,
}: DirectionsFormData) {
  try {
    const directionsResult = await axios.get(
      `/api/routes-map-data/${urlConverter(origin)}/${urlConverter(
        destination
      )}/${mode}`
    );
    const embedResult = await axios.get(
      `/api/routes-map-embed/${urlConverter(origin)}/${urlConverter(
        destination
      )}/${mode}`
    );

    return {
      directions: directionsResult.data as GoogleDirectionsResult,
      embedUrl: embedResult.data as string,
    };
  } catch (error) {
    console.error("Error fetching directions:", error);
  }
}

export const useDirections = create<DirectionsStore>((set) => ({
  directions: null,
  embedUrl: null,
  updateDirections: async (formData) => {
    let resData = await getDirections(formData);

    // also update travel state
    if (resData) {
      useTravelStore.getState().updateTravelDetails(resData.directions);
    }

    set({ directions: resData?.directions, embedUrl: resData?.embedUrl });
  },
}));
