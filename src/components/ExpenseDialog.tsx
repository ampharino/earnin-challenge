import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import Textbox from './ui/form/Textbox';
import Select from './ui/form/Select';

interface FormData {
  itemName: string;
  category: string;
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
        <DialogPanel className="max-w-3xl w-full bg-white flex">
          <section className="w-1/2">
            <form
              onSubmit={onSubmit}
              className="flex flex-col py-4 px-6 gap-y-6"
            >
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
              <div className="mt-8">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </section>
          <section>Random cat fact</section>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
