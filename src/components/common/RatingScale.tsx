import React from 'react';

interface RatingScaleProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (val: number) => void;
  max?: 5 | 10;
  lowLabel?: string;
  highLabel?: string;
}

export const RatingScale: React.FC<RatingScaleProps> = ({
  label,
  sublabel,
  value,
  onChange,
  max = 10,
  lowLabel = 'Low',
  highLabel = 'High',
}) => {
  const numbers = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="p-3.5 bg-white/70 border border-[#dce6dd] rounded-xl space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-[#0e3b2e]">{label}</span>
        {value > 0 ? (
          <span className="text-xs font-bold text-[#c59b27] tabular-nums bg-[#faf4df] px-2 py-0.5 rounded-md">
            {value} / {max}
          </span>
        ) : (
          <span className="text-xs text-[#8ea397] italic">Not rated</span>
        )}
      </div>

      {sublabel && <p className="text-xs text-[#637d70] italic">{sublabel}</p>}

      <div className="grid grid-flow-col auto-cols-fr gap-1.5 pt-1">
        {numbers.map((num) => {
          const isSelected = value === num;
          const isPast = value > 0 && num <= value;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(isSelected ? 0 : num)}
              className={`h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all cursor-pointer select-none min-h-[44px] ${
                isSelected
                  ? 'bg-[#0e3b2e] text-[#fbf8ee] shadow-sm ring-2 ring-[#c59b27]'
                  : isPast
                  ? 'bg-[#e5eee6] text-[#0e3b2e] hover:bg-[#d6e5d8]'
                  : 'bg-white text-[#476054] border border-[#d6e0d7] hover:border-[#b4c9b7] hover:bg-[#f6faf6]'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[11px] text-[#748e80] px-0.5 pt-0.5">
        <span>1: {lowLabel}</span>
        <span>{max}: {highLabel}</span>
      </div>
    </div>
  );
};
