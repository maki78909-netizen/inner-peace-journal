/**
 * Validation rules for each of the 21 days in the Inner Healing Journal.
 * Ensures users complete all reflective exercises before advancing.
 */

export interface DayValidationResult {
  isComplete: boolean;
  missingCount: number;
  missingFields: string[];
}

const isNonEmpty = (val: any): boolean => {
  if (typeof val === 'string') {
    return val.trim().length > 0;
  }
  return Boolean(val);
};

export const validateDayCompletion = (dayNum: number, dayData: any): DayValidationResult => {
  if (!dayData) {
    return {
      isComplete: false,
      missingCount: 1,
      missingFields: ['Day worksheet not filled'],
    };
  }

  const missing: string[] = [];

  // 1. Mood Check-In Check (applies to all days with an emotional check-in)
  const hasMood =
    (Array.isArray(dayData.moods) && dayData.moods.length > 0) ||
    isNonEmpty(dayData.mood) ||
    isNonEmpty(dayData.moodOther);
  if (!hasMood) {
    missing.push("Today's Emotional Check-In (select at least one mood)");
  }

  // 2. Day-Specific Required Fields
  switch (dayNum) {
    case 1:
      if (!isNonEmpty(dayData.feelingToday)) missing.push("1. How you're feeling today");
      if (!isNonEmpty(dayData.occupyingMind)) missing.push('2. What is occupying your mind');
      if (!isNonEmpty(dayData.unsettledPart)) missing.push('3. What feels unsettled right now');
      if (!isNonEmpty(dayData.wishUnderstood)) missing.push('4. What you wish someone understood');
      if (!isNonEmpty(dayData.honestAdmit)) missing.push('5. What you honestly admit');
      break;

    case 2:
      if (Array.isArray(dayData.triggerRows)) {
        const filledRows = dayData.triggerRows.filter(
          (r: any) =>
            isNonEmpty(r.trigger) ||
            isNonEmpty(r.whatHappened) ||
            isNonEmpty(r.emotion) ||
            isNonEmpty(r.thought)
        );
        if (filledRows.length === 0) {
          missing.push('At least one emotional trigger scenario');
        }
      } else {
        missing.push('Trigger reflection scenario');
      }
      if (!isNonEmpty(dayData.patternNoticed) && !isNonEmpty(dayData.reflection)) {
        missing.push('Reflection on trigger patterns');
      }
      break;

    case 3:
      if (Array.isArray(dayData.beliefs)) {
        const filledBeliefs = dayData.beliefs.filter(
          (b: any) => isNonEmpty(b.recurringThought) || isNonEmpty(b.balancedPerspective)
        );
        if (filledBeliefs.length === 0) {
          missing.push('At least one recurring belief & balanced perspective');
        }
      } else {
        missing.push('Belief log');
      }
      if (!isNonEmpty(dayData.whoWouldIBecome) && !isNonEmpty(dayData.energySpentDefending)) {
        missing.push('Reflection on letting go of limiting stories');
      }
      break;

    case 4:
      if (!isNonEmpty(dayData.mistakeSelfTalk)) missing.push('1. Self-talk when making a mistake');
      if (!isNonEmpty(dayData.learnedSelfTalk)) missing.push('2. Where you learned that voice');
      if (!isNonEmpty(dayData.speakToLovedOne)) missing.push('3. Would you speak this way to someone you love');
      if (!isNonEmpty(dayData.compassionateResponse)) missing.push('4. Compassionate, honest response');
      break;

    case 5:
      if (!isNonEmpty(dayData.suppressedEmotion)) missing.push('1. Emotion you avoid expressing');
      if (!isNonEmpty(dayData.whyAvoid)) missing.push('2. Why you avoid it');
      if (!isNonEmpty(dayData.fearOfExpressing)) missing.push('3. Fear of expressing it');
      if (!isNonEmpty(dayData.physicalLocation)) missing.push('4. Body awareness: where tension is felt');
      if (!isNonEmpty(dayData.emotionNeeds)) missing.push('5. What this emotion is asking for');
      break;

    case 6:
      if (!isNonEmpty(dayData.whatHappened)) missing.push('1. Painful event or memory');
      if (!isNonEmpty(dayData.feltThen)) missing.push('2. What you felt then');
      if (!isNonEmpty(dayData.neededThen)) missing.push('3. What you needed then');
      if (!isNonEmpty(dayData.understandToday)) missing.push('4. What you understand today');
      if (!isNonEmpty(dayData.giveMyselfNow)) missing.push('5. What you can give yourself now');
      break;

    case 7:
      if (!isNonEmpty(dayData.discoveredThisWeek)) missing.push('1. What you discovered this week');
      if (!isNonEmpty(dayData.patternNoticed)) missing.push('2. Emotional pattern noticed');
      if (!isNonEmpty(dayData.perspectiveShift)) missing.push('3. Shift in perspective');
      break;

    case 8:
      if (!isNonEmpty(dayData.letterToYoungerMe)) missing.push('1. Letter to your younger self');
      if (!isNonEmpty(dayData.whatIWishIHear)) missing.push('2. What younger you needed to hear');
      if (!isNonEmpty(dayData.whatWasntMyFault)) missing.push("3. What wasn't your fault");
      if (!isNonEmpty(dayData.whatIAppreciate)) missing.push('4. What you appreciate about younger self');
      break;

    case 9:
      if (!isNonEmpty(dayData.blameMyselfFor)) missing.push('1. What you have blamed yourself for');
      if (!isNonEmpty(dayData.knowNowNotThen)) missing.push('2. What you know now that you did not then');
      if (!isNonEmpty(dayData.learnNotPunish)) missing.push('3. How to learn without punishing yourself');
      if (!dayData.statementAgreed) missing.push('Acceptance of self-forgiveness checkbox');
      break;

    case 10:
      if (!isNonEmpty(dayData.repeatedlyTryingToControl)) missing.push('1. What you repeatedly try to control');
      if (!isNonEmpty(dayData.consciouslyRelease)) missing.push('2. What you choose to consciously release');
      break;

    case 11:
      if (!isNonEmpty(dayData.tolerateDontWant)) missing.push('1. What you tolerate that drains your peace');
      if (!isNonEmpty(dayData.boundaryNeed)) missing.push('2. The healthy boundary you need');
      if (!isNonEmpty(dayData.afraidIfSet)) missing.push('3. What you fear will happen if set');
      if (!isNonEmpty(dayData.todayBoundary)) missing.push("4. Today's concrete boundary action");
      break;

    case 12:
      if (!isNonEmpty(dayData.seekApproval)) missing.push('Approval-seeking assessment');
      if (!isNonEmpty(dayData.avoidDifficultConversations)) missing.push('Difficult conversations assessment');
      if (!isNonEmpty(dayData.overGive)) missing.push('Over-giving assessment');
      if (!isNonEmpty(dayData.patternToChange)) missing.push('Relationship pattern you want to shift');
      break;

    case 13:
      if (!isNonEmpty(dayData.gratitudeItem1) && (!dayData.gratitudeItems || !dayData.gratitudeItems[0])) {
        missing.push('At least one gratitude reflection');
      }
      if (!isNonEmpty(dayData.whyMatter)) missing.push('Why these blessings matter to you');
      if (!isNonEmpty(dayData.todayGratitudeAction)) missing.push("Today's gratitude action");
      break;

    case 14:
      if (Array.isArray(dayData.appreciateAboutSelf)) {
        const filled = dayData.appreciateAboutSelf.filter((a: string) => isNonEmpty(a));
        if (filled.length < 2) missing.push('At least two qualities you appreciate in yourself');
      } else {
        missing.push('Self-appreciation entries');
      }
      if (!isNonEmpty(dayData.imperfectionsToAccept)) missing.push('Imperfections you choose to accept');
      if (!isNonEmpty(dayData.practiceSelfCompassion)) missing.push('How you practice self-compassion');
      break;

    case 15:
      if (Array.isArray(dayData.habits)) {
        const filledHabits = dayData.habits.filter((h: any) => isNonEmpty(h.habit));
        if (filledHabits.length === 0) missing.push('At least one positive habit transformation');
      } else {
        missing.push('Habit transformation worksheet');
      }
      if (!isNonEmpty(dayData.highestLeverageHabit) && !isNonEmpty(dayData.whyPastFailed)) {
        missing.push('Reflection on habit leverage');
      }
      break;

    case 16:
      if (!isNonEmpty(dayData.givesMeaning)) missing.push('What gives your life deepest meaning');
      if (!isNonEmpty(dayData.lifeVision)) missing.push('Your vision for an aligned life');
      if (Array.isArray(dayData.topValues)) {
        const filledValues = dayData.topValues.filter((v: any) => isNonEmpty(v.value));
        if (filledValues.length === 0) missing.push('Core personal values');
      }
      break;

    case 17:
      if (Array.isArray(dayData.relationships)) {
        const filledRel = dayData.relationships.filter((r: string) => isNonEmpty(r));
        if (filledRel.length < 2) missing.push('At least two relationships to nurture');
      }
      if (!isNonEmpty(dayData.makesRelationshipHealthy)) missing.push('What creates a healthy bond');
      if (!isNonEmpty(dayData.actionPlan)) missing.push('Specific nurturing action plan');
      break;

    case 18:
      if (Array.isArray(dayData.stressTriggers)) {
        const filledTriggers = dayData.stressTriggers.filter((t: string) => isNonEmpty(t));
        if (filledTriggers.length < 2) missing.push('At least two stress triggers');
      }
      if (Array.isArray(dayData.healthyCoping)) {
        const filledCoping = dayData.healthyCoping.filter((c: string) => isNonEmpty(c));
        if (filledCoping.length < 2) missing.push('At least two healthy coping strategies');
      }
      if (!isNonEmpty(dayData.resilienceAction)) missing.push("Today's resilience action");
      break;

    case 19:
      if (!isNonEmpty(dayData.sensoryGratitude) && (!dayData.gratitudeItems || !dayData.gratitudeItems[0])) {
        missing.push('Sensory gratitude reflection');
      }
      if (!isNonEmpty(dayData.simpleJoy) && (!dayData.joyItems || !dayData.joyItems[0])) {
        missing.push('Simple moment of joy');
      }
      if (!isNonEmpty(dayData.mindfulSensoryNoticed) && !isNonEmpty(dayData.scheduledJoyActivity)) {
        missing.push('Mindful living practice reflection');
      }
      break;

    case 20:
      if (Array.isArray(dayData.kinderAreas)) {
        const filledKinder = dayData.kinderAreas.filter((k: string) => isNonEmpty(k));
        if (filledKinder.length < 2) missing.push('At least two areas to be kinder to yourself');
      }
      if (!isNonEmpty(dayData.compassionPractice)) missing.push('Your self-compassion practice');
      if (!isNonEmpty(dayData.negativeThought)) missing.push('Harsh internal thought');
      if (!isNonEmpty(dayData.kinderThought)) missing.push('Kinder, balanced thought');
      break;

    case 21:
      if (!isNonEmpty(dayData.positiveChanges)) missing.push('Positive changes noticed over 21 days');
      if (!isNonEmpty(dayData.challengesOvercome)) missing.push('Challenges overcome');
      if (!isNonEmpty(dayData.learnedAboutSelf)) missing.push('Deepest learning about yourself');
      if (Array.isArray(dayData.keyTakeaways)) {
        const filled = dayData.keyTakeaways.filter((t: string) => isNonEmpty(t));
        if (filled.length < 2) missing.push('Key takeaways from the journal');
      }
      if (!isNonEmpty(dayData.letterToFutureSelf)) missing.push('Letter to your future self');
      break;

    default:
      break;
  }

  return {
    isComplete: missing.length === 0,
    missingCount: missing.length,
    missingFields: missing,
  };
};
