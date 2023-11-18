import axios from "axios";
import { Direction } from "readline";
import { create } from "zustand";

import "dotenv/config";

type GoogleDirectionsResult = google.maps.DirectionsResult;

export type DirectionsFormData = {
  origin: string;
  destination: string;
  mode: string;
};

type DirectionsStore = {
  directions: GoogleDirectionsResult | null;
  updateDirections: (formData: DirectionsFormData) => void;
};

async function getDirections(
  { origin, destination, mode }: DirectionsFormData
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          mode,
          alternatives: true,
          key: process.env.GOOGLE_API_KEY,
        },
        headers: {
            "Access-Control-Allow-Origin": "null",
            "Access-Control-Allow-Origin": "<origin>",
            "Access-Control-Allow-Origin": "*"
        }
      }
    );

    return response.data as GoogleDirectionsResult;
  } catch (error) {
    console.error("Error fetching directions:", error);
  }
}

export const useDirections = create<DirectionsStore>((set) => ({
  directions: null,
  updateDirections: async (formData) => {
    console.log("UPDATING");
    const resData = await getDirections(formData);
    set({ directions: resData ?? null });
  },
}));
