
import { useState, useEffect } from "react";
import { classes, students } from "@/lib/data";
import { Class, Student } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Users, Calendar, Clock, MapPin } from "lucide-react";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<Class[]>(classes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter classes based on search term
    if (searchTerm.trim() === "") {
      setFilteredClasses(classes);
    } else {
      const filtered = classes.filter(
        (cls) =>
          cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.room.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
  }, [searchTerm]);

  // Get students for a class
  const getClassStudents = (classStudentIds: string[]): Student[] => {
    return students.filter(student => classStudentIds.includes(student.id));
  };

  // Get today's day name
  const getTodayClass = (days: string[]): boolean => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return days.includes(today);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-lg text-muted-foreground">Loading classes data...</div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-in-top">Classes</h1>
          <p className="text-muted-foreground animate-slide-in-top" style={{ animationDelay: "0.1s" }}>
            Manage your classes and track attendance
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto animate-slide-in-top" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-[300px] soft-shadow-sm"
            />
          </div>
          <Button className="hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No classes found matching your search.</p>
          </div>
        ) : (
          filteredClasses.map((cls, index) => {
            const classStudents = getClassStudents(cls.studentIds);
            const isTodayClass = getTodayClass(cls.days);
            
            return (
              <Card 
                key={cls.id} 
                className={`soft-shadow hover-lift animate-slide-in-bottom transition-all ${isTodayClass ? 'border-primary/30' : ''}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cls.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Subject: {cls.subject}
                      </CardDescription>
                    </div>
                    {isTodayClass && (
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                        Today
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-3">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.room}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.days.join(", ")}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.studentIds.length} Students</span>
                    </div>
                    
                    <div className="flex -space-x-2 overflow-hidden mt-2">
                      {classStudents.slice(0, 5).map((student) => (
                        <Avatar key={student.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="text-xs">
                            {student.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {cls.studentIds.length > 5 && (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                          +{cls.studentIds.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs hover-lift">
                    View Class
                  </Button>
                  <Button variant="default" size="sm" className="text-xs hover-lift">
                    Take Attendance
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Classes;
