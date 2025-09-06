import type { ChangeEvent } from 'react';

interface AuthInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  isError: boolean;
  errorMsg?: string;
}

function AuthInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  type,
  isError,
  errorMsg,
}: AuthInputProps) {
  return (
    <div className="h-full mt-5">
      <div className="flex items-end gap-1">
        <span className="font-medium text-lg">{label}</span>
        {isError && (
          <span className="font-light text-primary-red text-sm">
            {errorMsg}
          </span>
        )}
      </div>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className={`mt-2 border w-full h-10 px-3 rounded-sm focus:outline-none   ${
          isError
            ? 'border-primary-red text-primary-red placeholder-primary-red'
            : 'focus:border-primary-green border-text-white placeholder-shown:border-bg-400'
        }`}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}

export default AuthInput;
