import React from 'react';

interface DayTitleBannerProps {
  dayNum: number;
  themeTitle: string;
  subtitle: string;
  className?: string;
}

export const DayTitleBanner: React.FC<DayTitleBannerProps> = ({
  dayNum,
  themeTitle,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`relative w-full my-4 select-none ${className}`}>
      {/* Container with organic brush-stroke / emerald banner styling */}
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-gradient-to-r from-[#064A32] via-[#075B3A] to-[#075B3A] p-3.5 sm:p-4 rounded-2xl shadow-sm border border-[#D9A441]/40 overflow-hidden">
        {/* Subtle decorative gold leaf outline in the background */}
        <div className="absolute right-2 top-0 bottom-0 flex items-center opacity-10 pointer-events-none">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C7.5 5 4.5 9.5 4.5 14C4.5 17.5 7 20 10.5 20C12 20 12.5 19 12.5 19C12.5 19 13 20 14.5 20C18 20 20.5 17.5 20.5 14C20.5 9.5 17.5 5 12 2Z"
              stroke="#D9A441"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Left Badge: DAY in White, Large Number in Rich Gold */}
        <div className="flex items-center gap-2.5 sm:border-r sm:border-[#D9A441]/40 sm:pr-5 shrink-0">
          <div className="flex flex-col items-center justify-center bg-[#053d29] px-3.5 py-1.5 rounded-xl border border-[#D9A441]/50 shadow-inner">
            <span className="font-serif font-black tracking-[0.25em] text-white text-[10px] sm:text-xs uppercase">
              DAY
            </span>
            <span className="font-serif font-black text-3xl sm:text-4xl text-[#D9A441] leading-none drop-shadow-xs">
              {dayNum}
            </span>
          </div>
        </div>

        {/* Right Area: Main Theme / Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide uppercase leading-tight drop-shadow-xs">
            {themeTitle}
          </h2>
          <p className="font-sans font-medium text-xs sm:text-sm text-[#ecd07a] italic mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
