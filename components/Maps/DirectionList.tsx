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
      <p className="text-lg">
        <b>From:</b> {startAddress}
      </p>
      <p className="text-lg">
        <b>To:</b> {endAddress}
      </p>
      {steps.map((step, i) => (
        <DirectionStep key={i} step={step} />
      ))}
    </div>
  );
}

interface DirectionStepProps {
  step: Step;
}

function DirectionStep({ step }: DirectionStepProps) {
  return <div>DirectionSteps</div>;
}
