import { Checkbox } from '@headlessui/react';
import HeaderColumn from './components/table/header/Column';

export default function Table() {
  const headers = ['Item', 'Category', 'Amount'];
  return (
    <table className="table-auto border border-gray-400 border-collapse w-full">
      <thead className="border border-gray-400">
        <tr>
          <th></th>
          {headers.map((text) => {
            return <HeaderColumn text={text} />;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Checkbox className="size-4 inline-block" />
          </td>
          <td>Whiskers Cat Food</td>
          <td>Food</td>
          <td>500$</td>
        </tr>
      </tbody>
    </table>
  );
}
