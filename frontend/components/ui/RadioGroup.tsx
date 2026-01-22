'use client';

import { forwardRef } from 'react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, name }, ref) => {
    return (
      <div ref={ref} className="space-y-3">
        {options.map((option) => {
          const isChecked = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 bg-primary-dark focus:outline-none
                ${
                  isChecked
                    ? 'border border-primary'
                    : 'border-0'
                }
              `}
            >
              <span className="text-sm font-medium text-white select-none">
                {option.label}
              </span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isChecked ? 'bg-primary' : 'border-2 border-primary'
              }`}>
                {isChecked && (
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
