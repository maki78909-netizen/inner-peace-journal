/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { JournalProvider, useJournal } from './context/JournalContext';
import { RegistrationPage } from './components/pages/RegistrationPage';
import { CoverPage } from './components/pages/CoverPage';
import { DayView } from './components/pages/DayView';
import { ScorecardPage } from './components/pages/ScorecardPage';
import { DeclarationPage } from './components/pages/DeclarationPage';
import { BackCoverPage } from './components/pages/BackCoverPage';
import { JournalMenuDrawer } from './components/layout/JournalMenuDrawer';
import { ResetModal } from './components/modals/ResetModal';

const JournalMain: React.FC = () => {
  const { state, userRegistration, resetJournal } = useJournal();
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // If not yet registered, display mandatory Registration Page before Cover Page
  if (!userRegistration) {
    return <RegistrationPage />;
  }

  const screen = state.currentScreen;

  // Render the current journal screen
  const renderCurrentScreen = () => {
    if (screen === 0) {
      return <CoverPage onOpenIndex={() => setIsIndexOpen(true)} />;
    }
    if (screen >= 1 && screen <= 21) {
      return (
        <DayView
          key={screen}
          dayNum={screen}
          onOpenIndex={() => setIsIndexOpen(true)}
        />
      );
    }
    if (screen === 22) {
      return <ScorecardPage onOpenIndex={() => setIsIndexOpen(true)} />;
    }
    if (screen === 23) {
      return <DeclarationPage onOpenIndex={() => setIsIndexOpen(true)} />;
    }
    if (screen === 24) {
      return <BackCoverPage onOpenIndex={() => setIsIndexOpen(true)} />;
    }
    return <CoverPage onOpenIndex={() => setIsIndexOpen(true)} />;
  };

  return (
    <div className="min-h-screen bg-[#f3efe6] text-[#1c2e26] flex flex-col items-center justify-start px-1.5 py-1 sm:p-4 selection:bg-[#D9A441]/30 selection:text-[#064A32] overflow-x-hidden w-full">
      {/* Central A4 Portrait Journal Canvas */}
      <main className="w-full max-w-4xl flex justify-center">
        {renderCurrentScreen()}
      </main>

      {/* 24-Screen Index Drawer */}
      <JournalMenuDrawer
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        onOpenReset={() => setIsResetOpen(true)}
      />

      {/* Confirmed Reset Modal */}
      <ResetModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={resetJournal}
      />
    </div>
  );
};

export default function App() {
  return (
    <JournalProvider>
      <JournalMain />
    </JournalProvider>
  );
}
