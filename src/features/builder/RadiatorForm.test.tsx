import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RadiatorForm from "@/features/builder/RadiatorForm";

const familiesMock = [
  { id: "1", name: "Family 1" },
  { id: "2", name: "Family 2" },
];

describe("RadiatorForm", () => {
  it("should render the RadiatorForm with input fields", () => {
    render(<RadiatorForm families={familiesMock} onSubmit={jest.fn()} />);

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toBeInTheDocument();
    expect(
      screen.getByLabelText("Radiator length from (mm)")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Radiator length to (mm)")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("should display error messages when values of length fields are too high", async () => {
    const onSubmitMock = jest.fn();

    render(<RadiatorForm families={familiesMock} onSubmit={onSubmitMock} />);

    const inputLengthFrom = screen.getByLabelText("Radiator length from (mm)");
    const inputLengthTo = screen.getByLabelText("Radiator length to (mm)");

    await userEvent.type(inputLengthFrom, "10001");
    await userEvent.tab();
    await userEvent.type(inputLengthTo, "20000");
    await userEvent.tab();

    const errorMessages = await screen.findAllByText(
      "Length cannot be greater than 10000"
    );
    expect(errorMessages).toHaveLength(2);
  });

  it("should call onSubmit with correct data when form is submitted", async () => {
    const onSubmitMock = jest.fn();

    render(<RadiatorForm families={familiesMock} onSubmit={onSubmitMock} />);

    const familySelect = screen.getByLabelText("Radiator family");
    const inputLengthFrom = screen.getByLabelText("Radiator length from (mm)");
    const inputLengthTo = screen.getByLabelText("Radiator length to (mm)");

    await userEvent.selectOptions(familySelect, "1");
    await userEvent.type(inputLengthFrom, "300");
    await userEvent.type(inputLengthTo, "600");

    await userEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      const [data] = onSubmitMock.mock.calls[0];
      expect(data).toEqual({
        radiatorFamily: "1",
        radiatorLengthFrom: 300,
        radiatorLengthTo: 600,
      });
    });
  });

  it("should clear the form when Clear button is clicked", async () => {
    const onSubmitMock = jest.fn();

    render(<RadiatorForm families={familiesMock} onSubmit={onSubmitMock} />);

    const familySelect = screen.getByLabelText("Radiator family");
    const inputLengthFrom = screen.getByLabelText("Radiator length from (mm)");
    const inputLengthTo = screen.getByLabelText("Radiator length to (mm)");

    await userEvent.selectOptions(familySelect, "1");
    await userEvent.type(inputLengthFrom, "300");
    await userEvent.type(inputLengthTo, "600");

    expect(screen.getByLabelText("Radiator family")).toHaveValue("1");
    expect(screen.getByLabelText("Radiator length from (mm)")).toHaveValue(300);
    expect(screen.getByLabelText("Radiator length to (mm)")).toHaveValue(600);

    const clearButton = screen.getByText("Clear");
    await userEvent.click(clearButton);

    await waitFor(async () => {
      expect(screen.getByLabelText("Radiator family")).toHaveValue("");
      expect(screen.getByLabelText("Radiator length from (mm)")).toHaveValue(0);
      expect(screen.getByLabelText("Radiator length to (mm)")).toHaveValue(
        null
      );
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should match the snapshot", () => {
    const onSubmitMock = jest.fn();

    const { asFragment } = render(
      <RadiatorForm families={familiesMock} onSubmit={onSubmitMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
