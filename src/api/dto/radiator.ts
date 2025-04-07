interface RawDefaultProperties {
  cost_from: number;
  id: string;
  name: string;
}

interface RawLength extends RawDefaultProperties {
  h1_value: string;
  h2_value: string;
  output_dt22_5: string;
  output_dt30: string;
  output_dt40: string;
  output_dt50: string;
  oversized: "yes" | "no";
  pieces: number;
  pipe_centres: number;
  price: number;
  radiator_length: number;
  sections: number;
}

interface RawHeight extends RawDefaultProperties {
  height: number;
  label: string;
  sku: string;
  lengths: RawLength[];
}

interface RawDepth extends RawDefaultProperties {
  columns: number;
  depth: number;
  heights: RawHeight[];
}

export interface RawRadiator extends RawDefaultProperties {
  description: string;
  models: number;
  depths: RawDepth[];
}

export interface RadiatorFamily {
  id: string;
  name: string;
}

export interface Radiator {
  radiator_cost_from: number;
  radiator_id: string;
  radiator_name: string;
  radiator_description: string;
  radiator_models: number;
  length_cost_from: number;
  length_id: string;
  length_name: string;
  h1_value: string;
  h2_value: string;
  output_dt22_5: string;
  output_dt30: string;
  output_dt40: string;
  output_dt50: string;
  oversized: "yes" | "no";
  pieces: number;
  pipe_centres: number;
  price: number;
  radiator_length: number;
  sections: number;
  height_cost_from: number;
  height_id: string;
  height_name: string;
  height: number;
  label: string;
  sku: string;
  depth_cost_from: number;
  depth_id: string;
  depth_name: string;
  columns: number;
  depth: number;
}
