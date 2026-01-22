'use client';

import { forwardRef } from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onChange, label, disabled = false }, ref) => {
    return (
      <div className="flex items-center">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none
            ${checked ? 'bg-primary' : 'bg-black'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full transition-transform duration-200
              ${checked ? 'translate-x-6 bg-black' : 'translate-x-1 bg-primary'}
            `}
          />
        </button>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-700">
            {label}
          </span>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
