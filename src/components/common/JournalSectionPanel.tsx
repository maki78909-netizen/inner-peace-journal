import React from 'react';

interface JournalSectionPanelProps {
  number: number | string;
  title: string;
  instruction?: string;
  children: React.ReactNode;
  className?: string;
  badgeVariant?: 'emerald' | 'blue' | 'gold';
}

export const JournalSectionPanel: React.FC<JournalSectionPanelProps> = ({
  number,
  title,
  instruction,
  children,
  className = '',
  badgeVariant = 'emerald',
}) => {
  const badgeClasses = {
    emerald: 'bg-[#075B3A] text-[#F8F5EA] border-[#D9A441]',
    blue: 'bg-[#2A6B85] text-white border-[#D9A441]',
    gold: 'bg-[#D9A441] text-[#064A32] border-[#075B3A]',
  }[badgeVariant];

  return (
    <section className={`w-full p-4 sm:p-5 rounded-2xl bg-[#fdfcf9] border border-[#e4ded0] shadow-2xs space-y-3 relative overflow-hidden ${className}`}>
      {/* Top Header: Circular Number Badge + Section Title */}
      <div className="flex items-start gap-3">
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-serif font-black text-sm sm:text-base border shadow-xs shrink-0 mt-0.5 ${badgeClasses}`}
        >
          {number}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#075B3A] uppercase tracking-wide leading-snug">
            {title}
          </h3>
          {instruction && (
            <p className="font-sans text-xs text-[#526b5d] italic leading-normal mt-0.5">
              {instruction}
            </p>
          )}
        </div>
      </div>

      {/* Interactive Content Area */}
      <div className="pt-1">{children}</div>
    </section>
  );
};
