import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { JOURNAL_24_SCREENS } from '../../utils/defaultData';
import { X, Check, RotateCcw, Download, Sparkles, BookOpen } from 'lucide-react';
import { Logo } from '../brand/Logo';

interface JournalMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReset: () => void;
}

export const JournalMenuDrawer: React.FC<JournalMenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenReset,
}) => {
  const {
    state,
    setScreen,
    completedDaysCount,
    overallProgress,
    exportJournalJson,
  } = useJournal();

  if (!isOpen) return null;

  const navigateTo = (screenNum: number) => {
    setScreen(screenNum);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fdfcf9] h-full shadow-2xl flex flex-col z-10 border-l border-[#d6e2d8] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#e5eee7] bg-[#f7f5ed] flex items-center justify-between">
          <Logo size="sm" showTagline={false} />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#075B3A] hover:bg-[#e8efe9] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Card */}
        <div className="p-4 bg-gradient-to-br from-[#064A32] to-[#075B3A] text-white mx-4 mt-4 rounded-2xl shadow-sm border border-[#D9A441]/40">
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-serif text-xs tracking-wider uppercase text-[#D9A441] font-bold">
              21-Day Journey Progress
            </span>
            <span className="font-sans font-bold text-lg text-[#ecd07a] tabular-nums">
              {overallProgress}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D9A441] to-[#ecd07a] rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-[#dbe5dd] mt-2 font-sans">
            <span>{completedDaysCount} of 21 Days Completed</span>
            <span className="text-[#ecd07a]">
              {completedDaysCount === 21 ? 'All Days Complete 🌿' : 'Step by step'}
            </span>
          </div>
        </div>

        {/* Scrollable List of Exactly 24 Screens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e6e18] block px-2 mb-1">
            24 Journal Screens Index
          </span>

          <div className="space-y-1">
            {JOURNAL_24_SCREENS.map((item) => {
              const isCurrent = state.currentScreen === item.screen;
              const isDay = item.type === 'day' && item.day;
              const isCompleted = isDay ? (state.completedDays || []).includes(item.day!) : false;

              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer min-h-[46px] select-none ${
                    isCurrent
                      ? 'bg-[#075B3A] text-white shadow-xs font-semibold'
                      : 'hover:bg-[#f1f6f2] text-[#1c382b]'
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 flex items-center justify-center w-6 h-6">
                    {isDay ? (
                      isCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-[#0e3b2e] text-[#D9A441] flex items-center justify-center text-xs font-bold border border-[#D9A441]">
                          ✓
                        </div>
                      ) : isCurrent ? (
                        <div className="w-4 h-4 rounded-full bg-[#D9A441] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-[#9cb2a3]" />
                      )
                    ) : item.type === 'cover' ? (
                      <span className="text-xs text-[#D9A441] font-serif font-bold">
                        ✦
                      </span>
                    ) : (
                      <span className="text-xs text-[#D9A441] font-serif font-bold">
                        {item.screen}
                      </span>
                    )}
                  </div>

                  {/* Title & Theme */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-xs font-serif font-bold uppercase tracking-wide truncate">
                        {item.title} — {item.themeTitle}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] truncate block ${
                        isCurrent ? 'text-[#ecd07a]' : 'text-[#627a6d]'
                      }`}
                    >
                      {item.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-[#e2ece3] bg-[#f8f6ee] flex items-center justify-between gap-2">
          <button
            onClick={exportJournalJson}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#075B3A] bg-white border border-[#cfddd1] rounded-xl hover:bg-[#eff5f0] transition-colors cursor-pointer min-h-[38px]"
            title="Download JSON backup of all reflections"
          >
            <Download className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenReset();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#962e2e] hover:bg-[#fdeeee] rounded-xl transition-colors cursor-pointer min-h-[38px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Journal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
