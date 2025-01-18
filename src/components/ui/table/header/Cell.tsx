export default function Cell({ text }: { text: string }) {
  return <th className="text-start border border-gray-400 px-3">{text}</th>;
}
