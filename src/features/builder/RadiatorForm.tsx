"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Select } from "@/components/form";
import { Button } from "@/components/general";
import { RadiatorFamily } from "@/api/dto/radiator";
import { radiatorFormSchema } from "@/features/builder/schema/RadiatorForm.schema";
import { Inputs } from "@/features/builder/types/inputs";

interface Props {
  families: RadiatorFamily[];
  onSubmit: (data: Inputs) => void;
}

export default function RadiatorForm({ families, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      radiatorFamily: "",
      radiatorLengthFrom: 0,
    },
    mode: "onBlur",
    resolver: zodResolver(radiatorFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <Select
          {...register("radiatorFamily")}
          defaultValue=""
          label="Radiator family"
          error={errors.radiatorFamily?.message}
          options={families.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />

        <Input
          label="Radiator length from (mm)"
          error={errors.radiatorLengthFrom?.message}
          {...register("radiatorLengthFrom")}
          id="radiatorLengthFrom"
          type="number"
        />
        <Input
          label="Radiator length to (mm)"
          error={errors.radiatorLengthTo?.message}
          {...register("radiatorLengthTo")}
          id="radiatorLengthTo"
          type="number"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={() => reset()}>Clear</Button>
        <Button type="submit" variant="confirm">
          Search
        </Button>
      </div>
    </form>
  );
}
