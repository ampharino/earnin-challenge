import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function Textbox({
  placeholder,
  errorMessage,
  formRegister,
  type,
}: {
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  formRegister?: () => UseFormRegisterReturn;
}) {
  return (
    <div className="w-48">
      <input
        type={type}
        className="p-2 w-full rounded border border-gray-400"
        placeholder={placeholder}
        {...formRegister?.()}
      />
      {errorMessage && <p className="absolute">{errorMessage}</p>}
    </div>
  );
}
