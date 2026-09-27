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
    <div className="p-3 bg-white border border-[#dce6dd] rounded-xl space-y-2 shadow-2xs">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs sm:text-sm font-semibold text-[#075B3A]">{label}</span>
        {value > 0 ? (
          <span className="text-[11px] font-bold text-[#8e6e18] tabular-nums bg-[#faf4df] px-2 py-0.5 rounded-md border border-[#ebd89b]">
            Rating: {value} / {max}
          </span>
        ) : (
          <span className="text-[11px] text-[#8ea397] italic">Tap to rate (1–{max})</span>
        )}
      </div>

      {sublabel && <p className="text-[11px] text-[#637d70] italic -mt-1">{sublabel}</p>}

      {/* Responsive rating buttons: 10 individual buttons, cleanly aligned */}
      <div
        className={`grid gap-1 pt-1 ${
          max === 5 ? 'grid-cols-5' : 'grid-cols-5 sm:grid-cols-10'
        }`}
      >
        {numbers.map((num) => {
          const isSelected = value === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(isSelected ? 0 : num)}
              aria-label={`${label} rating ${num} of ${max}`}
              className={`h-9 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold transition-all cursor-pointer select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#075B3A] text-white shadow-sm ring-2 ring-[#D9A441] border border-[#D9A441] scale-[1.03] z-10'
                  : 'bg-white text-[#2a4436] border border-[#d6e0d7] hover:border-[#b4c9b7] hover:bg-[#f6faf6]'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] sm:text-[11px] text-[#748e80] px-0.5 pt-0.5">
        <span>1: {lowLabel}</span>
        <span>{max}: {highLabel}</span>
      </div>
    </div>
  );
};
