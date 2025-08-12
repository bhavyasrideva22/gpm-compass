import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, BarChart3, Target, Lightbulb, Zap } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-accent-foreground">Career Fit Assessment</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Growth Product Manager
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover if you're ready to become a Growth Product Manager. This comprehensive assessment evaluates your personality, skills, and learning readiness for this exciting career path.
        </p>
      </div>

      {/* What is a GPM Section */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            What is a Growth Product Manager?
          </CardTitle>
          <CardDescription>
            A Growth Product Manager focuses on user acquisition, activation, retention, referral, and revenue optimization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            GPMs design experiments, leverage analytics, and work closely with engineering and marketing teams to optimize product growth through the AARRR funnel.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Career Roles
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Growth Product Manager</li>
                <li>• Growth Marketing PM</li>
                <li>• User Acquisition Manager</li>
                <li>• Product-Led Growth Strategist</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Key Skills
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Data-driven decision making</li>
                <li>• A/B testing & experimentation</li>
                <li>• Analytics & SQL knowledge</li>
                <li>• Cross-functional collaboration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Assessment Overview
          </CardTitle>
          <CardDescription>
            This 20-30 minute assessment covers multiple dimensions of career readiness.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Psychometric</h4>
              <p className="text-sm text-muted-foreground">Personality & interests</p>
              <Badge variant="secondary">~7 min</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Technical</h4>
              <p className="text-sm text-muted-foreground">Skills & knowledge</p>
              <Badge variant="secondary">~10 min</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">WISCAR</h4>
              <p className="text-sm text-muted-foreground">Readiness framework</p>
              <Badge variant="secondary">~7 min</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Results</h4>
              <p className="text-sm text-muted-foreground">Personalized insights</p>
              <Badge variant="secondary">~5 min</Badge>
            </div>
          </div>
          
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              What You'll Get
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Career fit score and recommendation (Yes/Maybe/No)</li>
              <li>• Detailed strengths and improvement areas</li>
              <li>• Personalized learning pathway</li>
              <li>• Alternative career suggestions if needed</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <Button 
          variant="hero" 
          size="lg"
          onClick={onStart}
          className="text-lg px-8 py-6 h-auto"
        >
          Start Assessment
        </Button>
        <p className="text-sm text-muted-foreground">
          Takes 20-30 minutes • Get instant results • Free career guidance
        </p>
      </div>
    </div>
  );
};