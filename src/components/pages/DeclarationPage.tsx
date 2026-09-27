import React from 'react';
import { useJournal } from '../../context/JournalContext';
import { JournalHeader } from '../layout/JournalHeader';
import { JournalFooter } from '../layout/JournalFooter';
import { JournalSectionPanel } from '../common/JournalSectionPanel';
import { RuledJournalTextarea } from '../common/RuledJournalTextarea';
import { CheckCircle2, Feather, Printer, Sparkles, ArrowRight } from 'lucide-react';

export const DeclarationPage: React.FC<{ onOpenIndex?: () => void }> = ({ onOpenIndex }) => {
  const { state, updateDeclaration, nextScreen, triggerConfetti } = useJournal();
  const declaration = state.declaration;

  const updateLearning = (idx: number, val: string) => {
    const next = [...(declaration.keyLearnings || ['', '', '', '', ''])];
    next[idx] = val;
    updateDeclaration({ keyLearnings: next });
  };

  const toggleCommitment = (idx: number) => {
    const list = [...(declaration.personalCommitments || [])];
    if (list[idx]) {
      list[idx] = { ...list[idx], checked: !list[idx].checked };
      updateDeclaration({ personalCommitments: list });
    }
  };

  const updateCommitmentText = (idx: number, text: string) => {
    const list = [...(declaration.personalCommitments || [])];
    if (list[idx]) {
      list[idx] = { ...list[idx], text };
      updateDeclaration({ personalCommitments: list });
    }
  };

  const handleSeal = () => {
    updateDeclaration({ committed: true });
    triggerConfetti();
  };

  return (
    <article className="journal-sheet max-w-[840px] w-full min-h-[1100px] bg-white rounded-3xl mx-auto flex flex-col justify-between overflow-hidden relative shadow-xl border border-[#ebd89b]/60 my-2 sm:my-6 print:m-0 print:border-none print:shadow-none">
      {/* Header */}
      <JournalHeader
        inspirationalQuote={'My Sacred Promise\nTo My Peace'}
        onOpenIndex={onOpenIndex}
      />

      {/* Main Content Area */}
      <div className="flex-1 px-4 sm:px-8 py-3 space-y-4 sm:space-y-5">
        {/* Title Area */}
        <div className="text-center space-y-1.5 pt-2 pb-1 border-b border-[#ebd89b]/40">
          <div className="flex items-center justify-between no-print">
            <span className="font-serif font-black tracking-[0.25em] text-[#D9A441] text-xs uppercase">
              SCREEN 23 • PERSONAL MANIFESTO
            </span>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1 text-[11px] text-[#075B3A] border border-[#075B3A]/30 rounded-lg px-2 py-0.5 hover:bg-[#eaf2ea]"
            >
              <Printer className="w-3 h-3 text-[#D9A441]" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#075B3A] uppercase tracking-wide leading-tight">
            INNER PEACE DECLARATION
          </h2>
          <p className="font-sans font-medium text-[10px] sm:text-xs text-[#526b5d] tracking-[0.2em] uppercase">
            MY VISION &nbsp;•&nbsp; MY COMMITMENT &nbsp;•&nbsp; MY NEXT CHAPTER
          </p>
        </div>

        {/* Section 1: My Key Learnings */}
        <JournalSectionPanel
          number={1}
          title="My Key Learnings"
          instruction="The five most essential truths you discovered during this journey:"
        >
          <div className="space-y-1.5">
            {(declaration.keyLearnings || ['', '', '', '', '']).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#eaf2ea] text-[#075B3A] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateLearning(idx, e.target.value)}
                  placeholder={`Learning ${idx + 1}...`}
                  className="w-full text-xs sm:text-sm font-sans bg-transparent border-b border-[#d8e2d8] focus:border-[#D9A441] py-1 text-[#1a3327] focus:outline-none"
                />
              </div>
            ))}
          </div>
        </JournalSectionPanel>

        {/* Section 2: Positive Changes I Notice in Myself */}
        <JournalSectionPanel
          number={2}
          title="Positive Changes I Notice in Myself"
          instruction="Changes in your mind, heart, reactions, somatic ease, and relationships:"
        >
          <RuledJournalTextarea
            value={declaration.positiveChanges || ''}
            onChange={(val) => updateDeclaration({ positiveChanges: val })}
            placeholder="I notice that I now..."
            rows={3}
          />
        </JournalSectionPanel>

        {/* Section 3: Challenges I Overcame */}
        <JournalSectionPanel
          number={3}
          title="Challenges I Overcame"
          instruction="Resistance, old habits, self-doubt, or difficult memories you embraced:"
        >
          <RuledJournalTextarea
            value={declaration.challengesOvercome || ''}
            onChange={(val) => updateDeclaration({ challengesOvercome: val })}
            placeholder="I had the courage to face..."
            rows={3}
          />
        </JournalSectionPanel>

        {/* Section 4: How I Want to Show Up Going Forward */}
        <JournalSectionPanel
          number={4}
          title="How I Want to Show Up Going Forward"
          instruction="Your presence with yourself, your loved ones, and during uncertain moments:"
        >
          <RuledJournalTextarea
            value={declaration.howToShowUp || ''}
            onChange={(val) => updateDeclaration({ howToShowUp: val })}
            placeholder="I will show up with gentle firmness, presence, and..."
            rows={3}
          />
        </JournalSectionPanel>

        {/* Section 5: My Personal Commitments */}
        <JournalSectionPanel
          number={5}
          title="My Personal Commitments"
          instruction="Tick each sacred agreement you make with yourself for this next chapter:"
        >
          <div className="space-y-2">
            {(declaration.personalCommitments || []).map((c, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                  c.checked ? 'bg-[#eaf4ec] border-[#9fd5b1]' : 'bg-white border-[#e4ded0]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleCommitment(idx)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 shrink-0 cursor-pointer ${
                    c.checked
                      ? 'bg-[#075B3A] border-[#075B3A] text-[#D9A441]'
                      : 'border-[#8da595] bg-white'
                  }`}
                  aria-label={`Toggle commitment ${idx + 1}`}
                >
                  {c.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="text"
                  value={c.text}
                  onChange={(e) => updateCommitmentText(idx, e.target.value)}
                  className="w-full text-xs sm:text-sm font-sans text-[#1a3327] bg-transparent focus:outline-none focus:border-b focus:border-[#D9A441] py-0.5"
                />
              </div>
            ))}
          </div>
        </JournalSectionPanel>

        {/* Section 6: My Inner Peace Vision */}
        <JournalSectionPanel
          number={6}
          title="My Inner Peace Vision"
          instruction="Describe the calmer, healthier and more meaningful life you will lead:"
        >
          <RuledJournalTextarea
            value={declaration.innerPeaceVision || ''}
            onChange={(val) => updateDeclaration({ innerPeaceVision: val })}
            placeholder="In my vision of sustainable inner peace..."
            rows={4}
          />
        </JournalSectionPanel>

        {/* Section 7: A Message to My Future Self */}
        <JournalSectionPanel
          number={7}
          title="A Message to My Future Self"
          instruction="Remind your future self of the sacred inner light you uncovered:"
        >
          <RuledJournalTextarea
            value={declaration.messageToFutureSelf || ''}
            onChange={(val) => updateDeclaration({ messageToFutureSelf: val })}
            placeholder="Dear Future Me, when you read this..."
            rows={4}
          />
        </JournalSectionPanel>

        {/* Section 8: My Signature of Commitment */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#faf6eb] to-[#f4ecd6] border-2 border-[#D9A441] space-y-4 shadow-sm">
          <div className="text-center space-y-1">
            <Feather className="w-5 h-5 text-[#D9A441] mx-auto" />
            <h3 className="font-serif font-bold text-xl text-[#075B3A] uppercase tracking-wide">
              Section 8 • My Signature of Commitment
            </h3>
            <p className="text-xs text-[#6e581e] font-sans">
              Sign below to seal your commitment to inner awareness and self-compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-serif font-bold text-[#075B3A] uppercase">
                My Name:
              </label>
              <input
                type="text"
                value={declaration.name || ''}
                onChange={(e) => updateDeclaration({ name: e.target.value })}
                placeholder="Your full name"
                className="w-full text-sm font-sans bg-white border border-[#D9A441]/50 rounded-xl px-3 py-2 text-[#1a3327] focus:outline-none focus:ring-1 focus:ring-[#D9A441]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-serif font-bold text-[#075B3A] uppercase">
                Date:
              </label>
              <input
                type="date"
                value={declaration.date || ''}
                onChange={(e) => updateDeclaration({ date: e.target.value })}
                className="w-full text-sm font-sans bg-white border border-[#D9A441]/50 rounded-xl px-3 py-2 text-[#1a3327] focus:outline-none focus:ring-1 focus:ring-[#D9A441]"
              />
            </div>
          </div>

          {/* Digital Signature in authentic cursive script */}
          <div className="space-y-1">
            <label className="text-xs font-serif font-bold text-[#075B3A] uppercase">
              Digital Signature (Type your name):
            </label>
            <div className="relative">
              <input
                type="text"
                value={declaration.signature || ''}
                onChange={(e) => updateDeclaration({ signature: e.target.value })}
                placeholder="Type your name to digitally sign"
                className="w-full text-2xl sm:text-3xl font-script text-[#075B3A] bg-white border border-[#D9A441] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#D9A441] shadow-xs"
              />
              {declaration.signature && (
                <span className="absolute right-3.5 top-3 text-xs text-[#a37e1c] font-sans font-medium">
                  Signed ✒️
                </span>
              )}
            </div>
          </div>

          {/* Declaration Checkbox */}
          <div
            onClick={() => updateDeclaration({ committed: !declaration.committed })}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
              declaration.committed
                ? 'bg-[#075B3A] text-white border-[#075B3A]'
                : 'bg-white text-[#1a3327] border-[#D9A441]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
                declaration.committed
                  ? 'bg-[#D9A441] border-[#D9A441] text-[#064A32]'
                  : 'border-[#8da595] bg-white'
              }`}
            >
              {declaration.committed && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <span className="font-serif italic font-bold text-xs sm:text-sm">
              "I commit to continuing this journey with awareness, self-compassion and conscious action."
            </span>
          </div>

          {/* Seal Action */}
          <div className="pt-2 no-print flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleSeal}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#075B3A] text-[#F8F5EA] font-serif font-bold text-sm tracking-wider uppercase hover:bg-[#064A32] transition-colors cursor-pointer flex items-center justify-center gap-2 ring-1 ring-[#D9A441]"
            >
              <Sparkles className="w-4 h-4 text-[#D9A441]" />
              <span>Seal My Declaration</span>
            </button>

            <button
              type="button"
              onClick={nextScreen}
              className="py-3.5 px-6 rounded-xl bg-white border border-[#D9A441] text-[#075B3A] font-serif font-bold text-sm tracking-wider uppercase hover:bg-[#faf6eb] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>View Back Cover</span>
              <ArrowRight className="w-4 h-4 text-[#D9A441]" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <JournalFooter />
    </article>
  );
};
