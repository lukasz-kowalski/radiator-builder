import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "@/components/form/Input";

describe("Input component", () => {
  it("should render the label correctly", () => {
    render(
      <Input label="Radiator length" id="radiatorLength" error={undefined} />
    );

    expect(screen.getByLabelText("Radiator length")).toBeInTheDocument();
  });

  it("should pass input props correctly", () => {
    render(
      <Input
        label="Radiator length"
        id="radiatorLength"
        type="number"
        value="123"
        onChange={() => {}}
        error={undefined}
      />
    );

    const input = screen.getByLabelText("Radiator length") as HTMLInputElement;
    expect(input.type).toBe("number");
    expect(input.value).toBe("123");
  });

  it("should display error message and sets proper aria attributes", () => {
    render(
      <Input
        label="Radiator length"
        id="radiatorLength"
        error="Field is required"
      />
    );

    const input = screen.getByLabelText("Radiator length");
    const errorMessage = screen.getByText("Field is required");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-errormessage", "error-radiatorLength");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not display error if error is undefined", () => {
    const { container } = render(
      <Input label="Radiator length" id="radiatorLength" error={undefined} />
    );

    const errorMessage = container.querySelector("#error-radiatorLength");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute("id", "error-radiatorLength");
  });

  it("should call onChange handler when typing", async () => {
    const handleChange = jest.fn();

    render(
      <Input
        label="Radiator length"
        id="radiatorLength"
        value=""
        onChange={handleChange}
        error={undefined}
      />
    );

    const input = screen.getByLabelText("Radiator length");
    await userEvent.type(input, "500");

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Input
        label="Radiator length"
        id="radiatorLength"
        type="number"
        value="300"
        error="Required field"
        onChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
