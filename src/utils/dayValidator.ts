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
    return val.trim().length > 1;
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

  switch (dayNum) {
    case 1:
      if (!isNonEmpty(dayData.mood)) missing.push('Mood Check-In');
      if (!isNonEmpty(dayData.feelingToday)) missing.push("How you're feeling right now");
      if (!isNonEmpty(dayData.occupyingMind)) missing.push("What has been occupying your mind");
      if (!isNonEmpty(dayData.unsettledPart)) missing.push("What feels heavy or unsettled");
      if (!isNonEmpty(dayData.wishUnderstood)) missing.push("What you wish someone understood");
      if (!isNonEmpty(dayData.honestAdmit)) missing.push("One thing you can honestly admit");
      break;

    case 2:
      // At least 1-2 trigger rows filled
      if (Array.isArray(dayData.triggerRows)) {
        const filledRows = dayData.triggerRows.filter(
          (r: any) =>
            isNonEmpty(r.trigger) ||
            isNonEmpty(r.whatHappened) ||
            isNonEmpty(r.emotion) ||
            isNonEmpty(r.thought)
        );
        if (filledRows.length === 0) {
          missing.push('At least one emotional trigger observation');
        }
      } else {
        missing.push('Trigger reflection log');
      }
      if (!isNonEmpty(dayData.reflection)) missing.push('Trigger reflection summary');
      break;

    case 3:
      if (Array.isArray(dayData.beliefs)) {
        const filledBeliefs = dayData.beliefs.filter(
          (b: any) => isNonEmpty(b.recurringThought) || isNonEmpty(b.balancedPerspective)
        );
        if (filledBeliefs.length === 0) {
          missing.push('At least one recurring belief examination');
        }
      } else {
        missing.push('Belief log');
      }
      break;

    case 4:
      if (!isNonEmpty(dayData.mistakeSelfTalk)) missing.push('Self-talk when making a mistake');
      if (!isNonEmpty(dayData.learnedSelfTalk)) missing.push('Where you learned that internal voice');
      if (!isNonEmpty(dayData.speakToLovedOne)) missing.push('Would you speak this way to a loved one?');
      if (!isNonEmpty(dayData.compassionateResponse)) missing.push('Rewritten compassionate response');
      break;

    case 5:
      if (!isNonEmpty(dayData.suppressedEmotion)) missing.push('Emotion you tend to push away');
      if (!isNonEmpty(dayData.whyAvoid)) missing.push('Why you avoid feeling it');
      if (!isNonEmpty(dayData.fearOfExpressing)) missing.push('What you fear would happen');
      if (!isNonEmpty(dayData.physicalLocation)) missing.push('Where you feel it in your body');
      if (!isNonEmpty(dayData.emotionNeeds)) missing.push('What this emotion is asking for');
      break;

    case 6:
      if (!isNonEmpty(dayData.whatHappened)) missing.push('Painful event or memory');
      if (!isNonEmpty(dayData.feltThen)) missing.push('What you felt then');
      if (!isNonEmpty(dayData.neededThen)) missing.push('What you needed then');
      if (!isNonEmpty(dayData.understandToday)) missing.push('What you understand today');
      if (!isNonEmpty(dayData.giveMyselfNow)) missing.push('What you can give yourself now');
      break;

    case 7:
      if (dayData.ratings) {
        const ratings = Object.values(dayData.ratings) as number[];
        const hasZero = ratings.some((r) => !r || r === 0);
        if (hasZero) missing.push('All 5 emotional rating scores');
      } else {
        missing.push('Weekly milestone ratings');
      }
      if (!isNonEmpty(dayData.discoveredThisWeek)) missing.push('What you discovered this week');
      if (!isNonEmpty(dayData.patternNoticed)) missing.push('Emotional pattern noticed');
      break;

    case 8:
      if (!isNonEmpty(dayData.letterToYoungerMe)) missing.push('Letter to your younger self');
      if (!isNonEmpty(dayData.whatIUnderstandNow)) missing.push('What you understand now');
      if (!isNonEmpty(dayData.whatWasntMyFault)) missing.push("What wasn't your fault");
      if (!isNonEmpty(dayData.whatIAppreciate)) missing.push('What you appreciate about younger self');
      break;

    case 9:
      if (!isNonEmpty(dayData.blameMyselfFor)) missing.push('What you have blamed yourself for');
      if (!isNonEmpty(dayData.knowNowNotThen)) missing.push('What you know now that you did not then');
      if (!isNonEmpty(dayData.learnNotPunish)) missing.push('How to learn without punishing yourself');
      if (!dayData.statementAgreed) missing.push('Acceptance of forgiveness statement');
      break;

    case 10:
      if (!isNonEmpty(dayData.repeatedlyTryingToControl)) missing.push('What you repeatedly try to control');
      if (!isNonEmpty(dayData.consciouslyRelease)) missing.push('What you choose to consciously release');
      break;

    case 11:
      if (!isNonEmpty(dayData.tolerateDontWant)) missing.push('What you tolerate that you no longer want to');
      if (!isNonEmpty(dayData.boundaryNeed)) missing.push('The healthy boundary you need');
      if (!isNonEmpty(dayData.afraidIfSet)) missing.push('What you fear will happen if set');
      if (!isNonEmpty(dayData.respectingSelfLooksLike)) missing.push('What respecting yourself looks like');
      if (!isNonEmpty(dayData.todayBoundary)) missing.push("Today's concrete boundary action");
      break;

    case 12:
      if (!isNonEmpty(dayData.seekApproval)) missing.push('Approval-seeking assessment');
      if (!isNonEmpty(dayData.avoidDifficultConversations)) missing.push('Difficult conversations assessment');
      if (!isNonEmpty(dayData.overGive)) missing.push('Over-giving assessment');
      if (!isNonEmpty(dayData.suppressNeeds)) missing.push('Suppressing needs assessment');
      if (!isNonEmpty(dayData.patternToChange)) missing.push('Relationship pattern you want to shift');
      break;

    case 13:
      if (Array.isArray(dayData.gratitudeItems)) {
        const filled = dayData.gratitudeItems.filter((g: string) => isNonEmpty(g));
        if (filled.length < 2) missing.push('At least two gratitude items');
      } else {
        missing.push('Gratitude entries');
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
      if (!isNonEmpty(dayData.kinderPerspective)) missing.push('Kinder perspective on your flaws');
      break;

    case 15:
      if (Array.isArray(dayData.habits)) {
        const filledHabits = dayData.habits.filter((h: any) => isNonEmpty(h.habit));
        if (filledHabits.length === 0) missing.push('At least one positive habit transformation');
      } else {
        missing.push('Habit transformation worksheet');
      }
      if (!isNonEmpty(dayData.todaySmallAction)) missing.push("Today's micro-habit action");
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
        if (filledRel.length < 2) missing.push('Key relationships to nurture');
      }
      if (!isNonEmpty(dayData.makesRelationshipHealthy)) missing.push('What creates a healthy bond');
      if (!isNonEmpty(dayData.relationshipToStrengthen)) missing.push('Relationship you want to strengthen');
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
      if (Array.isArray(dayData.gratitudeItems)) {
        const filled = dayData.gratitudeItems.filter((g: string) => isNonEmpty(g));
        if (filled.length < 2) missing.push('Gratitude reflections');
      }
      if (Array.isArray(dayData.joyItems)) {
        const filled = dayData.joyItems.filter((j: string) => isNonEmpty(j));
        if (filled.length < 2) missing.push('Simple moments of joy');
      }
      if (!isNonEmpty(dayData.todayAction)) missing.push("Today's mindful action");
      break;

    case 20:
      if (!isNonEmpty(dayData.mood)) missing.push('Emotional check-in mood');
      if (Array.isArray(dayData.kinderAreas)) {
        const filledKinder = dayData.kinderAreas.filter((k: string) => isNonEmpty(k));
        if (filledKinder.length < 2) missing.push('At least two areas to be kinder to yourself');
      }
      if (!isNonEmpty(dayData.compassionPractice)) missing.push('Your self-compassion practice');
      if (!isNonEmpty(dayData.negativeThought)) missing.push('Harsh internal thought');
      if (!isNonEmpty(dayData.kinderThought)) missing.push('Kinder, balanced thought');
      if (!isNonEmpty(dayData.smallAction)) missing.push("Today's small action of self-kindness");
      if (!isNonEmpty(dayData.discoveredToday)) missing.push('What you discovered today');
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
      // Generic check if needed
      break;
  }

  return {
    isComplete: missing.length === 0,
    missingCount: missing.length,
    missingFields: missing,
  };
};
