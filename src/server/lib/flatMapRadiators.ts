import { Radiator, RawRadiator } from "@/api/dto/radiator";

export const flatMapRadiators = (data: RawRadiator[]): Radiator[] => {
  const radiators = data.flatMap((radiator) =>
    radiator.depths.flatMap((depth) =>
      depth.heights.flatMap((height) =>
        height.lengths.map((length) => ({
          radiator_cost_from: radiator.cost_from,
          radiator_id: radiator.id,
          radiator_name: radiator.name,
          radiator_description: radiator.description,
          radiator_models: radiator.models,
          length_cost_from: length.cost_from,
          length_id: length.id,
          length_name: length.name,
          h1_value: length.h1_value,
          h2_value: length.h2_value,
          output_dt22_5: length.output_dt22_5,
          output_dt30: length.output_dt30,
          output_dt40: length.output_dt40,
          output_dt50: length.output_dt50,
          oversized: length.oversized,
          pieces: length.pieces,
          pipe_centres: length.pipe_centres,
          price: length.price,
          radiator_length: length.radiator_length,
          sections: length.sections,
          height_cost_from: height.cost_from,
          height_id: height.id,
          height_name: height.name,
          height: height.height,
          label: height.label,
          sku: height.sku,
          depth_cost_from: depth.cost_from,
          depth_id: depth.id,
          depth_name: depth.name,
          depth: depth.depth,
          columns: depth.columns,
        }))
      )
    )
  );

  return radiators;
};
