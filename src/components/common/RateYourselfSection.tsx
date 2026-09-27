import React from 'react';
import { RatingScale } from './RatingScale';

export interface DayRatings {
  overallMood?: number;
  energyLevel?: number;
  mentalClarity?: number;
  selfCompassion?: number;
  [key: string]: number | undefined;
}

interface RateYourselfSectionProps {
  ratings?: DayRatings;
  onChange: (field: string, val: number) => void;
  title?: string;
  instruction?: string;
}

export const RateYourselfSection: React.FC<RateYourselfSectionProps> = ({
  ratings = {},
  onChange,
  title = 'Rate Yourself Today (1–10 Scale)',
  instruction = 'Rate yourself on a scale of 1 to 10 for each dimension today:',
}) => {
  return (
    <div className="space-y-2">
      <span className="block text-xs font-serif font-bold text-[#075B3A] uppercase tracking-wider">
        {title}
      </span>
      {instruction && (
        <p className="text-xs text-[#526b5d] italic -mt-1">{instruction}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <RatingScale
          label="Overall Mood"
          value={ratings.overallMood || 0}
          onChange={(val) => onChange('overallMood', val)}
          max={10}
          lowLabel="Low"
          highLabel="Peaceful"
        />
        <RatingScale
          label="Energy Level"
          value={ratings.energyLevel || 0}
          onChange={(val) => onChange('energyLevel', val)}
          max={10}
          lowLabel="Drained"
          highLabel="Vibrant"
        />
        <RatingScale
          label="Mental Clarity"
          value={ratings.mentalClarity || 0}
          onChange={(val) => onChange('mentalClarity', val)}
          max={10}
          lowLabel="Foggy"
          highLabel="Clear"
        />
        <RatingScale
          label="Self-Compassion"
          value={ratings.selfCompassion || 0}
          onChange={(val) => onChange('selfCompassion', val)}
          max={10}
          lowLabel="Critical"
          highLabel="Loving"
        />
      </div>
    </div>
  );
};
