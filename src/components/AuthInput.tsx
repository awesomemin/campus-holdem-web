import type { ChangeEvent } from 'react';

interface AuthInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function AuthInput({
  label,
  name,
  placeholder,
  value,
  onChange,
}: AuthInputProps) {
  return (
    <div className="h-full mt-5">
      <div className="font-medium text-lg">{label}</div>
      <input
        name={name}
        placeholder={placeholder}
        className="mt-2 border border-text-white w-full h-10 px-3 rounded-sm focus:outline-none focus:border-primary-green placeholder-shown:border-bg-400"
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}

export default AuthInput;
