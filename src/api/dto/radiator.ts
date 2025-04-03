interface DefaultProperties {
  cost_from: number;
  id: string;
  name: string;
}

interface Length extends DefaultProperties {
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

interface Height extends DefaultProperties {
  height: number;
  label: string;
  sku: string;
  lengths: Length[];
}

interface Depth extends DefaultProperties {
  columns: number;
  depth: number;
  heights: Height[];
}

export interface Radiator extends DefaultProperties {
  description: string;
  models: number;
  depths: Depth[];
}

export interface RadiatorFamily {
  id: string;
  name: string;
}
