import { JournalState, ScorecardData, DeclarationData, TrackerCellState } from '../types/journal';

export const PRACTICE_CATEGORIES = [
  'Mindfulness / Meditation',
  'Positive Mindset & Thoughts',
  'Physical Well-being',
  'Quality Sleep',
  'Emotional Balance',
  'Journaling / Self-Reflection',
  'Self-Compassion & Kindness',
];

export const createDefaultScorecard = (): ScorecardData => {
  const practiceGrid: Record<string, TrackerCellState[]> = {};
  PRACTICE_CATEGORIES.forEach((cat) => {
    practiceGrid[cat] = new Array<TrackerCellState>(21).fill(0 as TrackerCellState);
  });

  return {
    practiceGrid,
    ratings: {
      stressManagement: 0,
      mentalClarity: 0,
      emotionalBalance: 0,
      selfConfidence: 0,
      focusProductivity: 0,
      betterSleep: 0,
      selfCompassion: 0,
      overallWellbeing: 0,
    },
    biggestTakeaways: ['', '', '', '', ''],
    proudOf: ['', '', ''],
    nextSteps: ['', '', ''],
  };
};

export const createDefaultDeclaration = (): DeclarationData => ({
  keyLearnings: ['', '', '', '', ''],
  positiveChanges: '',
  challengesOvercome: '',
  howToShowUp: '',
  personalCommitments: [
    { text: 'I commit to starting each day with mindful presence and self-kindness.', checked: false },
    { text: 'I commit to honoring my boundaries without guilt or apology.', checked: false },
    { text: 'I commit to speaking to myself with the warmth I offer those I love.', checked: false },
    { text: 'I commit to pausing before reacting to emotional triggers.', checked: false },
    { text: 'I commit to prioritizing my mental peace above unnecessary approval.', checked: false },
  ],
  innerPeaceVision: '',
  messageToFutureSelf: '',
  name: '',
  date: new Date().toISOString().split('T')[0],
  signature: '',
  committed: false,
});

