import React from 'react';

interface AffirmationCardProps {
  affirmation: string;
  subtext?: string;
  label?: string;
}

export const AffirmationCard: React.FC<AffirmationCardProps> = ({
  affirmation,
  subtext = 'Read it slowly, feel it, and let it sink in.',
  label = "Today's Affirmation",
}) => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-[#faf6eb] via-[#f7f2e4] to-[#faf6eb] border border-[#ebd89b] text-center space-y-1.5 shadow-2xs">
      <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#8e6e18] uppercase block">
        {label}
      </span>
      <p className="font-serif italic text-base sm:text-lg text-[#075B3A] font-semibold px-2">
        "{affirmation}"
      </p>
      {subtext && (
        <span className="text-[11px] font-sans text-[#786127] italic block">
          {subtext}
        </span>
      )}
    </div>
  );
};
