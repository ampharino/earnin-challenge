import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface Props {
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  formRegister: () => UseFormRegisterReturn;
}

export default function Textbox({
  placeholder,
  errorMessage,
  formRegister,
  type,
}: Props) {
  return (
    <div className="w-48">
      <input
        type={type}
        className="p-2 w-full rounded border border-gray-400"
        placeholder={placeholder}
        {...formRegister()}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
