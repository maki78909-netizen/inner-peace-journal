import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { Logo } from '../brand/Logo';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface CoverPageProps {
  onOpenIndex?: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onOpenIndex }) => {
  const { state, setScreen, completedDaysCount } = useJournal();

  const handleBeginJourney = () => {
    if (completedDaysCount > 0) {
      const firstIncomplete = Array.from({ length: 21 }, (_, i) => i + 1).find(
        (d) => !state.completedDays?.includes(d)
      );
      setScreen(firstIncomplete || 1);
    } else {
      setScreen(1);
    }
  };

  return (
    <article className="journal-sheet max-w-[840px] w-full min-h-full sm:min-h-[1050px] bg-[#FAF8F3] rounded-2xl sm:rounded-3xl mx-auto flex flex-col justify-between overflow-hidden relative shadow-2xl border border-[#D9A441]/40 my-1 sm:my-6 font-sans text-[#064A32]">
      {/* Top Header Row with Index Shortcut & 2-Line Script Badge */}
      <div className="relative z-20 flex items-center justify-between px-3 sm:px-8 pt-3 sm:pt-5 pb-1">
        {onOpenIndex ? (
          <button
            type="button"
            onClick={onOpenIndex}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#064A32]/25 text-[#064A32] text-xs font-semibold hover:bg-white hover:border-[#D9A441] transition-all shadow-xs cursor-pointer select-none"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
            <span className="hidden xs:inline">Journal Index</span>
            <span className="xs:hidden">Index</span>
          </button>
        ) : (
          <div className="w-8" />
        )}

        {/* TOP-RIGHT: Emerald Badge with Script Quote strictly in 2 lines: "A Calm Mind" / "A Brighter You" */}
        <div className="relative pointer-events-none select-none">
          <div className="relative bg-gradient-to-br from-[#064A32] to-[#075B3A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm border border-[#D9A441]/40 flex flex-col items-end text-right leading-tight">
            <span className="font-script text-white text-xs xs:text-sm sm:text-base font-bold whitespace-nowrap block">
              A Calm Mind
            </span>
            <span className="font-script text-[#EED894] text-xs xs:text-sm sm:text-base font-bold whitespace-nowrap block -mt-0.5">
              A Brighter You
            </span>
            <div className="w-10 sm:w-14 h-0.5 bg-[#D9A441] rounded-full mt-0.5 opacity-80" />
          </div>
        </div>
      </div>

      {/* TOP BRAND & TITLE SECTION: Logo Seal & 21-Day Lockup */}
      <div className="pt-2 sm:pt-4 px-3 sm:px-8 text-center relative z-10 flex flex-col items-center">
        {/* Official Circular Seal Emblem */}
        <div className="flex justify-center scale-90 xs:scale-100 transition-transform">
          <Logo variant="seal" size="md" showTagline={true} />
        </div>

        {/* 21-DAY (Large Antique Gold Serif) */}
        <div className="mt-3 sm:mt-5">
          <span className="font-serif font-black text-3xl xs:text-4xl sm:text-6xl text-[#C59B27] tracking-[0.12em] sm:tracking-[0.15em] uppercase drop-shadow-xs block leading-none">
            21-DAY
          </span>
        </div>

        {/* INNER HEALING JOURNAL (Deep Forest Emerald Serif) */}
        <h1 className="font-serif font-extrabold text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#064A32] tracking-tight leading-[1.08] uppercase mt-1">
          INNER HEALING
          <br />
          <span className="block mt-0.5">JOURNAL</span>
        </h1>

        {/* Core Pillars Subtitle */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 xs:gap-2 sm:gap-3 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-sans font-bold tracking-[0.16em] sm:tracking-[0.22em] text-[#064A32] uppercase mt-2 sm:mt-2.5">
          <span>RELEASE</span>
          <span className="text-[#C59B27] font-bold">|</span>
          <span>RECONNECT</span>
          <span className="text-[#C59B27] font-bold">|</span>
          <span>REBUILD</span>
          <span className="text-[#C59B27] font-bold">|</span>
          <span>TRANSFORM</span>
        </div>
      </div>

      {/* MIDDLE SECTION: Responsive Layout (Left Text + Sunrise Cliff Photo + Right Badges) */}
      <div className="relative mt-3 sm:mt-5 px-3 sm:px-8">
        {/* Responsive Photographic Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-[#D9A441]/40 bg-[#064A32]">
          {/* Base Photography Asset with Sunrise & Meditator */}
          <div className="relative w-full h-[300px] xs:h-[340px] sm:h-[390px] md:h-[440px] overflow-hidden">
            <img
              src="/cover_sunrise.jpg"
              alt="Contemplator at Sunrise overlooking misty mountains and serene lake"
              className="w-full h-full object-cover object-[center_35%]"
            />

            {/* Gradient overlay for contrast and atmospheric sunrise depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

            {/* Botanical Leaf Overlay on lower-right cliff */}
            <div className="absolute -bottom-2 -right-2 pointer-events-none z-10 hidden xs:block">
              <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
                <path
                  d="M120 120C100 80 80 50 40 40C30 70 50 100 120 120Z"
                  fill="#2E7D32"
                  opacity="0.9"
                />
                <path
                  d="M120 120C105 90 95 65 60 55C50 80 70 105 120 120Z"
                  fill="#388E3C"
                />
                <path
                  d="M120 120C110 95 100 80 80 75C75 90 90 110 120 120Z"
                  fill="#4CAF50"
                />
              </svg>
            </div>
          </div>

          {/* Responsive Left & Right Framing Overlays (strictly non-overlapping & aligned) */}
          <div className="absolute inset-0 p-2.5 xs:p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
            <div className="flex items-start justify-between gap-2 xs:gap-3 w-full">
              {/* LEFT CALLOUT: Guided reflection text with gold accent line */}
              <div className="w-[48%] xs:w-[45%] max-w-[150px] xs:max-w-[180px] sm:max-w-[220px] text-left bg-white/95 backdrop-blur-xs p-2 xs:p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border-l-[3px] sm:border-l-4 border-l-[#C59B27] shadow-md pointer-events-auto">
                <div className="w-6 sm:w-10 h-0.5 bg-[#C59B27] mb-1 sm:mb-2 rounded-full" />
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-[#064A32] font-serif leading-tight sm:leading-relaxed font-semibold">
                  A guided self-reflection journey for emotional awareness, self-compassion, conscious thinking and a more meaningful life.
                </p>
              </div>

              {/* RIGHT BADGES: Golden Circular Seal + Script Card */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 pointer-events-auto shrink-0">
                {/* Golden Badge: SMALL STEPS BIG INNER CHANGE */}
                <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-26 sm:h-26 rounded-full bg-gradient-to-br from-[#edd797] via-[#D9A441] to-[#b68424] p-0.5 sm:p-1 shadow-lg flex items-center justify-center text-center">
                  <div className="w-full h-full rounded-full border border-[#FFF6D6]/80 flex flex-col items-center justify-center p-1 sm:p-2 text-[#064A32] leading-none">
                    <span className="font-serif font-bold text-[7.5px] xs:text-[9px] sm:text-[10px] tracking-wider uppercase block">
                      SMALL STEPS
                    </span>
                    <span className="font-serif font-extrabold text-[8px] xs:text-[10px] sm:text-xs tracking-wide uppercase text-[#064A32] mt-0.5 block">
                      BIG INNER CHANGE
                    </span>
                    <svg width="12" height="8" viewBox="0 0 16 12" fill="none" className="mt-0.5">
                      <path d="M8 12C6 8 1 7 0 2C3 1 7 4 8 8C9 4 13 1 16 2C15 7 10 8 8 12Z" fill="#064A32" />
                    </svg>
                  </div>
                </div>

                {/* Script Accent: A Healing You, A Happier World */}
                <div className="text-center bg-white/92 backdrop-blur-xs px-2 py-0.5 sm:py-1 rounded-lg sm:rounded-xl shadow-xs border border-[#D9A441]/40">
                  <span className="font-script text-[10px] xs:text-[11px] sm:text-xs text-[#064A32] block leading-tight">
                    A Healing You
                  </span>
                  <span className="font-script text-[10px] xs:text-[11px] sm:text-xs text-[#064A32] font-bold block leading-tight">
                    A Happier World
                  </span>
                  <div className="w-8 sm:w-10 h-0.5 bg-[#064A32] rounded-full mx-auto mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 CORE BENEFIT PILLARS (Aligned 5-column grid, responsive, no text clipping) */}
        <div className="grid grid-cols-5 gap-1 xs:gap-1.5 sm:gap-3 mt-3 sm:mt-4 text-center">
          {/* 1. Greater Self-Awareness */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#D9A441] shadow-xs flex items-center justify-center text-[#064A32]">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2a5 5 0 0 0-5 5c0 2 1 3.5 2.5 4.5C8 12.5 7 14 7 16v1h10v-1c0-2-1-3.5-2.5-4.5C16 10.5 17 9 17 7a5 5 0 0 0-5-5z" />
                <path d="M9 21h6" />
              </svg>
            </div>
            <span className="font-serif font-bold text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] text-[#064A32] leading-tight mt-1 uppercase break-words hyphens-none">
              GREATER<br />SELF-AWARENESS
            </span>
          </div>

          {/* 2. Emotional Balance */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#D9A441] shadow-xs flex items-center justify-center text-[#064A32]">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <span className="font-serif font-bold text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] text-[#064A32] leading-tight mt-1 uppercase break-words">
              EMOTIONAL<br />BALANCE
            </span>
          </div>

          {/* 3. Healthier Relationships */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#D9A441] shadow-xs flex items-center justify-center text-[#064A32]">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3c-2 3-5 5-5 9 0 3 2.5 5 5 5s5-2 5-5c0-4-3-6-5-9z" />
                <path d="M7 14c-2 1-3 3-3 5 0 1.5 1 2 3 2s4-1 5-3" />
                <path d="M17 14c2 1 3 3 3 5 0 1.5-1 2-3 2s-4-1-5-3" />
              </svg>
            </div>
            <span className="font-serif font-bold text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] text-[#064A32] leading-tight mt-1 uppercase break-words">
              HEALTHIER<br />RELATIONSHIPS
            </span>
          </div>

          {/* 4. Positive Habits */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#D9A441] shadow-xs flex items-center justify-center text-[#064A32]">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
                <path d="M14 9h5v5" />
              </svg>
            </div>
            <span className="font-serif font-bold text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] text-[#064A32] leading-tight mt-1 uppercase break-words">
              POSITIVE<br />HABITS
            </span>
          </div>

          {/* 5. A More Meaningful Life */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#D9A441] shadow-xs flex items-center justify-center text-[#064A32]">
              <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <span className="font-serif font-bold text-[7px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] text-[#064A32] leading-tight mt-1 uppercase break-words">
              A MORE<br />MEANINGFUL LIFE
            </span>
          </div>
        </div>
      </div>

      {/* Returning User Progress Badge (if any) */}
      {completedDaysCount > 0 && (
        <div className="mx-auto mt-3 px-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EA] text-[#064A32] text-xs font-semibold border border-[#a8dcb9] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>
              Welcome back! You have completed <strong>{completedDaysCount} of 21</strong> days.
            </span>
          </div>
        </div>
      )}

      {/* MASTER DEEP EMERALD FOOTER WITH GOLD CREST & BEGIN JOURNEY BUTTON */}
      <footer className="relative mt-4 sm:mt-6 pt-6 sm:pt-7 pb-5 sm:pb-6 px-3 sm:px-8 bg-[#064A32] text-white overflow-hidden shadow-2xl rounded-b-2xl sm:rounded-b-3xl">
        {/* Sweeping Gold Contour Wave on top */}
        <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 pointer-events-none">
          <svg viewBox="0 0 600 24" fill="none" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0 0C150 18 350 24 600 4V24H0V0Z"
              fill="#064A32"
            />
            <path
              d="M0 0C150 18 350 24 600 4"
              stroke="#D9A441"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Botanical leaf flourish in bottom right */}
        <div className="absolute -bottom-4 -right-4 pointer-events-none opacity-30 hidden xs:block">
          <svg width="140" height="140" viewBox="0 0 120 120" fill="none">
            <path d="M120 120C90 90 70 50 30 30C20 60 40 90 120 120Z" fill="#D9A441" />
          </svg>
        </div>

        {/* Footer Top Content Row: Responsive Grid for Mobile, Tablet & Desktop */}
        <div className="relative z-10 border-b border-[#D9A441]/30 pb-3 sm:pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-3 text-center sm:text-left">
            {/* Left Column: Circular P2IP Emblem */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#D9A441] bg-[#053d29] flex flex-col items-center justify-center p-1 text-center shadow-xs shrink-0">
                <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                  <path d="M8 12C6 8 1 7 0 2C3 1 7 4 8 8C9 4 13 1 16 2C15 7 10 8 8 12Z" fill="#D9A441" />
                </svg>
                <span className="font-sans font-bold text-xs text-white tracking-widest leading-none mt-0.5">
                  P2IP
                </span>
                <span className="text-[6px] sm:text-[6.5px] text-[#EED894] uppercase tracking-tighter leading-tight mt-0.5">
                  PEOPLE<br />PRACTICES<br />POSSIBILITIES
                </span>
              </div>

              <div className="text-left hidden md:block leading-tight">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#D9A441] font-semibold block">
                  Holistic Inner Transformation
                </span>
                <span className="font-serif text-xs text-white">
                  Path to Inner Peace Journal
                </span>
              </div>
            </div>

            {/* Center Column: A JOURNEY BACK TO YOU & MAINAK CHATTERJEE */}
            <div className="text-center leading-tight">
              <span className="text-[9.5px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] text-[#EED894] uppercase block">
                A JOURNEY BACK TO YOU
              </span>
              <span className="font-serif font-bold text-base sm:text-xl text-white tracking-[0.08em] uppercase block mt-0.5">
                MAINAK CHATTERJEE
              </span>
              <span className="text-[8.5px] sm:text-[10px] font-sans tracking-[0.18em] text-white/85 uppercase block mt-0.5">
                FOUNDER | PATH TO INNER PEACE
              </span>
            </div>

            {/* Right Column: Inner Peace Begins Within (Script) */}
            <div className="text-center sm:text-right leading-tight">
              <span className="font-script text-base sm:text-2xl text-[#EED894] block">
                Inner Peace
              </span>
              <span className="font-script text-base sm:text-2xl text-white block -mt-1 sm:-mt-2">
                Begins Within
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row: THE PROMINENT BEGIN MY JOURNEY BUTTON */}
        <div className="relative z-10 pt-3 sm:pt-4 flex flex-col items-center justify-center space-y-1.5 sm:space-y-2">
          <button
            type="button"
            onClick={handleBeginJourney}
            className="w-full max-w-md py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#D9A441] via-[#E5C578] to-[#D9A441] text-[#064A32] font-serif font-extrabold text-base sm:text-xl tracking-[0.14em] uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 sm:gap-3 border-2 border-white ring-4 ring-[#064A32]"
          >
            <span>
              {completedDaysCount > 0
                ? `CONTINUE MY JOURNEY (DAY ${Math.min(21, completedDaysCount + 1)})`
                : 'BEGIN MY JOURNEY'}
            </span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#064A32] stroke-[2.5]" />
          </button>

          <span className="text-[9.5px] sm:text-[11px] text-white/80 font-sans tracking-wider text-center">
            No registration required • 100% private & saved on your device
          </span>
        </div>
      </footer>
    </article>
  );
};
