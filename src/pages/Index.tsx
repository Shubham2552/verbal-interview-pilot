
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Mic, ArrowRight, CheckCircle, Clock, Target, Users, Zap } from "lucide-react";

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

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you when VerbalPilot is ready for early access.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
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
                Master Your Interview Skills with AI
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
