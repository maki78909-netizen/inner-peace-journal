import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { JournalHeader } from '../layout/JournalHeader';
import { JournalFooter } from '../layout/JournalFooter';
import { JournalSectionPanel } from '../common/JournalSectionPanel';
import { DailyPracticeTracker } from '../scorecard/DailyPracticeTracker';
import { RatingScale } from '../common/RatingScale';
import { RuledJournalTextarea } from '../common/RuledJournalTextarea';
import { Award, Compass, Heart, ArrowRight } from 'lucide-react';

export const ScorecardPage: React.FC<{ onOpenIndex?: () => void }> = ({ onOpenIndex }) => {
  const { state, updateScorecard, nextScreen, triggerConfetti } = useJournal();
  const scorecard = state.scorecard;

  const updateRating = (field: string, val: number) => {
    updateScorecard({
      ratings: {
        ...scorecard.ratings,
        [field]: val,
      },
    });
  };

  const updateTakeaway = (index: number, val: string) => {
    const next = [...(scorecard.biggestTakeaways || ['', '', '', '', ''])];
    next[index] = val;
    updateScorecard({ biggestTakeaways: next });
  };

  const updateProud = (index: number, val: string) => {
    const next = [...(scorecard.proudOf || ['', '', ''])];
    next[index] = val;
    updateScorecard({ proudOf: next });
  };

  const updateNextStep = (index: number, val: string) => {
    const next = [...(scorecard.nextSteps || ['', '', ''])];
    next[index] = val;
    updateScorecard({ nextSteps: next });
  };

  return (
    <article className="journal-sheet max-w-[840px] w-full min-h-[1100px] bg-white rounded-3xl mx-auto flex flex-col justify-between overflow-hidden relative shadow-xl border border-[#ebd89b]/60 my-2 sm:my-6">
      {/* Header */}
      <JournalHeader
        inspirationalQuote={'See Your Growth,\nHonor Your Steps'}
        onOpenIndex={onOpenIndex}
      />

      {/* Main Content Area */}
      <div className="flex-1 px-4 sm:px-8 py-3 space-y-4 sm:space-y-5">
        {/* Title Area */}
        <div className="text-center space-y-1.5 pt-2 pb-1 border-b border-[#ebd89b]/40">
          <span className="font-serif font-black tracking-[0.25em] text-[#D9A441] text-xs uppercase">
            SCREEN 22 • MILESTONE HARVEST
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#075B3A] uppercase tracking-wide leading-tight">
            FINAL 21-DAY TRANSFORMATION SCORECARD
          </h2>
          <p className="font-sans font-medium text-[10px] sm:text-xs text-[#526b5d] tracking-[0.2em] uppercase">
            REFLECT &nbsp;|&nbsp; CELEBRATE &nbsp;|&nbsp; SEE YOUR GROWTH &nbsp;|&nbsp; CONTINUE
          </p>
        </div>

        {/* Section 1: Daily Practice Tracker Grid */}
        <JournalSectionPanel
          number={1}
          title="My Daily Practice Tracker (Days 1–21)"
          instruction="Each cell cycles: ○ Not completed → ◐ Partial → ✓ Completed. Click any cell to update:"
        >
          <DailyPracticeTracker
            practiceGrid={scorecard.practiceGrid}
            onChange={(newGrid) => updateScorecard({ practiceGrid: newGrid })}
          />
        </JournalSectionPanel>

        {/* Section 2: My Transformation Assessment */}
        <JournalSectionPanel
          number={2}
          title="My Transformation Assessment (1–5 Scale)"
          instruction="Rate your current state (1 = Emerging / Gentle start, 5 = Deeply grounded):"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <RatingScale
              label="Stress Management"
              value={scorecard.ratings?.stressManagement || 0}
              onChange={(val) => updateRating('stressManagement', val)}
              max={5}
            />
            <RatingScale
              label="Mental Clarity"
              value={scorecard.ratings?.mentalClarity || 0}
              onChange={(val) => updateRating('mentalClarity', val)}
              max={5}
            />
            <RatingScale
              label="Emotional Balance"
              value={scorecard.ratings?.emotionalBalance || 0}
              onChange={(val) => updateRating('emotionalBalance', val)}
              max={5}
            />
            <RatingScale
              label="Self-Confidence"
              value={scorecard.ratings?.selfConfidence || 0}
              onChange={(val) => updateRating('selfConfidence', val)}
              max={5}
            />
            <RatingScale
              label="Focus & Productivity"
              value={scorecard.ratings?.focusProductivity || 0}
              onChange={(val) => updateRating('focusProductivity', val)}
              max={5}
            />
            <RatingScale
              label="Better Sleep"
              value={scorecard.ratings?.betterSleep || 0}
              onChange={(val) => updateRating('betterSleep', val)}
              max={5}
            />
            <RatingScale
              label="Self-Compassion"
              value={scorecard.ratings?.selfCompassion || 0}
              onChange={(val) => updateRating('selfCompassion', val)}
              max={5}
            />
            <RatingScale
              label="Overall Well-being"
              value={scorecard.ratings?.overallWellbeing || 0}
              onChange={(val) => updateRating('overallWellbeing', val)}
              max={5}
            />
          </div>
        </JournalSectionPanel>

        {/* Section 3: My Biggest Takeaways */}
        <JournalSectionPanel
          number={3}
          title="My Biggest Takeaways"
          instruction="Five core breakthroughs or shifts in mindset:"
        >
          <div className="space-y-1.5">
            {(scorecard.biggestTakeaways || ['', '', '', '', '']).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#eaf2ea] text-[#075B3A] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateTakeaway(idx, e.target.value)}
                  placeholder={`Takeaway ${idx + 1}...`}
                  className="w-full text-xs sm:text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                />
              </div>
            ))}
          </div>
        </JournalSectionPanel>

        {/* Section 4: What I Am Proud Of & Next Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <JournalSectionPanel
            number={4}
            title="What I Am Proud Of"
            instruction="Three moments of showing up:"
          >
            <div className="space-y-1.5">
              {(scorecard.proudOf || ['', '', '']).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#faf4df] text-[#8e6e18] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateProud(idx, e.target.value)}
                    placeholder={`Proud moment ${idx + 1}...`}
                    className="w-full text-xs font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel
            number={5}
            title="My Next Steps"
            instruction="Continuing your rhythm:"
          >
            <div className="space-y-1.5">
              {(scorecard.nextSteps || ['', '', '']).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#eaf2ea] text-[#075B3A] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateNextStep(idx, e.target.value)}
                    placeholder={`Next step ${idx + 1}...`}
                    className="w-full text-xs font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>
        </div>

        {/* Proceed Action */}
        <div className="pt-2 no-print">
          <button
            type="button"
            onClick={() => {
              triggerConfetti();
              nextScreen();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#075B3A] text-[#F8F5EA] font-serif font-bold text-base tracking-wider uppercase hover:bg-[#064A32] shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2 ring-1 ring-[#D9A441]"
          >
            <span>Proceed to Inner Peace Declaration →</span>
            <ArrowRight className="w-4 h-4 text-[#D9A441]" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <JournalFooter />
    </article>
  );
};
