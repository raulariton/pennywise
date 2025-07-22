export const TextInput = ({
  value,
  onChange,
  type = 'text',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
    {...props}
  />
);
