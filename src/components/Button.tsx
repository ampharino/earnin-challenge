import { PropsWithChildren } from 'react';

type Props = {
  onClick: () => void;
};
export default function Button(props: PropsWithChildren<Props>) {
  const { onClick, children } = props;
  return (
    <button
      className="bg-purple-700 text-white rounded px-3 py-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
