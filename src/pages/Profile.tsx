
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Bell, Shield, Lock, User } from "lucide-react";

const Profile = () => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully!");
  };
  
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="page-transition max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight animate-slide-in-top">Profile Settings</h1>
        <p className="text-muted-foreground animate-slide-in-top" style={{ animationDelay: "0.1s" }}>
          Update your profile information and preferences
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{currentUser.name}</h2>
        <p className="text-muted-foreground">{currentUser.role}</p>
        <Button variant="outline" className="mt-4 hover-lift">
          Change Avatar
        </Button>
      </div>
      
      <Separator className="my-8" />
      
      <Tabs defaultValue="account" className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Password</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="soft-shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="soft-shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    value={currentUser.role} 
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Your role cannot be changed.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="hover-lift">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    className="soft-shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    className="soft-shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    className="soft-shadow-sm"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="hover-lift">Update Password</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="soft-shadow">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificationUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about attendance updates.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="email-notifications" className="sr-only">
                        Toggle email notifications
                      </Label>
                      <input
                        type="checkbox"
                        id="email-notifications"
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">System Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive in-app notifications about attendance updates.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="system-notifications" className="sr-only">
                        Toggle system notifications
                      </Label>
                      <input
                        type="checkbox"
                        id="system-notifications"
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Absence Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts for student absences.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="absence-alerts" className="sr-only">
                        Toggle absence alerts
                      </Label>
                      <input
                        type="checkbox"
                        id="absence-alerts"
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="hover-lift">Save Preferences</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 p-4 bg-muted rounded-lg animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h3 className="text-sm font-medium">Account Security</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your account is secure and up-to-date. Last login: Today at {new Date().toLocaleTimeString()}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
