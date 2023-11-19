import { DirectionsFormData } from "@/services/directions";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: DirectionsFormData }
) {
  const { origin, destination, mode } = params;
  const response = `https://www.google.com/maps/embed/v1/directions?key=${
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  }&origin=${origin}&destination=${destination}&mode=${mode.toLowerCase()}`;

  return new NextResponse(response);
}
