export const SelectInput = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) => (
  <select
    value={value}
    onChange={onChange}
    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
