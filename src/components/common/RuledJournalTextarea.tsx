import React from 'react';

interface RuledJournalTextareaProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  variant?: 'white' | 'cream';
}

export const RuledJournalTextarea: React.FC<RuledJournalTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Write your thoughts here...',
  rows = 3,
  className = '',
  variant = 'white',
}) => {
  const lineStyleClass = variant === 'cream' ? 'journal-ruled-cream' : 'journal-ruled-lines';

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full ${lineStyleClass} text-base font-sans text-[#1a3327] rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D9A441]/50 border border-[#d6e0d7] transition-all placeholder:text-[#95ab9e] placeholder:italic resize-y shadow-xs`}
        style={{
          minHeight: `${rows * 32 + 20}px`,
        }}
      />
      {value && value.trim().length > 0 && (
        <span className="absolute bottom-2 right-3 text-[10px] text-[#869e90] font-sans pointer-events-none tabular-nums opacity-75">
          {value.trim().split(/\s+/).length} words
        </span>
      )}
    </div>
  );
};
