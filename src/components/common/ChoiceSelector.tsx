import React from 'react';

interface ChoiceSelectorProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export const ChoiceSelector: React.FC<ChoiceSelectorProps> = ({
  label,
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <span className="block text-xs font-semibold text-[#0e3b2e] uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(isSelected ? '' : opt)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all select-none min-h-[38px] flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#0e3b2e] text-[#fcfaf6] ring-1 ring-[#c59b27] shadow-xs'
                  : 'bg-white/80 text-[#365042] border border-[#d6e2d7] hover:bg-[#f1f6f2]'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-[#c59b27] bg-[#c59b27]' : 'border-[#9bb3a2]'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
