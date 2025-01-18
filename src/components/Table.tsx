import { Checkbox } from '@headlessui/react';
import HeaderCell from './ui/table/header/Cell';
import BodyCell from './ui/table/body/Cell';
import type { Expense } from '../App';

interface Props {
  expenses: Expense[];
}

export default function Table({ expenses }: Props) {
  const headers = ['Item', 'Category', 'Amount'];
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
        {expenses.map((expense, idx) => (
          <tr key={idx}>
            <td className="px-1 text-center border border-gray-400">
              <Checkbox className="size-4 flex border border-gray-400 justify-self-center" />
            </td>
            <BodyCell>{expense.itemName}</BodyCell>
            <BodyCell>{expense.category}</BodyCell>
            <BodyCell>{`${expense.itemAmount}$`}</BodyCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
