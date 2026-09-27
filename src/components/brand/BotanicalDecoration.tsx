import React from 'react';

export const LeafDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 opacity-75 ${className}`}>
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#c59b27]/60 to-[#c59b27]" />
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0e3b2e]">
      <path
        d="M12 2C7 5 4 10 4 15C4 18.5 6.5 21 10 21C11.5 21 12 20 12 20C12 20 12.5 21 14 21C17.5 21 20 18.5 20 15C20 10 17 5 12 2Z"
        fill="#0e3b2e"
        fillOpacity="0.15"
        stroke="#c59b27"
        strokeWidth="1.2"
      />
      <path d="M12 7V19M12 11C13.5 12 15 11.5 16 11M12 14C10.5 15 9 14.5 8 14" stroke="#c59b27" strokeWidth="1" strokeLinecap="round" />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-[#c59b27]/60 to-[#c59b27]" />
  </div>
);

export const BotanicalCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({
  position,
  className = '',
}) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`pointer-events-none select-none text-[#c59b27]/25 ${rotation} ${className}`}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path
          d="M2 2C16 4 28 14 32 30M2 2C4 16 14 28 30 32M2 2L42 42"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
