export default function ErrorMessage({ message }: { message: string }) {
  return <div className="text-red-500 absolute">{message}</div>;
}
