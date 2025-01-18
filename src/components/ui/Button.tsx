import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: () => void;
}
export default function Button(props: PropsWithChildren<Props>) {
  const { onClick, children, type } = props;
  return (
    <button
      className="bg-purple-700 text-white rounded px-3 py-1"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
