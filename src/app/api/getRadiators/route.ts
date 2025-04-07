import { NextResponse, NextRequest } from "next/server";

import { loadFlattenRadiatorsData } from "@/server/flattenRadiatorsData";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
  const perPage = Number(searchParams.get("perPage")) || DEFAULT_PER_PAGE;
  const radiatorFamily = searchParams.get("radiatorFamily");
  const radiatorLengthFrom = searchParams.get("radiatorLengthFrom");
  const radiatorLengthTo = searchParams.get("radiatorLengthTo");

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const data = loadFlattenRadiatorsData();

  if (!data) {
    return NextResponse.json({ error: "Couldn't load data" }, { status: 500 });
  }

  const filteredData = data.filter(
    (radiator) =>
      (!radiatorFamily || radiator.radiator_id.includes(radiatorFamily)) &&
      (!radiatorLengthFrom ||
        radiator.radiator_length >= Number(radiatorLengthFrom)) &&
      (!radiatorLengthTo ||
        radiator.radiator_length <= Number(radiatorLengthTo))
  );

  const paginatedData = filteredData.slice(start, end);

  return NextResponse.json(
    {
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(filteredData.length / perPage),
      totalItems: filteredData.length,
    },
    { status: 200 }
  );
}
