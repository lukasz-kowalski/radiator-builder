import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "@/components/form/Select";

describe("Select component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

  it("should render all options including default placeholder", () => {
    render(
      <Select
        label="Choose an option"
        id="test-select"
        error={undefined}
        options={options}
      />
    );

    expect(screen.getByText("Choose an option")).toBeInTheDocument();

    expect(
      screen.getByRole("option", { name: "Option 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Option 2" })
    ).toBeInTheDocument();
  });

  it("should mark select as invalid if error is present", () => {
    render(
      <Select
        label="Choose an option"
        id="test-select"
        error="This is an error"
        options={options}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("aria-invalid", "true");

    const error = screen.getByText("This is an error");
    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute("id", "error-test-select");
  });

  it("should not display error text if error is undefined", () => {
    const { container } = render(
      <Select
        label="Choose an option"
        id="test-select"
        error={undefined}
        options={options}
      />
    );

    const error = container.querySelector("#error-test-select");
    expect(error).toBeInTheDocument();
    expect(error).toBeEmptyDOMElement();
  });

  it("should update value when an option is selected", async () => {
    render(
      <Select
        label="Choose an option"
        id="test-select"
        error={undefined}
        options={options}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    await userEvent.selectOptions(select, "2");

    expect(select.value).toBe("2");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <Select
        label="Choose an option"
        id="test-select"
        error={"Some error"}
        options={options}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
