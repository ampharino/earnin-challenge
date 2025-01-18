import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxSelectedOption,
} from '@headlessui/react';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface Props {
  options: { value: string; display: string }[];
  errorMessage?: string;
  placeholder?: string;
  name: string;
  formControl: Control<any>;
  rules: UseControllerProps['rules'];
}

export default function Select({
  name,
  options,
  errorMessage,
  placeholder,
  formControl,
  rules,
}: Props) {
  const { field } = useController({
    name,
    rules,
    control: formControl,
  });
  const listboxOptions = options.map(({ value, display }) => (
    <ListboxOption
      className="data-[focus]:bg-purple-600 data-[focus]:text-white p-2 rounded text-start"
      key={value}
      value={value}
    >
      {display}
    </ListboxOption>
  ));
  return (
    <div className="w-48 relative">
      <Listbox onChange={field.onChange} value={field.value}>
        <ListboxButton className="rounded border border-gray-400 w-full">
          <ListboxSelectedOption
            options={listboxOptions}
            placeholder={<div className="p-2 text-start">{placeholder}</div>}
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-50 w-full border rounded-lg border-gray-400 bg-white"
        >
          {listboxOptions}
        </ListboxOptions>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </Listbox>
    </div>
  );
}
