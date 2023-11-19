import { DirectionsFormData } from "@/services/directions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: DirectionsFormData }
) {
  const { origin, destination, mode } = params;

  const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          mode,
          alternatives: true,
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        },
      }
    );

  return new NextResponse(JSON.stringify(response.data));
}
