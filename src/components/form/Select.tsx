import { SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error: string | undefined;
  options: Option[];
}

export default function Select(props: Props) {
  const { label, error, options, ...selectProps } = props;

  return (
    <div className="flex flex-col w-full">
      <div className="h-[20px]" />
      <select
        className="p-1 border-2 h-10 bg-white"
        {...selectProps}
        aria-invalid={!!error}
        aria-errormessage={`error-${selectProps.id}`}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="h-[3rem]">
        {error && (
          <p id={`error-${selectProps.id}`} className="text-red-600 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
