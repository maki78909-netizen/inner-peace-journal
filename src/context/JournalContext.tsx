import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  JournalState,
  DayData,
  ScorecardData,
  DeclarationData,
} from '../types/journal';
import { createInitialJournalState, JOURNAL_24_SCREENS, ScreenMeta } from '../utils/defaultData';

const STORAGE_KEY = 'path_to_inner_peace_master_v2';

interface JournalContextType {
  state: JournalState;
  saveStatus: 'saved' | 'saving';
  currentScreenMeta: ScreenMeta;
  totalScreens: number;
  completedDaysCount: number;
  overallProgress: number;
  setScreen: (screenNumber: number) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  updateDayData: (dayNum: number, partialData: Partial<DayData>) => void;
  updateScorecard: (partial: Partial<ScorecardData>) => void;
  updateDeclaration: (partial: Partial<DeclarationData>) => void;
  completeDay: (dayNum: number) => void;
  resetJournal: () => void;
  exportJournalJson: () => void;
  triggerConfetti: () => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<JournalState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const initial = createInitialJournalState();
        return {
          ...initial,
          ...parsed,
          scorecard: {
            ...initial.scorecard,
            ...(parsed.scorecard || {}),
            practiceGrid: { ...initial.scorecard.practiceGrid, ...(parsed.scorecard?.practiceGrid || {}) },
            ratings: { ...initial.scorecard.ratings, ...(parsed.scorecard?.ratings || {}) },
          },
          declaration: {
            ...initial.declaration,
            ...(parsed.declaration || {}),
            personalCommitments: parsed.declaration?.personalCommitments || initial.declaration.personalCommitments,
          },
          days: { ...initial.days, ...(parsed.days || {}) },
          completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
          currentScreen: typeof parsed.currentScreen === 'number' ? Math.max(0, Math.min(24, parsed.currentScreen)) : 0,
        };
      }
    } catch (e) {
      console.error('Failed to parse saved journal data', e);
    }
    return createInitialJournalState();
  });

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced auto-save to localStorage
  useEffect(() => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setSaveStatus('saved');
      } catch (err) {
        console.error('Failed to save to localStorage', err);
        setSaveStatus('saved');
      }
    }, 250);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state]);

  const totalScreens = 24;
  const currentScreenMeta =
    JOURNAL_24_SCREENS.find((s) => s.screen === state.currentScreen) || JOURNAL_24_SCREENS[0];

  const completedDaysCount = (state.completedDays || []).length;
  const declarationDone = state.declaration?.committed ? 1 : 0;
  const overallProgress = Math.min(
    100,
    Math.round(((completedDaysCount + declarationDone) / 22) * 100)
  );

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#075B3A', '#064A32', '#D9A441', '#ecd07a', '#ffffff'],
      });
    } catch (e) {
      // ignore in environments without canvas
    }
  };

  const setScreen = (screenNumber: number) => {
    const clamped = Math.max(0, Math.min(24, screenNumber));
    setState((prev) => ({
      ...prev,
      currentScreen: clamped,
      lastUpdated: new Date().toISOString(),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextScreen = () => {
    if (state.currentScreen < 24) {
      setScreen(state.currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (state.currentScreen > 0) {
      setScreen(state.currentScreen - 1);
    }
  };

  const updateDayData = (dayNum: number, partialData: Partial<DayData>) => {
    setState((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [dayNum]: {
          ...(prev.days[dayNum] || {}),
          ...partialData,
        },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateScorecard = (partial: Partial<ScorecardData>) => {
    setState((prev) => ({
      ...prev,
      scorecard: {
        ...prev.scorecard,
        ...partial,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateDeclaration = (partial: Partial<DeclarationData>) => {
    setState((prev) => ({
      ...prev,
      declaration: {
        ...prev.declaration,
        ...partial,
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const completeDay = (dayNum: number) => {
    setState((prev) => {
      const alreadyDone = (prev.completedDays || []).includes(dayNum);
      const nextCompleted = alreadyDone
        ? prev.completedDays
        : [...(prev.completedDays || []), dayNum];

      const updatedDays = {
        ...prev.days,
        [dayNum]: {
          ...(prev.days[dayNum] || {}),
          completed: true,
          completedAt: prev.days[dayNum]?.completedAt || new Date().toISOString(),
          practiceDone: true,
        },
      };

      // Also set Journaling / Self-Reflection in scorecard for this day to 2 (completed)
      const updatedGrid = { ...(prev.scorecard.practiceGrid || {}) };
      if (updatedGrid['Journaling / Self-Reflection']) {
        const row = [...updatedGrid['Journaling / Self-Reflection']];
        if (dayNum >= 1 && dayNum <= 21) {
          row[dayNum - 1] = 2;
          updatedGrid['Journaling / Self-Reflection'] = row;
        }
      }

      if (!alreadyDone) {
        triggerConfetti();
      }

      return {
        ...prev,
        completedDays: nextCompleted,
        days: updatedDays,
        scorecard: {
          ...prev.scorecard,
          practiceGrid: updatedGrid,
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const resetJournal = () => {
    const fresh = createInitialJournalState();
    localStorage.removeItem(STORAGE_KEY);
    setState(fresh);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportJournalJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `path_to_inner_peace_journal_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <JournalContext.Provider
      value={{
        state,
        saveStatus,
        currentScreenMeta,
        totalScreens,
        completedDaysCount,
        overallProgress,
        setScreen,
        nextScreen,
        prevScreen,
        updateDayData,
        updateScorecard,
        updateDeclaration,
        completeDay,
        resetJournal,
        exportJournalJson,
        triggerConfetti,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
