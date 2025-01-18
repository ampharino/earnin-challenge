import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  options: { value: string; display: string }[];
  errorMessage?: string;
  placeholder?: string;
  formRegister?: () => UseFormRegisterReturn;
}

export default function Select({
  options,
  errorMessage,
  placeholder,
  formRegister,
}: Props) {
  return (
    <div className="w-48">
      <select
        defaultValue=""
        className="p-2 rounded border border-gray-400 w-full"
        {...formRegister?.()}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(({ value, display }) => (
          <option key={value} value={value}>
            {display}
          </option>
        ))}
      </select>
      {errorMessage && <p className="absolute">{errorMessage}</p>}
    </div>
  );
}
