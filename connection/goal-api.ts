import BaseAPI from "./base-api";

export interface GoalCreate {
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  category?: string;
  [key: string]: any;
}

export interface GoalUpdate {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  [key: string]: any;
}

export class GoalAPI extends BaseAPI {
  constructor() {
    super();
  }

  async getGoals(): Promise<any[]> {
    return this.request<any[]>({
      method: "GET",
      url: "/goals",
    });
  }

  async getGoal(goalId: number): Promise<any> {
    return this.request<any>({
      method: "GET",
      url: `/goals/${goalId}`,
    });
  }

  async getGoalProgress(goalId: number): Promise<any> {
    return this.request<any>({
      method: "GET",
      url: `/goals/${goalId}/progress`,
    });
  }

  async getMilestones(goalId: number, status?: string): Promise<any[]> {
    const url = status 
      ? `/goals/${goalId}/milestones?status=${status}`
      : `/goals/${goalId}/milestones`;
    return this.request<any[]>({
      method: "GET",
      url,
    });
  }

  async getMilestoneStatusBreakdown(goalId: number): Promise<any> {
    return this.request<any>({
      method: "GET",
      url: `/goals/${goalId}/milestone-status-breakdown`,
    });
  }

  async getMilestoneParticipantCounts(goalId: number): Promise<any> {
    return this.request<any>({
      method: "GET",
      url: `/goals/${goalId}/milestone-participant-counts`,
    });
  }

  async getMilestoneSubmissions(milestoneId: number, status?: string): Promise<any[]> {
    const url = status
      ? `/milestones/${milestoneId}/submissions?status=${status}`
      : `/milestones/${milestoneId}/submissions`;
    return this.request<any[]>({
      method: "GET",
      url,
    });
  }

  async createGoal(data: GoalCreate): Promise<any> {
    return this.request<any>({
      method: "POST",
      url: "/goals",
      data,
    });
  }

  async updateGoal(goalId: number, data: GoalUpdate): Promise<any> {
    return this.request<any>({
      method: "PUT",
      url: `/goals/${goalId}`,
      data,
    });
  }

  async deleteGoal(goalId: number): Promise<any> {
    return this.request<any>({
      method: "DELETE",
      url: `/goals/${goalId}`,
    });
  }

  async createMilestones(goalId: number, milestones: any[]): Promise<any> {
    return this.request<any>({
      method: "POST",
      url: `/goals/${goalId}/milestones`,
      data: { milestones },
    });
  }

  async updateMilestone(milestoneId: number, data: any): Promise<any> {
    return this.request<any>({
      method: "PUT",
      url: `/milestones/${milestoneId}`,
      data,
    });
  }

  async deleteMilestone(milestoneId: number): Promise<any> {
    return this.request<any>({
      method: "DELETE",
      url: `/milestones/${milestoneId}`,
    });
  }

  async updateMilestoneStatus(milestoneId: number, status: string): Promise<any> {
    return this.request<any>({
      method: "PATCH",
      url: `/milestones/${milestoneId}/status`,
      data: { status },
    });
  }

  async reviewMilestoneSubmission(submissionId: number, status: string): Promise<any> {
    return this.request<any>({
      method: "PATCH",
      url: `/milestone-submissions/${submissionId}/review`,
      data: { status },
    });
  }
}
