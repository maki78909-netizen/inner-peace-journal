import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { Logo } from '../brand/Logo';
import { Globe, Mail, Phone, BookOpen, Award, FileText } from 'lucide-react';

interface BackCoverPageProps {
  onOpenIndex?: () => void;
}

export const BackCoverPage: React.FC<BackCoverPageProps> = ({ onOpenIndex }) => {
  const { setScreen } = useJournal();

  const benefits = [
    { title: 'A CALMER MIND', desc: 'Space to respond with presence rather than emotional reactivity' },
    { title: 'A HEALTHIER YOU', desc: 'Reduced somatic tension and a calm, restored nervous system' },
    { title: 'GREATER CLARITY', desc: 'Knowing your values, patterns, and what truly matters' },
    { title: 'STRONGER RESILIENCE', desc: 'The confidence to navigate life storms with self-compassion' },
    { title: 'A BRIGHTER TOMORROW', desc: 'Living with deliberate purpose, presence, and lasting peace' },
  ];

  return (
    <article className="journal-sheet max-w-[840px] w-full min-h-[1100px] bg-white rounded-3xl mx-auto flex flex-col justify-between overflow-hidden relative shadow-xl border border-[#ebd89b]/60 my-2 sm:my-6 text-center">
      {/* Top Emerald & Gold Arc Accent */}
      <div className="relative pt-8 sm:pt-12 px-6 flex flex-col items-center">
        <Logo size="lg" variant="seal" showTagline={false} />

        <div className="mt-4 space-y-1">
          <span className="font-serif font-black tracking-[0.25em] text-[#D9A441] text-xs uppercase block">
            21-DAY
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#075B3A] tracking-wider uppercase leading-none">
            INNER HEALING JOURNAL
          </h1>
          <p className="font-script text-xl sm:text-2xl text-[#8e6e18] mt-2">
            "A Journey to a Calmer Mind, A Brighter You"
          </p>
        </div>
      </div>

      {/* Center Body & 5 Benefit Badges */}
      <div className="px-4 sm:px-10 py-4 max-w-xl mx-auto space-y-5">
        <div className="p-4 rounded-2xl bg-[#faf6eb] border border-[#ebd89b]/60 space-y-2">
          <p className="text-sm sm:text-base text-[#1c382b] font-sans leading-relaxed">
            You have completed the <strong>21-Day Inner Healing Journal</strong>.
            <br />
            This is not the end, but the beginning of a more mindful, balanced and meaningful life.
          </p>
        </div>

        {/* Five Visual Benefit Elements */}
        <div className="space-y-2 text-left">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white border border-[#e4ded0] shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441]" />
                <span className="font-serif font-bold text-xs sm:text-sm text-[#075B3A] tracking-wider uppercase">
                  {b.title}
                </span>
              </div>
              <span className="text-[11px] text-[#526b5d] font-light hidden xs:inline">
                {b.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Serene Sunrise Mountain Artwork */}
        <div className="relative h-32 sm:h-36 w-full rounded-2xl overflow-hidden bg-gradient-to-t from-[#064A32] via-[#075B3A] to-[#F8F5EA] flex flex-col items-center justify-end p-4 shadow-inner">
          <div className="absolute top-3 w-16 h-16 rounded-full bg-[#ecd07a]/40 blur-xs" />
          <div className="absolute top-5 w-10 h-10 rounded-full bg-[#D9A441] shadow-md" />

          {/* Mountains */}
          <svg
            viewBox="0 0 500 120"
            preserveAspectRatio="none"
            className="w-full h-full absolute inset-0 text-[#053d29] opacity-80 pointer-events-none"
          >
            <path d="M0 120 L80 45 L160 85 L250 25 L340 80 L420 35 L500 120 Z" fill="currentColor" />
          </svg>
          <svg
            viewBox="0 0 500 120"
            preserveAspectRatio="none"
            className="w-full h-full absolute inset-0 text-[#075B3A] opacity-90 pointer-events-none"
          >
            <path d="M0 120 L120 65 L210 105 L300 50 L390 90 L500 60 L500 120 Z" fill="currentColor" />
          </svg>

          <p className="relative z-10 font-serif italic text-white text-base sm:text-lg drop-shadow-md">
            "Keep practicing. Keep growing. Your inner peace is always within you."
          </p>
        </div>

        {/* Quick Review Links */}
        <div className="grid grid-cols-3 gap-2 pt-2 no-print">
          <button
            type="button"
            onClick={onOpenIndex}
            className="p-2.5 rounded-xl border border-[#d6e0d7] bg-white text-xs font-semibold text-[#075B3A] hover:bg-[#eaf2ea] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Review Days</span>
          </button>
          <button
            type="button"
            onClick={() => setScreen(22)}
            className="p-2.5 rounded-xl border border-[#d6e0d7] bg-white text-xs font-semibold text-[#075B3A] hover:bg-[#eaf2ea] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Scorecard</span>
          </button>
          <button
            type="button"
            onClick={() => setScreen(23)}
            className="p-2.5 rounded-xl border border-[#d6e0d7] bg-white text-xs font-semibold text-[#075B3A] hover:bg-[#eaf2ea] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Declaration</span>
          </button>
        </div>
      </div>

      {/* Official Brand Contact Footer */}
      <footer className="w-full bg-[#064A32] text-[#F8F5EA] px-6 py-5 border-t border-[#D9A441]/50 space-y-2">
        <div className="font-serif font-bold text-sm tracking-[0.2em] text-[#D9A441] uppercase">
          PATH TO INNER PEACE
        </div>
        <div className="text-[10px] tracking-[0.25em] text-[#eaf2ea] uppercase">
          MIND • BALANCE • TRANSFORM
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#dbe5dd] pt-1">
          <a
            href="https://www.pathtoinnerpeace.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white"
          >
            <Globe className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>www.pathtoinnerpeace.in</span>
          </a>
          <a
            href="mailto:connect@pathtoinnerpeace.in"
            className="flex items-center gap-1 hover:text-white"
          >
            <Mail className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>connect@pathtoinnerpeace.in</span>
          </a>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>WhatsApp: 9163670300</span>
          </span>
        </div>
      </footer>
    </article>
  );
};
