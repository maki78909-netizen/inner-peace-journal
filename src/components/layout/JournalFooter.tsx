import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Lock,
  AlertCircle,
  X,
  Check,
} from 'lucide-react';

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
  const {
    state,
    nextScreen,
    prevScreen,
    totalScreens,
    setScreen,
    resetDayFields,
    resetJournal,
    isDayValid,
    validationError,
    clearValidationError,
  } = useJournal();

  const screen = state.currentScreen;
  const isDayScreen = screen >= 1 && screen <= 21;

  // Day validation check
  const dayValidation = isDayScreen ? isDayValid(screen) : { isComplete: true, missingCount: 0, missingFields: [] };

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);

  const handlePrev = onPrev || prevScreen;

  const handleNextClick = () => {
    if (onNext) {
      onNext();
      return;
    }
    nextScreen();
  };

  const handleConfirmResetDay = () => {
    if (isDayScreen) {
      resetDayFields(screen);
      setResetFeedback(`Day ${screen} fields cleared. You can now rewrite your answers.`);
    } else {
      resetJournal();
      setResetFeedback('Journal reset successfully.');
    }
    setTimeout(() => {
      setResetFeedback(null);
      setIsResetModalOpen(false);
    }, 1200);
  };

  const handleConfirmResetAll = () => {
    resetJournal();
    setResetFeedback('Entire journal reset. All fields are now blank.');
    setTimeout(() => {
      setResetFeedback(null);
      setIsResetModalOpen(false);
    }, 1200);
  };

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
      {/* Validation Alert Banner if user attempted to proceed with incomplete fields */}
      {validationError && validationError.screen === screen && (
        <div className="bg-[#fff8ea] border-t-2 border-b-2 border-[#D9A441] px-4 py-3 sm:px-8 animate-in fade-in slide-in-from-top duration-300">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#D9A441]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-3.5 h-3.5 text-[#064A32]" />
              </div>
              <div>
                <span className="font-serif font-bold text-xs sm:text-sm text-[#064A32] block">
                  Please complete all fields for Day {screen} to unlock Day {screen + 1}
                </span>
                <span className="text-[11px] text-[#7a5912] font-sans block mt-0.5">
                  Remaining ({validationError.missingFields.length}):{' '}
                  {validationError.missingFields.slice(0, 3).join(', ')}
                  {validationError.missingFields.length > 3 ? ' and more...' : ''}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={clearValidationError}
              className="self-end sm:self-center px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#064A32] hover:bg-[#D9A441]/20 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Integrated Back / Reset / Next Navigation Row */}
      {showNavButtons && (
        <div className="px-3 sm:px-8 py-3 bg-[#FAF8F3] border-t border-[#ebd89b]/50 flex flex-wrap items-center justify-between gap-2 no-print">
          {/* Left: Back Button */}
          {screen >= 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-[#064A32] font-serif font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-[#eaf2ea] transition-all cursor-pointer min-h-[42px] border border-[#064A32]/25 shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4 text-[#C59B27]" />
              <span>{getPrevLabel()}</span>
            </button>
          ) : (
            <div className="w-12 sm:w-16" />
          )}

          {/* Center: Screen indicator & Reset Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-serif font-bold text-[#C59B27] tracking-widest uppercase hidden xs:inline">
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

            {/* RESET OPTION BUTTON (allows rewriting all fields) */}
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              title="Reset fields to rewrite your answers"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-serif font-semibold text-[#7e5513] hover:text-[#962e2e] bg-[#fbf5e6] hover:bg-[#fdeeee] border border-[#D9A441]/40 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{isDayScreen ? `Reset Day ${screen}` : 'Reset Fields'}</span>
            </button>
          </div>

          {/* Right: Next Button with Completion Verification */}
          {screen < totalScreens ? (
            <button
              type="button"
              onClick={handleNextClick}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-serif font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer min-h-[42px] shadow-sm ${
                isDayScreen && !dayValidation.isComplete
                  ? 'bg-[#064A32]/90 text-[#F8F5EA] hover:bg-[#064A32] ring-2 ring-[#D9A441]/70'
                  : 'bg-[#064A32] text-[#F8F5EA] hover:bg-[#043322] ring-2 ring-[#C59B27] hover:shadow'
              }`}
            >
              {isDayScreen && !dayValidation.isComplete && (
                <Lock className="w-3.5 h-3.5 text-[#D9A441]" />
              )}
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

      {/* RESET CONFIRMATION MODAL */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#D9A441]/50 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebd89b]/40 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#fbecec] text-[#962e2e] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#064A32]">
                  {isDayScreen ? `Reset Day ${screen} Fields` : 'Reset Journal Fields'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {resetFeedback ? (
              <div className="p-4 rounded-2xl bg-[#eaf4ec] text-[#064A32] text-sm font-semibold flex items-center gap-2 border border-[#a8dcb9]">
                <Check className="w-5 h-5 text-[#2e7d32]" />
                <span>{resetFeedback}</span>
              </div>
            ) : (
              <>
                <p className="text-xs sm:text-sm text-[#415e50] font-sans leading-relaxed">
                  {isDayScreen
                    ? `This will clear all answered questions and prompts for Day ${screen}, leaving them completely blank and rewritable.`
                    : 'Choose how you would like to reset your journal fields:'}
                </p>

                <div className="space-y-2.5 pt-2">
                  {isDayScreen && (
                    <button
                      type="button"
                      onClick={handleConfirmResetDay}
                      className="w-full py-3 px-4 rounded-xl bg-[#064A32] hover:bg-[#043322] text-[#F8F5EA] font-serif font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      <RotateCcw className="w-4 h-4 text-[#D9A441]" />
                      <span>Reset Day {screen} (Make Rewritable)</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleConfirmResetAll}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#fdeeee] text-[#962e2e] border border-[#f5c2c2] font-serif font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Reset Entire Journal (All 21 Days)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="w-full py-2.5 px-4 text-xs font-sans text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
