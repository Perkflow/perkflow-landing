import { useQuery } from "@tanstack/react-query";
import { dashboardAPI } from "@/connection/dashboard-api";

// Dashboard statistics hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      try {
        return await dashboardAPI.getDashboardStats();
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Return default structure on error
        return {
          goals: {
            stats: [
              { label: "Total goals created", value: 0 },
              { label: "Active Goals", value: 0 },
              { label: "Completion Rate", value: "0%" },
            ],
            chart_data: [],
            status_distribution: [
              { name: "Not started", value: 0 },
              { name: "In-progress", value: 0 },
              { name: "Completed", value: 0 },
            ],
          },
          rewards: {
            stats: [
              { label: "Total rewards created", value: 0 },
              { label: "Pending", value: 0 },
              { label: "Delivered", value: 0 },
            ],
            chart_data: [],
          },
          team: {
            stats: [
              { label: "Departments", value: 0 },
              { label: "People", value: 0 },
              { label: "Goal engagement", value: "0%" },
            ],
            chart_data: [],
          },
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Actions required hook
export const useActionsRequired = () => {
  return useQuery({
    queryKey: ["actions-required"],
    queryFn: async () => {
      try {
        return await dashboardAPI.getActionsRequired();
      } catch (error) {
        console.error("Error fetching actions required:", error);
        return {
          review_proposals: [],
          accepted_proposals: [],
          paid_proposals: [],
          declined_proposals: [],
          goal_approvals: [],
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Team performance hook
export const useTeamPerformance = () => {
  return useQuery({
    queryKey: ["team-performance"],
    queryFn: async () => {
      try {
        return await dashboardAPI.getTeamPerformance();
      } catch (error) {
        console.error("Error fetching team performance:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Activity feed hook
export const useActivityFeed = (limit: number = 10) => {
  return useQuery({
    queryKey: ["activity-feed", limit],
    queryFn: async () => {
      try {
        return await dashboardAPI.getActivityFeed(limit);
      } catch (error) {
        console.error("Error fetching activity feed:", error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Goal activity feed hook
export const useGoalActivityFeed = (goalId: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["goal-activity-feed", goalId, limit],
    queryFn: async () => {
      try {
        return await dashboardAPI.getGoalActivityFeed(goalId, limit);
      } catch (error) {
        console.error("Error fetching goal activity feed:", error);
        return [];
      }
    },
    enabled: !!goalId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
