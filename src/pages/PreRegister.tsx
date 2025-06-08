
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mic, ArrowRight, CheckCircle, Clock, Target, Users, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com' 
  : 'http://localhost:3000';

const benefits = [
  {
    icon: Zap,
    title: "Real-time AI-driven interview questions",
    description: "Get dynamic questions tailored to your industry and role"
  },
  {
    icon: Target,
    title: "Smart feedback on tone, clarity, and confidence",
    description: "Detailed analysis to help you improve your interview performance"
  },
  {
    icon: Users,
    title: "Tailored sessions for specific roles or industries",
    description: "Practice for software engineering, marketing, consulting, and more"
  },
  {
    icon: Clock,
    title: "Practice alone, anytime—no scheduling needed",
    description: "Available 24/7 whenever you're ready to practice"
  }
];

const testimonials = [
  {
    category: "Job Seekers",
    title: "Recent Graduates",
    description: "Practice common interview questions and build confidence before entering the job market",
    badge: "Entry Level"
  },
  {
    category: "Career Switchers",
    title: "Mid-Career Professionals",
    description: "Prepare for industry-specific questions when transitioning to new fields",
    badge: "Career Change"
  },
  {
    category: "Students",
    title: "University Students",
    description: "Get ready for internship and campus recruitment interviews",
    badge: "Student"
  },
  {
    category: "Experienced",
    title: "Senior Professionals",
    description: "Sharpen leadership and strategic thinking responses for executive roles",
    badge: "Senior Level"
  }
];

const faqs = [
  {
    question: "Is VerbalPilot free?",
    answer: "We're planning a freemium model with basic features available for free and premium features for paid subscribers. Early access users will get extended free trials."
  },
  {
    question: "How does VerbalPilot work?",
    answer: "VerbalPilot uses advanced AI to conduct realistic mock interviews. You'll answer questions verbally, and our AI provides instant feedback on your responses, tone, and delivery."
  },
  {
    question: "When does VerbalPilot launch?",
    answer: "We're targeting early 2024 for our beta launch. Join our waitlist to be among the first to try VerbalPilot and help shape the product."
  },
  {
    question: "Can I suggest features?",
    answer: "Absolutely! We're building VerbalPilot with our community. Your feedback and feature suggestions are invaluable in creating the best interview preparation tool possible."
  }
];

const PreRegister = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    surveyEmail: "",
    roles: "",
    jobHunting: "",
    challenges: "",
    willPay: ""
  });
  const [isSurveySubmitting, setIsSurveySubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Welcome to the waitlist!",
          description: "We'll notify you when VerbalPilot is ready for early access.",
        });
        setEmail("");
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSurveySubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/api/survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Survey submitted!",
          description: "Thank you for helping us build a better product.",
        });
        setFormData({
          surveyEmail: "",
          roles: "",
          jobHunting: "",
          challenges: "",
          willPay: ""
        });
      } else {
        throw new Error('Failed to submit survey');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSurveySubmitting(false);
    }
  };

  const handleSurveyChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 rounded-full p-4">
                <Mic className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Ace Your Interviews with AI
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-primary mb-8">
              Practice Like a Pro with VerbalPilot
            </p>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              VerbalPilot is your AI-powered mock interview partner. Practice anytime, 
              get instant feedback, and build confidence before your real interview.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 text-base"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 px-8 whitespace-nowrap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-muted-foreground">
              Join 1,000+ professionals preparing for their dream jobs
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
              Why Choose VerbalPilot?
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Everything you need to master your interview skills and land your dream job
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-background rounded-lg shadow-sm border">
                  <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
              Built for Every Professional
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Whether you're starting your career or advancing to the next level, VerbalPilot adapts to your needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-foreground">
                        {testimonial.title}
                      </h3>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {testimonial.badge}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {testimonial.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audience Survey Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Help Us Build for You
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Share your needs so we can create the perfect interview preparation experience
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSurveySubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="survey-email" className="text-base font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="survey-email"
                      type="email"
                      value={formData.surveyEmail}
                      onChange={(e) => handleSurveyChange("surveyEmail", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="roles" className="text-base font-medium">
                      What kind of roles are you preparing for?
                    </Label>
                    <Input
                      id="roles"
                      placeholder="e.g., Software Engineer, Product Manager, Sales"
                      value={formData.roles}
                      onChange={(e) => handleSurveyChange("roles", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="job-hunting" className="text-base font-medium">
                      Are you actively job hunting?
                    </Label>
                    <Input
                      id="job-hunting"
                      placeholder="e.g., Yes, starting soon, Just exploring"
                      value={formData.jobHunting}
                      onChange={(e) => handleSurveyChange("jobHunting", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="challenges" className="text-base font-medium">
                      What's your biggest interview challenge?
                    </Label>
                    <Textarea
                      id="challenges"
                      placeholder="e.g., Nervousness, technical questions, behavioral responses"
                      value={formData.challenges}
                      onChange={(e) => handleSurveyChange("challenges", e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="will-pay" className="text-base font-medium">
                      Would you pay for AI-based mock interviews?
                    </Label>
                    <Input
                      id="will-pay"
                      placeholder="e.g., Yes, depends on price, prefer free version"
                      value={formData.willPay}
                      onChange={(e) => handleSurveyChange("willPay", e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base"
                    disabled={isSurveySubmitting}
                  >
                    {isSurveySubmitting ? "Submitting..." : "Submit & Join Waitlist"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Everything you need to know about VerbalPilot
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreRegister;
