import { loadRadiatorsData } from "@/server/radiatorsData";

export const getRadiatorFamilies = () => {
  const data = loadRadiatorsData();

  if (!data) {
    throw new Error("Couldn't load data");
  }

  const radiatorFamilies = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return radiatorFamilies;
};
