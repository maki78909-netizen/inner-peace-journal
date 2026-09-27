export type MoodType = 'Happy' | 'Calm' | 'Neutral' | 'Sad' | 'Anxious' | 'Angry';

export type TrackerCellState = 0 | 1 | 2; // 0 = not completed, 1 = partial, 2 = completed

export interface TriggerRow {
  trigger: string;
  whatHappened: string;
  emotion: string;
  thought: string;
  reaction: string;
}

export interface BeliefRow {
  recurringThought: string;
  classification: 'Fact' | 'Interpretation' | 'Fear' | '';
  balancedPerspective: string;
}

export interface HabitItem {
  habit: string;
  whyItMatters: string;
  obstacle: string;
  solution: string;
}

export interface ValueItem {
  value: string;
  howToLive: string;
}

export interface ThoughtTransformationRow {
  negativeThought: string;
  kinderThought: string;
}

export interface DayData {
  completed: boolean;
  completedAt?: string;
  practiceDone: boolean;
  notes?: string;
  [key: string]: any;
}

export interface ScorecardData {
  // 7 rows x 21 days grid of practice tracking
  practiceGrid: Record<string, TrackerCellState[]>;
  // 1-5 ratings
  ratings: {
    stressManagement: number;
    mentalClarity: number;
    emotionalBalance: number;
    selfConfidence: number;
    focusProductivity: number;
    betterSleep: number;
    selfCompassion: number;
    overallWellbeing: number;
  };
  biggestTakeaways: string[];
  proudOf: string[];
  nextSteps: string[];
}

export interface DeclarationData {
  keyLearnings: string[];
  positiveChanges: string;
  challengesOvercome: string;
  howToShowUp: string;
  personalCommitments: { text: string; checked: boolean }[];
  innerPeaceVision: string;
  messageToFutureSelf: string;
  name: string;
  date: string;
  signature: string;
  committed: boolean;
}

export interface JournalState {
  currentScreen: number; // 0 (Cover) to 24
  completedDays: number[];
  days: Record<number, DayData>;
  scorecard: ScorecardData;
  declaration: DeclarationData;
  personalIntention?: {
    name: string;
    date: string;
    intention: string;
  };
  lastUpdated: string;
}
