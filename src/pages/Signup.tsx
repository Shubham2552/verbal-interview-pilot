
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mic } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice"; // <-- Import your Redux login action
import { apiCall } from "../api/apiCalls"; // Adjust the import based on your project structure

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch(); // <-- Use Redux dispatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your signup API endpoint
      const signUpResponse = await apiCall({
        method: "POST",
        path: "/user/signup", // Change this to your actual signup endpoint
        body: {
          firstName,
          lastName,
          gender,
          dateOfBirth,
          phone,
          email,
          password,
        },
      });
   dispatch(login({
        token: signUpResponse.data.token,
        user: {
          email
        }
      }));
      toast({
        title: "Account created",
        description: "Welcome to VerbalPilot!",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      let description = "Please fill in all fields and try again.";
      const message = error?.response?.data?.message;
      if (Array.isArray(message)) {
        description = message.join(", ");
      } else if (typeof message === "string") {
        description = message;
      }
      toast({
        variant: "destructive",
        title: "Signup failed",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-primary/10 to-background py-12">
        <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-primary/10 rounded-full p-3 mb-4">
                <Mic className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mt-2 text-3xl font-bold">Create an account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign up to start practicing for your interviews
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="E.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="E.g. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="phone"
                  placeholder="E.g. 9999999999"
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Gender</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      required
                    />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      required
                    />
                    Female
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === "other"}
                      onChange={() => setGender("other")}
                      required
                    />
                    Other
                  </label>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Password must be at least 8 characters
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
