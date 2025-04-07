import RadiatorBuilder from "@/features/builder/RadiatorBuilder";
import { getRadiatorFamilies } from "@/server/lib/getRadiatorFamilies";

export default function Home() {
  const radiatorFamilies = getRadiatorFamilies();

  return (
    <main>
      <RadiatorBuilder families={radiatorFamilies} />
    </main>
  );
}
