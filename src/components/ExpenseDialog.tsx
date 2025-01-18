import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import Textbox from './ui/form/Textbox';
import Select from './ui/form/Select';
import { useEffect, useState } from 'react';

interface FormData {
  itemName: string;
  category: string;
  itemAmount: number;
}

const options = [
  {
    value: 'food',
    display: 'Food',
  },
  {
    value: 'furniture',
    display: 'Furniture',
  },
  {
    value: 'accessory',
    display: 'Accessory',
  },
];

export default function ExpenseDialog({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));

  const [fact, setFact] = useState('');

  useEffect(() => {
    async function fetchCatFact() {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const factJson = await response.json();
        setFact(factJson.fact);
      } catch (_e) {
        setFact(
          'We are sorry, we could not fetch a cat fact at this moment :('
        );
      }
    }
    if (isOpen) {
      fetchCatFact();
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setOpen(false);
        reset();
      }}
    >
      <DialogBackdrop className="bg-black/30 fixed inset-0 z-10" />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-6">
        <DialogPanel className="max-w-3xl w-full bg-white flex gap-x-8  py-4 px-6">
          <section className="w-1/2">
            <form onSubmit={onSubmit} className="flex flex-col gap-y-6">
              <div className="flex items-center justify-between">
                <label>Item:</label>
                <Textbox
                  placeholder="Item name"
                  errorMessage={errors.itemName?.message}
                  formRegister={() =>
                    register('itemName', { required: 'This field is required' })
                  }
                ></Textbox>
              </div>
              <div className="flex items-center justify-between">
                <label>Category:</label>
                <Select
                  options={options}
                  placeholder="Category"
                  errorMessage={errors.category?.message}
                  formRegister={() =>
                    register('category', { required: 'This field is required' })
                  }
                ></Select>
              </div>
              <div className="flex items-center justify-between">
                <label>Item:</label>
                <Textbox
                  placeholder="Item amount"
                  errorMessage={errors.itemAmount?.message}
                  formRegister={() =>
                    register('itemAmount', {
                      required: 'This field is required',
                      min: {
                        value: 0,
                        message: 'The amount must not be negative',
                      },
                    })
                  }
                ></Textbox>
              </div>
              <div className="mt-8 flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </section>
          <section className="w-1/2 italic text-purple-700">
            <h3 className="font-bold ">Random cat fact:</h3>
            <p>{fact}</p>
          </section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
