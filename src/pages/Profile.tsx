
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Lock, Shield, ShieldCheck } from "lucide-react";
import { apiCall } from "@/api/apiCalls";
import { genderConstants } from "@/lib/contants/genderConstants";

const Profile = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  // Email verification states
  const [isEmailVerified, setIsEmailVerified] = useState(localStorage.getItem("emailVerified") === "true");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [phone, setPhoneNumber] = useState("9900000000");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state



  useEffect(() => {
    setIsLoading(true); // Set loading state to true when fetching profile
    const fetchProfile = async () => {
      try {
        const { data } = await apiCall({
          method: "GET",
          path: "/user/profile",
          token: true,
        });
        debugger;
        setIsEmailVerified(data.isVerified || false);
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setGender(data.gender || "");
        setDateOfBirth(data.dateOfBirth || "");
        setPhoneNumber(data.phone || "");
        setEmail(data.email || ""); // Assuming email is part of the profile data
      } catch (error) {
        debugger;
        let description = "Error loading profile data.";
        const message = error?.response?.data?.message;
        if (Array.isArray(message)) {
          description = message.join(", ");
        } else if (typeof message === "string") {
          description = message;
        }

        toast({
          variant: "destructive",
          title: "Could not load profile",
          description,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerifying) return;
    if (verificationCode.length !== 6) {  
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code.",
      });
      return;
    }
    setIsVerifying(true);
 try {
      const emailVerificationResponse = await apiCall({
        method: "GET",
        path: "/user/verify-email",
        query: { code: verificationCode },
        token: true,
      });

      if(emailVerificationResponse) {
        toast({
          title: "Verification Successful",
          description: "Your email has been successfully verified.",
        });
        setIsEmailVerified(true);
      }
    } catch (error) {
      debugger;
      const message = error?.response?.data?.message;
      let description = message || "Error in verifying your email.";
      toast({
        variant: "destructive",
        title: "Email Verification Failed",
        description,
      });
    } finally {
      setIsVerifying(false);
      setVerificationCode(""); // Clear the input field after resending
    }
  };

  const handleResendCode = async () => {
    if (isResending) return; // Prevent multiple resends
    setIsResending(true);
    try {
      const resendEmailVerificationResponse = await apiCall({
        method: "GET",
        path: "/user/resend-email-verification-code",
        token: true,
      });

      if(resendEmailVerificationResponse) {
        toast({
          title: "Verification code sent",
          description: "A new verification code has been sent to your email.",
        });
      }
    } catch (error) {
      debugger;
      const message = error?.response?.data?.message;
      let description = message || "Error resending verification code.";
      toast({
        variant: "destructive",
        title: "Could not resend code",
        description,
      });
    } finally {
      setIsResending(false);
      setVerificationCode(""); // Clear the input field after resending
    }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isUpdating) return; // Prevent multiple submissions 
      setIsUpdating(true);
      try {
        const updateProfileResponse = await apiCall({
          method: "PUT",
          path: "/user/profile",
          token: true,
          body: {
            firstName,
            lastName,
            phone,
            dateOfBirth,
            gender,
          },
        })
        if (updateProfileResponse) {
          debugger;
          toast({
            title: "Profile updated successfully",
            description: "Your profile has been updated.",
          });
        }
      } catch (error) {
        debugger;
        let description = "Error updating profile.";
        const message = error?.response?.data?.message;
        if (Array.isArray(message)) {
          description = message.join(", ");
        } else if (typeof message === "string") {
          description = message;
        }
        toast({
          variant: "destructive",
          title: "Could not update profile",
          description,
        });
      }
      finally {
        setIsUpdating(false);
        setIsEditing(false);
      }
    };

    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        {isLoading ? (
          <div className="text-center py-12">Loading profile...</div>
        ) : (
          <main className="flex-grow bg-gradient-to-b from-primary/5 to-background py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle className="text-center">Account</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{firstName}</h3>
                    <p className="text-muted-foreground">{email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {isEmailVerified ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <ShieldCheck className="h-4 w-4" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Shield className="h-4 w-4" />
                          <span className="text-sm font-medium">Not Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-2 font-medium text-primary">Free Plan</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      {isEditing ? "Update your profile details" : "View your account details"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="pl-10"
                            />
                          </div>
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
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">First Name</p>
                            <p className="text-foreground">{firstName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Last Name</p>
                            <p className="text-foreground">{lastName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <span className="h-5 w-5 text-muted-foreground">♂️</span>
                          <div>
                            <p className="text-sm font-medium">Gender</p>
                            <p className="text-foreground">{genderConstants[gender]}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <span className="h-5 w-5 text-muted-foreground">🎂</span>
                          <div>
                            <p className="text-sm font-medium">Date of Birth</p>
                            <p className="text-foreground">{dateOfBirth}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <span className="h-5 w-5 text-muted-foreground">📞</span>
                          <div>
                            <p className="text-sm font-medium">Phone Number</p>
                            <p className="text-foreground">{phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 border rounded-md">
                          <Lock className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Password</p>
                            <p className="text-muted-foreground">********</p>
                          </div>
                          <Button variant="link" className="ml-auto" onClick={() => toast({
                            title: "Feature coming soon",
                            description: "Password reset functionality is coming soon."
                          })}>
                            Change password
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                {/* Email Verification Card */}
                {!isEmailVerified && (
                  <Card className="col-span-1 md:col-span-3">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-amber-600" />
                        Verify Your Email
                      </CardTitle>
                      <CardDescription>
                        Please verify your email address to secure your account and access all features.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleVerifyEmail} className="space-y-4">
                        <div>
                          <Label htmlFor="verificationCode">Verification Code</Label>
                          <Input
                            id="verificationCode"
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Enter the 6-digit code sent to your email address.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button type="submit" disabled={isVerifying || verificationCode.length !== 6}>
                            {isVerifying ? "Verifying..." : "Verify Email"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleResendCode}
                            disabled={isResending}
                          >
                            {isResending ? "Resending..." : "Resend Code"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>)}

        <Footer />
      </div>
    );
  };

  export default Profile;
