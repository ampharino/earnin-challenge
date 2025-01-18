import { useState } from 'react';
import ExpenseDialog from './components/ExpenseDialog';
import Table from './components/Table';
import Button from './components/ui/Button';

export interface Expense {
  itemName: string;
  category: string;
  itemAmount: number;
}

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpenseIdx, setSelectedExpenseIdx] = useState<number[]>([]);
  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [
      ...prev,
      {
        itemName: expense.itemName,
        category: expense.category,
        itemAmount: expense.itemAmount,
      },
    ]);
  };
  const deleteExpenses = () => {
    setExpenses((prev) => {
      return prev.filter((_, idx) => !selectedExpenseIdx.includes(idx));
    });
    setSelectedExpenseIdx([]);
  };
  const toggleExpense = (idx: number) => {
    if (selectedExpenseIdx.includes(idx)) {
      setSelectedExpenseIdx((prev) => prev.filter((i) => i !== idx));
      return;
    }
    setSelectedExpenseIdx((prev) => [...prev, idx]);
  };
  return (
    <>
      <section className="p-6 max-w-5xl mx-auto">
        <section className="mb-10">
          <Button onClick={() => setDialogOpen(true)}>Add Expense</Button>
          <Button onClick={deleteExpenses}>Delete Expense</Button>
        </section>
        <Table expenses={expenses} toggleExpense={toggleExpense} />
      </section>
      <ExpenseDialog
        onAddExpense={addExpense}
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
      />
    </>
  );
}

export default App;
