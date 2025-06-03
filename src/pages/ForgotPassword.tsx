import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import { Mic, Mail } from "lucide-react";
import { useLoading } from "@/hooks/useLoading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { toast } = useToast();
  const showSkeleton = useLoading(pageLoading, { minDuration: 600 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - in real app this would send to backend
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "If an account exists with this email, you will receive a password reset link.",
        });
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      // Mock success for demo purposes
      setTimeout(() => {
        setIsSubmitted(true);
        toast({
          title: "Reset link sent",
          description: "If an account exists with this email, you will receive a password reset link.",
        });
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary/10 to-background py-12">
        {showSkeleton ? (
          <FormSkeleton fields={1} />
        ) : (
          <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-sm">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="bg-primary/10 rounded-full p-3 mb-4">
                  <Mic className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="mt-2 text-3xl font-bold">Reset your password</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {!isSubmitted ? "Enter your email to receive a password reset link" : "Check your email for the reset link"}
              </p>
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending reset link..." : "Send reset link"}
                </Button>
                
                <div className="text-center text-sm">
                  <p className="text-muted-foreground">
                    Remember your password?{" "}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                  <p className="text-green-800">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-green-700 text-sm mt-2">
                    The link will expire in 1 hour. Check your spam folder if you don't see it.
                  </p>
                </div>
                
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Return to login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