export const createDefaultDayData = (dayNum: number) => {
  const base = {
    completed: false,
    practiceDone: false,
  };

  switch (dayNum) {
    case 1:
      return {
        ...base,
        mood: '',
        feelingToday: '',
        occupyingMind: '',
        unsettledPart: '',
        wishUnderstood: '',
        honestAdmit: '',
      };
    case 2:
      return {
        ...base,
        triggerRows: [
          { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
          { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
          { trigger: '', whatHappened: '', emotion: '', thought: '', reaction: '' },
        ],
        reflection: '',
      };
    case 3:
      return {
        ...base,
        beliefs: [
          { recurringThought: '', classification: '', balancedPerspective: '' },
          { recurringThought: '', classification: '', balancedPerspective: '' },
          { recurringThought: '', classification: '', balancedPerspective: '' },
          { recurringThought: '', classification: '', balancedPerspective: '' },
          { recurringThought: '', classification: '', balancedPerspective: '' },
        ],
      };
    case 4:
      return {
        ...base,
        mistakeSelfTalk: '',
        learnedSelfTalk: '',
        speakToLovedOne: '' as '' | 'Yes' | 'No' | 'Sometimes',
        compassionateResponse: '',
      };
    case 5:
      return {
        ...base,
        suppressedEmotion: '',
        whyAvoid: '',
        fearOfExpressing: '',
        physicalLocation: '',
        emotionNeeds: '',
      };
    case 6:
      return {
        ...base,
        whatHappened: '',
        feltThen: '',
        neededThen: '',
        understandToday: '',
        giveMyselfNow: '',
      };
    case 7:
      return {
        ...base,
        ratings: {
          emotionalAwareness: 0,
          selfUnderstanding: 0,
          selfCompassion: 0,
          mentalClarity: 0,
          emotionalBalance: 0,
        },
        discoveredThisWeek: '',
        patternNoticed: '',
      };
    case 8:
      return {
        ...base,
        letterToYoungerMe: '',
        whatIUnderstandNow: '',
        whatWasntMyFault: '',
        whatIAppreciate: '',
        whatIWishIHear: '',
      };
    case 9:
      return {
        ...base,
        blameMyselfFor: '',
        knowNowNotThen: '',
        learnNotPunish: '',
        statementAgreed: false,
      };
    case 10:
      return {
        ...base,
        canControl: {
          response: false,
          attention: false,
          actions: false,
          habits: false,
          boundaries: false,
          choices: false,
        },
        cannotControl: {
          opinions: false,
          choices: false,
          past: false,
          outcomes: false,
        },
        repeatedlyTryingToControl: '',
        consciouslyRelease: '',
      };
    case 11:
      return {
        ...base,
        tolerateDontWant: '',
        boundaryNeed: '',
        afraidIfSet: '',
        respectingSelfLooksLike: '',
        todayBoundary: '',
      };
    case 12:
      return {
        ...base,
        seekApproval: '' as '' | 'Often' | 'Sometimes' | 'Rarely',
        avoidDifficultConversations: '' as '' | 'Often' | 'Sometimes' | 'Rarely',
        overGive: '' as '' | 'Often' | 'Sometimes' | 'Rarely',
        suppressNeeds: '' as '' | 'Often' | 'Sometimes' | 'Rarely',
        defensiveWhenHurt: '' as '' | 'Often' | 'Sometimes' | 'Rarely',
        patternToChange: '',
      };
    case 13:
      return {
        ...base,
        gratitudeItems: ['', '', ''],
        whyMatter: '',
        noticeAbundance: '',
        todayGratitudeAction: '',
      };
    case 14:
      return {
        ...base,
        appreciateAboutSelf: ['', '', '', '', ''],
        imperfectionsToAccept: '',
        kinderPerspective: '',
        practiceSelfCompassion: '',
      };
    case 15:
      return {
        ...base,
        habits: [
          { habit: '', whyItMatters: '', obstacle: '', solution: '' },
          { habit: '', whyItMatters: '', obstacle: '', solution: '' },
          { habit: '', whyItMatters: '', obstacle: '', solution: '' },
          { habit: '', whyItMatters: '', obstacle: '', solution: '' },
          { habit: '', whyItMatters: '', obstacle: '', solution: '' },
        ],
        todaySmallAction: '',
      };
    case 16:
      return {
        ...base,
        givesMeaning: '',
        lifeVision: '',
        topValues: [
          { value: '', howToLive: '' },
          { value: '', howToLive: '' },
          { value: '', howToLive: '' },
          { value: '', howToLive: '' },
          { value: '', howToLive: '' },
        ],
        meaningfulAction: '',
      };
    case 17:
      return {
        ...base,
        relationships: ['', '', '', '', ''],
        makesRelationshipHealthy: '',
        relationshipToStrengthen: '',
        communicateBetter: '',
        actionPlan: '',
        todaySmallAction: '',
      };
    case 18:
      return {
        ...base,
        stressTriggers: ['', '', '', '', ''],
        healthyCoping: ['', '', '', '', ''],
        thinkExercise: '',
        pauseExercise: '',
        chooseExercise: '',
        resilienceAction: '',
      };
    case 19:
      return {
        ...base,
        gratitudeItems: ['', '', ''],
        joyItems: ['', '', ''],
        mindfulPracticeChoice: '',
        noticedDuringMindful: '',
        todayAction: '',
      };
    case 20:
      return {
        ...base,
        mood: '',
        kinderAreas: ['', '', '', '', ''],
        compassionPractice: '',
        negativeThought: '',
        kinderThought: '',
        smallAction: '',
        smallActionDone: false,
        discoveredToday: '',
      };
    case 21:
      return {
        ...base,
        positiveChanges: '',
        challengesOvercome: '',
        learnedAboutSelf: '',
        keyTakeaways: ['', '', '', '', ''],
        commitmentGoingForward: ['', '', ''],
        letterToFutureSelf: '',
        visionAhead: '',
      };
    default:
      return base;
  }
};

export const createInitialJournalState = (): JournalState => {
  const days: Record<number, any> = {};
  for (let i = 1; i <= 21; i++) {
    days[i] = createDefaultDayData(i);
  }

  return {
    currentScreen: 0, // Starts at Cover with Begin Journey
    completedDays: [],
    days,
    scorecard: createDefaultScorecard(),
    declaration: createDefaultDeclaration(),
    personalIntention: {
      name: '',
      date: new Date().toISOString().split('T')[0],
      intention: '',
    },
    lastUpdated: new Date().toISOString(),
  };
};

export interface ScreenMeta {
  screen: number;
  day?: number;
  type: 'cover' | 'day' | 'scorecard' | 'declaration' | 'backcover';
  title: string;
  themeTitle: string;
  subtitle: string;
  inspirationalQuote: string;
}

export const JOURNAL_24_SCREENS: ScreenMeta[] = [
  { screen: 0, type: 'cover', title: 'COVER', themeTitle: '21-DAY INNER HEALING JOURNAL', subtitle: 'Release | Reconnect | Rebuild | Transform', inspirationalQuote: 'Transform Your Mind,\nElevate Your Life.' },
  { screen: 1, day: 1, type: 'day', title: 'DAY 1', themeTitle: 'MEET YOUR INNER SELF', subtitle: 'A gentle space to observe where your mind and heart are resting.', inspirationalQuote: 'A Calmer Mind,\nA Brighter You' },
  { screen: 2, day: 2, type: 'day', title: 'DAY 2', themeTitle: 'IDENTIFY YOUR EMOTIONAL TRIGGERS', subtitle: 'Uncover the specific situations that spark strong internal reactions.', inspirationalQuote: 'Awareness Brings\nTrue Freedom' },
  { screen: 3, day: 3, type: 'day', title: 'DAY 3', themeTitle: 'THE STORY I TELL MYSELF', subtitle: 'Separate unquestioned thoughts and fear from verifiable facts.', inspirationalQuote: 'Question Your\nAssumptions' },
  { screen: 4, day: 4, type: 'day', title: 'DAY 4', themeTitle: 'MEET YOUR INNER CRITIC', subtitle: 'Transform harsh automated self-talk into loving, honest firmness.', inspirationalQuote: 'Speak to Yourself\nWith Love' },
  { screen: 5, day: 5, type: 'day', title: 'DAY 5', themeTitle: 'EMOTIONAL SUPPRESSION', subtitle: 'Explore the emotions you hold back and listen to what they need.', inspirationalQuote: 'What You Feel,\nYou Can Heal' },
  { screen: 6, day: 6, type: 'day', title: 'DAY 6', themeTitle: 'MY UNFINISHED EMOTIONAL STORY', subtitle: 'Revisit past events with the safety, wisdom and kindness of today.', inspirationalQuote: 'Honor Your Past,\nClaim Your Peace' },
  { screen: 7, day: 7, type: 'day', title: 'DAY 7', themeTitle: 'WEEK 1 INNER CHECK-IN', subtitle: 'Assess your growth and reflect on emerging patterns of the mind.', inspirationalQuote: 'Celebrating\nWeek 1 Milestones' },
  { screen: 8, day: 8, type: 'day', title: 'DAY 8', themeTitle: 'INNER CHILD CONVERSATION', subtitle: 'Offer your younger self the warmth and reassurance you deserved.', inspirationalQuote: 'Your Inner Child\nIs Safe With You' },
  { screen: 9, day: 9, type: 'day', title: 'DAY 9', themeTitle: 'FORGIVING MYSELF', subtitle: 'Release relentless self-blame and choose conscious learning.', inspirationalQuote: 'Forgiveness Sets\nYour Soul Free' },
  { screen: 10, day: 10, type: 'day', title: 'DAY 10', themeTitle: 'WHAT I CAN AND CANNOT CONTROL', subtitle: 'Surrender what is outside your power and focus on your choices.', inspirationalQuote: 'Peace Begins With\nSurrender' },
  { screen: 11, day: 11, type: 'day', title: 'DAY 11', themeTitle: 'BOUNDARIES & SELF-RESPECT', subtitle: 'Clarify what you tolerate and honor your personal sanctuary.', inspirationalQuote: 'Boundaries Are\nActs of Self-Love' },
  { screen: 12, day: 12, type: 'day', title: 'DAY 12', themeTitle: 'RELATIONSHIP PATTERN AUDIT', subtitle: 'Bring mindful awareness to how you interact with others.', inspirationalQuote: 'Conscious Bonds,\nHonest Hearts' },
  { screen: 13, day: 13, type: 'day', title: 'DAY 13', themeTitle: 'GRATITUDE & ABUNDANCE', subtitle: 'Notice the quiet blessings and present abundance already with you.', inspirationalQuote: 'Abundance Lives\nIn This Moment' },
  { screen: 14, day: 14, type: 'day', title: 'DAY 14', themeTitle: 'SELF-ACCEPTANCE & INNER COMPASSION', subtitle: 'Embrace your humanness with unconditional tenderness.', inspirationalQuote: 'You Are Enough,\nJust As You Are' },
  { screen: 15, day: 15, type: 'day', title: 'DAY 15', themeTitle: 'POSITIVE HABITS & LASTING CHANGE', subtitle: 'Anchor daily micro-habits that sustainably nurture peace.', inspirationalQuote: 'Small Steps,\nLifelong Healing' },
  { screen: 16, day: 16, type: 'day', title: 'DAY 16', themeTitle: 'PURPOSE, MEANING & INNER DIRECTION', subtitle: 'Realign with your core values and craft a clear vision.', inspirationalQuote: 'Live Aligned With\nYour Soul' },
  { screen: 17, day: 17, type: 'day', title: 'DAY 17', themeTitle: 'HEALTHY RELATIONSHIPS & CONNECTION', subtitle: 'Cultivate deep authentic connection and speak your truth.', inspirationalQuote: 'Vulnerability Is\nTrue Strength' },
  { screen: 18, day: 18, type: 'day', title: 'DAY 18', themeTitle: 'STRESS RESILIENCE & EMOTIONAL STRENGTH', subtitle: 'Build the grounded reflex: Think → Pause → Choose.', inspirationalQuote: 'Grounded Calm In\nEvery Storm' },
  { screen: 19, day: 19, type: 'day', title: 'DAY 19', themeTitle: 'GRATITUDE, JOY & MINDFUL LIVING', subtitle: 'Practice sensory mindfulness and embrace simplicity.', inspirationalQuote: 'Joy In The\nPresent Moment' },
  { screen: 20, day: 20, type: 'day', title: 'DAY 20', themeTitle: 'SELF-COMPASSION AND INNER ACCEPTANCE', subtitle: 'Be kind to yourself. You are enough.', inspirationalQuote: 'Kindness Begins\nWith You' },
  { screen: 21, day: 21, type: 'day', title: 'DAY 21', themeTitle: 'INTEGRATION AND A BRIGHTER TOMORROW', subtitle: 'Celebrate your journey. Commit to your next chapter.', inspirationalQuote: 'A Brighter Tomorrow\nAwaits' },
  { screen: 22, type: 'scorecard', title: 'PAGE 22', themeTitle: 'FINAL 21-DAY TRANSFORMATION SCORECARD', subtitle: 'REFLECT | CELEBRATE | SEE YOUR GROWTH | CONTINUE', inspirationalQuote: 'See Your Growth,\nHonor Your Steps' },
  { screen: 23, type: 'declaration', title: 'PAGE 23', themeTitle: 'INNER PEACE DECLARATION', subtitle: 'MY VISION • MY COMMITMENT • MY NEXT CHAPTER', inspirationalQuote: 'My Sacred Promise\nTo My Peace' },
  { screen: 24, type: 'backcover', title: 'PAGE 24', themeTitle: 'BACK COVER', subtitle: 'A Journey to a Calmer Mind, A Brighter You', inspirationalQuote: 'Inner Peace\nBegins Within' },
];
