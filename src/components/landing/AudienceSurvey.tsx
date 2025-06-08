
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AudienceSurvey = () => {
  const [formData, setFormData] = useState({
    email: "",
    roles: "",
    jobHunting: "",
    challenges: "",
    willPay: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Survey submitted!",
        description: "Thank you for helping us build a better product.",
      });
      setFormData({
        email: "",
        roles: "",
        jobHunting: "",
        challenges: "",
        willPay: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="survey-email" className="text-base font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="survey-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
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
                    onChange={(e) => handleChange("roles", e.target.value)}
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
                    onChange={(e) => handleChange("jobHunting", e.target.value)}
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
                    onChange={(e) => handleChange("challenges", e.target.value)}
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
                    onChange={(e) => handleChange("willPay", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit & Join Waitlist"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AudienceSurvey;
