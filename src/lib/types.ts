
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  grade: string;
  avatar?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  room: string;
  time: string;
  days: string[]; // e.g., ["Monday", "Wednesday", "Friday"]
  studentIds: string[];
}

export interface AttendanceRecord {
  date: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalClasses: number;
  attendanceToday: number;
  attendanceRate: number;
  recentRecords: AttendanceRecord[];
}
