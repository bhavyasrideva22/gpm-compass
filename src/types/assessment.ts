export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  scale?: number;
  category: string;
  trait?: string;
}

export interface Answer {
  questionId: string;
  value: number | string;
  score?: number;
}

export interface AssessmentResults {
  psychometricFit: number;
  technicalReadiness: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    abilityToLearn: number;
    realWorldAlignment: number;
  };
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  careerMatch: string[];
  skillGaps: string[];
  learningPath: string;
  persona: string;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  startTime: Date;
}