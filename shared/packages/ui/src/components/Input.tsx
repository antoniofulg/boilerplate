import * as React from 'react';

export type InputProps = {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

/**
 * Input Component
 * Design system input with label and error states
 */
export function Input({
  label,
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
          error ? 'border-error' : 'border-neutral-300'
        } ${disabled ? 'bg-neutral-100 cursor-not-allowed' : 'bg-white'} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}

