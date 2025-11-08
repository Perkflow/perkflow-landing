"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GoalAPI, GoalCreate, GoalUpdate } from "@/connection/goal-api";
import { toast } from "sonner";

const goalAPI = new GoalAPI();

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => goalAPI.getGoals(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGoal(goalId: number) {
  const isValidGoalId =
    typeof goalId === "number" && !isNaN(goalId) && goalId > 0;

  return useQuery({
    queryKey: ["goals", goalId],
    queryFn: () => goalAPI.getGoal(goalId),
    enabled: isValidGoalId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGoalProgress(goalId: number) {
  const isValidGoalId =
    typeof goalId === "number" && !isNaN(goalId) && goalId > 0;

  return useQuery({
    queryKey: ["goals", goalId, "progress"],
    queryFn: () => goalAPI.getGoalProgress(goalId),
    enabled: isValidGoalId,
    staleTime: 30 * 1000, // 30 seconds instead of 5 minutes
  });
}

export function useMilestones(goalId: number, status?: string) {
  const isValidGoalId =
    typeof goalId === "number" && !isNaN(goalId) && goalId > 0;

  return useQuery({
    queryKey: ["goals", goalId, "milestones", status],
    queryFn: () => goalAPI.getMilestones(goalId, status),
    enabled: isValidGoalId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMilestoneStatusBreakdown(goalId: number) {
  return useQuery({
    queryKey: ["goals", goalId, "milestone-status-breakdown"],
    queryFn: () => goalAPI.getMilestoneStatusBreakdown(goalId),
    enabled: !!goalId,
  });
}

export function useMilestoneParticipantCounts(goalId: number) {
  return useQuery({
    queryKey: ["goals", goalId, "milestone-participant-counts"],
    queryFn: () => goalAPI.getMilestoneParticipantCounts(goalId),
    enabled: !!goalId,
  });
}

export function useMilestoneSubmissions(milestoneId: number, status?: string) {
  return useQuery({
    queryKey: ["milestones", milestoneId, "submissions", status],
    queryFn: () => goalAPI.getMilestoneSubmissions(milestoneId, status),
    enabled: !!milestoneId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalCreate) => goalAPI.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create goal");
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goalId, data }: { goalId: number; data: GoalUpdate }) =>
      goalAPI.updateGoal(goalId, data),
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", goalId] });
      // Remove automatic toast - let calling component handle it
    },
    onError: (error: any) => {
      // Keep error toast for debugging purposes
      console.error("Goal update error:", error);
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: number) => goalAPI.deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete goal");
    },
  });
}

export function useCreateMilestones() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      goalId,
      milestones,
    }: {
      goalId: number;
      milestones: any[];
    }) => goalAPI.createMilestones(goalId, milestones),
    onSuccess: (_, { goalId }) => {
      queryClient.invalidateQueries({
        queryKey: ["goals", goalId, "milestones"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals", goalId, "milestone-status-breakdown"],
      });
      toast.success("Milestones created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create milestones");
    },
  });
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      milestoneId,
      data,
    }: {
      milestoneId: number;
      data: { title?: string; description?: string; weight?: number };
    }) => goalAPI.updateMilestone(milestoneId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update milestone");
    },
  });
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (milestoneId: number) => goalAPI.deleteMilestone(milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      toast.success("Milestone deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete milestone");
    },
  });
}

export function useUpdateMilestoneStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      milestoneId,
      status,
    }: {
      milestoneId: number;
      status: string;
    }) => goalAPI.updateMilestoneStatus(milestoneId, status),
    onSuccess: (_, { milestoneId }) => {
      // Invalidate all goal-related queries to ensure progress updates
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-status-breakdown"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-participant-counts"],
      });
      // Also invalidate participant goals to refresh participant dashboard
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["participant-milestones"] });
      // Invalidate goal-specific queries to ensure goal status updates
      queryClient.invalidateQueries({ queryKey: ["goals", "active"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "completed"] });
      // Invalidate activity feed
      queryClient.invalidateQueries({ queryKey: ["goal-activity-feed"] });
      // Toast and redirect handled in component
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update milestone status");
    },
  });
}

export function useReviewMilestoneSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      status,
    }: {
      submissionId: number;
      status: string;
    }) => goalAPI.reviewMilestoneSubmission(submissionId, status),
    onSuccess: () => {
      // Invalidate all goal-related queries to ensure progress updates
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-status-breakdown"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-participant-counts"],
      });
      // Also invalidate participant goals to refresh participant dashboard
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["participant-milestones"] });
      // Invalidate goal-specific queries to ensure goal status updates
      queryClient.invalidateQueries({ queryKey: ["goals", "active"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "completed"] });
      // Invalidate activity feed
      queryClient.invalidateQueries({ queryKey: ["goal-activity-feed"] });
      // Toast and redirect handled in component
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to review submission");
    },
  });
}
