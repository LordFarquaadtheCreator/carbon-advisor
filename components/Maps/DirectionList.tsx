import React from "react";

interface Step {
  distance: string;
  duration: string;
  htmlInstructions: string;
}

interface DirectionListProps {
  startAddress: string;
  endAddress: string;
  steps: Step[];
  totalDistance: string;
  totalDuration: string;
}

export default function DirectionList({
  startAddress,
  endAddress,
  steps,
  totalDistance,
  totalDuration,
}: DirectionListProps) {
  return (
    <div>
        <h2 className="pt-5 text-2xl font-bold">🗺️ Directions</h2>
        <p>From: {startAddress}</p>
        <p>To: {endAddress}</p>
    </div>
  );
}

function DirectionStep() {
  return <div>DirectionSteps</div>;
}
