import fs from "fs";
import path from "path";
import { unserialize } from "php-serialize";

import { RawRadiator } from "@/api/dto/radiator";

let cachedData: any = null;

const loadRadiatorsData = (): RawRadiator[] | null => {
  if (cachedData) return cachedData;

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "server",
      "radiator_builder_data.txt"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");

    const cachedData = unserialize(fileContent);

    return cachedData;
  } catch (error) {
    console.error("Error during file load:", error);
    return null;
  }
};

loadRadiatorsData();

export { loadRadiatorsData };
