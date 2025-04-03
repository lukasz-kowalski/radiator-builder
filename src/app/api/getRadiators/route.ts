import { NextResponse, NextRequest } from "next/server";

import { loadRadiatorsData } from "@/server/radiatorsData";

export async function POST(req: NextRequest) {
  const { name, minAge, maxAge } = await req.json();

  const data = loadRadiatorsData();

  console.log(data);

  if (!data) {
    return NextResponse.json({ error: "Couldn't load data" }, { status: 500 });
  }

  // const filteredData = data.filter((item: any) => {
  //   return (
  //     (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
  //     (!minAge || item.age >= Number(minAge)) &&
  //     (!maxAge || item.age <= Number(maxAge))
  //   );
  // });

  return NextResponse.json(data, { status: 200 });
}
