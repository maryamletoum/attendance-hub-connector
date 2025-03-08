
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginUser } from '@/redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  
  const [email, setEmail] = useState("teacher@example.com");
  const [password, setPassword] = useState("password");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Dispatch login action
      const resultAction = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      } else if (loginUser.rejected.match(resultAction) && resultAction.payload) {
        toast.error(resultAction.payload as string);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4 page-transition">
      <div className="w-full max-w-md glassmorphism rounded-xl p-8 soft-shadow animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight animate-slide-in-top">Teacher Attendance Portal</h1>
          <p className="text-muted-foreground mt-2 animate-slide-in-top" style={{ animationDelay: "0.1s" }}>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="soft-shadow-sm"
            />
          </div>
          
          <div className="space-y-2 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-primary underline-offset-4 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="soft-shadow-sm"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full hover-lift animate-slide-in-bottom"
            style={{ animationDelay: "0.4s" }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 text-sm text-destructive animate-slide-in-bottom">
            {error}
          </div>
        )}
        
        <div className="mt-6 text-center text-sm text-muted-foreground animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
          <p>Demo credentials are pre-filled for you.</p>
          <p className="mt-1">Just click "Sign in" to continue.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
