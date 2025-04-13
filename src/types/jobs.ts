import { User, Role } from "./membership";

export enum JobStatus {
    UNASSIGNED = "unassigned",
    ASSIGNED = "assigned",
    IN_REVIEW = "in_review",
    COMPLETED = "completed",
  }
  

export interface ProjectMember extends User {
  role: Role
}

export interface Job {
    id: string;
    name: string;
    description?: string;
    status: JobStatus;
    imageCount: number;
    assignedUser: User | null;
    createdAt: Date;
    updatedAt: Date;
  }


  