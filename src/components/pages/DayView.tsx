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
import { RateYourselfSection } from '../common/RateYourselfSection';
import { SmallActionBox } from '../common/SmallActionBox';
import { AffirmationCard } from '../common/AffirmationCard';
import { DiscoveredTodaySection } from '../common/DiscoveredTodaySection';
import { CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
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

  const screenMeta =
    JOURNAL_24_SCREENS.find((s) => s.day === dayNum) || JOURNAL_24_SCREENS[dayNum - 1];

  const update = (partial: any) => {
    updateDayData(dayNum, partial);
  };

  const updateRating = (field: string, val: number) => {
    update({
      ratings: {
        ...(day.ratings || {}),
        [field]: val,
      },
    });
  };

  const activeMoods: string[] = Array.isArray(day.moods)
    ? day.moods
    : day.mood
    ? [day.mood]
    : [];

  const handleToggleMoods = (moods: string[]) => {
    update({ moods, mood: moods[0] || '' });
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
        {renderWorksheetSections(dayNum, day, update, updateRating, activeMoods, handleToggleMoods)}

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
function renderWorksheetSections(
  dayNum: number,
  day: any,
  update: (p: any) => void,
  updateRating: (f: string, v: number) => void,
  activeMoods: string[],
  handleToggleMoods: (m: string[]) => void
) {
  // Common sections reusable across days
  const emotionalCheckInPanel = (
    <JournalSectionPanel
      number={1}
      title="Today's Emotional Check-In"
      instruction="Select the emotional state that best describes your inner weather right now. You can choose more than one:"
    >
      <MoodSelector
        selectedMoods={activeMoods}
        onChangeMoods={handleToggleMoods}
        otherMood={day.moodOther || ''}
        onChangeOtherMood={(moodOther) => update({ moodOther })}
        allowMultiple={true}
      />
    </JournalSectionPanel>
  );

  const rateYourselfPanel = (
    <JournalSectionPanel
      number={2}
      title="Rate Yourself Today (1–10 Scale)"
      instruction="Rate yourself on a scale of 1 to 10 for each dimension today:"
    >
      <RateYourselfSection
        ratings={day.ratings}
        onChange={updateRating}
      />
    </JournalSectionPanel>
  );

  switch (dayNum) {
    // -------------------------------------------------------------
    // DAY 1 — MEET YOUR INNER SELF
    // -------------------------------------------------------------
    case 1:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="How am I genuinely feeling today?"
            instruction="Beyond 'busy' or 'fine'—what is your uncensored emotional state?"
          >
            <RuledJournalTextarea
              value={day.feelingToday || ''}
              onChange={(feelingToday) => update({ feelingToday })}
              placeholder="Right now, underneath the surface, I am feeling..."
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={4}
            title="What has been occupying my mind lately?"
            instruction="Notice the recurring thoughts, loops, or worries:"
          >
            <RuledJournalTextarea
              value={day.occupyingMind || ''}
              onChange={(occupyingMind) => update({ occupyingMind })}
              placeholder="The thoughts circling my mind most frequently are..."
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={5}
            title="What part of my life feels most unsettled right now?"
            instruction="Work, relationships, physical health, or inner peace?"
          >
            <RuledJournalTextarea
              value={day.unsettledPart || ''}
              onChange={(unsettledPart) => update({ unsettledPart })}
              placeholder="Where I feel the greatest friction or tension is..."
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={6}
            title="What do I wish someone would understand about me?"
            instruction="A truth you rarely speak out loud:"
          >
            <RuledJournalTextarea
              value={day.wishUnderstood || ''}
              onChange={(wishUnderstood) => update({ wishUnderstood })}
              placeholder="I wish people understood that I..."
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={7}
            title='Complete: "If I were completely honest with myself, I would admit..."'
            instruction="Let your guard down and write with honest sincerity:"
          >
            <RuledJournalTextarea
              value={day.honestAdmit || ''}
              onChange={(honestAdmit) => update({ honestAdmit })}
              placeholder="If I were completely honest, I would admit that..."
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Take 5 deep mindful breaths and notice how your body feels without trying to change anything."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I give myself permission to be honest about where I am today without judging myself."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 2 — IDENTIFY YOUR EMOTIONAL TRIGGERS
    // -------------------------------------------------------------
    case 2: {
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
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="Identify 3 Emotional Triggers"
            instruction="Reflect on specific scenarios that sparked strong internal reactions:"
          >
            <div className="space-y-3">
              {tRows.map((r: any, idx: number) => (
                <div key={idx} className="p-3.5 bg-white border border-[#e4ded0] rounded-xl space-y-2 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#075B3A]">
                    <span className="w-5 h-5 rounded-full bg-[#075B3A] text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>TRIGGER SCENARIO {idx + 1}</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Trigger: What occurred? (Person, event, word, situation)"
                    value={r.trigger || ''}
                    onChange={(e) => updateTrigger(idx, 'trigger', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                  <input
                    type="text"
                    placeholder="What happened in detail?"
                    value={r.whatHappened || ''}
                    onChange={(e) => updateTrigger(idx, 'whatHappened', e.target.value)}
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
            number={4}
            title="Deeper Trigger Reflection"
            instruction="What common theme connects these triggers, and what unmet need lies underneath?"
          >
            <div className="space-y-3">
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  1. What common pattern or theme do I notice across these triggers?
                </span>
                <RuledJournalTextarea
                  value={day.patternNoticed || day.reflection || ''}
                  onChange={(patternNoticed) => update({ patternNoticed, reflection: patternNoticed })}
                  rows={2}
                />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  2. What vulnerability or unmet need might be beneath my strongest trigger?
                </span>
                <RuledJournalTextarea
                  value={day.unmetNeed || ''}
                  onChange={(unmetNeed) => update({ unmetNeed })}
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="The next time you feel a trigger rising today, pause for 10 seconds before reacting."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="My triggers are not my flaws; they are messengers showing me where I need healing."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 3 — THE STORY I TELL MYSELF
    // -------------------------------------------------------------
    case 3: {
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
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="5 Belief / Reflection Rows (Fact vs. Interpretation vs. Fear)"
            instruction="Is your recurring thought Fact, Interpretation, or Fear? Provide a balanced view:"
          >
            <div className="space-y-3">
              {beliefs.map((b: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-2 shadow-2xs">
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
                    placeholder="The story I tell myself is..."
                    value={b.recurringThought || ''}
                    onChange={(e) => updateBelief(idx, 'recurringThought', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                  <input
                    type="text"
                    placeholder="A more balanced, grounded perspective is..."
                    value={b.balancedPerspective || ''}
                    onChange={(e) => updateBelief(idx, 'balancedPerspective', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel
            number={4}
            title="Deep Questioning"
            instruction="Reflect on the stories you cling to:"
          >
            <div className="space-y-3">
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  1. How much energy do I spend defending stories that might not even be true?
                </span>
                <RuledJournalTextarea
                  value={day.energySpentDefending || ''}
                  onChange={(energySpentDefending) => update({ energySpentDefending })}
                  rows={2}
                />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  2. If I let go of this limiting story, who would I become?
                </span>
                <RuledJournalTextarea
                  value={day.whoWouldIBecome || ''}
                  onChange={(whoWouldIBecome) => update({ whoWouldIBecome })}
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Catch yourself making an unhelpful assumption today and gently ask: 'Is this 100% true?'"
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I am not my thoughts. I am the conscious awareness observing them."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 4 — MEET YOUR INNER CRITIC
    // -------------------------------------------------------------
    case 4:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="1. When I make a mistake, I usually tell myself:"
            instruction="Record the unfiltered words of your inner critic:"
          >
            <RuledJournalTextarea
              value={day.mistakeSelfTalk || ''}
              onChange={(mistakeSelfTalk) => update({ mistakeSelfTalk })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={4}
            title="2. Where might I have learned this style of self-talk?"
            instruction="From childhood, past teachers, family, or critical environments?"
          >
            <RuledJournalTextarea
              value={day.learnedSelfTalk || ''}
              onChange={(learnedSelfTalk) => update({ learnedSelfTalk })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={5}
            title="3. Would I speak this way to someone I love?"
          >
            <ChoiceSelector
              options={['Yes', 'No', 'Sometimes']}
              value={day.speakToLovedOne || ''}
              onChange={(speakToLovedOne) => update({ speakToLovedOne })}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={6}
            title="4. What would a compassionate but honest response sound like?"
          >
            <RuledJournalTextarea
              value={day.compassionateResponse || ''}
              onChange={(compassionateResponse) => update({ compassionateResponse })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel
            number={7}
            title="5. Rewriting My Internal Script (Two-Column Table)"
            instruction="Contrast the harsh internal voice with the loving truth:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#8a3333] uppercase">
                  Harsh Internal Thought:
                </span>
                <RuledJournalTextarea
                  value={day.harshThought || ''}
                  onChange={(harshThought) => update({ harshThought })}
                  placeholder="e.g. 'You always mess this up'..."
                  rows={2}
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A] uppercase">
                  Loving, Honest Truth:
                </span>
                <RuledJournalTextarea
                  value={day.lovingTruth || ''}
                  onChange={(lovingTruth) => update({ lovingTruth })}
                  placeholder="e.g. 'You are learning. Mistakes are proof of effort'..."
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Place a gentle hand on your heart whenever your inner critic speaks up today and say: 'I am doing my best.'"
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I trade judgment for curiosity. I speak to myself with kindness, warmth, and respect."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 5 — EMOTIONAL SUPPRESSION
    // -------------------------------------------------------------
    case 5:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="1. An emotion I don't like expressing is:">
            <input
              type="text"
              value={day.suppressedEmotion || ''}
              onChange={(e) => update({ suppressedEmotion: e.target.value })}
              placeholder="e.g. Anger, deep sadness, fear of being vulnerable..."
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="2. Why do I avoid it? What did I learn about it?">
            <RuledJournalTextarea
              value={day.whyAvoid || ''}
              onChange={(whyAvoid) => update({ whyAvoid })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="3. What am I afraid will happen if I express it?">
            <RuledJournalTextarea
              value={day.fearOfExpressing || ''}
              onChange={(fearOfExpressing) => update({ fearOfExpressing })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. Body Awareness: Where do I physically feel this emotion?">
            <input
              type="text"
              value={day.physicalLocation || ''}
              onChange={(e) => update({ physicalLocation: e.target.value })}
              placeholder="e.g. Chest tightness, throat knot, clenched jaw, stomach drop..."
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 px-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title="5. What might this emotion need from me, and how can I honor it?">
            <RuledJournalTextarea
              value={day.emotionNeeds || ''}
              onChange={(emotionNeeds) => update({ emotionNeeds })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Sit in silence for 3 minutes and breathe directly into the area of your body where you hold tension."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="What I feel, I can heal. All of my emotions are welcome and worthy of compassionate listening."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 6 — MY UNFINISHED EMOTIONAL STORY
    // -------------------------------------------------------------
    case 6:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <div className="p-3 bg-[#faf6eb] border border-[#ebd89b] rounded-xl flex items-center gap-2 text-xs text-[#755f19]">
            <ShieldAlert className="w-4 h-4 text-[#D9A441] shrink-0" />
            <span>
              <strong>Safety note:</strong> Only reflect on experiences that feel emotionally safe to revisit. You do not need to relive trauma.
            </span>
          </div>

          <JournalSectionPanel number={3} title="1. What happened?">
            <RuledJournalTextarea
              value={day.whatHappened || ''}
              onChange={(whatHappened) => update({ whatHappened })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="2. What did I feel back then?">
            <RuledJournalTextarea
              value={day.feltThen || ''}
              onChange={(feltThen) => update({ feltThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="3. What did I need at that time?">
            <RuledJournalTextarea
              value={day.neededThen || ''}
              onChange={(neededThen) => update({ neededThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. What do I understand differently today?">
            <RuledJournalTextarea
              value={day.understandToday || ''}
              onChange={(understandToday) => update({ understandToday })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title="5. What closure, comfort or validation can I give myself now?">
            <RuledJournalTextarea
              value={day.giveMyselfNow || ''}
              onChange={(giveMyselfNow) => update({ giveMyselfNow })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Write down one sentence you needed to hear in the past, and read it out loud to yourself today."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I honor my past and release its hold on my present peace. I am safe here and now."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 7 — WEEK 1 INNER CHECK-IN (MILESTONE)
    // -------------------------------------------------------------
    case 7: {
      const ratings = day.ratings || {
        emotionalAwareness: 0,
        selfUnderstanding: 0,
        selfCompassion: 0,
        mentalClarity: 0,
        emotionalBalance: 0,
      };

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}

          <JournalSectionPanel
            number={2}
            title="Week 1 Inner State Ratings (1–10 Scale)"
            instruction="Rate your self-awareness across 5 core dimensions after your first 7 days:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div className="sm:col-span-2">
                <RatingScale
                  label="Emotional Balance"
                  value={ratings.emotionalBalance || 0}
                  onChange={(val) => updateRating('emotionalBalance', val)}
                  max={10}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title='1. "This week I discovered about myself that..."'>
            <RuledJournalTextarea
              value={day.discoveredThisWeek || ''}
              onChange={(discoveredThisWeek) => update({ discoveredThisWeek })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="2. What recurring emotional pattern have I noticed about myself?">
            <RuledJournalTextarea
              value={day.patternNoticed || ''}
              onChange={(patternNoticed) => update({ patternNoticed })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="3. Where did I show courage or vulnerability this week?">
            <RuledJournalTextarea
              value={day.vulnerabilityShown || ''}
              onChange={(vulnerabilityShown) => update({ vulnerabilityShown })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. One shift in perspective that brought me genuine relief:">
            <RuledJournalTextarea
              value={day.perspectiveShift || ''}
              onChange={(perspectiveShift) => update({ perspectiveShift })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Celebrate your commitment to yourself. Do one relaxing, restorative thing just for you today."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I am proud of showing up for myself. Every day of awareness is a victory."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 8 — INNER CHILD CONVERSATION
    // -------------------------------------------------------------
    case 8:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title='1. "Dear younger me..."'
            instruction="Write with unconditional tenderness to your younger self (ages 6–12):"
          >
            <RuledJournalTextarea
              value={day.letterToYoungerMe || ''}
              onChange={(letterToYoungerMe) => update({ letterToYoungerMe })}
              placeholder="Dear younger me, I want you to know..."
              rows={3}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="2. What did younger you need to hear that no one told you?">
            <RuledJournalTextarea
              value={day.whatIWishIHear || ''}
              onChange={(whatIWishIHear) => update({ whatIWishIHear })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="3. What heavy burdens or blame wasn't your fault?">
            <RuledJournalTextarea
              value={day.whatWasntMyFault || ''}
              onChange={(whatWasntMyFault) => update({ whatWasntMyFault })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. What do you appreciate and love about the child you were?">
            <RuledJournalTextarea
              value={day.whatIAppreciate || ''}
              onChange={(whatIAppreciate) => update({ whatIAppreciate })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title="5. How can you protect, nurture, and comfort that child today?">
            <RuledJournalTextarea
              value={day.protectAndNurture || ''}
              onChange={(protectAndNurture) => update({ protectAndNurture })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Look at an old photo of yourself or picture your child self, and tell them: 'I love you and you are safe with me now.'"
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="My inner child is safe, loved, and held with unconditional warmth in my heart."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 9 — FORGIVING MYSELF
    // -------------------------------------------------------------
    case 9:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title='1. "I still blame myself for..."'>
            <RuledJournalTextarea
              value={day.blameMyselfFor || ''}
              onChange={(blameMyselfFor) => update({ blameMyselfFor })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title='2. "What I know now that I didn’t know then is..."'>
            <RuledJournalTextarea
              value={day.knowNowNotThen || ''}
              onChange={(knowNowNotThen) => update({ knowNowNotThen })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title='3. "What can I learn rather than continue to punish myself for?"'>
            <RuledJournalTextarea
              value={day.learnNotPunish || ''}
              onChange={(learnNotPunish) => update({ learnNotPunish })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. What would life feel like if I laid down this heavy self-blame?">
            <RuledJournalTextarea
              value={day.lifeWithoutSelfBlame || ''}
              onChange={(lifeWithoutSelfBlame) => update({ lifeWithoutSelfBlame })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title='5. Sacred Self-Forgiveness Statement: "I forgive myself for..."'>
            <RuledJournalTextarea
              value={day.forgiveMyselfFor || ''}
              onChange={(forgiveMyselfFor) => update({ forgiveMyselfFor })}
              rows={2}
            />
          </JournalSectionPanel>

          <div
            onClick={() => update({ statementAgreed: !day.statementAgreed })}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 shadow-2xs ${
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
              "I accept this forgiveness and choose to move forward with grace."
            </span>
          </div>

          <SmallActionBox
            actionText="Exhale deeply and physically shake your hands out, consciously releasing old guilt."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I forgive myself for not knowing what I didn't know. I am worthy of fresh beginnings."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 10 — WHAT I CAN AND CANNOT CONTROL
    // -------------------------------------------------------------
    case 10: {
      const can = day.canControl || {};
      const cannot = day.cannotControl || {};
      const toggleCan = (k: string) => update({ canControl: { ...can, [k]: !can[k] } });
      const toggleCannot = (k: string) => update({ cannotControl: { ...cannot, [k]: !cannot[k] } });

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white border border-[#bfe0c7] rounded-2xl space-y-2 shadow-2xs">
              <span className="font-serif font-bold text-xs text-[#075B3A] uppercase tracking-wider block border-b border-[#e3f0e6] pb-1">
                🌿 I Can Control (Check all that apply):
              </span>
              {[
                { k: 'response', l: 'My response & reactions' },
                { k: 'attention', l: 'My attention & focus' },
                { k: 'actions', l: 'My actions & effort' },
                { k: 'habits', l: 'My daily habits' },
                { k: 'boundaries', l: 'The boundaries I uphold' },
                { k: 'choices', l: 'The choices I make today' },
              ].map((i) => (
                <label key={i.k} onClick={() => toggleCan(i.k)} className="flex items-center gap-2 text-xs font-medium text-[#1c382b] cursor-pointer select-none">
                  <input type="checkbox" checked={!!can[i.k]} onChange={() => {}} className="accent-[#075B3A] rounded" />
                  <span>{i.l}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="+ Add custom in my control..."
                value={day.canControlCustom || ''}
                onChange={(e) => update({ canControlCustom: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 text-[#1c382b] focus:outline-none focus:border-[#075B3A]"
              />
            </div>

            <div className="p-3.5 bg-white border border-[#ebd89b] rounded-2xl space-y-2 shadow-2xs">
              <span className="font-serif font-bold text-xs text-[#8e6e18] uppercase tracking-wider block border-b border-[#faf0d2] pb-1">
                🕊️ Out of My Control (Surrendered):
              </span>
              {[
                { k: 'opinions', l: "Other people's opinions & moods" },
                { k: 'choices', l: "Other people's choices & behavior" },
                { k: 'past', l: 'What already happened in the past' },
                { k: 'outcomes', l: 'Future outcomes & timing' },
                { k: 'events', l: 'Unpredictable life events' },
              ].map((i) => (
                <label key={i.k} onClick={() => toggleCannot(i.k)} className="flex items-center gap-2 text-xs font-medium text-[#3b301a] cursor-pointer select-none">
                  <input type="checkbox" checked={!!cannot[i.k]} onChange={() => {}} className="accent-[#D9A441] rounded" />
                  <span>{i.l}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="+ Add custom out of my control..."
                value={day.cannotControlCustom || ''}
                onChange={(e) => update({ cannotControlCustom: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 text-[#3b301a] focus:outline-none focus:border-[#D9A441]"
              />
            </div>
          </div>

          <JournalSectionPanel number={3} title='1. "What am I repeatedly and exhaustingly trying to control?"'>
            <RuledJournalTextarea
              value={day.repeatedlyTryingToControl || ''}
              onChange={(val) => update({ repeatedlyTryingToControl: val })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title='2. "What can I consciously release today, redirecting to my peace?"'>
            <RuledJournalTextarea
              value={day.consciouslyRelease || ''}
              onChange={(val) => update({ consciouslyRelease: val })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Whenever anxiety spikes today, ask yourself: 'Is this in my control?' If not, exhale and let it be."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I release the illusion of control. I anchor my energy in my own peace and present choices."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 11 — BOUNDARIES & SELF-RESPECT
    // -------------------------------------------------------------
    case 11:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="1. Something I tolerate in my life that drains my peace:">
            <RuledJournalTextarea
              value={day.tolerateDontWant || ''}
              onChange={(v) => update({ tolerateDontWant: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="2. A healthy boundary I desperately need to set:">
            <RuledJournalTextarea
              value={day.boundaryNeed || ''}
              onChange={(v) => update({ boundaryNeed: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="3. What am I afraid will happen if I set it?">
            <RuledJournalTextarea
              value={day.afraidIfSet || ''}
              onChange={(v) => update({ afraidIfSet: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="4. What does deep self-respect look like in this situation?">
            <RuledJournalTextarea
              value={day.respectingSelfLooksLike || ''}
              onChange={(v) => update({ respectingSelfLooksLike: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title="5. Today's concrete boundary action:">
            <input
              type="text"
              value={day.todayBoundary || ''}
              onChange={(e) => update({ todayBoundary: e.target.value })}
              placeholder="Today, I will uphold my peace by..."
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Practice saying a polite, clear 'No' or 'Let me think about it' to a non-essential request today without over-explaining."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="Boundaries are not walls; they are the doors of self-love and mutual respect."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 12 — RELATIONSHIP PATTERN AUDIT
    // -------------------------------------------------------------
    case 12:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="Relationship Pattern Audit (Frequency Scale)">
            <div className="space-y-2">
              {[
                { k: 'seekApproval', l: '1. Seeking external approval before trusting my intuition' },
                { k: 'avoidDifficultConversations', l: '2. Avoiding necessary difficult conversations out of fear' },
                { k: 'overGive', l: '3. Over-giving or trying to fix others at my own expense' },
                { k: 'suppressNeeds', l: '4. Suppressing my authentic needs to keep the peace' },
                { k: 'defensiveWhenHurt', l: '5. Becoming defensive or withdrawing when hurt' },
              ].map((q) => (
                <div key={q.k} className="p-3 bg-white border border-[#e4ded0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                  <span className="text-xs font-semibold text-[#075B3A]">{q.l}</span>
                  <ChoiceSelector
                    options={['Often', 'Sometimes', 'Rarely']}
                    value={day[q.k] || ''}
                    onChange={(v) => update({ [q.k]: v })}
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="Deeper Pattern Inquiry">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  1. Which of these relationship habits originated as early coping mechanisms?
                </span>
                <RuledJournalTextarea
                  value={day.copingOrigin || ''}
                  onChange={(v) => update({ copingOrigin: v })}
                  rows={2}
                />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  2. "The relationship pattern I am ready to consciously shift into authentic connection is..."
                </span>
                <RuledJournalTextarea
                  value={day.patternToChange || ''}
                  onChange={(v) => update({ patternToChange: v })}
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Communicate an authentic thought or feeling today without seeking reassurance or permission."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I belong to myself first. Healthy love welcomes my truth and honors my authenticity."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 13 — GRATITUDE & ABUNDANCE
    // -------------------------------------------------------------
    case 13:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="Three Sacred Gratitude Anchors:">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="1. A simple physical comfort or ordinary miracle today..."
                value={day.gratitudeItem1 || (day.gratitudeItems && day.gratitudeItems[0]) || ''}
                onChange={(e) => update({ gratitudeItem1: e.target.value })}
                className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="2. A person, memory, or connection that warms my heart..."
                value={day.gratitudeItem2 || (day.gratitudeItems && day.gratitudeItems[1]) || ''}
                onChange={(e) => update({ gratitudeItem2: e.target.value })}
                className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="3. A strength or resilience within myself I am thankful for..."
                value={day.gratitudeItem3 || (day.gratitudeItems && day.gratitudeItems[2]) || ''}
                onChange={(e) => update({ gratitudeItem3: e.target.value })}
                className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="1. Why do these blessings matter so deeply to me right now?">
            <RuledJournalTextarea
              value={day.whyMatter || ''}
              onChange={(v) => update({ whyMatter: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="2. When my mind slips into lack, what truth brings me back to abundance?">
            <RuledJournalTextarea
              value={day.truthForScarcity || day.noticeAbundance || ''}
              onChange={(v) => update({ truthForScarcity: v, noticeAbundance: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="3. Today's gratitude action:">
            <input
              type="text"
              placeholder="How I will express or share appreciation today..."
              value={day.todayGratitudeAction || ''}
              onChange={(e) => update({ todayGratitudeAction: e.target.value })}
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Send a sincere text or say a genuine word of gratitude to someone who made your life easier."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="Abundance is not what I gather; it is the gratitude with which I receive this moment."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 14 — SELF-ACCEPTANCE & INNER COMPASSION (MID-POINT MILESTONE)
    // -------------------------------------------------------------
    case 14: {
      const appr = day.appreciateAboutSelf || ['', '', '', '', ''];
      const updateA = (idx: number, v: string) => {
        const next = [...appr];
        next[idx] = v;
        update({ appreciateAboutSelf: next });
      };

      const ratings = day.ratings || {
        selfAcceptance: 0,
        compassionForImperfections: 0,
        innerPeaceLevel: 0,
        vitality: 0,
      };

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}

          <JournalSectionPanel
            number={2}
            title="Mid-Point Growth Ratings (1–10 Scale)"
            instruction="Rate your self-acceptance and compassion at the two-week milestone:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RatingScale
                label="Self-Acceptance"
                value={ratings.selfAcceptance || 0}
                onChange={(val) => updateRating('selfAcceptance', val)}
                max={10}
              />
              <RatingScale
                label="Compassion for Imperfections"
                value={ratings.compassionForImperfections || 0}
                onChange={(val) => updateRating('compassionForImperfections', val)}
                max={10}
              />
              <RatingScale
                label="Inner Peace Level"
                value={ratings.innerPeaceLevel || 0}
                onChange={(val) => updateRating('innerPeaceLevel', val)}
                max={10}
              />
              <RatingScale
                label="Vitality & Wholeness"
                value={ratings.vitality || 0}
                onChange={(val) => updateRating('vitality', val)}
                max={10}
              />
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={3} title="5 Things I Appreciate About Myself:">
            <div className="space-y-1.5">
              {appr.map((item: string, idx: number) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`${idx + 1}. A quality, effort, or truth I appreciate in myself...`}
                  value={item}
                  onChange={(e) => updateA(idx, e.target.value)}
                  className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
                />
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="1. My imperfections or quirks that I choose to accept with tenderness:">
            <RuledJournalTextarea
              value={day.imperfectionsToAccept || ''}
              onChange={(v) => update({ imperfectionsToAccept: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="2. What would shift if I stopped waiting to be 'perfect' before loving myself?">
            <RuledJournalTextarea
              value={day.withoutPerfection || day.kinderPerspective || ''}
              onChange={(v) => update({ withoutPerfection: v, kinderPerspective: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="3. How I will practice self-compassion when feeling inadequate:">
            <RuledJournalTextarea
              value={day.practiceSelfCompassion || ''}
              onChange={(v) => update({ practiceSelfCompassion: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Look into the mirror, make gentle eye contact with yourself, and smile warmly."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I am worthy of love and belonging exactly as I am right now, in all my humanness."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 15 — POSITIVE HABITS & LASTING CHANGE
    // -------------------------------------------------------------
    case 15: {
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
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="Habit Transformation Table (5 Positive Habits)"
            instruction="Micro-habits grounded in self-love rather than self-punishment:"
          >
            <div className="space-y-3">
              {habits.map((h: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-1.5 shadow-2xs">
                  <span className="font-serif font-bold text-xs text-[#075B3A]">Habit {idx + 1}</span>
                  <input
                    type="text"
                    placeholder="Micro-Habit to build (e.g. 5-min morning stretch, hydration)..."
                    value={h.habit || ''}
                    onChange={(e) => updateH(idx, 'habit', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Why it matters to my peace..."
                      value={h.whyItMatters || ''}
                      onChange={(e) => updateH(idx, 'whyItMatters', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                    />
                    <input
                      type="text"
                      placeholder="Anticipated obstacle..."
                      value={h.obstacle || ''}
                      onChange={(e) => updateH(idx, 'obstacle', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                    />
                    <input
                      type="text"
                      placeholder="My compassionate solution..."
                      value={h.solution || ''}
                      onChange={(e) => updateH(idx, 'solution', e.target.value)}
                      className="text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="Habit Reflection">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  1. Why have past habits failed when motivated by self-criticism rather than self-love?
                </span>
                <RuledJournalTextarea
                  value={day.whyPastFailed || ''}
                  onChange={(v) => update({ whyPastFailed: v })}
                  rows={2}
                />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  2. What is the single highest-leverage habit that will anchor my inner healing?
                </span>
                <RuledJournalTextarea
                  value={day.highestLeverageHabit || day.todaySmallAction || ''}
                  onChange={(v) => update({ highestLeverageHabit: v, todaySmallAction: v })}
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Complete your chosen micro-habit today in less than 2 minutes."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="Small, loving choices practiced consistently create profound and lasting transformation."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 16 — PURPOSE, MEANING & INNER DIRECTION
    // -------------------------------------------------------------
    case 16: {
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
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="My Top 5 Values (Two-Column Table)"
            instruction="Name each core value and how you will practice it daily:"
          >
            <div className="space-y-2">
              {vals.map((v: any, idx: number) => (
                <div key={idx} className="p-3 bg-white border border-[#e4ded0] rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#075B3A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={`Core Value ${idx + 1} (e.g. Peace, Authenticity, Kindness)...`}
                      value={v.value || ''}
                      onChange={(e) => updateV(idx, 'value', e.target.value)}
                      className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="How I will live this value daily in practical choices..."
                    value={v.howToLive || ''}
                    onChange={(e) => updateV(idx, 'howToLive', e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-0.5 focus:outline-none focus:border-[#D9A441]"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="1. What gives my life the deepest sense of meaning and vitality?">
            <RuledJournalTextarea
              value={day.givesMeaning || ''}
              onChange={(v) => update({ givesMeaning: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="2. My life vision: If failure were impossible, what would I create?">
            <RuledJournalTextarea
              value={day.lifeVision || ''}
              onChange={(v) => update({ lifeVision: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="3. One meaningful action aligned with my values I will take this week:">
            <input
              type="text"
              placeholder="A concrete, soul-aligned step..."
              value={day.meaningfulAction || ''}
              onChange={(e) => update({ meaningfulAction: e.target.value })}
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Spend 5 minutes doing something that purely sparks your curiosity or brings you alive."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I live aligned with my values. My purpose unfolds naturally with each authentic step."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 17 — HEALTHY RELATIONSHIPS & CONNECTION
    // -------------------------------------------------------------
    case 17: {
      const rels = day.relationships || ['', '', '', ''];
      const updateR = (idx: number, v: string) => {
        const next = [...rels];
        next[idx] = v;
        update({ relationships: next });
      };

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="4 Important Relationships to Nurture:">
            <div className="space-y-1.5">
              {rels.map((r: string, idx: number) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`${idx + 1}. Name / Relationship to cherish...`}
                  value={r}
                  onChange={(e) => updateR(idx, e.target.value)}
                  className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
                />
              ))}
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="1. What makes a relationship feel emotionally safe, energizing, and reciprocal?">
            <RuledJournalTextarea
              value={day.makesRelationshipHealthy || ''}
              onChange={(v) => update({ makesRelationshipHealthy: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="2. One specific relationship in my life I want to strengthen:">
            <input
              type="text"
              placeholder="Name of person..."
              value={day.relationshipToStrengthen || ''}
              onChange={(e) => update({ relationshipToStrengthen: e.target.value })}
              className="w-full text-sm font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="3. How can I communicate my needs more clearly without fear or defensiveness?">
            <RuledJournalTextarea
              value={day.communicateBetter || ''}
              onChange={(v) => update({ communicateBetter: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={7} title="4. My specific action plan to nurture this connection:">
            <RuledJournalTextarea
              value={day.actionPlan || ''}
              onChange={(v) => update({ actionPlan: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Reach out to someone you care about and ask: 'How is your heart doing today?' with genuine curiosity."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I attract and cultivate relationships built on mutual respect, honesty, and emotional safety."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 18 — STRESS RESILIENCE & EMOTIONAL STRENGTH
    // -------------------------------------------------------------
    case 18: {
      const triggers = day.stressTriggers || ['', '', '', ''];
      const coping = day.healthyCoping || ['', '', '', ''];

      const updateTrigger = (idx: number, val: string) => {
        const next = [...triggers];
        next[idx] = val;
        update({ stressTriggers: next });
      };

      const updateCoping = (idx: number, val: string) => {
        const next = [...coping];
        next[idx] = val;
        update({ healthyCoping: next });
      };

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <JournalSectionPanel number={3} title="Top Stress Triggers:">
              <div className="space-y-1.5">
                {triggers.map((t: string, idx: number) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Trigger ${idx + 1}...`}
                    value={t}
                    onChange={(e) => updateTrigger(idx, e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
                  />
                ))}
              </div>
            </JournalSectionPanel>

            <JournalSectionPanel number={4} title="Healthy Coping Strategies:">
              <div className="space-y-1.5">
                {coping.map((c: string, idx: number) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Coping ${idx + 1}...`}
                    value={c}
                    onChange={(e) => updateCoping(idx, e.target.value)}
                    className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
                  />
                ))}
              </div>
            </JournalSectionPanel>
          </div>

          <JournalSectionPanel
            number={5}
            title="The Grounded Reflex: Think → Pause → Choose"
            instruction="Complete each stage of conscious emotional regulation:"
          >
            <div className="space-y-2">
              <input
                type="text"
                placeholder="1. THINK: What automatic catastrophic thought does my stress trigger?..."
                value={day.thinkExercise || ''}
                onChange={(e) => update({ thinkExercise: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="2. PAUSE: How will I create a physical or mindful pause (e.g. 3 belly breaths)?..."
                value={day.pauseExercise || ''}
                onChange={(e) => update({ pauseExercise: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="3. CHOOSE: What conscious, grounded response will I choose instead of panic?..."
                value={day.chooseExercise || ''}
                onChange={(e) => update({ chooseExercise: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="Resilience Reflection">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  1. How has my ability to handle stress evolved over these past 18 days?
                </span>
                <RuledJournalTextarea
                  value={day.stressEvolution || ''}
                  onChange={(v) => update({ stressEvolution: v })}
                  rows={2}
                />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-[#075B3A] block mb-1">
                  2. One resilience action I will take whenever pressure mounts today:
                </span>
                <RuledJournalTextarea
                  value={day.resilienceAction || ''}
                  onChange={(v) => update({ resilienceAction: v })}
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Take a conscious 60-second breathing pause between your daily tasks today."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I am the calm center of the storm. I respond to life with clarity, poise, and grace."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 19 — GRATITUDE, JOY & MINDFUL LIVING
    // -------------------------------------------------------------
    case 19:
      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel number={3} title="Three Moments of Pure Sensory Gratitude:">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="1. A physical sensation I am grateful for (Sight, smell, touch, sound, taste)..."
                value={day.sensoryGratitude || (day.gratitudeItems && day.gratitudeItems[0]) || ''}
                onChange={(e) => update({ sensoryGratitude: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="2. A simple everyday joy that costs nothing..."
                value={day.simpleJoy || (day.joyItems && day.joyItems[0]) || ''}
                onChange={(e) => update({ simpleJoy: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
              <input
                type="text"
                placeholder="3. A quiet moment today when I felt truly present..."
                value={day.quietMoment || (day.joyItems && day.joyItems[1]) || ''}
                onChange={(e) => update({ quietMoment: e.target.value })}
                className="w-full text-xs font-sans border-b border-[#d8e2d8] py-1 focus:outline-none focus:border-[#D9A441]"
              />
            </div>
          </JournalSectionPanel>

          <JournalSectionPanel number={4} title="Mindful Moment Practice: Choose One">
            <ChoiceSelector
              options={['Drinking tea', 'Mindful walk', 'Eating slowly', 'Listening to music', 'Nature', 'Quiet breath']}
              value={day.mindfulPracticeChoice || ''}
              onChange={(v) => update({ mindfulPracticeChoice: v })}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={5} title="1. What did I notice in my body and mind during this mindful practice?">
            <RuledJournalTextarea
              value={day.mindfulSensoryNoticed || day.noticedDuringMindful || ''}
              onChange={(v) => update({ mindfulSensoryNoticed: v, noticedDuringMindful: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <JournalSectionPanel number={6} title="2. Cultivating Joy: What playful or joyful activity will I schedule for myself?">
            <RuledJournalTextarea
              value={day.scheduledJoyActivity || day.todayAction || ''}
              onChange={(v) => update({ scheduledJoyActivity: v, todayAction: v })}
              rows={2}
            />
          </JournalSectionPanel>

          <SmallActionBox
            actionText="Savor your next meal or warm drink without your phone or distractions for the first 3 minutes."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="Joy lives in the present moment. I open my senses to the beauty unfolding right now."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(discoveredToday) => update({ discoveredToday })}
          />
        </div>
      );

    // -------------------------------------------------------------
    // DAY 20 — SELF-COMPASSION AND INNER ACCEPTANCE
    // -------------------------------------------------------------
    case 20: {
      const kinder = day.kinderAreas || ['', '', '', ''];
      const updateKinder = (idx: number, val: string) => {
        const next = [...kinder];
        next[idx] = val;
        update({ kinderAreas: next });
      };

      return (
        <div className="space-y-4">
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          <JournalSectionPanel
            number={3}
            title="Areas Where I Can Be Kinder to Myself (4 Areas)"
            instruction="Name specific places where you have been overly harsh (body, career, pacing, mistakes):"
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

          <JournalSectionPanel
            number={4}
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

          <JournalSectionPanel
            number={5}
            title="Releasing Self-Criticism (Two-Column Table)"
            instruction="Contrast one harsh thought with its compassionate, loving counterpart:"
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

          <SmallActionBox
            actionText="Do one deliberate act of kindness for yourself today without explaining or apologizing."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <AffirmationCard
            affirmation="I am enough. I am worthy of love, kindness and acceptance — especially from myself."
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(val) => update({ discoveredToday: val })}
          />
        </div>
      );
    }

    // -------------------------------------------------------------
    // DAY 21 — INTEGRATION AND A BRIGHTER TOMORROW
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
          {emotionalCheckInPanel}
          {rateYourselfPanel}

          {/* Section 1: My 21-Day Journey Reflection */}
          <JournalSectionPanel
            number={3}
            title="1. My 21-Day Journey Reflection"
            instruction="Looking back at who you were on Day 1 compared to who you are today:"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A]">
                  Positive Changes I Notice in Myself:
                </span>
                <RuledJournalTextarea
                  value={day.positiveChanges || ''}
                  onChange={(val) => update({ positiveChanges: val })}
                  placeholder="In my reactions, peace, clarity, sleep..."
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
                  placeholder="Old triggers, self-doubt, perfectionism..."
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A]">
                  What Am I Most Grateful For?
                </span>
                <RuledJournalTextarea
                  value={day.mostGratefulFor || ''}
                  onChange={(val) => update({ mostGratefulFor: val })}
                  placeholder="The blessings, shifts, and peace gained..."
                  rows={2}
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-serif font-bold text-[#075B3A]">
                  What Have I Learned About Myself?
                </span>
                <RuledJournalTextarea
                  value={day.learnedAboutSelf || ''}
                  onChange={(val) => update({ learnedAboutSelf: val })}
                  placeholder="My resilience, needs, true voice..."
                  rows={2}
                />
              </div>
            </div>
          </JournalSectionPanel>

          {/* Section 2: My Key Takeaways */}
          <JournalSectionPanel
            number={4}
            title="2. My Key Takeaways (5 Independent Fields)"
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
                    placeholder={`Key Takeaway ${idx + 1}...`}
                    className="w-full text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </JournalSectionPanel>

          {/* Section 3: My Commitment Going Forward */}
          <JournalSectionPanel
            number={5}
            title="3. My Commitment Going Forward (3 Independent Fields)"
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
            number={6}
            title="4. A Letter to My Future Self"
            instruction="Write a message to read 3 months from now, reminding yourself of your strength and peace:"
          >
            <RuledJournalTextarea
              value={day.letterToFutureSelf || ''}
              onChange={(val) => update({ letterToFutureSelf: val })}
              placeholder="Dear Future Me, remember how peaceful you felt when you honored your truth..."
              rows={4}
            />
          </JournalSectionPanel>

          {/* Section 5: Today's Affirmation */}
          <AffirmationCard
            affirmation="I am proud of my progress. I choose to continue this journey with an open heart."
            label="Section 7 • Today's Affirmation"
          />

          {/* Section 6: My Vision Ahead / For the Next 3–6 Months */}
          <JournalSectionPanel
            number={8}
            title="5. My Vision Ahead / For the Next 3–6 Months"
            instruction="Describe the life you will continue to build from this place of grounded inner peace:"
          >
            <RuledJournalTextarea
              value={day.visionAhead || ''}
              onChange={(val) => update({ visionAhead: val })}
              placeholder="My vision for the coming months is..."
              rows={3}
            />

            {/* Sunrise Mountain Artwork Composition per original reference */}
            <div className="mt-3 relative h-24 sm:h-28 w-full rounded-xl overflow-hidden bg-gradient-to-t from-[#075B3A] via-[#1b6b4e] to-[#F8F5EA] flex items-end justify-center p-3 select-none">
              <div className="absolute top-2 w-16 h-16 rounded-full bg-[#ecd07a]/40 blur-xs" />
              <div className="absolute top-4 w-10 h-10 rounded-full bg-[#D9A441] shadow-md" />

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

          <SmallActionBox
            actionText="Place both hands over your heart, take three deep grounding breaths, and thank yourself for completing 21 days."
            isDone={!!day.smallActionDone}
            onToggle={() => update({ smallActionDone: !day.smallActionDone })}
          />

          <DiscoveredTodaySection
            value={day.discoveredToday || ''}
            onChange={(val) => update({ discoveredToday: val })}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
