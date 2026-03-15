export type IssueType = 'BUG' | 'STORY' | 'TASK' | 'EPIC';
export type Priority = 'HIGHEST' | 'HIGH' | 'MEDIUM' | 'LOW' | 'LOWEST';
export type Status = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER' | 'OWNER';
  jobTitle?: string;
  department?: string;
  location?: string;
  bio?: string;
  timezone?: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  description: string;
  type: 'SCRUM' | 'KANBAN';
  leadId: string;
  color: string;
  memberIds: string[];
  updatedAt: string;
  isStarred?: boolean;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
  status: 'ACTIVE' | 'PLANNED' | 'COMPLETED';
}

export interface Issue {
  id: string;
  key: string;
  projectId: string;
  sprintId?: string;
  epicId?: string;
  type: IssueType;
  summary: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId?: string;
  reporterId: string;
  storyPoints?: number;
  labels: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  isStarred?: boolean;
}

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  userId: string;
  issueId?: string;
  projectId?: string;
  action: string;
  target?: string;
  timestamp: string;
}
