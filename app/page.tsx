import CarbonDashboard from "@/components/Dashboard/CarbonDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sustainable.af",
  description: "TripAdvisor meets sustainability!",
};

export default function Home() {
  return (
    <>
      <CarbonDashboard />
    </>
  );
}
