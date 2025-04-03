"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Select } from "@/components/form";
import { Card } from "@/components/layout";
import { Button } from "@/components/general";
import { RadiatorFamily } from "@/api/dto/radiator";

import { builderSchema } from "@/features/builder/BuilderForm.schema";

interface Props {
  families: RadiatorFamily[];
}

type Inputs = {
  radiatorFamily: string;
  radiatorLengthFrom: number;
  radiatorLengthTo?: number;
};

export default function BuilderForm({ families }: Props): React.JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      radiatorFamily: "",
      radiatorLengthFrom: 0,
    },
    mode: "onBlur",
    resolver: zodResolver(builderSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("/api/getRadiators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <Card>
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
          <Button>Clear</Button>
          <Button type="submit" variant="confirm">
            Search
          </Button>
        </div>
      </form>
    </Card>
  );
}
