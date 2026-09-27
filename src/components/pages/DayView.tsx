import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { JournalHeader } from '../layout/JournalHeader';
import { DayTitleBanner } from '../layout/DayTitleBanner';
import { JournalFooter } from '../layout/JournalFooter';
import { JournalSectionPanel } from '../common/JournalSectionPanel';
import { RuledJournalTextarea } from '../common/RuledJournalTextarea';
import { MoodSelector } from '../common/MoodSelector';
import { RatingScale } from '../common/RatingScale';
import { ChoiceSelector } from '../common/ChoiceSelector';
import { CheckCircle2, ArrowRight, ShieldAlert, Heart, Sun, Mountain, Sparkles } from 'lucide-react';
import { JOURNAL_24_SCREENS } from '../../utils/defaultData';

interface DayViewProps {
  dayNum: number;
  onOpenIndex?: () => void;
}

export const DayView: React.FC<DayViewProps> = ({ dayNum, onOpenIndex }) => {
  const { state, updateDayData, completeDay, nextScreen, isDayValid } = useJournal();
  const day = state.days[dayNum] || {};
  const isCompleted = (state.completedDays || []).includes(dayNum);
  const validation = isDayValid(dayNum);

  const screenMeta = JOURNAL_24_SCREENS.find((s) => s.day === dayNum) || JOURNAL_24_SCREENS[dayNum - 1];

  const update = (partial: any) => {
    updateDayData(dayNum, partial);
  };

  const handleComplete = () => {
    const success = completeDay(dayNum);
    if (success) {
      nextScreen();
    }
  };

  return (
    <article className="journal-sheet max-w-[840px] w-full min-h-[1100px] bg-white rounded-3xl mx-auto flex flex-col justify-between overflow-hidden relative shadow-xl border border-[#ebd89b]/60 my-2 sm:my-6">
      {/* 1. Header (Logo, 21-Day, Subtitle, Top-Right Botanical Art) */}
      <JournalHeader
        inspirationalQuote={screenMeta.inspirationalQuote}
        onOpenIndex={onOpenIndex}
      />

      {/* 2. Main Sheet Content Area */}
      <div className="flex-1 px-4 sm:px-8 py-3 space-y-4 sm:space-y-5">
        {/* Brush-Stroke Style Day Title Area */}
        <DayTitleBanner
          dayNum={dayNum}
          themeTitle={screenMeta.themeTitle}
          subtitle={screenMeta.subtitle}
        />

        {/* Day Completion Banner (if marked completed) */}
        {isCompleted && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eaf4ec] border border-[#9fd5b1] flex flex-col xs:flex-row items-center justify-between gap-3 text-center xs:text-left shadow-2xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#075B3A] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-[#D9A441]" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-[#075B3A] block">
                  DAY {dayNum} COMPLETE 🌿
                </span>
                <span className="text-xs text-[#3a684f] font-sans">
                  You showed up for yourself today. All exercises are saved.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={nextScreen}
              className="px-3.5 py-1.5 rounded-xl bg-[#075B3A] text-[#F8F5EA] text-xs font-serif font-bold tracking-wider uppercase hover:bg-[#064A32] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>Next Day</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9A441]" />
            </button>
          </div>
        )}

        {/* Dynamic Day Worksheet Sections */}
        {renderWorksheetSections(dayNum, day, update)}

        {/* Validation Status Notification */}
        {!isCompleted && !validation.isComplete && (
          <div className="p-3 rounded-xl bg-[#fff8eb] border border-[#e8c676] text-xs text-[#735315] font-sans flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-[#064A32]">
                Please complete all exercises on Day {dayNum} ({validation.missingCount} remaining):
              </span>
              <span className="text-[11px] text-[#7a5912]">
                {validation.missingFields.join(' • ')}
              </span>
            </div>
          </div>
        )}

        {/* Bottom Action: Complete Day Button */}
        <div className="pt-2 no-print">
          <button
            type="button"
            onClick={handleComplete}
            className={`w-full py-3.5 px-6 rounded-2xl font-serif font-bold text-base tracking-wider uppercase transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 select-none ${
              isCompleted
                ? 'bg-[#075B3A] text-[#F8F5EA] border border-[#D9A441]'
                : !validation.isComplete
                ? 'bg-[#064A32]/90 text-[#F8F5EA] hover:bg-[#064A32] ring-2 ring-[#D9A441]/50'
                : 'bg-gradient-to-r from-[#064A32] to-[#075B3A] text-[#F8F5EA] hover:from-[#053d29] hover:to-[#064A32] ring-2 ring-[#D9A441]'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-[#D9A441]" />
            <span>
              {isCompleted
                ? `✓ Day ${dayNum} Marked Complete`
                : !validation.isComplete
                ? `[ Complete All Fields to Unlock Day ${dayNum + 1} ]`
                : `[ ✓ COMPLETE DAY ${dayNum} ]`}
            </span>
          </button>
        </div>
      </div>

      {/* 3. Master Emerald Footer (with curved gold arc & script phrase) */}
      <JournalFooter />
    </article>
  );
};

// Render worksheet sections for each day
function renderWorksheetSections(dayNum: number, day: any, update: (p: any) => void) {
  switch (dayNum) {
    // -------------------------------------------------------------
    // DAY 20 — MASTER VISUAL REFERENCE (Self-Compassion and Inner Acceptance)
    // -------------------------------------------------------------
    case 20: {
      const kinder = day.kinderAreas || ['', '', '', '', ''];
      const updateKinder = (idx: number, val: string) => {
        const next = [...kinder];
        next[idx] = val;
        update({ kinderAreas: next });
      };

      return (
        <div className="space-y-4">
          {/* Section 1: Today's Emotional Check-In */}
          <JournalSectionPanel
            number={1}
            title="Today's Emotional Check-In"
            instruction="Select the emotional state that best describes your inner weather right now:"
          >
            <MoodSelector
              selectedMood={day.mood || ''}
              onChange={(mood) => update({ mood })}
            />
          </JournalSectionPanel>

          {/* Section 2: Areas Where I Can Be Kinder to Myself */}
          <JournalSectionPanel
            number={2}
            title="Areas Where I Can Be Kinder to Myself"
            instruction="Name specific places where you have been overly harsh (body, career, parenting, pacing):"
          >
            <div className="space-y-2">
              {kinder.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#eaf2ea] text-[#075B3A] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateKinder(idx, e.target.value)}
                    placeholder={`Area ${idx + 1}...`}
                    className="w-full text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 px-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          {/* Section 3: My Self-Compassion Practice */}
          <JournalSectionPanel
            number={3}
            title="My Self-Compassion Practice"
            instruction="What gentle ritual, boundary, or supportive gesture will you offer yourself today?"
          >
            <RuledJournalTextarea
              value={day.compassionPractice || ''}
              onChange={(val) => update({ compassionPractice: val })}
              placeholder="e.g. Taking a warm bath, resting without guilt, speaking softly to myself..."
              rows={2}
            />
          </JournalSectionPanel>

          {/* Section 4: Releasing Self-Criticism */}
          <JournalSectionPanel
            number={4}
            title="Releasing Self-Criticism"
            instruction="Identify one harsh thought and deliberately write its compassionate, loving counterpart:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#8a3333] uppercase">
                  Harsh Internal Thought:
                </span>
                <RuledJournalTextarea
                  value={day.negativeThought || ''}
                  onChange={(val) => update({ negativeThought: val })}
                  placeholder="e.g. 'I am falling behind everyone else'..."
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A] uppercase">
                  Kinder, Balanced Perspective:
                </span>
                <RuledJournalTextarea
                  value={day.kinderThought || ''}
                  onChange={(val) => update({ kinderThought: val })}
                  placeholder="e.g. 'I am on my own sacred timeline. I am doing enough'..."
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          {/* Section 5: Today's Small Action */}
          <JournalSectionPanel
            number={5}
            title="Today's Small Action"
            instruction="One micro-action of self-kindness you can complete before tonight:"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update({ smallActionDone: !day.smallActionDone })}
                className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 cursor-pointer ${
                  day.smallActionDone
                    ? 'bg-[#075B3A] border-[#075B3A] text-[#D9A441]'
                    : 'border-[#8da595] bg-white'
                }`}
              >
                {day.smallActionDone && <CheckCircle2 className="w-4 h-4" />}
              </button>
              <input
                type="text"
                value={day.smallAction || ''}
                onChange={(e) => update({ smallAction: e.target.value })}
                placeholder="Write your small action here..."
                className="w-full text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
              />
            </div>
          </JournalSectionPanel>

          {/* Section 6: Today's Affirmation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#faf6eb] via-[#f7f2e4] to-[#faf6eb] border border-[#ebd89b] text-center space-y-1 shadow-2xs">
            <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#8e6e18] uppercase">
              Section 6 • Today's Affirmation
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#075B3A] font-semibold">
              "I am enough. I am worthy of love, kindness and acceptance — especially from myself."
            </p>
          </div>

          {/* Section 7: What I Discovered Today */}
          <JournalSectionPanel
            number={7}
            title="What I Discovered Today"
            instruction="Reflect on your emotions, resistance, or peace as you practiced self-compassion:"
          >
            <RuledJournalTextarea
              value={day.discoveredToday || ''}
              onChange={(val) => update({ discoveredToday: val })}
              placeholder="Writing on these lines, I realized that..."
              rows={3}
            />
          </JournalSectionPanel>
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 21 — MASTER VISUAL REFERENCE (Integration and a Brighter Tomorrow)
    // -------------------------------------------------------------
    case 21: {
      const takeaways = day.keyTakeaways || ['', '', '', '', ''];
      const updateTakeaway = (idx: number, val: string) => {
        const next = [...takeaways];
        next[idx] = val;
        update({ keyTakeaways: next });
      };

      const commitments = day.commitmentGoingForward || ['', '', ''];
      const updateCommitment = (idx: number, val: string) => {
        const next = [...commitments];
        next[idx] = val;
        update({ commitmentGoingForward: next });
      };

      return (
        <div className="space-y-4">
          {/* Section 1: My 21-Day Journey Reflection */}
          <JournalSectionPanel
            number={1}
            title="My 21-Day Journey Reflection"
            instruction="Looking back at who you were on Day 1 compared to who you are today:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A]">
                  Positive Changes I Notice:
                </span>
                <RuledJournalTextarea
                  value={day.positiveChanges || ''}
                  onChange={(val) => update({ positiveChanges: val })}
                  placeholder="In my sleep, reactions, clarity..."
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A]">
                  Challenges I Overcame:
                </span>
                <RuledJournalTextarea
                  value={day.challengesOvercome || ''}
                  onChange={(val) => update({ challengesOvercome: val })}
                  placeholder="Old triggers, self-doubt..."
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          {/* Section 2: My Key Takeaways */}
          <JournalSectionPanel
            number={2}
            title="My Key Takeaways"
            instruction="Five core truths you are taking forward from this 21-day practice:"
          >
            <div className="space-y-1.5">
              {takeaways.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#eaf2ea] text-[#075B3A] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateTakeaway(idx, e.target.value)}
                    placeholder={`Takeaway ${idx + 1}...`}
                    className="w-full text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          {/* Section 3: My Commitment Going Forward */}
          <JournalSectionPanel
            number={3}
            title="My Commitment Going Forward"
            instruction="Three daily or weekly commitments to sustain your inner equilibrium:"
          >
            <div className="space-y-1.5">
              {commitments.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#faf4df] text-[#8e6e18] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateCommitment(idx, e.target.value)}
                    placeholder={`Commitment ${idx + 1}...`}
                    className="w-full text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          {/* Section 4: A Letter to My Future Self */}
          <JournalSectionPanel
            number={4}
            title="A Letter to My Future Self"
            instruction="Write a message to read 3 months from now, reminding yourself of your strength and peace:"
          >
            <RuledJournalTextarea
              value={day.letterToFutureSelf || ''}
              onChange={(val) => update({ letterToFutureSelf: val })}
              placeholder="Dear Future Me, remember how peaceful you felt when..."
              rows={4}
            />
          </JournalSectionPanel>

          {/* Section 5: Today's Affirmation */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#faf6eb] via-[#f7f2e4] to-[#faf6eb] border border-[#ebd89b] text-center space-y-1 shadow-2xs">
            <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#8e6e18] uppercase">
              Section 5 • Today's Affirmation
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#075B3A] font-semibold">
              "I am proud of my progress. I choose to continue this journey."
            </p>
          </div>

          {/* Section 6: My Vision Ahead + Sunrise Mountain Illustration Artwork */}
          <JournalSectionPanel
            number={6}
            title="My Vision Ahead"
            instruction="Describe the life you will continue to build from this place of grounded inner peace:"
          >
            <RuledJournalTextarea
              value={day.visionAhead || ''}
              onChange={(val) => update({ visionAhead: val })}
              placeholder="My vision for the coming months is..."
              rows={3}
            />

            {/* Sunrise Mountain Artwork Composition per reference */}
            <div className="mt-3 relative h-24 sm:h-28 w-full rounded-xl overflow-hidden bg-gradient-to-t from-[#075B3A] via-[#1b6b4e] to-[#F8F5EA] flex items-end justify-center p-3 select-none">
              {/* Radiating sun rays */}
              <div className="absolute top-2 w-16 h-16 rounded-full bg-[#ecd07a]/40 blur-xs" />
              <div className="absolute top-4 w-10 h-10 rounded-full bg-[#D9A441] shadow-md" />

              {/* Serene Mountain Silhouettes */}
              <svg
                viewBox="0 0 500 120"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 text-[#064A32] opacity-80"
              >
                <path d="M0 120 L80 50 L150 90 L250 30 L350 85 L420 40 L500 120 Z" fill="currentColor" />
              </svg>
              <svg
                viewBox="0 0 500 120"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 text-[#075B3A] opacity-90"
              >
                <path d="M0 120 L120 70 L210 110 L300 55 L390 95 L500 65 L500 120 Z" fill="currentColor" />
              </svg>

              <span className="relative z-10 font-script text-white text-base sm:text-lg drop-shadow-md">
                "A Brighter Tomorrow Awaits"
              </span>
            </div>
          </JournalSectionPanel>
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 1 TO DAY 19 WORKSHEET PAGES
    // -------------------------------------------------------------
    case 1:
      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title="Today's Emotional Check-In"
            instruction="Select how you feel in this moment:"
          >
            <MoodSelector
              selectedMood={day.mood || ''}
              onChange={(mood) => update({ mood })}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={2}
            title="How am I genuinely feeling today?"
            instruction="Beyond 'busy' or 'fine'—what is your uncensored emotional state?"
          >
            <RuledJournalTextarea
              value={day.feelingToday || ''}
              onChange={(feelingToday) => update({ feelingToday })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={3}
            title="What has been occupying my mind lately?"
            instruction="Notice the recurring thoughts, loops, or worries:"
          >
            <RuledJournalTextarea
              value={day.occupyingMind || ''}
              onChange={(occupyingMind) => update({ occupyingMind })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={4}
            title="What part of my life feels most unsettled?"
            instruction="Work, relationships, physical health, or inner peace?"
          >
            <RuledJournalTextarea
              value={day.unsettledPart || ''}
              onChange={(unsettledPart) => update({ unsettledPart })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={5}
            title="What do I wish someone would understand about me?"
            instruction="A truth you rarely speak out loud:"
          >
            <RuledJournalTextarea
              value={day.wishUnderstood || ''}
              onChange={(wishUnderstood) => update({ wishUnderstood })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={6}
            title='Complete: "If I were completely honest with myself, I would admit..."'
          >
            <RuledJournalTextarea
              value={day.honestAdmit || ''}
              onChange={(honestAdmit) => update({ honestAdmit })}
              rows={2}
            />
          </JournalSectionPanel>

          <div className="p-4 rounded-2xl bg-[#faf6eb] border border-[#ebd89b] text-center space-y-1">
            <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#8e6e18] uppercase">
              Affirmation
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#075B3A] font-semibold">
              "I am willing to see myself honestly, without judgment."
            </p>
          </div>
        </div>
      );

    case 2:
      const tRows = day.triggerRows || [
        { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
        { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
        { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
      ];
      const updateTrigger = (idx: number, field: string, val: string) => {
        const next = [...tRows];
        next[idx] = { ...next[idx], [field]: val };
        update({ triggerRows: next });
      };

      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title="Identify 3 Emotional Triggers"
            instruction="Reflect on situations that caused emotional spikes:"
          >
            <div className="space-y-3">
              {tRows.map((r: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#075B3A]">
                    <span className="w-4 h-4 rounded-full bg-[#075B3A] text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>TRIGGER SCENARIO {idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Trigger: What occurred?"
                    value={r.trigger || ''}
                    onChange={(e) => updateTrigger(idx, 'trigger', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Emotion felt..."
                      value={r.emotion || ''}
                      onChange={(e) => updateTrigger(idx, 'emotion', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                    />
                    <input
                      type="text"
                      placeholder="Thought that appeared..."
                      value={r.thought || ''}
                      onChange={(e) => updateTrigger(idx, 'thought', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                    />
                    <input
                      type="text"
                      placeholder="How I reacted..."
                      value={r.reaction || ''}
                      onChange={(e) => updateTrigger(idx, 'reaction', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel
            number={2}
            title="Today's Reflection"
            instruction="What common theme connects these triggers?"
          >
            <RuledJournalTextarea
              value={day.reflection || ''}
              onChange={(reflection) => update({ reflection })}
              rows={3}
            />
          </JournalSectionPanel>
        </div>
      );

    case 3:
      const beliefs = day.beliefs || [
        { recurringThought: '', classification: '', balancedPerspective: '' },
        { recurringThought: '', classification: '', balancedPerspective: '' },
        { recurringThought: '', classification: '', balancedPerspective: '' },
        { recurringThought: '', classification: '', balancedPerspective: '' },
        { recurringThought: '', classification: '', balancedPerspective: '' },
      ];
      const updateBelief = (idx: number, field: string, val: string) => {
        const next = [...beliefs];
        next[idx] = { ...next[idx], [field]: val };
        update({ beliefs: next });
      };

      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title="5 Belief / Reflection Rows"
            instruction="Is your recurring thought Fact, Interpretation, or Fear? Provide a balanced view:"
          >
            <div className="space-y-3">
              {beliefs.map((b: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-[#075B3A]">
                      Thought {idx + 1}
                    </span>
                    <ChoiceSelector
                      options={['Fact', 'Interpretation', 'Fear']}
                      value={b.classification || ''}
                      onChange={(val) => updateBelief(idx, 'classification', val)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="My recurring thought..."
                    value={b.recurringThought || ''}
                    onChange={(e) => updateBelief(idx, 'recurringThought', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                  <input
                    type="text"
                    placeholder="A more balanced perspective..."
                    value={b.balancedPerspective || ''}
                    onChange={(e) => updateBelief(idx, 'balancedPerspective', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>
        </div>
      );

    case 4:
      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title="When I make a mistake, I usually tell myself:"
          >
            <RuledJournalTextarea
              value={day.mistakeSelfTalk || ''}
              onChange={(mistakeSelfTalk) => update({ mistakeSelfTalk })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={2}
            title="Where might I have learned this style of self-talk?"
          >
            <RuledJournalTextarea
              value={day.learnedSelfTalk || ''}
              onChange={(learnedSelfTalk) => update({ learnedSelfTalk })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={3}
            title="Would I speak this way to someone I love?"
          >
            <ChoiceSelector
              options={['Yes', 'No', 'Sometimes']}
              value={day.speakToLovedOne || ''}
              onChange={(speakToLovedOne) => update({ speakToLovedOne })}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={4}
            title="What would a compassionate but honest response sound like?"
          >
            <RuledJournalTextarea
              value={day.compassionateResponse || ''}
              onChange={(compassionateResponse) => update({ compassionateResponse })}
              rows={3}
            />
          </JournalSectionPanel>
        </div>
      );

    case 5:
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="An emotion I don't like expressing is:">
            <input
              type="text"
              value={day.suppressedEmotion || ''}
              onChange={(e) => update({ suppressedEmotion: e.target.value })}
              placeholder="e.g. Anger, grief, vulnerability..."
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title="Why do I avoid it?">
            <RuledJournalTextarea
              value={day.whyAvoid || ''}
              onChange={(whyAvoid) => update({ whyAvoid })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title="What am I afraid will happen if I express it?">
            <RuledJournalTextarea
              value={day.fearOfExpressing || ''}
              onChange={(fearOfExpressing) => update({ fearOfExpressing })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="Where do I feel it physically?">
            <input
              type="text"
              value={day.physicalLocation || ''}
              onChange={(e) => update({ physicalLocation: e.target.value })}
              placeholder="e.g. Chest tightness, throat knot..."
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="What might this emotion need from me?">
            <RuledJournalTextarea
              value={day.emotionNeeds || ''}
              onChange={(emotionNeeds) => update({ emotionNeeds })}
              rows={2}
            />
          </JournalSectionPanel>
        </div>
      );

    case 6:
      return (
        <div className="space-y-4">
          <div className="p-3 bg-[#faf6eb] border border-[#ebd89b] rounded-xl flex items-center gap-2 text-xs text-[#755f19]">
            <ShieldAlert className="w-4 h-4 text-[#D9A441] shrink-0" />
            <span>
              <strong>Safety note:</strong> Only reflect on experiences that feel emotionally safe to revisit. You do not need to relive trauma.
            </span>
          </div>

          <JournalSectionPanel number={1} title="What happened?">
            <RuledJournalTextarea
              value={day.whatHappened || ''}
              onChange={(whatHappened) => update({ whatHappened })}
              rows={3}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title="What did I feel then?">
            <RuledJournalTextarea
              value={day.feltThen || ''}
              onChange={(feltThen) => update({ feltThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title="What did I need at that time?">
            <RuledJournalTextarea
              value={day.neededThen || ''}
              onChange={(neededThen) => update({ neededThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="What do I understand differently today?">
            <RuledJournalTextarea
              value={day.understandToday || ''}
              onChange={(understandToday) => update({ understandToday })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="What can I give myself now?">
            <RuledJournalTextarea
              value={day.giveMyselfNow || ''}
              onChange={(giveMyselfNow) => update({ giveMyselfNow })}
              rows={2}
            />
          </JournalSectionPanel>
        </div>
      );

    case 7:
      const ratings = day.ratings || {
        emotionalAwareness: 0,
        selfUnderstanding: 0,
        selfCompassion: 0,
        mentalClarity: 0,
        emotionalBalance: 0,
      };
      const updateRating = (field: string, val: number) => {
        update({ ratings: { ...ratings, [field]: val } });
      };

      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title="Week 1 Inner State Ratings (1–10 Scale)"
            instruction="Rate your self-awareness across 5 core dimensions:"
          >
            <div className="space-y-3">
              <RatingScale
                label="Emotional Awareness"
                value={ratings.emotionalAwareness || 0}
                onChange={(val) => updateRating('emotionalAwareness', val)}
                max={10}
              />
              <RatingScale
                label="Self-Understanding"
                value={ratings.selfUnderstanding || 0}
                onChange={(val) => updateRating('selfUnderstanding', val)}
                max={10}
              />
              <RatingScale
                label="Self-Compassion"
                value={ratings.selfCompassion || 0}
                onChange={(val) => updateRating('selfCompassion', val)}
                max={10}
              />
              <RatingScale
                label="Mental Clarity"
                value={ratings.mentalClarity || 0}
                onChange={(val) => updateRating('mentalClarity', val)}
                max={10}
              />
              <RatingScale
                label="Emotional Balance"
                value={ratings.emotionalBalance || 0}
                onChange={(val) => updateRating('emotionalBalance', val)}
                max={10}
              />
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title='"This week I discovered..."'>
            <RuledJournalTextarea
              value={day.discoveredThisWeek || ''}
              onChange={(discoveredThisWeek) => update({ discoveredThisWeek })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title="What pattern have I noticed about myself?">
            <RuledJournalTextarea
              value={day.patternNoticed || ''}
              onChange={(patternNoticed) => update({ patternNoticed })}
              rows={2}
            />
          </JournalSectionPanel>
        </div>
      );

    case 8:
      return (
        <div className="space-y-4">
          <JournalSectionPanel
            number={1}
            title='"Dear younger me..."'
            instruction="Write with unconditional tenderness to your younger self:"
          >
            <RuledJournalTextarea
              value={day.letterToYoungerMe || ''}
              onChange={(letterToYoungerMe) => update({ letterToYoungerMe })}
              placeholder="Dear younger me, I want you to know..."
              rows={4}
            />
          </JournalSectionPanel>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <JournalSectionPanel number={2} title="What do I understand now?">
              <RuledJournalTextarea
                value={day.whatIUnderstandNow || ''}
                onChange={(whatIUnderstandNow) => update({ whatIUnderstandNow })}
                rows={2}
              />
            </JournalSectionPanel>

            <JournalSectionPanel number={3} title="What wasn't my fault?">
              <RuledJournalTextarea
                value={day.whatWasntMyFault || ''}
                onChange={(whatWasntMyFault) => update({ whatWasntMyFault })}
                rows={2}
              />
            </JournalSectionPanel>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <JournalSectionPanel number={4} title="What do I appreciate about myself?">
              <RuledJournalTextarea
                value={day.whatIAppreciate || ''}
                onChange={(whatIAppreciate) => update({ whatIAppreciate })}
                rows={2}
              />
            </JournalSectionPanel>

            <JournalSectionPanel number={5} title="What do I wish I had heard?">
              <RuledJournalTextarea
                value={day.whatIWishIHear || ''}
                onChange={(whatIWishIHear) => update({ whatIWishIHear })}
                rows={2}
              />
            </JournalSectionPanel>
          </div>
        </div>
      );

    case 9:
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title='"I still blame myself for..."'>
            <RuledJournalTextarea
              value={day.blameMyselfFor || ''}
              onChange={(blameMyselfFor) => update({ blameMyselfFor })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title={'"What I know now that I didn\'t know then is..."'}>
            <RuledJournalTextarea
              value={day.knowNowNotThen || ''}
              onChange={(knowNowNotThen) => update({ knowNowNotThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title='"What can I learn rather than punish myself for?"'>
            <RuledJournalTextarea
              value={day.learnNotPunish || ''}
              onChange={(learnNotPunish) => update({ learnNotPunish })}
              rows={2}
            />
          </JournalSectionPanel>

          <div
            onClick={() => update({ statementAgreed: !day.statementAgreed })}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
              day.statementAgreed
                ? 'bg-[#eaf4ec] border-[#9fd5b1]'
                : 'bg-white border-[#d8e2d8]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                day.statementAgreed
                  ? 'bg-[#075B3A] border-[#075B3A] text-[#D9A441]'
                  : 'border-[#8da595] bg-white'
              }`}
            >
              {day.statementAgreed && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <span className="font-serif italic font-bold text-sm sm:text-base text-[#075B3A]">
              "I choose to learn from this rather than punish myself."
            </span>
          </div>
        </div>
      );

    case 10:
      const can = day.canControl || {};
      const cannot = day.cannotControl || {};
      const toggleCan = (k: string) => update({ canControl: { ...can, [k]: !can[k] } });
      const toggleCannot = (k: string) => update({ cannotControl: { ...cannot, [k]: !cannot[k] } });

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white border border-[#bfe0c7] rounded-2xl space-y-2">
              <span className="font-serif font-bold text-xs text-[#075B3A] uppercase tracking-wider block border-b border-[#e3f0e6] pb-1">
                🌿 I Can Control:
              </span>
              {[
                { k: 'response', l: 'My response' },
                { k: 'attention', l: 'My attention' },
                { k: 'actions', l: 'My actions' },
                { k: 'habits', l: 'My habits' },
                { k: 'boundaries', l: 'My boundaries' },
                { k: 'choices', l: 'My choices' },
              ].map((i) => (
                <label key={i.k} onClick={() => toggleCan(i.k)} className="flex items-center gap-2 text-xs font-medium text-[#1c382b] cursor-pointer">
                  <input type="checkbox" checked={!!can[i.k]} onChange={() => {}} className="accent-[#075B3A] rounded" />
                  <span>{i.l}</span>
                </label>
              ))}
            </div>

            <div className="p-3.5 bg-white border border-[#ebd89b] rounded-2xl space-y-2">
              <span className="font-serif font-bold text-xs text-[#8e6e18] uppercase tracking-wider block border-b border-[#faf0d2] pb-1">
                🕊️ I Cannot Control:
              </span>
              {[
                { k: 'opinions', l: "Other people's opinions" },
                { k: 'choices', l: "Other people's choices" },
                { k: 'past', l: 'The past' },
                { k: 'outcomes', l: 'Every future outcome' },
              ].map((i) => (
                <label key={i.k} onClick={() => toggleCannot(i.k)} className="flex items-center gap-2 text-xs font-medium text-[#3b301a] cursor-pointer">
                  <input type="checkbox" checked={!!cannot[i.k]} onChange={() => {}} className="accent-[#D9A441] rounded" />
                  <span>{i.l}</span>
                </label>
              ))}
            </div>
          </div>

          <JournalSectionPanel number={1} title='"What am I repeatedly trying to control?"'>
            <RuledJournalTextarea
              value={day.repeatedlyTryingToControl || ''}
              onChange={(val) => update({ repeatedlyTryingToControl: val })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title='"What can I consciously release?"'>
            <RuledJournalTextarea
              value={day.consciouslyRelease || ''}
              onChange={(val) => update({ consciouslyRelease: val })}
              rows={2}
            />
          </JournalSectionPanel>
        </div>
      );

    case 11:
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="Something I tolerate but don't want to:">
            <RuledJournalTextarea value={day.tolerateDontWant || ''} onChange={(v) => update({ tolerateDontWant: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="A boundary I need:">
            <RuledJournalTextarea value={day.boundaryNeed || ''} onChange={(v) => update({ boundaryNeed: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="What am I afraid will happen if I set it?">
            <RuledJournalTextarea value={day.afraidIfSet || ''} onChange={(v) => update({ afraidIfSet: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={4} title="What would respecting myself look like?">
            <RuledJournalTextarea value={day.respectingSelfLooksLike || ''} onChange={(v) => update({ respectingSelfLooksLike: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={5} title="Today's boundary:">
            <input type="text" value={day.todayBoundary || ''} onChange={(e) => update({ todayBoundary: e.target.value })} placeholder="Today I will..." className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
          </JournalSectionPanel>
        </div>
      );

    case 12:
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="Relationship Pattern Audit">
            <div className="space-y-2">
              {[
                { k: 'seekApproval', l: 'Do I seek approval?' },
                { k: 'avoidDifficultConversations', l: 'Do I avoid difficult conversations?' },
                { k: 'overGive', l: 'Do I over-give?' },
                { k: 'suppressNeeds', l: 'Do I suppress my needs?' },
                { k: 'defensiveWhenHurt', l: 'Do I become defensive when hurt?' },
              ].map((q) => (
                <div key={q.k} className="p-2.5 bg-white border border-[#e4ded0] rounded-xl flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#075B3A]">{q.l}</span>
                  <ChoiceSelector options={['Often', 'Sometimes', 'Rarely']} value={day[q.k] || ''} onChange={(v) => update({ [q.k]: v })} />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={2} title='"The relationship pattern I want to change is..."'>
            <RuledJournalTextarea value={day.patternToChange || ''} onChange={(v) => update({ patternToChange: v })} rows={3} />
          </JournalSectionPanel>
        </div>
      );

    case 13:
      const grats = day.gratitudeItems || ['', '', ''];
      const updateG = (idx: number, v: string) => {
        const next = [...grats];
        next[idx] = v;
        update({ gratitudeItems: next });
      };
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="Three Things I Am Grateful For:">
            <div className="space-y-2">
              {grats.map((g: string, idx: number) => (
                <input key={idx} type="text" placeholder={`${idx + 1}.`} value={g} onChange={(e) => updateG(idx, e.target.value)} className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
              ))}
            </div>
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="Why do these things matter to me?">
            <RuledJournalTextarea value={day.whyMatter || ''} onChange={(v) => update({ whyMatter: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="Where do I notice abundance in my life?">
            <RuledJournalTextarea value={day.noticeAbundance || ''} onChange={(v) => update({ noticeAbundance: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={4} title="Today's gratitude action:">
            <input type="text" placeholder="An action of appreciation today..." value={day.todayGratitudeAction || ''} onChange={(e) => update({ todayGratitudeAction: e.target.value })} className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
          </JournalSectionPanel>
        </div>
      );

    case 14:
      const appr = day.appreciateAboutSelf || ['', '', '', '', ''];
      const updateA = (idx: number, v: string) => {
        const next = [...appr];
        next[idx] = v;
        update({ appreciateAboutSelf: next });
      };
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="5 Things I Appreciate About Myself:">
            <div className="space-y-1.5">
              {appr.map((item: string, idx: number) => (
                <input key={idx} type="text" placeholder={`${idx + 1}. A quality or effort...`} value={item} onChange={(e) => updateA(idx, e.target.value)} className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
              ))}
            </div>
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="My imperfections that I want to accept:">
            <RuledJournalTextarea value={day.imperfectionsToAccept || ''} onChange={(v) => update({ imperfectionsToAccept: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="My kinder perspective:">
            <RuledJournalTextarea value={day.kinderPerspective || ''} onChange={(v) => update({ kinderPerspective: v })} rows={2} />
          </JournalSectionPanel>
          <div className="p-4 rounded-2xl bg-[#faf6eb] border border-[#ebd89b] text-center space-y-1">
            <span className="text-[10px] font-serif font-bold tracking-[0.2em] text-[#8e6e18] uppercase">
              Affirmation
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#075B3A] font-semibold">
              "I accept myself fully. I am enough, just as I am."
            </p>
          </div>
        </div>
      );

    case 15:
      const habits = day.habits || [
        { habit: '', whyItMatters: '', obstacle: '', solution: '' },
        { habit: '', whyItMatters: '', obstacle: '', solution: '' },
        { habit: '', whyItMatters: '', obstacle: '', solution: '' },
        { habit: '', whyItMatters: '', obstacle: '', solution: '' },
        { habit: '', whyItMatters: '', obstacle: '', solution: '' },
      ];
      const updateH = (idx: number, field: string, val: string) => {
        const next = [...habits];
        next[idx] = { ...next[idx], [field]: val };
        update({ habits: next });
      };
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="5 Positive Habits & Lasting Change">
            <div className="space-y-3">
              {habits.map((h: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-1.5">
                  <span className="font-serif font-bold text-xs text-[#075B3A]">Habit {idx + 1}</span>
                  <input type="text" placeholder="Habit..." value={h.habit || ''} onChange={(e) => updateH(idx, 'habit', e.target.value)} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input type="text" placeholder="Why it matters..." value={h.whyItMatters || ''} onChange={(e) => updateH(idx, 'whyItMatters', e.target.value)} className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                    <input type="text" placeholder="Obstacle..." value={h.obstacle || ''} onChange={(e) => updateH(idx, 'obstacle', e.target.value)} className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                    <input type="text" placeholder="Solution..." value={h.solution || ''} onChange={(e) => updateH(idx, 'solution', e.target.value)} className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                  </div>
                </div>
              ))}
            </div>
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="Today's small action:">
            <input type="text" value={day.todaySmallAction || ''} onChange={(e) => update({ todaySmallAction: e.target.value })} placeholder="One micro-step today..." className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
          </JournalSectionPanel>
        </div>
      );

    case 16:
      const vals = day.topValues || [
        { value: '', howToLive: '' },
        { value: '', howToLive: '' },
        { value: '', howToLive: '' },
        { value: '', howToLive: '' },
        { value: '', howToLive: '' },
      ];
      const updateV = (idx: number, field: string, val: string) => {
        const next = [...vals];
        next[idx] = { ...next[idx], [field]: val };
        update({ topValues: next });
      };
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="What gives my life meaning?">
            <RuledJournalTextarea value={day.givesMeaning || ''} onChange={(v) => update({ givesMeaning: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="My life vision:">
            <RuledJournalTextarea value={day.lifeVision || ''} onChange={(v) => update({ lifeVision: v })} rows={3} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="My Top 5 Values:">
            <div className="space-y-2">
              {vals.map((v: any, idx: number) => (
                <div key={idx} className="p-2.5 bg-white border border-[#e4ded0] rounded-xl space-y-1">
                  <input type="text" placeholder={`Value ${idx + 1}...`} value={v.value || ''} onChange={(e) => updateV(idx, 'value', e.target.value)} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                  <input type="text" placeholder="How can I live this value daily?" value={v.howToLive || ''} onChange={(e) => updateV(idx, 'howToLive', e.target.value)} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]" />
                </div>
              ))}
            </div>
          </JournalSectionPanel>
        </div>
      );

    case 17:
      const rels = day.relationships || ['', '', '', '', ''];
      const updateR = (idx: number, v: string) => {
        const next = [...rels];
        next[idx] = v;
        update({ relationships: next });
      };
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="My 5 Important Relationships:">
            <div className="space-y-1.5">
              {rels.map((r: string, idx: number) => (
                <input key={idx} type="text" placeholder={`${idx + 1}. Name / Relationship`} value={r} onChange={(e) => updateR(idx, e.target.value)} className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
              ))}
            </div>
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="What makes a relationship healthy?">
            <RuledJournalTextarea value={day.makesRelationshipHealthy || ''} onChange={(v) => update({ makesRelationshipHealthy: v })} rows={2} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="One relationship I want to strengthen:">
            <input type="text" value={day.relationshipToStrengthen || ''} onChange={(e) => update({ relationshipToStrengthen: e.target.value })} className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
          </JournalSectionPanel>
          <JournalSectionPanel number={4} title="What can I communicate better?">
            <RuledJournalTextarea value={day.communicateBetter || ''} onChange={(v) => update({ communicateBetter: v })} rows={2} />
          </JournalSectionPanel>
        </div>
      );

    case 18:
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <JournalSectionPanel number={1} title="My Stress Triggers:">
              <RuledJournalTextarea value={(day.stressTriggers || []).join('\n')} onChange={(v) => update({ stressTriggers: v.split('\n') })} placeholder="1. ..." rows={3} />
            </JournalSectionPanel>
            <JournalSectionPanel number={2} title="Healthy Coping Strategies:">
              <RuledJournalTextarea value={(day.healthyCoping || []).join('\n')} onChange={(v) => update({ healthyCoping: v.split('\n') })} placeholder="1. ..." rows={3} />
            </JournalSectionPanel>
          </div>
          <JournalSectionPanel number={3} title="Think → Pause → Choose Exercise">
            <div className="space-y-2">
              <input type="text" placeholder="THINK: What is happening?" value={day.thinkExercise || ''} onChange={(e) => update({ thinkExercise: e.target.value })} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
              <input type="text" placeholder="PAUSE: What do I notice in my body?" value={day.pauseExercise || ''} onChange={(e) => update({ pauseExercise: e.target.value })} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
              <input type="text" placeholder="CHOOSE: How do I want to respond?" value={day.chooseExercise || ''} onChange={(e) => update({ chooseExercise: e.target.value })} className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]" />
            </div>
          </JournalSectionPanel>
        </div>
      );

    case 19:
      return (
        <div className="space-y-4">
          <JournalSectionPanel number={1} title="Three Things I Am Grateful For:">
            <RuledJournalTextarea value={(day.gratitudeItems || []).join('\n')} onChange={(v) => update({ gratitudeItems: v.split('\n') })} placeholder="1.&#10;2.&#10;3." rows={3} />
          </JournalSectionPanel>
          <JournalSectionPanel number={2} title="Three Small Things That Can Bring Me Joy:">
            <RuledJournalTextarea value={(day.joyItems || []).join('\n')} onChange={(v) => update({ joyItems: v.split('\n') })} placeholder="1.&#10;2.&#10;3." rows={3} />
          </JournalSectionPanel>
          <JournalSectionPanel number={3} title="Mindful Moment Practice: Choose One">
            <ChoiceSelector options={['Drinking tea', 'Walking', 'Eating', 'Listening to music', 'Nature', 'Other']} value={day.mindfulPracticeChoice || ''} onChange={(v) => update({ mindfulPracticeChoice: v })} />
          </JournalSectionPanel>
          <JournalSectionPanel number={4} title="What did I notice?">
            <RuledJournalTextarea value={day.noticedDuringMindful || ''} onChange={(v) => update({ noticedDuringMindful: v })} rows={2} />
          </JournalSectionPanel>
        </div>
      );

    default:
      return null;
  }
}
