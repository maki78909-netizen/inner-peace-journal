import React from 'react';
import { Logo } from '../brand/Logo';
import { useJournal } from '../../context/JournalContext';
import { Check, BookOpen } from 'lucide-react';

interface JournalHeaderProps {
  inspirationalQuote?: string;
  onOpenIndex?: () => void;
}

export const JournalHeader: React.FC<JournalHeaderProps> = ({
  inspirationalQuote = 'A Calmer Mind,\nA Brighter You',
  onOpenIndex,
}) => {
  const { currentScreenMeta, saveStatus, setScreen } = useJournal();

  return (
    <header className="relative w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-8 border-b border-[#ebd89b]/50 select-none">
      {/* Top row: Brand & Title on left, Organic Botanical Art & Quote on right */}
      <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-3">
        {/* Left: Logo & Journal Title Lockup */}
        <button
          type="button"
          onClick={() => setScreen(0)}
          className="flex items-center gap-3 sm:gap-4 text-left cursor-pointer hover:opacity-90 transition-opacity min-w-0 flex-1"
          title="Return to Cover"
        >
          <Logo size="md" showTagline={false} />

          <div className="flex flex-col justify-center min-w-0">
            <span className="font-serif font-black tracking-[0.22em] text-[#D9A441] text-xs sm:text-sm uppercase leading-none">
              21-DAY
            </span>
            <h1 className="font-serif font-bold tracking-[0.06em] text-[#075B3A] text-base sm:text-2xl lg:text-[26px] leading-tight uppercase mt-0.5 truncate xs:whitespace-normal">
              INNER HEALING JOURNAL
            </h1>
            <p className="font-sans font-medium tracking-[0.2em] text-[#557364] text-[8px] sm:text-[10px] uppercase leading-none mt-1">
              RELEASE &nbsp;|&nbsp; RECONNECT &nbsp;|&nbsp; REBUILD &nbsp;|&nbsp; TRANSFORM
            </p>
          </div>
        </button>

        {/* Right: Organic Emerald/Gold Accent with Botanical Leaves & Script Phrase */}
        <div className="relative shrink-0 flex items-center justify-end">
          {/* Decorative background shape */}
          <div className="relative bg-gradient-to-br from-[#064A32] to-[#075B3A] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm border border-[#D9A441]/40 flex items-center gap-2">
            {/* Botanical Leaf SVG */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#D9A441] shrink-0"
            >
              <path
                d="M12 2C7.5 5 4.5 9.5 4.5 14C4.5 17.5 7 20 10.5 20C12 20 12.5 19 12.5 19C12.5 19 13 20 14.5 20C18 20 20.5 17.5 20.5 14C20.5 9.5 17.5 5 12 2Z"
                fill="#D9A441"
                fillOpacity="0.25"
                stroke="#D9A441"
                strokeWidth="1.2"
              />
              <path
                d="M12.5 6V18M12.5 10C14 11 15.5 10.5 16.5 10M12.5 13C11 14 9.5 13.5 8.5 13"
                stroke="#D9A441"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>

            {/* Script Inspirational Phrase */}
            <div className="font-script text-[#F8F5EA] text-sm sm:text-base leading-tight whitespace-pre-line text-right drop-shadow-xs font-semibold">
              {inspirationalQuote}
            </div>

            {/* Gold corner curved arc accent */}
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#D9A441] rounded-tr-lg pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Subtle Top Metadata Bar: Day Progress & Quiet Save Indicator */}
      <div className="flex items-center justify-between pt-2.5 text-[11px] text-[#637d70] border-t border-[#f0ece1] mt-2.5">
        <div className="flex items-center gap-2">
          {currentScreenMeta.day ? (
            <span className="font-serif font-bold text-[#075B3A] tracking-wider uppercase">
              DAY {currentScreenMeta.day} OF 21
            </span>
          ) : (
            <span className="font-serif font-bold text-[#075B3A] tracking-wider uppercase">
              {currentScreenMeta.title}
            </span>
          )}

          {/* Thin Progress line */}
          <div className="hidden xs:block w-24 h-1.5 bg-[#eaf2ea] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D9A441] to-[#075B3A] rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round((currentScreenMeta.screen / 24) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Saved Indicator */}
          <span
            className={`inline-flex items-center gap-1 font-medium transition-opacity duration-200 ${
              saveStatus === 'saved' ? 'text-[#075B3A] opacity-90' : 'text-[#D9A441]'
            }`}
          >
            {saveStatus === 'saved' ? (
              <>
                <Check className="w-3 h-3 text-[#075B3A]" />
                <span>Saved</span>
              </>
            ) : (
              <span className="animate-pulse">Saving...</span>
            )}
          </span>

          {/* Index drawer toggle button */}
          {onOpenIndex && (
            <button
              type="button"
              onClick={onOpenIndex}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-[#eaf2ea] text-[#075B3A] transition-colors cursor-pointer font-medium"
              title="Open 24-Screen Index"
            >
              <BookOpen className="w-3 h-3 text-[#D9A441]" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                Index
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
