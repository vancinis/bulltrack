'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: DropdownOption[];
  label?: string;
  placeholder?: string;
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ options, label, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-slate-100 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full appearance-none bg-primary-dark border-0 text-white rounded-lg p-4 pr-10
              focus:outline-none focus:border-transparent
              transition-colors cursor-pointer
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
