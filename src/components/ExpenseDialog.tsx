import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import Textbox from './ui/form/Textbox';
import Select from './ui/form/Select';
import { useEffect, useState } from 'react';
import type { Expense } from '../App';

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

const defaultValues: Expense = {
  itemName: '',
  category: undefined,
  itemAmount: '',
} as unknown as Expense;

export default function ExpenseDialog({
  isOpen,
  setOpen,
  onAddExpense,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onAddExpense: (expense: Expense) => void;
}) {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    control,
  } = useForm<Expense>({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    onAddExpense({ ...data, itemAmount: Number(data.itemAmount) });
    closeDialog();
  });

  const closeDialog = () => {
    setOpen(false);
    reset(defaultValues);
  };

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
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogBackdrop className="bg-black/30 fixed inset-0 z-10" />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-6">
        <DialogPanel className="max-w-3xl w-full bg-white flex-col md:flex-row flex gap-x-8  py-4 px-6">
          <section className="md:w-1/2">
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
                  name="category"
                  formControl={control}
                  rules={{ required: 'This field is required' }}
                ></Select>
              </div>
              <div className="flex items-center justify-between">
                <label>Item:</label>
                <Textbox
                  placeholder="Item amount"
                  type="number"
                  errorMessage={errors.itemAmount?.message}
                  formRegister={() =>
                    register('itemAmount', {
                      required: 'This field is required',
                      min: {
                        value: 1,
                        message: 'The amount must be more than 1',
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
          <section className="md:w-1/2 italic text-purple-700">
            <h3 className="font-bold ">Random cat fact:</h3>
            <p>{fact}</p>
          </section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
