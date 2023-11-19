import axios from "axios";
import { NextResponse } from "next/server";
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

const urlConverter = (val: string) => encodeURIComponent(val.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '+'));

async function getDirections(
  
  { origin, destination, mode }: DirectionsFormData
) {
  try {
    const result = await axios.get(
        `/api/${urlConverter(origin)}/${urlConverter(destination)}/${mode}`
    )

    return result.data as GoogleDirectionsResult;
  } catch (error) {
    console.error("Error fetching directions:", error);
  }
}

export const useDirections = create<DirectionsStore>((set) => ({
  directions: null,
  updateDirections: async (formData) => {
    let resData = await getDirections(formData);

    set({ directions: resData ?? null });
  },
}));