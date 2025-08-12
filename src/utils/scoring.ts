import { Answer, AssessmentResults } from "@/types/assessment";

export const calculateAssessmentResults = (answers: Answer[]): AssessmentResults => {
  // Group answers by category and trait
  const psychometricAnswers = answers.filter(a => a.questionId.startsWith('psych_'));
  const technicalAnswers = answers.filter(a => a.questionId.startsWith('tech_'));
  const wiscarAnswers = answers.filter(a => a.questionId.startsWith('wiscar_'));

  // Calculate psychometric fit (0-100)
  const psychometricFit = calculatePsychometricScore(psychometricAnswers);
  
  // Calculate technical readiness (0-100)
  const technicalReadiness = calculateTechnicalScore(technicalAnswers);
  
  // Calculate WISCAR scores
  const wiscar = calculateWISCARScores(wiscarAnswers);
  
  // Calculate overall confidence score
  const overallConfidenceScore = Math.round(
    (psychometricFit * 0.25) + 
    (technicalReadiness * 0.30) + 
    (getWISCARAverage(wiscar) * 0.35) + 
    (calculateLearningAgility(answers) * 0.10)
  );
  
  // Determine recommendation
  const recommendation = getRecommendation(overallConfidenceScore, psychometricFit, technicalReadiness);
  
  // Generate career matches and skill gaps
  const careerMatch = getCareerMatches(overallConfidenceScore, wiscar);
  const skillGaps = getSkillGaps(technicalAnswers, wiscarAnswers);
  
  // Determine learning path and persona
  const learningPath = getLearningPath(recommendation, skillGaps);
  const persona = getPersona(psychometricFit, technicalReadiness, wiscar);

  return {
    psychometricFit,
    technicalReadiness,
    wiscar,
    overallConfidenceScore,
    recommendation,
    careerMatch,
    skillGaps,
    learningPath,
    persona
  };
};

const calculatePsychometricScore = (answers: Answer[]): number => {
  if (answers.length === 0) return 0;
  
  let totalScore = 0;
  let maxScore = 0;
  
  answers.forEach(answer => {
    if (typeof answer.value === 'number') {
      totalScore += answer.value;
      maxScore += 5; // Assuming 5-point Likert scale
    } else {
      // For multiple choice, assign scores based on quality of answer
      totalScore += getMultipleChoiceScore(answer.questionId, answer.value);
      maxScore += 5;
    }
  });
  
  return Math.round((totalScore / maxScore) * 100);
};

const calculateTechnicalScore = (answers: Answer[]): number => {
  if (answers.length === 0) return 0;
  
  let correctAnswers = 0;
  
  answers.forEach(answer => {
    if (isCorrectAnswer(answer.questionId, answer.value)) {
      correctAnswers++;
    }
  });
  
  return Math.round((correctAnswers / answers.length) * 100);
};

const calculateWISCARScores = (answers: Answer[]) => {
  const traits = ['will', 'interest', 'skill', 'cognitive', 'ability_to_learn', 'real_world_alignment'];
  const scores: any = {};
  
  traits.forEach(trait => {
    const traitAnswers = answers.filter(a => getQuestionTrait(a.questionId) === trait);
    if (traitAnswers.length > 0) {
      const avgScore = traitAnswers.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 3), 0) / traitAnswers.length;
      scores[trait] = Math.round((avgScore / 5) * 100);
    } else {
      scores[trait] = 60; // Default score
    }
  });
  
  return {
    will: scores.will || 60,
    interest: scores.interest || 60,
    skill: scores.skill || 60,
    cognitive: scores.cognitive || 60,
    abilityToLearn: scores.ability_to_learn || 60,
    realWorldAlignment: scores.real_world_alignment || 60
  };
};

const getWISCARAverage = (wiscar: any): number => {
  const values = Object.values(wiscar) as number[];
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
};

const calculateLearningAgility = (answers: Answer[]): number => {
  // Focus on growth mindset and learning-related questions
  const learningAnswers = answers.filter(a => 
    a.questionId.includes('psych_12') || a.questionId.includes('wiscar_5')
  );
  
  if (learningAnswers.length === 0) return 70;
  
  const avgScore = learningAnswers.reduce((sum, a) => sum + (typeof a.value === 'number' ? a.value : 3), 0) / learningAnswers.length;
  return Math.round((avgScore / 5) * 100);
};

const getRecommendation = (overallScore: number, psychometricFit: number, technicalReadiness: number): 'Yes' | 'Maybe' | 'No' => {
  if (overallScore >= 75 && psychometricFit >= 70 && technicalReadiness >= 60) {
    return 'Yes';
  } else if (overallScore >= 60 && (psychometricFit >= 60 || technicalReadiness >= 50)) {
    return 'Maybe';
  } else {
    return 'No';
  }
};

