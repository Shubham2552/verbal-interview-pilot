
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const TestimonialsSection = () => {
  return (
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
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.badge}
                    </Badge>
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
  );
};

export default TestimonialsSection;
