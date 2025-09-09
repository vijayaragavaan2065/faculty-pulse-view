// User roles in the system
export type UserRole = 'faculty' | 'hod' | 'director' | 'registrar' | 'office_head' | 'admin';

// Form status types
export type FormStatus = 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department_id?: string;
  department_name?: string;
  created_at?: string;
  updated_at?: string;
}

// Authentication response
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Performance form data structure
export interface PerformanceFormData {
  teaching: {
    courses_taught: string[];
    student_feedback_average: number;
    teaching_hours: number;
    innovative_methods: string;
  };
  research: {
    publications: string[];
    conferences: string[];
    grants: string[];
    patents: string[];
  };
  admin_duties: {
    positions_held: string[];
    committees: string[];
    responsibilities: string;
  };
  projects: {
    ongoing: string[];
    completed: string[];
    industry_collaboration: string[];
  };
  mentoring: {
    phd_students: number;
    masters_students: number;
    undergraduate_projects: number;
    mentoring_activities: string;
  };
}

// Performance form interface
export interface PerformanceForm {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  department_id: string;
  status: FormStatus;
  data: PerformanceFormData;
  proof_urls: string[];
  submitted_at?: string;
  verified_at?: string;
  verified_by?: string;
  comments?: string;
  ai_score?: number;
  ai_feedback?: string;
  created_at: string;
  updated_at: string;
}

// AI evaluation result
export interface AIEvaluationResult {
  score: number; // 0-100
  breakdown: {
    teaching: number;
    research: number;
    admin_duties: number;
    projects: number;
    mentoring: number;
  };
  ideal_answers: PerformanceFormData;
  feedback: string;
  suggestions: string[];
}

// File upload result
export interface UploadResult {
  url: string;
  public_id?: string;
  filename?: string;
}

// Department interface
export interface Department {
  id: string;
  name: string;
  code: string;
  hod_id?: string;
}

// Dashboard stats
export interface DashboardStats {
  total_submissions: number;
  pending_approvals: number;
  average_score: number;
  department_rank?: number;
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'submission' | 'approval' | 'rejection' | 'evaluation';
  description: string;
  timestamp: string;
  user_name?: string;
}

// API Error interface
export interface APIError {
  message: string;
  code?: string;
  details?: any;
}