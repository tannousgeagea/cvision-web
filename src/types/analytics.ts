export interface UserAnalytics {
  userId: string;
  userName: string;
  userRole: string;
  date: string; // ISO date string
  annotatedCount: number;
  reviewedCount: number;
  completedCount: number;
  totalTime?: number; // in minutes
}

export interface AnalyticsKPIs {
  totalAnnotationsThisWeek: number;
  totalReviewsThisWeek: number;
  totalCompletionsThisWeek: number;
  topPerformer: {
    userId: string;
    userName: string;
    score: number;
  };
  averageCompletionTimeMinutes: number;
}

export interface AnalyticsFilters {
  timeFrame: 'day' | 'week' | 'month';
  projectId?: string;
  role?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  selectedUsers?: string[];
  showTopPerformersOnly?: boolean;
}

export interface ChartDataPoint {
  date: string;
  [userId: string]: string | number;
}