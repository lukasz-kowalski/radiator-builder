import BuilderForm from "@/features/builder/BuilderForm";
import { getRadiatorFamilies } from "@/server/lib/getRadiatorFamilies";

export default function Home() {
  const radiatorFamilies = getRadiatorFamilies();

  return (
    <main>
      <BuilderForm families={radiatorFamilies} />
    </main>
  );
}
