import { useState, useEffect } from "react";
import { AssessmentIntro } from "./AssessmentIntro";
import { QuestionCard } from "./QuestionCard";
import { ResultsPage } from "./ResultsPage";
import { assessmentSections, questions, getQuestionsByCategory } from "@/data/questions";
import { AssessmentState, Answer, AssessmentResults } from "@/types/assessment";
import { calculateAssessmentResults } from "@/utils/scoring";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AssessmentFlow = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-3 = sections, 4 = results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [sectionQuestions, setSectionQuestions] = useState<typeof questions>([]);

  const sections = ['psychometric', 'technical', 'wiscar'];
  const currentSection = sections[currentStep - 1];

  useEffect(() => {
    if (currentStep >= 1 && currentStep <= 3) {
      const questionsForSection = getQuestionsByCategory(currentSection);
      setSectionQuestions(questionsForSection);
      setCurrentQuestionIndex(0);
    }
  }, [currentStep, currentSection]);

  const handleStartAssessment = () => {
    setCurrentStep(1);
    setAnswers([]);
    setResults(null);
  };

  const handleAnswer = (value: number | string) => {
    const currentQuestion = sectionQuestions[currentQuestionIndex];
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value: value
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Move to next section
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Calculate results and show results page
        const assessmentResults = calculateAssessmentResults(answers);
        setResults(assessmentResults);
        setCurrentStep(4);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentStep > 1) {
      // Go to previous section
      setCurrentStep(prev => prev - 1);
      const prevSection = sections[currentStep - 2];
      const prevSectionQuestions = getQuestionsByCategory(prevSection);
      setSectionQuestions(prevSectionQuestions);
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setSectionQuestions([]);
  };

  const getCurrentQuestionNumber = () => {
    let questionNumber = 0;
    
    // Add questions from completed sections
    for (let i = 0; i < currentStep - 1; i++) {
      questionNumber += getQuestionsByCategory(sections[i]).length;
    }
    
    // Add current question index
    questionNumber += currentQuestionIndex + 1;
    
    return questionNumber;
  };

  const getTotalQuestions = () => {
    return sections.reduce((total, section) => total + getQuestionsByCategory(section).length, 0);
  };

  const renderSectionHeader = () => {
    if (currentStep < 1 || currentStep > 3) return null;

    const sectionInfo = assessmentSections.find(s => s.id === currentSection);
    if (!sectionInfo) return null;

    return (
      <div className="max-w-3xl mx-auto mb-8">
        <Card className="bg-accent border-none">
          <CardContent className="p-6 text-center">
            <Badge variant="secondary" className="mb-3">
              Section {currentStep} of 3
            </Badge>
            <h2 className="text-2xl font-bold mb-2">{sectionInfo.title}</h2>
            <p className="text-muted-foreground">{sectionInfo.description}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Intro page
  if (currentStep === 0) {
    return <AssessmentIntro onStart={handleStartAssessment} />;
  }

  // Results page
  if (currentStep === 4 && results) {
    return <ResultsPage results={results} onRestart={handleRestart} />;
  }

  // Question sections
  if (currentStep >= 1 && currentStep <= 3 && sectionQuestions.length > 0) {
    const currentQuestion = sectionQuestions[currentQuestionIndex];
    
    return (
      <div className="min-h-screen bg-background py-8">
        {renderSectionHeader()}
        
        <QuestionCard
          question={currentQuestion}
          questionNumber={getCurrentQuestionNumber()}
          totalQuestions={getTotalQuestions()}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          canGoBack={currentStep > 1 || currentQuestionIndex > 0}
        />
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading assessment...</p>
      </div>
    </div>
  );
};