import { render, screen } from "@testing-library/react";

import RadiatorCard from "@/features/builder/RadiatorCard";
import { Radiator } from "@/api/dto/radiator";

describe("RadiatorCard", () => {
  const radiator = {
    label: "Emmeline",
    length_name: "600mm",
    radiator_length: 600,
    sections: 6,
    length_cost_from: 50,
  } as Radiator;

  it("should render radiator information correctly", () => {
    render(<RadiatorCard radiator={radiator} />);

    expect(screen.getByText("Emmeline, 600mm")).toBeInTheDocument();
    expect(screen.getByText("Length: 600 mm")).toBeInTheDocument();
    expect(screen.getByText("Price from: £50")).toBeInTheDocument();
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(<RadiatorCard radiator={radiator} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
