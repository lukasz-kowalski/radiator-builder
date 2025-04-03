import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string | undefined;
}

export default function Input(props: Props): React.JSX.Element {
  const { label, error, ...inputProps } = props;

  return (
    <div className="flex flex-col w-full">
      <label className="text-sm" htmlFor={inputProps.id}>
        {label}
      </label>
      <input
        {...inputProps}
        className="p-1 border-2 h-10"
        aria-invalid={!!error}
        aria-errormessage={`error-${inputProps.id}`}
      />
      <div className="h-[1rem]">
        <p id={`error-${inputProps.id}`} className="text-red-600 text-sm">
          {error}
        </p>
      </div>
    </div>
  );
}
