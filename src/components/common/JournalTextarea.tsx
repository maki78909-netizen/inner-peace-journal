import React from 'react';

interface JournalTextareaProps {
  label?: string;
  sublabel?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  required?: boolean;
}

export const JournalTextarea: React.FC<JournalTextareaProps> = ({
  label,
  sublabel,
  value,
  onChange,
  placeholder = 'Write your thoughts here...',
  rows = 4,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-[#0e3b2e] leading-snug">
          {label}
        </label>
      )}
      {sublabel && (
        <p className="text-xs text-[#526a5e] italic leading-normal mb-1">
          {sublabel}
        </p>
      )}
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full text-base font-sans text-[#1a2e26] bg-[#ffffff]/90 border border-[#d6e2d7] rounded-xl p-3.5 focus:outline-none focus:ring-2 focus:ring-[#c59b27]/40 focus:border-[#c59b27] transition-all placeholder:text-[#95a89e] placeholder:italic resize-y leading-relaxed shadow-xs"
        />
        {value && value.trim().length > 0 && (
          <div className="absolute bottom-2.5 right-3 text-[11px] text-[#8ea397] pointer-events-none tabular-nums font-sans">
            {value.trim().split(/\s+/).length} words
          </div>
        )}
      </div>
    </div>
  );
};
