import { Pagination } from "@/api/dto/response";
import { Radiator } from "@/api/dto/radiator";

export const getRadiators = async (
  filter: URLSearchParams
): Promise<Pagination<Radiator>> => {
  const response = await fetch("/api/getRadiators?".concat(filter.toString()));

  return response.json();
};
