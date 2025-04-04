import { NextResponse, NextRequest } from "next/server";

import { loadRadiatorsData } from "@/server/radiatorsData";

export async function POST(req: NextRequest) {
  const { radiatorFamily, radiatorLengthFrom, radiatorLengthTo } =
    await req.json();

  const data = loadRadiatorsData();

  if (!data) {
    return NextResponse.json({ error: "Couldn't load data" }, { status: 500 });
  }

  const filteredData = data
    .filter(
      (radiator) =>
        !radiatorFamily || radiator.radiator_id.includes(radiatorFamily)
    )
    .map((radiator) => ({
      ...radiator,
      items: radiator.items.filter(
        (item) =>
          (!radiatorLengthFrom ||
            item.radiator_length >= Number(radiatorLengthFrom)) &&
          (!radiatorLengthTo ||
            item.radiator_length <= Number(radiatorLengthTo))
      ),
    }));

  filteredData.filter((item) => item.items);

  return NextResponse.json(filteredData, { status: 200 });
}
