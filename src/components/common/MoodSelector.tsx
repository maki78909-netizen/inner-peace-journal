import React from 'react';
import { Check } from 'lucide-react';

export interface MoodSelectorProps {
  selectedMoods?: string[];
  selectedMood?: string; // backwards compatibility
  onChangeMoods?: (moods: string[]) => void;
  onChange?: (mood: string) => void; // backwards compatibility
  otherMood?: string;
  onChangeOtherMood?: (other: string) => void;
  label?: string;
  instruction?: string;
  allowMultiple?: boolean;
}

interface MoodItem {
  id: string;
  label: string;
  emoji: string;
}

const CORE_MOODS: MoodItem[] = [
  { id: 'Happy', label: 'Happy', emoji: '😊' },
  { id: 'Calm', label: 'Calm', emoji: '😌' },
  { id: 'Neutral', label: 'Neutral', emoji: '😐' },
  { id: 'Sad', label: 'Sad', emoji: '😔' },
  { id: 'Anxious', label: 'Anxious', emoji: '😰' },
  { id: 'Angry', label: 'Angry', emoji: '😡' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMoods,
  selectedMood,
  onChangeMoods,
  onChange,
  otherMood = '',
  onChangeOtherMood,
  label = "Today's Emotional Check-In",
  instruction = 'Select the emotional state that best describes your inner weather right now. You can choose more than one:',
  allowMultiple = true,
}) => {
  // Normalize selected moods to an array
  const activeMoods: string[] = React.useMemo(() => {
    if (Array.isArray(selectedMoods)) return selectedMoods;
    if (selectedMood) return [selectedMood];
    return [];
  }, [selectedMoods, selectedMood]);

  const handleToggle = (moodId: string) => {
    let next: string[];
    if (allowMultiple) {
      if (activeMoods.includes(moodId)) {
        next = activeMoods.filter((m) => m !== moodId);
      } else {
        next = [...activeMoods, moodId];
      }
    } else {
      next = activeMoods.includes(moodId) ? [] : [moodId];
    }

    if (onChangeMoods) {
      onChangeMoods(next);
    }
    if (onChange) {
      onChange(next[0] || '');
    }
  };

  const isOtherActive = activeMoods.includes('Other');

  return (
    <div className="space-y-2.5">
      {label && (
        <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-1">
          <span className="block text-xs font-serif font-bold text-[#075B3A] uppercase tracking-wider">
            {label}
          </span>
          {allowMultiple && (
            <span className="text-[11px] text-[#748e80] italic">
              (You can choose more than one)
            </span>
          )}
        </div>
      )}

      {instruction && (
        <p className="text-xs text-[#526b5d] italic -mt-1">{instruction}</p>
      )}

      {/* Mood grid: 6 Core Moods with expressive emojis + Other */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {CORE_MOODS.map((mood) => {
          const isSelected = activeMoods.includes(mood.id);
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => handleToggle(mood.id)}
              aria-label={`Select mood: ${mood.label}`}
              className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer min-h-[72px] select-none ${
                isSelected
                  ? 'bg-[#075B3A] text-[#F8F5EA] border-[#D9A441] ring-2 ring-[#D9A441] shadow-xs scale-[1.03]'
                  : 'bg-white text-[#2a4436] border-[#d8e2da] hover:bg-[#f2f7f3] hover:border-[#b9cebe] hover:shadow-2xs'
              }`}
            >
              {isSelected && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D9A441] text-[#075B3A] flex items-center justify-center shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
              <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-xs transition-transform transform active:scale-125">
                {mood.emoji}
              </span>
              <span className="text-xs font-semibold tracking-wide">{mood.label}</span>
            </button>
          );
        })}

        {/* The 'Other' Mood Option */}
        <button
          type="button"
          onClick={() => handleToggle('Other')}
          aria-label="Select custom or other mood"
          className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer min-h-[72px] select-none ${
            isOtherActive
              ? 'bg-[#075B3A] text-[#F8F5EA] border-[#D9A441] ring-2 ring-[#D9A441] shadow-xs scale-[1.03]'
              : 'bg-white text-[#2a4436] border-[#d8e2da] hover:bg-[#f2f7f3] hover:border-[#b9cebe] hover:shadow-2xs'
          }`}
        >
          {isOtherActive && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#D9A441] text-[#075B3A] flex items-center justify-center shadow-xs">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
          )}
          <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-xs transition-transform transform active:scale-125">
            💭
          </span>
          <span className="text-xs font-semibold tracking-wide">Other...</span>
        </button>
      </div>

      {/* Expanded Text Field for Other */}
      {isOtherActive && (
        <div className="pt-1.5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 bg-[#faf7ee] p-2.5 rounded-xl border border-[#ebd89b]">
            <span className="text-xs font-serif font-bold text-[#8e6e18] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <span>💭</span>
              <span>Other Emotion:</span>
            </span>
            <input
              type="text"
              value={otherMood}
              onChange={(e) => onChangeOtherMood && onChangeOtherMood(e.target.value)}
              placeholder="Describe your emotion (e.g. Grateful, Hopeful, Tender, Overwhelmed)..."
              className="w-full text-xs font-sans bg-white border border-[#d8e2d8] focus:border-[#D9A441] rounded-lg px-2.5 py-1.5 text-[#1a3327] focus:outline-none shadow-2xs"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};