const getCareerMatches = (overallScore: number, wiscar: any): string[] => {
  const matches = [];
  
  if (overallScore >= 75) {
    matches.push('Growth Product Manager');
  }
  if (wiscar.skill >= 70) {
    matches.push('Product-Led Growth Analyst');
  }
  if (wiscar.cognitive >= 75) {
    matches.push('A/B Testing Specialist');
  }
  if (wiscar.interest >= 80) {
    matches.push('User Acquisition Manager');
  }
  
  if (matches.length === 0) {
    matches.push('Product Analyst', 'Digital Marketing Strategist');
  }
  
  return matches;
};

const getSkillGaps = (technicalAnswers: Answer[], wiscarAnswers: Answer[]): string[] => {
  const gaps = [];
  
  // Check technical knowledge gaps
  const sqlAnswer = technicalAnswers.find(a => a.questionId === 'tech_6');
  if (!sqlAnswer || !isCorrectAnswer('tech_6', sqlAnswer.value)) {
    gaps.push('SQL Knowledge');
  }
  
  const analyticsAnswer = wiscarAnswers.find(a => a.questionId === 'wiscar_3');
  if (!analyticsAnswer || (typeof analyticsAnswer.value === 'number' && analyticsAnswer.value < 4)) {
    gaps.push('Analytics Tools');
  }
  
  // Check if they understand A/B testing
  const abTestAnswer = technicalAnswers.find(a => a.questionId === 'tech_2');
  if (!abTestAnswer || !isCorrectAnswer('tech_2', abTestAnswer.value)) {
    gaps.push('A/B Testing');
  }
  
  // Check business metrics understanding
  const metricsAnswer = technicalAnswers.find(a => a.questionId === 'tech_1');
  if (!metricsAnswer || !isCorrectAnswer('tech_1', metricsAnswer.value)) {
    gaps.push('Business Metrics');
  }
  
  return gaps;
};

const getLearningPath = (recommendation: string, skillGaps: string[]): string => {
  if (recommendation === 'Yes') {
    return 'GPM_Advanced_Track';
  } else if (recommendation === 'Maybe') {
    return skillGaps.length > 2 ? 'GPM_Foundation_Plus' : 'GPM_Intermediate_Track';
  } else {
    return 'Alternative_Career_Exploration';
  }
};

const getPersona = (psychometricFit: number, technicalReadiness: number, wiscar: any): string => {
  if (technicalReadiness >= 80 && wiscar.cognitive >= 80) {
    return 'Data-Driven Growth Hacker';
  } else if (psychometricFit >= 80 && wiscar.interest >= 80) {
    return 'Experimentation Enthusiast';
  } else if (wiscar.skill >= 70 && technicalReadiness >= 70) {
    return 'Analytics-Minded Strategist';
  } else if (psychometricFit >= 70) {
    return 'Growth-Curious Builder';
  } else {
    return 'Emerging Growth Professional';
  }
};

// Helper functions for specific answer validation
const isCorrectAnswer = (questionId: string, value: string | number): boolean => {
  const correctAnswers: { [key: string]: string } = {
    'tech_1': '$26,250',
    'tech_2': 'Variant B is significantly better, implement it',
    'tech_3': 'Net Promoter Score (NPS)',
    'tech_4': 'Referral',
    'tech_5': 'Users aren\'t finding value in the core features',
    'tech_6': 'SELECT users.* FROM users LEFT JOIN actions ON users.id = actions.user_id WHERE actions.user_id IS NULL'
  };
  
  return correctAnswers[questionId] === value;
};

const getMultipleChoiceScore = (questionId: string, value: string | number): number => {
  // Assign scores based on answer quality for multiple choice psychometric questions
  if (questionId === 'psych_11') {
    const scores: { [key: string]: number } = {
      'Start with data analysis and hypothesis formation': 5,
      'Begin with creative brainstorming and ideation': 3,
      'Look for proven frameworks and best practices': 4,
      'Dive in and iterate based on quick feedback': 4
    };
    return scores[value as string] || 3;
  }
  
  return 3; // Default neutral score
};

const getQuestionTrait = (questionId: string): string => {
  const traitMap: { [key: string]: string } = {
    'wiscar_1': 'will',
    'wiscar_7': 'will',
    'wiscar_2': 'interest',
    'wiscar_8': 'interest',
    'wiscar_3': 'skill',
    'wiscar_4': 'cognitive',
    'wiscar_5': 'ability_to_learn',
    'wiscar_6': 'real_world_alignment'
  };
  
  return traitMap[questionId] || 'general';
};