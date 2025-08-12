import { AssessmentResults } from "@/types/assessment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Target, 
  BookOpen, 
  Users,
  BarChart3,
  Lightbulb,
  ArrowRight
} from "lucide-react";

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const ResultsPage = ({ results, onRestart }: ResultsPageProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'text-success';
      case 'Maybe': return 'text-warning';
      case 'No': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return <CheckCircle className="w-6 h-6 text-success" />;
      case 'Maybe': return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'No': return <XCircle className="w-6 h-6 text-destructive" />;
      default: return null;
    }
  };

  const getRecommendationMessage = (recommendation: string, score: number) => {
    switch (recommendation) {
      case 'Yes':
        return `Excellent! With a confidence score of ${score}%, you show strong potential for a Growth Product Manager role. You have the right combination of interests, skills, and mindset.`;
      case 'Maybe':
        return `Good foundation! With a score of ${score}%, you have potential but would benefit from targeted skill development. Consider the learning recommendations below.`;
      case 'No':
        return `Based on your score of ${score}%, a Growth Product Manager role might not be the best fit right now. Check out the alternative career paths we've suggested.`;
      default:
        return '';
    }
  };

  const getLearningSteps = (learningPath: string, skillGaps: string[]) => {
    const baseSteps = [
      "Complete our Growth PM Foundations course",
      "Practice with Google Analytics 4",
      "Learn basic SQL for product analysis",
      "Run your first A/B test"
    ];

    if (skillGaps.includes('Analytics Tools')) {
      baseSteps.unshift("Master analytics platforms (Mixpanel, Amplitude)");
    }
    if (skillGaps.includes('A/B Testing')) {
      baseSteps.push("Deep dive into experiment design principles");
    }
    if (skillGaps.includes('SQL Knowledge')) {
      baseSteps.push("Complete SQL for Product Managers bootcamp");
    }

    return baseSteps.slice(0, 4);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-accent-foreground">Assessment Complete</span>
        </div>
        <h1 className="text-4xl font-bold">Your Results</h1>
        <p className="text-xl text-muted-foreground">
          Here's your comprehensive Growth Product Manager readiness assessment
        </p>
      </div>

      {/* Overall Recommendation */}
      <Card className="shadow-elegant border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-3">
                {getRecommendationIcon(results.recommendation)}
                <span className={getRecommendationColor(results.recommendation)}>
                  {results.recommendation === 'Yes' ? 'Strong Fit!' : 
                   results.recommendation === 'Maybe' ? 'Potential Fit' : 'Consider Alternatives'}
                </span>
              </CardTitle>
              <CardDescription className="text-lg">
                {getRecommendationMessage(results.recommendation, results.overallConfidenceScore)}
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{results.overallConfidenceScore}%</div>
              <div className="text-sm text-muted-foreground">Confidence Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{results.psychometricFit}%</span>
                <Badge variant={results.psychometricFit >= 70 ? "default" : "secondary"}>
                  {results.psychometricFit >= 70 ? "Strong" : "Developing"}
                </Badge>
              </div>
              <Progress value={results.psychometricFit} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Personality traits and interests alignment
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{results.technicalReadiness}%</span>
                <Badge variant={results.technicalReadiness >= 60 ? "default" : "secondary"}>
                  {results.technicalReadiness >= 60 ? "Ready" : "Needs Work"}
                </Badge>
              </div>
              <Progress value={results.technicalReadiness} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Analytics and growth knowledge
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              WISCAR Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  {Math.round((results.wiscar.will + results.wiscar.interest + results.wiscar.skill + 
                               results.wiscar.cognitive + results.wiscar.abilityToLearn + 
                               results.wiscar.realWorldAlignment) / 6)}%
                </span>
                <Badge variant="default">Comprehensive</Badge>
              </div>
              <Progress value={Math.round((results.wiscar.will + results.wiscar.interest + results.wiscar.skill + 
                                         results.wiscar.cognitive + results.wiscar.abilityToLearn + 
                                         results.wiscar.realWorldAlignment) / 6)} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Overall readiness framework
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            WISCAR Framework Breakdown
          </CardTitle>
          <CardDescription>
            Your readiness across six key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Will (Motivation)</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.will}%</span>
                </div>
                <Progress value={results.wiscar.will} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Interest</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.interest}%</span>
                </div>
                <Progress value={results.wiscar.interest} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Skill</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.skill}%</span>
                </div>
                <Progress value={results.wiscar.skill} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Cognitive Readiness</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.cognitive}%</span>
                </div>
                <Progress value={results.wiscar.cognitive} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Ability to Learn</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.abilityToLearn}%</span>
                </div>
                <Progress value={results.wiscar.abilityToLearn} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Real-World Alignment</span>
                  <span className="text-sm text-muted-foreground">{results.wiscar.realWorldAlignment}%</span>
                </div>
                <Progress value={results.wiscar.realWorldAlignment} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Matches and Persona */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Career Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.careerMatch.map((career, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="font-medium">{career}</span>
                  <Badge variant="secondary">Match</Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Your Persona</h4>
              <p className="text-sm text-muted-foreground">"{results.persona}"</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Areas for Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.skillGaps.length > 0 ? (
                results.skillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                    <span className="font-medium">{gap}</span>
                    <Badge variant="outline">Focus Area</Badge>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-success/10 rounded-lg text-center">
                  <span className="font-medium text-success">No major skill gaps identified!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Pathway */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Learning Pathway
          </CardTitle>
          <CardDescription>
            Recommended next steps based on your results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Immediate Next Steps</h4>
                <div className="space-y-2">
                  {getLearningSteps(results.learningPath, results.skillGaps).map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Recommended Resources</h4>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">Growth PM Foundations</div>
                    <div className="text-xs text-muted-foreground">4-week online course</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">Analytics Mastery</div>
                    <div className="text-xs text-muted-foreground">Hands-on workshop</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm">A/B Testing Bootcamp</div>
                    <div className="text-xs text-muted-foreground">2-week intensive</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button variant="hero" size="lg" className="min-w-48">
          Get Learning Plan
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="lg" onClick={onRestart}>
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};