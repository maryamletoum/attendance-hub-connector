import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats, DashboardStats } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = getDashboardStats();
      setStats(data);
    };

    loadData();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-lg text-muted-foreground">Loading dashboard data...</div>
      </div>
    );
  }

  // Format date for chart display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Prepare data for charts
  const attendanceBarData = stats.recentRecords.map(record => ({
    date: formatDate(record.date),
    Present: record.present,
    Absent: record.absent,
    Late: record.late,
    Excused: record.excused
  }));

  const attendancePieData = [
    { name: "Present", value: stats.attendanceToday },
    { name: "Absent/Late/Excused", value: stats.totalStudents - stats.attendanceToday }
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight animate-slide-in-top">Dashboard</h1>
        <p className="text-muted-foreground animate-slide-in-top" style={{ animationDelay: "0.1s" }}>
          Welcome back! Here's today's attendance overview.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="soft-shadow hover-lift animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-3xl">{stats.totalStudents}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Students under your supervision
            </div>
          </CardContent>
        </Card>
        
        <Card className="soft-shadow hover-lift animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Total Classes</CardDescription>
            <CardTitle className="text-3xl">{stats.totalClasses}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Classes assigned to you
            </div>
          </CardContent>
        </Card>
        
        <Card className="soft-shadow hover-lift animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Attendance Today</CardDescription>
            <CardTitle className="text-3xl">{stats.attendanceToday}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Students present today
            </div>
          </CardContent>
        </Card>
        
        <Card className="soft-shadow hover-lift animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
          <CardHeader className="pb-2">
            <CardDescription>Attendance Rate</CardDescription>
            <CardTitle className="text-3xl">{stats.attendanceRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Current attendance percentage
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="soft-shadow animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Weekly Attendance Breakdown</CardTitle>
            <CardDescription>Attendance records for the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceBarData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Present" fill="#0088FE" />
                <Bar dataKey="Absent" fill="#FF8042" />
                <Bar dataKey="Late" fill="#FFBB28" />
                <Bar dataKey="Excused" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="soft-shadow animate-slide-in-bottom" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Current day attendance distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendancePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendancePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="soft-shadow animate-slide-in-bottom" style={{ animationDelay: "0.7s" }}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might want to perform</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <a href="/students" className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover-lift transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Manage Students</span>
          </a>
          
          <a href="/classes" className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover-lift transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-sm font-medium">View Classes</span>
          </a>
          
          <a href="/dashboard" className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover-lift transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Generate Reports</span>
          </a>
          
          <a href="/profile" className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg hover-lift transition-all">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Profile Settings</span>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
