import BaseAPI from "./base-api";

interface DashboardStats {
  goals: {
    stats: Array<{ label: string; value: number | string }>;
    chart_data: any[];
    status_distribution: Array<{ name: string; value: number }>;
  };
  rewards: {
    stats: Array<{ label: string; value: number | string }>;
    chart_data: any[];
  };
  team: {
    stats: Array<{ label: string; value: number | string }>;
    chart_data: any[];
  };
}

interface ActionsRequired {
  review_proposals: any[];
  accepted_proposals: any[];
  paid_proposals: any[];
  declined_proposals: any[];
  goal_approvals: any[];
}

class DashboardAPI extends BaseAPI {
  constructor() {
    super();
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>({
      method: "GET",
      url: "/dashboard/stats",
    });
  }

  async getActionsRequired(): Promise<ActionsRequired> {
    return this.request<ActionsRequired>({
      method: "GET",
      url: "/dashboard/actions-required",
    });
  }

  async getTeamPerformance(): Promise<any[]> {
    return this.request<any[]>({
      method: "GET",
      url: "/dashboard/team-performance",
    });
  }

  async getActivityFeed(limit: number = 10): Promise<any[]> {
    return this.request<any[]>({
      method: "GET",
      url: `/dashboard/activity-feed?limit=${limit}`,
    });
  }

  async getGoalActivityFeed(goalId: number, limit: number = 10): Promise<any[]> {
    return this.request<any[]>({
      method: "GET",
      url: `/dashboard/goals/${goalId}/activity?limit=${limit}`,
    });
  }
}

export const dashboardAPI = new DashboardAPI();
