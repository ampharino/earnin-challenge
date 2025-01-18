import { useState } from 'react';
import ExpenseDialog from './components/ExpenseDialog';
import Table from './components/Table';
import Button from './components/ui/Button';

export interface Expense {
  itemName: string;
  category: string;
  itemAmount: number;
  id: number;
}

function App() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [expenseCount, setExpenseCount] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const addExpense = (expense: Expense) => {
    const id = expenseCount + 1;
    setExpenses((prev) => [
      ...prev,
      {
        id,
        itemName: expense.itemName,
        category: expense.category,
        itemAmount: expense.itemAmount,
      },
    ]);
    setExpenseCount(id);
  };
  const [selectedExpenseIds, setSelectedExpenseIds] = useState<number[]>([]);
  const deleteExpenses = () => {
    setExpenses((prev) => {
      return prev.filter((expense) => !selectedExpenseIds.includes(expense.id));
    });
    setSelectedExpenseIds([]);
  };
  const toggleExpense = (id: number) => {
    if (selectedExpenseIds.includes(id)) {
      setSelectedExpenseIds((prev) => prev.filter((i) => i !== id));
      return;
    }
    setSelectedExpenseIds((prev) => [...prev, id]);
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
