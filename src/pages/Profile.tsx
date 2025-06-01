
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
import ChangePasswordDialog from "@/components/ChangePasswordDialog";

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

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Mock profile update - in a real app this would connect to a backend
    setTimeout(() => {
      setIsUpdating(false);
      setIsEditing(false);
      
      // Update local storage to persist changes
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      login(email); // Update auth context
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    // Mock email verification - in a real app this would connect to a backend
    setTimeout(() => {
      setIsVerifying(false);
      
      if (verificationCode === "123456") {
        setIsEmailVerified(true);
        localStorage.setItem("emailVerified", "true");
        setVerificationCode("");
        
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        });
      } else {
        toast({
          title: "Invalid code",
          description: "The verification code is incorrect. Please try again.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setIsResending(true);

    // Mock resend verification code - in a real app this would connect to a backend
    setTimeout(() => {
      setIsResending(false);
      
      toast({
        title: "Verification code sent",
        description: "A new verification code has been sent to your email.",
      });
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
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
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{name}</h3>
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
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
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
                        <p className="text-sm font-medium">Full Name</p>
                        <p className="text-foreground">{name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-grow">
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-foreground">{email}</p>
                      </div>
                      {isEmailVerified ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <ShieldCheck className="h-4 w-4" />
                          <span className="text-xs">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-600">
                          <Shield className="h-4 w-4" />
                          <span className="text-xs">Not Verified</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Password</p>
                        <p className="text-muted-foreground">********</p>
                      </div>
                      <Button 
                        variant="link" 
                        className="ml-auto" 
                        onClick={() => setShowChangePasswordDialog(true)}
                      >
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
      </main>
      
      <ChangePasswordDialog 
        open={showChangePasswordDialog} 
        onOpenChange={setShowChangePasswordDialog} 
      />
      
      <Footer />
    </div>
  );
};

  export default Profile;
