
import { Student, Class, Attendance, AttendanceRecord, DashboardStats, User } from './types';

// Current user
export const currentUser: User = {
  id: "1",
  name: "Ms. Jessica Parker",
  email: "teacher@example.com",
  role: "teacher",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

// Mock students data
export const students: Student[] = [
  {
    id: "1",
    name: "Emma Thompson",
    studentId: "ST001",
    email: "emma.t@example.com",
    grade: "10A",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "2",
    name: "Liam Johnson",
    studentId: "ST002",
    email: "liam.j@example.com",
    grade: "10A",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "3",
    name: "Olivia Davis",
    studentId: "ST003",
    email: "olivia.d@example.com",
    grade: "10A",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "4",
    name: "Noah Wilson",
    studentId: "ST004",
    email: "noah.w@example.com",
    grade: "10B",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "5",
    name: "Ava Martinez",
    studentId: "ST005",
    email: "ava.m@example.com",
    grade: "10B",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "6",
    name: "William Taylor",
    studentId: "ST006",
    email: "william.t@example.com",
    grade: "10B",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

// Mock classes data
export const classes: Class[] = [
  {
    id: "1",
    name: "Mathematics 101",
    subject: "Mathematics",
    room: "Room 201",
    time: "09:00 - 10:30",
    days: ["Monday", "Wednesday", "Friday"],
    studentIds: ["1", "2", "3", "4", "5"]
  },
  {
    id: "2",
    name: "English Literature",
    subject: "English",
    room: "Room 105",
    time: "11:00 - 12:30",
    days: ["Tuesday", "Thursday"],
    studentIds: ["1", "3", "5", "6"]
  },
  {
    id: "3",
    name: "Physics",
    subject: "Science",
    room: "Lab 302",
    time: "13:30 - 15:00",
    days: ["Monday", "Wednesday"],
    studentIds: ["2", "4", "6"]
  },
  {
    id: "4",
    name: "History",
    subject: "Social Studies",
    room: "Room 108",
    time: "15:30 - 17:00",
    days: ["Tuesday", "Friday"],
    studentIds: ["1", "2", "3", "4", "5", "6"]
  }
];

// Generate mock attendance for the last 10 days
const generateMockAttendance = (): Attendance[] => {
  const attendance: Attendance[] = [];
  const statuses: Array<"present" | "absent" | "late" | "excused"> = ["present", "absent", "late", "excused"];
  const today = new Date();
  
  // For each class
  classes.forEach(cls => {
    // For each student in the class
    cls.studentIds.forEach(studentId => {
      // For the last 10 days, create attendance records
      for (let i = 0; i < 10; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Randomly assign attendance status, with higher probability for "present"
        let statusIndex = Math.floor(Math.random() * 10);
        if (statusIndex >= 7) {
          statusIndex = Math.floor(statusIndex / 7); // Creates more "present" status
        } else {
          statusIndex = 0; // present
        }
        
        attendance.push({
          id: `${cls.id}-${studentId}-${date.toISOString().split('T')[0]}`,
          studentId,
          classId: cls.id,
          date: date.toISOString().split('T')[0],
          status: statuses[statusIndex] || "present"
        });
      }
    });
  });
  
  return attendance;
};

export const attendance: Attendance[] = generateMockAttendance();

// Generate attendance records for dashboard
export const getAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  // Generate records for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Filter attendance for this date
    const dayAttendance = attendance.filter(a => a.date === dateStr);
    
    // Count by status
    const present = dayAttendance.filter(a => a.status === "present").length;
    const absent = dayAttendance.filter(a => a.status === "absent").length;
    const late = dayAttendance.filter(a => a.status === "late").length;
    const excused = dayAttendance.filter(a => a.status === "excused").length;
    
    records.push({
      date: dateStr,
      present,
      absent,
      late,
      excused
    });
  }
  
  return records;
};

// Dashboard stats
export const getDashboardStats = (): DashboardStats => {
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const present = todayAttendance.filter(a => a.status === "present").length;
  const total = todayAttendance.length;
  
  return {
    totalStudents: students.length,
    totalClasses: classes.length,
    attendanceToday: present,
    attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0,
    recentRecords: getAttendanceRecords()
  };
};
