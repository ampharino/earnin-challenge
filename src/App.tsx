import { useState } from 'react';
import ExpenseDialog from './components/ExpenseDialog';
import Table from './components/Table';
import Button from './components/ui/Button';

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <section className="p-6">
        <section className="mb-10">
          <Button onClick={() => setDialogOpen(true)}>Add Expense</Button>
        </section>
        <Table />
      </section>
      <ExpenseDialog isOpen={isDialogOpen} setOpen={setDialogOpen} />
    </>
  );
}

export default App;
