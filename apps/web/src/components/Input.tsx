import type { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Input({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  type = 'text',
  ...props
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
