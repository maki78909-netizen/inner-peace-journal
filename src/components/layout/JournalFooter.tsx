import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface JournalFooterProps {
  onNext?: () => void;
  onPrev?: () => void;
  showNavButtons?: boolean;
}

export const JournalFooter: React.FC<JournalFooterProps> = ({
  onNext,
  onPrev,
  showNavButtons = true,
}) => {
  const { state, nextScreen, prevScreen, totalScreens, setScreen } = useJournal();
  const screen = state.currentScreen;

  const handlePrev = onPrev || prevScreen;
  const handleNext = onNext || nextScreen;

  // Contextual labels for Next & Back
  const getNextLabel = () => {
    if (screen >= 1 && screen <= 20) return `Next: Day ${screen + 1}`;
    if (screen === 21) return 'Next: Scorecard';
    if (screen === 22) return 'Next: Declaration';
    if (screen === 23) return 'Next: Back Cover';
    if (screen === 24) return 'Return to Cover';
    return 'Next';
  };

  const getPrevLabel = () => {
    if (screen === 1) return 'Cover';
    if (screen >= 2 && screen <= 21) return `Day ${screen - 1}`;
    if (screen === 22) return 'Day 21';
    if (screen === 23) return 'Scorecard';
    if (screen === 24) return 'Declaration';
    return 'Back';
  };

  return (
    <footer className="w-full mt-auto select-none">
      {/* Integrated Back / Next Navigation Row */}
      {showNavButtons && (
        <div className="px-4 sm:px-8 py-3 bg-[#FAF8F3] border-t border-[#ebd89b]/50 flex items-center justify-between no-print">
          {screen >= 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-[#064A32] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#eaf2ea] transition-all cursor-pointer min-h-[42px] border border-[#064A32]/25 shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4 text-[#C59B27]" />
              <span>{getPrevLabel()}</span>
            </button>
          ) : (
            <div className="w-16" />
          )}

          <div className="text-center">
            <span className="text-xs font-serif font-bold text-[#C59B27] tracking-widest uppercase">
              {screen >= 1 && screen <= 21
                ? `Day ${screen} of 21`
                : screen === 22
                ? 'Scorecard'
                : screen === 23
                ? 'Declaration'
                : screen === 24
                ? 'Back Cover'
                : 'Cover'}
            </span>
          </div>

          {screen < totalScreens ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#064A32] text-[#F8F5EA] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#043322] shadow-sm hover:shadow transition-all cursor-pointer min-h-[42px] ring-2 ring-[#C59B27]"
            >
              <span>{getNextLabel()}</span>
              <ChevronRight className="w-4 h-4 text-[#C59B27]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setScreen(0)}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#064A32] text-[#F8F5EA] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#043322] shadow-sm hover:shadow transition-all cursor-pointer min-h-[42px] ring-2 ring-[#C59B27]"
            >
              <span>Return to Cover</span>
              <ChevronRight className="w-4 h-4 text-[#C59B27]" />
            </button>
          )}
        </div>
      )}

      {/* Master Deep Emerald Footer Panel */}
      <div className="relative bg-gradient-to-r from-[#064A32] via-[#075B3A] to-[#064A32] text-[#F8F5EA] px-4 sm:px-8 py-4 sm:py-5 overflow-hidden">
        {/* Gold curved accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D9A441] to-transparent opacity-80" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Brand & Pillars */}
          <div className="flex flex-col items-center sm:items-start leading-tight">
            <span className="font-serif font-bold text-sm tracking-[0.2em] text-[#D9A441] uppercase">
              PATH TO INNER PEACE
            </span>
            <span className="font-sans font-medium text-[10px] tracking-[0.25em] text-[#e3ede3] uppercase mt-0.5">
              MIND • BALANCE • TRANSFORM
            </span>
          </div>

          {/* Center Botanical & Script Phrase */}
          <div className="flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#D9A441] shrink-0"
            >
              <path
                d="M12 2C7.5 5 4.5 9.5 4.5 14C4.5 17.5 7 20 10.5 20C12 20 12.5 19 12.5 19C12.5 19 13 20 14.5 20C18 20 20.5 17.5 20.5 14C20.5 9.5 17.5 5 12 2Z"
                fill="#D9A441"
                fillOpacity="0.3"
                stroke="#D9A441"
                strokeWidth="1.2"
              />
            </svg>
            <span className="font-script text-base sm:text-lg text-[#ecd07a] italic">
              "Inner Peace Begins Within"
            </span>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#c7dbc9] font-light">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Stored privately on this device</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
