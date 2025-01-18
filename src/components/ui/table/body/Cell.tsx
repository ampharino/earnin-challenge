import { PropsWithChildren } from 'react';

export default function Cell({ children }: PropsWithChildren) {
  return <td className="text-start border border-gray-400 px-3">{children}</td>;
}
