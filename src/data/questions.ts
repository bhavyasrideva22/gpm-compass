import { Question } from "@/types/assessment";

export const assessmentSections = [
  {
    id: 'intro',
    title: 'Assessment Introduction',
    description: 'Learn about the Growth Product Manager role and what this assessment covers.'
  },
  {
    id: 'psychometric',
    title: 'Psychometric Evaluation',
    description: 'Assess your personality traits, interests, and work style preferences.'
  },
  {
    id: 'technical',
    title: 'Technical & Aptitude',
    description: 'Evaluate your analytical skills and knowledge of growth concepts.'
  },
  {
    id: 'wiscar',
    title: 'WISCAR Framework',
    description: 'Comprehensive evaluation of your readiness across six key dimensions.'
  },
  {
    id: 'results',
    title: 'Results & Recommendations',
    description: 'Get your personalized assessment results and career guidance.'
  }
];

export const questions: Question[] = [
  // Psychometric Section - Interest Scale (RIASEC-aligned)
  {
    id: 'psych_1',
    text: 'I enjoy using data to improve how users experience a product.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'interest'
  },
  {
    id: 'psych_2',
    text: 'I find it exciting to run experiments and test different approaches.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'interest'
  },
  {
    id: 'psych_3',
    text: 'I prefer working with numbers and analytics over creative design.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'interest'
  },
  {
    id: 'psych_4',
    text: 'I enjoy influencing stakeholders without direct authority.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'interest'
  },
  {
    id: 'psych_5',
    text: 'I am motivated by seeing measurable improvements in user behavior.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'interest'
  },
  {
    id: 'psych_6',
    text: 'I thrive in fast-paced environments where priorities change frequently.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'personality'
  },

  // Personality Fit (Big 5)
  {
    id: 'psych_7',
    text: 'I often come up with creative solutions to data problems.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'openness'
  },
  {
    id: 'psych_8',
    text: 'I am systematic and methodical in my approach to testing hypotheses.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'conscientiousness'
  },
  {
    id: 'psych_9',
    text: 'I handle failed experiments well and learn from them quickly.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'emotional_stability'
  },
  {
    id: 'psych_10',
    text: 'I enjoy presenting findings and insights to diverse teams.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'extraversion'
  },

  // Cognitive Style & Work Preferences
  {
    id: 'psych_11',
    text: 'How do you prefer to approach problem-solving?',
    type: 'multiple-choice',
    options: [
      'Start with data analysis and hypothesis formation',
      'Begin with creative brainstorming and ideation',
      'Look for proven frameworks and best practices',
      'Dive in and iterate based on quick feedback'
    ],
    category: 'psychometric',
    trait: 'cognitive_style'
  },
  {
    id: 'psych_12',
    text: 'I often iterate quickly when something doesn\'t work.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    trait: 'growth_mindset'
  },

  // Technical & Aptitude Section
  {
    id: 'tech_1',
    text: 'A product has 1000 new users per month. The conversion rate from trial to paid is 15%. If the average customer lifetime value is $200 and customer acquisition cost is $25, what is the monthly profit from new customers?',
    type: 'multiple-choice',
    options: [
      '$26,250',
      '$25,750',
      '$30,000',
      '$28,500'
    ],
    category: 'technical',
    trait: 'business_math'
  },
  {
    id: 'tech_2',
    text: 'You run an A/B test with 10,000 users in each group. Variant A has a 12% conversion rate, Variant B has a 14% conversion rate. The p-value is 0.03. What should you conclude?',
    type: 'multiple-choice',
    options: [
      'Variant B is significantly better, implement it',
      'The difference is not meaningful, need more data',
      'Variant A is better due to lower variance',
      'Run the test longer to be certain'
    ],
    category: 'technical',
    trait: 'statistics'
  },
  {
    id: 'tech_3',
    text: 'Which metric is most important for measuring product-market fit?',
    type: 'multiple-choice',
    options: [
      'Monthly Active Users (MAU)',
      'Net Promoter Score (NPS)',
      'Customer Acquisition Cost (CAC)',
      'Revenue per User (RPU)'
    ],
    category: 'technical',
    trait: 'growth_metrics'
  },
  {
    id: 'tech_4',
    text: 'In the AARRR funnel, what does the second "R" typically stand for?',
    type: 'multiple-choice',
    options: [
      'Retention',
      'Referral',
      'Revenue',
      'Registration'
    ],
    category: 'technical',
    trait: 'growth_concepts'
  },
  {
    id: 'tech_5',
    text: 'You notice that user retention drops significantly after day 7. What would be your first hypothesis to test?',
    type: 'multiple-choice',
    options: [
      'Users aren\'t finding value in the core features',
      'The onboarding process is too complex',
      'There are technical bugs affecting user experience',
      'Users need more engagement prompts'
    ],
    category: 'technical',
    trait: 'problem_solving'
  },
  {
    id: 'tech_6',
    text: 'Which SQL query would help you find users who signed up but never completed their first action?',
    type: 'multiple-choice',
    options: [
      'SELECT * FROM users WHERE first_action IS NULL',
      'SELECT users.* FROM users LEFT JOIN actions ON users.id = actions.user_id WHERE actions.user_id IS NULL',
      'SELECT COUNT(*) FROM users WHERE status = "inactive"',
      'SELECT * FROM users WHERE created_date > first_action_date'
    ],
    category: 'technical',
    trait: 'sql_knowledge'
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_1',
    text: 'I am willing to spend significant time learning new analytics tools and frameworks.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'will'
  },
  {
    id: 'wiscar_2',
    text: 'I find growth metrics and user behavior analysis genuinely fascinating.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'interest'
  },
  {
    id: 'wiscar_3',
    text: 'I have experience with analytics tools like Google Analytics, Mixpanel, or Amplitude.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'skill'
  },
  {
    id: 'wiscar_4',
    text: 'I can quickly adapt my approach when data shows my initial hypothesis was wrong.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'cognitive'
  },
  {
    id: 'wiscar_5',
    text: 'I actively seek feedback and use it to improve my approach.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'ability_to_learn'
  },
  {
    id: 'wiscar_6',
    text: 'I can see myself working closely with engineering and marketing teams daily.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'real_world_alignment'
  },
  {
    id: 'wiscar_7',
    text: 'I persist through challenges even when initial results are disappointing.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'will'
  },
  {
    id: 'wiscar_8',
    text: 'I enjoy optimizing conversion funnels and user journeys.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    trait: 'interest'
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getTotalQuestions = (): number => {
  return questions.length;
};