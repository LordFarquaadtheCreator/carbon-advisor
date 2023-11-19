import axios from "axios";
import { create } from "zustand";

interface ISolaroofsFinancialData {
    min_initial: string,
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
    updateSolaroofsDetails: async (endAddress) => {
        const response = await axios.get(
            `https://boston-hacks-405214.uc.r.appspot.com/panelsAnalysis?address=${endAddress}`
        )
        
        set({solaroofsFinancialData: response.data as ISolaroofsFinancialData});
    }
}))

