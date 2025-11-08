export const ListComponent: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600"></span>
        <span className="text-gray-700">{item}</span>
      </li>
    ))}
  </ul>
);
