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
    distanceMiles: number;
    carbonEmittedMt: number;
    timeEstimatedMinutes: number;
}

type TravelStore = {
    updateTravelDetails: () => void;
} & Partial<TravelDetails>;

const TRAVEL_TEST: TravelDetails = {
    travelMethod: TravelMethod.PLANE,
    distanceMiles: 100,
    carbonEmittedMt: 1000,
    timeEstimatedMinutes: 60,
}

export async function getTravelDetails() {
    return TRAVEL_TEST;
}

export const useTravelStore = create<TravelStore>((set) => ({
    updateTravelDetails: async () => {
        const details = await getTravelDetails();
        set({...details});
    }
}))