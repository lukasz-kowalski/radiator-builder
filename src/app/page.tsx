import BuilderForm from "@/features/builder/BuilderForm";
import { getRadiatorFamilies } from "@/server/getRadiatorFamilies";

export default function Home() {
  const radiatorFamilies = getRadiatorFamilies();

  return (
    <main>
      <BuilderForm families={radiatorFamilies} />
    </main>
  );
}
