import { create } from "zustand";

const test = {
  min_initial: "5615",
  min_payback: 9,
  min_savings: "7308",
  max_initial: "60083",
  max_payback: 5.75,
  max_savings: "152442",
};

interface ISolaroofsFinancialData {
    min_inital: string,
    min_payback: string,
    min_savings: string,

    max_initial: string,
    max_payback: string,
    max_savings: string,
}

type SolaroofsDetails = {
    solaroofsFinancialData: ISolaroofsFinancialData;
}

type SolaroofsStore = {
    updateSolaroofsDetails: (endAddress: string) => void;
} & Partial<SolaroofsDetails>;

export const useSolaroofsStore = create<SolaroofsStore>((set) => ({
    updateSolaroofsDetails: (endAddress) => {

    }
}))

