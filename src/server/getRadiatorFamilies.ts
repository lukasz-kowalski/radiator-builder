import { loadRadiatorsData } from "@/server/radiatorsData";

export const getRadiatorFamilies = () => {
  const data = loadRadiatorsData();

  if (!data) {
    throw new Error("Couldn't load data");
  }

  console.log(data);

  const radiatorFamilies = data.map((item) => ({
    id: item.radiator_id,
    name: item.radiator_name,
  }));

  return radiatorFamilies;
};
