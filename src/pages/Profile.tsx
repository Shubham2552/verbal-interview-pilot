
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Lock } from "lucide-react";

const Profile = () => {
  const { userEmail, login } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(localStorage.getItem("userName") || "User");
  const [email, setEmail] = useState(userEmail || "");
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
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-foreground">{email}</p>
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
