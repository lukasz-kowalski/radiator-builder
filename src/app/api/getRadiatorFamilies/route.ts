import { NextResponse, NextRequest } from "next/server";
import { loadRadiatorsData } from "@/server/radiatorsData";

export async function GET(req: NextRequest) {
  const data = loadRadiatorsData();
  if (!data) {
    return NextResponse.json({ error: "Couldn't load data" }, { status: 500 });
  }

  const radiatorFamilies = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return NextResponse.json(radiatorFamilies, { status: 200 });
}
