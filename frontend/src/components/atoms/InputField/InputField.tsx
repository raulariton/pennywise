// components/atoms/InputField.tsx
export default function InputField({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}: {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-full border px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:ring-2 focus:outline-none ${
          !error ? `focus:ring-cyan-500` : `border-red-500 focus:ring-red-500`
        }`}
        required
      />
      {error && <p className="mt-1 pl-5 text-sm font-semibold text-red-600">{error}</p>}
    </>
  );
}
