
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 page-transition">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 animate-scale-in">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary animate-slide-in-top">
            Welcome to
          </span>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-slide-in-top" style={{ animationDelay: "0.1s" }}>
            Teacher Attendance Portal
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl animate-slide-in-top" style={{ animationDelay: "0.2s" }}>
            Track student attendance with ease and efficiency
          </p>
        </div>

        <div className="flex gap-4 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
          <Button
            onClick={() => navigate("/login")}
            className="h-11 px-8 hover-lift"
          >
            Login
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
          <div className="flex flex-col items-center p-6 bg-card rounded-lg soft-shadow hover-lift transition-all duration-300 animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Track Attendance</h3>
            <p className="text-center text-muted-foreground">Easily mark student attendance with our intuitive interface.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg soft-shadow hover-lift transition-all duration-300 animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Generate Reports</h3>
            <p className="text-center text-muted-foreground">Create detailed attendance reports for classes and individual students.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-card rounded-lg soft-shadow hover-lift transition-all duration-300 animate-slide-in-bottom" style={{ animationDelay: "0.6s" }}>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Smart Notifications</h3>
            <p className="text-center text-muted-foreground">Get alerts for attendance patterns and potential issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
