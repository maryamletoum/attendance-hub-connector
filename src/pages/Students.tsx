
import { useState, useEffect } from "react";
import { students, classes } from "@/lib/data";
import { Student } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter students based on search term
    if (searchTerm.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.grade.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm]);

  // Get classes for a student
  const getStudentClasses = (studentId: string) => {
    return classes.filter(cls => cls.studentIds.includes(studentId));
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse text-lg text-muted-foreground">Loading students data...</div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-in-top">Students</h1>
          <p className="text-muted-foreground animate-slide-in-top" style={{ animationDelay: "0.1s" }}>
            Manage all students and their class assignments
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto animate-slide-in-top" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-[300px] soft-shadow-sm"
            />
          </div>
          <Button className="hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No students found matching your search.</p>
          </div>
        ) : (
          filteredStudents.map((student, index) => (
            <Card 
              key={student.id} 
              className="soft-shadow hover-lift animate-slide-in-bottom transition-transform"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{student.name}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      ID: {student.studentId}
                      <Badge variant="outline" className="ml-2">
                        Grade {student.grade}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email:</span> {student.email}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Classes:</span>{" "}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getStudentClasses(student.id).map((cls) => (
                        <Badge key={cls.id} variant="secondary" className="text-xs">
                          {cls.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 flex justify-between">
                <Button variant="outline" size="sm" className="text-xs hover-lift">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-xs hover-lift">
                  Attendance
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Students;
