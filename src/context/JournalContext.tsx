import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  JournalState,
  DayData,
  ScorecardData,
  DeclarationData,
  UserRegistration,
} from '../types/journal';
import {
  createInitialJournalState,
  createDefaultDayData,
  JOURNAL_24_SCREENS,
  ScreenMeta,
} from '../utils/defaultData';
import { validateDayCompletion, DayValidationResult } from '../utils/dayValidator';

const STORAGE_KEY = 'path_to_inner_peace_master_v2';
const REGISTRATION_KEY = 'path_to_inner_peace_registration_v1';

interface JournalContextType {
  state: JournalState;
  userRegistration: UserRegistration | null;
  saveStatus: 'saved' | 'saving';
  currentScreenMeta: ScreenMeta;
  totalScreens: number;
  completedDaysCount: number;
  overallProgress: number;
  validationError: { screen: number; missingFields: string[] } | null;
  clearValidationError: () => void;
  setScreen: (screenNumber: number) => void;
  nextScreen: () => boolean; // returns false if blocked by validation
  prevScreen: () => void;
  updateDayData: (dayNum: number, partialData: Partial<DayData>) => void;
  updateScorecard: (partial: Partial<ScorecardData>) => void;
  updateDeclaration: (partial: Partial<DeclarationData>) => void;
  completeDay: (dayNum: number) => boolean; // returns false if blocked by validation
  resetDayFields: (dayNum: number) => void;
  resetJournal: () => void;
  registerUser: (data: UserRegistration) => Promise<boolean>;
  exportJournalJson: () => void;
  triggerConfetti: () => void;
  isDayValid: (dayNum: number) => DayValidationResult;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRegistration, setUserRegistration] = useState<UserRegistration | null>(() => {
    try {
      const reg = localStorage.getItem(REGISTRATION_KEY);
      if (reg) {
        return JSON.parse(reg);
      }
    } catch (e) {
      console.error('Failed to parse registration from storage', e);
    }
    return null;
  });

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

  const [validationError, setValidationError] = useState<{
    screen: number;
    missingFields: string[];
  } | null>(null);

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

  const isDayValid = (dayNum: number): DayValidationResult => {
    const dayData = state.days[dayNum];
    return validateDayCompletion(dayNum, dayData);
  };

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

  const clearValidationError = () => {
    setValidationError(null);
  };

  const setScreen = (screenNumber: number) => {
    const clamped = Math.max(0, Math.min(24, screenNumber));
    setValidationError(null);
    setState((prev) => ({
      ...prev,
      currentScreen: clamped,
      lastUpdated: new Date().toISOString(),
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextScreen = (): boolean => {
    // If on a Day screen (1 to 21), validate that all fields are filled before allowing advance!
    const screen = state.currentScreen;
    if (screen >= 1 && screen <= 21) {
      const validation = isDayValid(screen);
      if (!validation.isComplete) {
        setValidationError({
          screen,
          missingFields: validation.missingFields,
        });
        return false;
      }
    }

    if (state.currentScreen < 24) {
      setScreen(state.currentScreen + 1);
      return true;
    }
    return true;
  };

  const prevScreen = () => {
    setValidationError(null);
    if (state.currentScreen > 0) {
      setScreen(state.currentScreen - 1);
    }
  };

  const updateDayData = (dayNum: number, partialData: Partial<DayData>) => {
    // When user types in fields, clear error if matching current screen
    if (validationError && validationError.screen === dayNum) {
      setValidationError(null);
    }

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

  const completeDay = (dayNum: number): boolean => {
    // Validate first!
    const validation = isDayValid(dayNum);
    if (!validation.isComplete) {
      setValidationError({
        screen: dayNum,
        missingFields: validation.missingFields,
      });
      return false;
    }

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

      // Also mark Journaling practice in scorecard
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

    return true;
  };

  // Reset a single day's fields so user can rewrite them afresh
  const resetDayFields = (dayNum: number) => {
    setState((prev) => {
      const updatedDays = {
        ...prev.days,
        [dayNum]: createDefaultDayData(dayNum),
      };
      const updatedCompleted = (prev.completedDays || []).filter((d) => d !== dayNum);

      return {
        ...prev,
        days: updatedDays,
        completedDays: updatedCompleted,
        lastUpdated: new Date().toISOString(),
      };
    });
    setValidationError(null);
  };

  const resetJournal = () => {
    const fresh = createInitialJournalState();
    localStorage.removeItem(STORAGE_KEY);
    setState(fresh);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const registerUser = async (data: UserRegistration): Promise<boolean> => {
    try {
      localStorage.setItem(REGISTRATION_KEY, JSON.stringify(data));
      setUserRegistration(data);

      // Attempt to submit registration to FormSubmit for mchatterjee69@gmail.com
      try {
        const response = await fetch('https://formsubmit.co/ajax/mchatterjee69@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            whatsapp: data.whatsappNumber,
            email: data.email,
            _subject: `New Journal Registration: ${data.name}`,
            _template: 'table',
            source: '21-Day Inner Healing Journal',
            registeredAt: data.registeredAt,
          }),
        });

        if (response.ok) {
          console.log('Registration submitted to FormSubmit successfully');
        } else {
          console.warn('FormSubmit responded with status', response.status);
        }
      } catch (submitErr) {
        // FormSubmit network/CORS fallback - data is safely saved in local storage
        console.warn('FormSubmit network submission caught fallback:', submitErr);
      }

      return true;
    } catch (err) {
      console.error('Registration storage error', err);
      return false;
    }
  };

  const exportJournalJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
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
        userRegistration,
        saveStatus,
        currentScreenMeta,
        totalScreens,
        completedDaysCount,
        overallProgress,
        validationError,
        clearValidationError,
        setScreen,
        nextScreen,
        prevScreen,
        updateDayData,
        updateScorecard,
        updateDeclaration,
        completeDay,
        resetDayFields,
        resetJournal,
        registerUser,
        exportJournalJson,
        triggerConfetti,
        isDayValid,
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
