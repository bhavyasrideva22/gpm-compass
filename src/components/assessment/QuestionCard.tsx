import { Question } from "@/types/assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canGoBack?: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack = false
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (question.type === 'likert') {
      onAnswer(parseInt(value));
    } else if (question.type === 'multiple-choice') {
      onAnswer(value);
    }
  };

  const handleNext = () => {
    if (selectedValue) {
      onNext();
      setSelectedValue(""); // Reset for next question
    }
  };

  const renderLikertScale = () => {
    const scale = question.scale || 5;
    const labels = [
      "Strongly Disagree",
      "Disagree", 
      "Neutral",
      "Agree",
      "Strongly Agree"
    ];

    return (
      <div className="space-y-4">
        <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
          <div className="grid grid-cols-1 gap-3">
            {Array.from({ length: scale }, (_, i) => i + 1).map((value) => (
              <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                <Label 
                  htmlFor={`option-${value}`} 
                  className="flex-1 cursor-pointer text-sm"
                >
                  <span className="font-medium">{value}</span> - {labels[value - 1]}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-4">
        <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
          <div className="grid grid-cols-1 gap-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-elegant">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round((questionNumber / totalQuestions) * 100)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
          
          <CardTitle className="text-xl leading-relaxed">
            {question.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {question.type === 'likert' && renderLikertScale()}
          {question.type === 'multiple-choice' && renderMultipleChoice()}
          
          <div className="flex justify-between pt-4">
            {canGoBack && onPrevious ? (
              <Button variant="outline" onClick={onPrevious}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            <Button 
              onClick={handleNext}
              disabled={!selectedValue}
              variant={selectedValue ? "default" : "secondary"}
            >
              {questionNumber === totalQuestions ? "Finish Assessment" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};