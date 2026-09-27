import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SmallActionBoxProps {
  actionText: string;
  isDone: boolean;
  onToggle: () => void;
  title?: string;
  instruction?: string;
}

export const SmallActionBox: React.FC<SmallActionBoxProps> = ({
  actionText,
  isDone,
  onToggle,
  title = "Today's Small Action",
  instruction = 'A small, grounded practice to anchor today’s awareness:',
}) => {
  return (
    <div className="space-y-2">
      <span className="block text-xs font-serif font-bold text-[#075B3A] uppercase tracking-wider">
        {title}
      </span>
      {instruction && (
        <p className="text-xs text-[#526b5d] italic -mt-1">{instruction}</p>
      )}
      <div
        onClick={onToggle}
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-2xs select-none ${
          isDone
            ? 'bg-gradient-to-r from-[#eaf4ec] to-[#e1efe4] border-[#9fd5b1]'
            : 'bg-gradient-to-r from-[#faf6eb] to-[#f4eee0] border-[#ebd89b] hover:border-[#D9A441]'
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label="Mark small action done"
            className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
              isDone
                ? 'bg-[#075B3A] border-[#075B3A] text-[#D9A441] shadow-2xs'
                : 'border-[#8da595] bg-white hover:border-[#075B3A]'
            }`}
          >
            {isDone && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
          </button>
          <div>
            <p
              className={`font-serif text-sm font-semibold transition-colors ${
                isDone ? 'text-[#075B3A] line-through decoration-[#075B3A]/40' : 'text-[#075B3A]'
              }`}
            >
              {actionText}
            </p>
            <span className="text-[11px] font-sans text-[#786127]">
              {isDone ? '✓ Completed! Honor your commitment.' : 'Check the box once completed today'}
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-1.5">
          <span
            className={`text-xs font-serif font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all ${
              isDone
                ? 'bg-[#075B3A] text-[#EED894] shadow-xs'
                : 'bg-white/80 text-[#8e6e18] border border-[#ebd89b]'
            }`}
          >
            {isDone ? '✓ Done!' : '☐ Done!'}
          </span>
        </div>
      </div>
    </div>
  );
};
