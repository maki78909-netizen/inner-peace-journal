import React from 'react';
import { Smile, Meh, Frown, Sparkles, Flame, Wind } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: string;
  onChange: (mood: string) => void;
  label?: string;
}

interface MoodItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MOODS: MoodItem[] = [
  { id: 'Happy', label: 'Happy', icon: Smile },
  { id: 'Calm', label: 'Calm', icon: Sparkles },
  { id: 'Neutral', label: 'Neutral', icon: Meh },
  { id: 'Sad', label: 'Sad', icon: Frown },
  { id: 'Anxious', label: 'Anxious', icon: Wind },
  { id: 'Angry', label: 'Angry', icon: Flame },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onChange,
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <span className="block text-xs font-serif font-bold text-[#075B3A] uppercase tracking-wider">
          {label}
        </span>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {MOODS.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onChange(isSelected ? '' : mood.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer min-h-[58px] select-none ${
                isSelected
                  ? 'bg-[#075B3A] text-[#F8F5EA] border-[#D9A441] ring-2 ring-[#D9A441] shadow-xs'
                  : 'bg-white text-[#2a4436] border-[#d8e2da] hover:bg-[#f2f7f3] hover:border-[#b9cebe]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#D9A441]' : 'text-[#075B3A]'}`} />
              <span className="text-xs font-semibold tracking-wide">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
