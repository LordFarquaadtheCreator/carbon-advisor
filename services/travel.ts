import { create } from "zustand";

export interface ICoordinate {
    lat: number,
    lng: number,
}

export enum TravelMethod {
    CAR,
    BIKE,
    PLANE,
    TRAIN,
    WALK
}

type TravelDetails = {
    travelMethod: TravelMethod;
    distanceMiles: string;
    carbonEmittedMt: number;
    timeEstimatedMinutes: string;
}

type TravelStore = {
    updateTravelDetails: (directions: google.maps.DirectionsResult) => void;
} & Partial<TravelDetails>;

export async function getTravelDetails(directions: google.maps.DirectionsResult) {
    const distanceMiles = directions.routes[0].legs[0].distance!.text;
    const timeEstimatedMinutes = directions.routes[0].legs[0].duration!.text;
    const carbonEmittedMt = 20;
    // MAYBE UPDATE TRAVEL METHOD? we will have to see

    return {distanceMiles, timeEstimatedMinutes, carbonEmittedMt} as TravelDetails;
}

export const useTravelStore = create<TravelStore>((set) => ({
    updateTravelDetails: async (directions) => {
        const details = await getTravelDetails(directions);
        set({...details});
    }
}))