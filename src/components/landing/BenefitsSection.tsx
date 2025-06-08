
import { CheckCircle, Clock, Target, Users, Zap } from "lucide-react";

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

const BenefitsSection = () => {
  return (
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
  );
};

export default BenefitsSection;
