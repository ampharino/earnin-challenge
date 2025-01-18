import { Checkbox } from '@headlessui/react';
import HeaderCell from './ui/table/header/Cell';
import BodyCell from './ui/table/body/Cell';
import type { Expense } from '../App';

interface Props {
  expenses: Expense[];
  toggleExpense: (idx: number) => void;
}

export default function Table({ expenses, toggleExpense }: Props) {
  const headers = ['Item', 'Category', 'Amount'];
  const highestSpend = Math.max(
    ...expenses.map(({ itemAmount }) => itemAmount)
  );
  return (
    <table className="table-fixed border border-gray-400 border-collapse w-full">
      <thead className="border border-gray-400">
        <tr>
          <th className="w-8"></th>
          {headers.map((text, idx) => {
            return <HeaderCell key={idx} text={text} />;
          })}
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          return (
            <tr
              key={expense.id}
              className={
                expense.itemAmount === highestSpend ? 'bg-green-200' : ''
              }
            >
              <td className="px-1 text-center border border-gray-400">
                <Checkbox
                  defaultChecked={false}
                  onChange={() => toggleExpense(expense.id)}
                  className="size-4 flex border border-gray-400 justify-self-center data-[checked]:bg-purple-700"
                />
              </td>
              <BodyCell>{expense.itemName}</BodyCell>
              <BodyCell>{expense.category}</BodyCell>
              <BodyCell>{`${expense.itemAmount}$`}</BodyCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
