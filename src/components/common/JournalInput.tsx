import React from 'react';

interface JournalInputProps {
  label?: string;
  sublabel?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'date';
  className?: string;
  fontStyle?: 'normal' | 'script';
}

export const JournalInput: React.FC<JournalInputProps> = ({
  label,
  sublabel,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  fontStyle = 'normal',
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full text-base bg-[#ffffff]/90 border border-[#d6e2d7] rounded-xl px-3.5 py-2.5 text-[#1a2e26] focus:outline-none focus:ring-2 focus:ring-[#c59b27]/40 focus:border-[#c59b27] transition-all placeholder:text-[#95a89e] placeholder:italic shadow-xs ${
          fontStyle === 'script' ? 'font-script text-2xl text-[#0e3b2e]' : 'font-sans'
        }`}
      />
    </div>
  );
};
