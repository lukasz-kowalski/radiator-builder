import Image from "next/image";

import { Radiator } from "@/api/dto/radiator";

interface Props {
  radiator: Radiator;
}

export default function RadiatorCard({ radiator }: Props) {
  return (
    <div
      className="bg-white border-2 p-4 shadow-md"
      data-testid="radiator-card"
    >
      <div className="relative w-[80px] h-[110px] flex justify-self-center mb-2">
        <Image
          src={`/images/emmeline-i-465mm_${radiator.sections}-sections-preview.jpg`}
          width={80}
          height={110}
          alt={`${radiator.label}, ${radiator.radiator_length} mm, ${radiator.sections} sections`}
          loading="eager"
        />
      </div>
      <div>
        <p className="font-bold">
          {radiator.label}, {radiator.length_name}
        </p>
        <p className="text-sm">Length: {radiator.radiator_length} mm</p>
        <p className="text-sm">Price from: £{radiator.length_cost_from}</p>
      </div>
    </div>
  );
}
