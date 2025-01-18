import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Button from './ui/Button';
import Textbox from './ui/form/Textbox';

interface FormData {
  itemName: string;
}

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
        <DialogPanel className="w-screen bg-white flex">
          <section className="w-1/2">
            <form onSubmit={onSubmit} className="flex flex-col py-4 px-6">
              <div className="flex items-center">
                <label>Item:</label>
                <Textbox
                  placeholder="Item name"
                  errorMessage={errors.itemName?.message}
                  formRegister={() =>
                    register('itemName', { required: 'This field is required' })
                  }
                ></Textbox>
              </div>
              <div>
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
