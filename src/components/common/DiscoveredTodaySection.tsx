import React from 'react';
import { JournalSectionPanel } from './JournalSectionPanel';
import { RuledJournalTextarea } from './RuledJournalTextarea';

interface DiscoveredTodaySectionProps {
  value: string;
  onChange: (val: string) => void;
  number?: number;
  placeholder?: string;
  instruction?: string;
}

export const DiscoveredTodaySection: React.FC<DiscoveredTodaySectionProps> = ({
  value,
  onChange,
  number,
  placeholder = 'Writing on these lines, I realized that...',
  instruction = 'Reflect freely on your emotions, resistance, breakthroughs, or peace as you completed today’s practice:',
}) => {
  return (
    <JournalSectionPanel
      number={number}
      title="What I Discovered Today"
      instruction={instruction}
    >
      <RuledJournalTextarea
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
      />
    </JournalSectionPanel>
  );
};
