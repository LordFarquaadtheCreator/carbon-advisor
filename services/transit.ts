import { create } from "zustand";

export enum TransitMethod {
    CAR,
    BIKE,
    PLANE,
    TRAIN,
    WALK
}

type TransitDetails = {
    transitMethod: TransitMethod;
    distanceMiles: number;
    carbonEmittedMt: number;
    timeEstimatedMinutes: number;
}

type TransitStore = {
    updateTransitDetails: () => void;
} & Partial<TransitDetails>;

const TRANSIT_TEST: TransitDetails = {
    transitMethod: TransitMethod.PLANE,
    distanceMiles: 100,
    carbonEmittedMt: 1000,
    timeEstimatedMinutes: 60,
}

export async function getTransitDetails() {
    return TRANSIT_TEST;
}

export const useTransitStore = create<TransitStore>((set) => ({
    updateTransitDetails: async () => {
        const details = await getTransitDetails();
        set({...details});
    }
}))