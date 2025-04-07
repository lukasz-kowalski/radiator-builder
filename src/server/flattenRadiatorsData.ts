import { Radiator } from "@/api/dto/radiator";
import { flatMapRadiators } from "@/server/lib/flatMapRadiators";
import { loadRadiatorsData } from "@/server/radiatorsData";

let cachedData: any = null;

const loadFlattenRadiatorsData = (): Radiator[] | null => {
  if (cachedData) return cachedData;

  const data = loadRadiatorsData();

  if (!data) {
    throw new Error("Error during file load");
  }

  cachedData = flatMapRadiators(data);
  return cachedData;
};

loadFlattenRadiatorsData();

export { loadFlattenRadiatorsData };
