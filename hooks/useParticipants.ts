import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ParticipantAPI } from "@/connection/participant-api";
import { RoleAPI } from "@/connection/role-api";
import { RecognitionAPI } from "@/connection/recognition-api";
import { toast } from "sonner";
import { DepartmentAPI, DepartmentCreate } from "@/connection/department-api";

const participantAPI = ParticipantAPI.getInstance();
const roleAPI = new RoleAPI();
const recognitionAPI = new RecognitionAPI();
const departmentAPI = new DepartmentAPI();

// Participant hooks
export const useParticipants = (params?: {
  goal_id?: number;
  trip_id?: number;
  department_id?: number;
}) => {
  return useQuery({
    queryKey: ["participants", params],
    queryFn: () => participantAPI.getParticipants(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAllParticipants = (params?: {
  skip?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["all-participants", params],
    queryFn: () => participantAPI.getAllParticipants(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAvailableUsers = (params?: {
  goal_id?: number;
  company_id?: number;
}) => {
  return useQuery({
    queryKey: ["available-users", params],
    queryFn: () => participantAPI.getAvailableUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Company users for recognition dropdown
export const useCompanyUsers = (params?: {
  company_id?: number;
  skip?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["company-users", params],
    queryFn: () => participantAPI.getCompanyUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create recognition
export const useCreateRecognition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      recipient_id: number;
      title: string;
      message: string;
      department?: string;
      tag?: string;
    }) => recognitionAPI.createRecognition(data),
    onSuccess: () => {
      // Invalidate and refetch recognition data
      queryClient.invalidateQueries({ queryKey: ["recognition-feed"] });
      queryClient.invalidateQueries({ queryKey: ["top-recognitions"] });
      queryClient.invalidateQueries({ queryKey: ["user-recognitions"] });
    },
  });
};

// Participant Goals and Milestones
export const useParticipantGoals = () => {
  return useQuery({
    queryKey: ["participant-goals"],
    queryFn: () => participantAPI.getParticipantGoals(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get participants for a specific goal
export const useGoalParticipants = (goalId: number) => {
  const isValidGoalId =
    typeof goalId === "number" && !isNaN(goalId) && goalId > 0;

  return useQuery({
    queryKey: ["goal-participants", goalId],
    queryFn: () => participantAPI.getParticipants({ goal_id: goalId }),
    enabled: isValidGoalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Enhanced participant goals with participant counts
export const useParticipantGoalsWithCounts = () => {
  const { data: goals = [], isLoading, error } = useParticipantGoals();

  // Get participant counts for all goals
  const { data: participantCounts = {} } = useQuery({
    queryKey: ["goal-participant-counts", goals.map((g) => g.id)],
    queryFn: () =>
      participantAPI.getGoalsParticipantCounts(goals.map((g) => g.id)),
    enabled: goals.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Enhance goals with participant counts
  const enhancedGoals = goals.map((goal) => {
    const participantCount =
      participantCounts[goal.id] || goal.participant_count || 0;

    console.log(
      `Goal ${goal.id} (${goal.title}): participant_count=${participantCount}`,
    );

    return {
      ...goal,
      participant_count: participantCount,
    };
  });

  return {
    data: enhancedGoals,
    isLoading,
    error,
  };
};

export const useParticipantMilestones = (goalId: number) => {
  const isValidGoalId =
    typeof goalId === "number" && !isNaN(goalId) && goalId > 0;

  return useQuery({
    queryKey: ["participant-milestones", goalId],
    queryFn: () => participantAPI.getParticipantMilestones(goalId),
    enabled: isValidGoalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Participant Rewards
export const useParticipantRewards = () => {
  return useQuery({
    queryKey: ["participant-rewards"],
    queryFn: () => participantAPI.getParticipantRewards(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useParticipantRewardDetails = (rewardId: number) => {
  return useQuery({
    queryKey: ["participant-reward-details", rewardId],
    queryFn: () => participantAPI.getParticipantRewardDetails(rewardId),
    enabled: !!rewardId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useParticipantPoints = () => {
  return useQuery({
    queryKey: ["participant-points"],
    queryFn: () => participantAPI.getParticipantPoints(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Participant Invitations
export const useInvitations = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: () => participantAPI.getInvitations(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Department hooks
export const useDepartments = (params?: { skip?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["departments", params],
    queryFn: () => departmentAPI.getDepartments(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDepartment = (departmentId: number) => {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => departmentAPI.getDepartment(departmentId),
    enabled: !!departmentId,
  });
};

export const useDepartmentUsers = (departmentId: number) => {
  return useQuery({
    queryKey: ["department-users", departmentId],
    queryFn: () => departmentAPI.getDepartmentUsers(departmentId),
    enabled: !!departmentId,
  });
};

export const useDepartmentUserDetails = (departmentId: number) => {
  return useQuery({
    queryKey: ["department-user-details", departmentId],
    queryFn: () => departmentAPI.getDepartmentUserDetails(departmentId),
    enabled: !!departmentId,
  });
};

// Team Stats
export const useTeamStats = () => {
  return useQuery({
    queryKey: ["team-stats"],
    queryFn: () => participantAPI.getTeamStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// User profile
export const useUserProfile = (userId: number) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => participantAPI.getUserProfile(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// User statistics
export const useUserStatistics = (userId: number) => {
  return useQuery({
    queryKey: ["user-statistics", userId],
    queryFn: () => participantAPI.getUserStatistics(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// User recognitions
export const useUserRecognitions = (userId: number) => {
  return useQuery({
    queryKey: ["user-recognitions", userId],
    queryFn: () => recognitionAPI.getUserRecognitions(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Recognition feed
export const useRecognitionFeed = () => {
  return useQuery({
    queryKey: ["recognition-feed"],
    queryFn: () => recognitionAPI.getRecognitionFeed(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Top recognitions
export const useTopRecognitions = () => {
  return useQuery({
    queryKey: ["top-recognitions"],
    queryFn: () => recognitionAPI.getTopRecognitions(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Roles
export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await roleAPI.listRoles();
      // Handle nested data structure: response.data.data
      if (response?.data?.data && Array.isArray(response.data.data)) {
        return { data: response.data.data };
      } else if (response?.data && Array.isArray(response.data)) {
        return { data: response.data };
      }
      return { data: [] };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// System Roles for onboarding
export const useSystemRoles = () => {
  return useQuery({
    queryKey: ["system-roles"],
    queryFn: async () => {
      const response = await roleAPI.listSystemRoles();
      // Handle nested data structure: response.data.data
      if (response?.data?.data && Array.isArray(response.data.data)) {
        return { data: response.data.data };
      } else if (response?.data && Array.isArray(response.data)) {
        return { data: response.data };
      }
      return { data: [] };
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Mutations
export const useInviteParticipants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: any, // ParticipantCreate type was removed, using any for now
    ) => participantAPI.inviteParticipants(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      queryClient.invalidateQueries({ queryKey: ["available-users"] });
      toast.success("Participants invited successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to invite participants");
    },
  });
};

export const useCreateTeammate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: participantAPI.createTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success("Teammate created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create teammate");
    },
  });
};

export const useUpdateParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participantId,
      data,
    }: {
      participantId: number;
      data: any; // ParticipantUpdate type was removed, using any for now
    }) => {
      // For team management, use user role update instead of participant update
      if (data.role) {
        return participantAPI.updateUserRole(participantId, data.role);
      }
      return participantAPI.updateParticipant(participantId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success("Participant updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update participant");
    },
  });
};

export const useRemoveParticipant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (participantId: number) => {
      // For team management, use user delete instead of participant remove
      return participantAPI.deleteUser(participantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success("Participant removed successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove participant");
    },
  });
};

export const useBulkRemoveParticipants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIds: number[]) => participantAPI.bulkDeleteUsers(userIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success(data.message || "Users removed successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove users");
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => participantAPI.activateUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success(data.message || "User activated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to activate user");
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => participantAPI.deactivateUser(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success(data.message || "User deactivated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to deactivate user");
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { type?: string; id: string | number }) => {
      const { type = "goal", id } = payload;
      if (type === "company") return participantAPI.acceptCompanyInvitation(id);
      if (type === "department")
        return participantAPI.acceptDepartmentInvitation(id);
      return participantAPI.acceptInvitation(String(id));
    },
    onSuccess: () => {
      // Invalidate multiple queries to ensure UI refreshes properly
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });

      // Invalidate all goal-related queries to ensure participant data is refreshed
      // This will invalidate all queries that start with "goals"
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            Array.isArray(queryKey) &&
            queryKey.length > 0 &&
            queryKey[0] === "goals"
          );
        },
      });
      queryClient.invalidateQueries({ queryKey: ["goal-participants"] });

      toast.success("Invitation accepted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to accept invitation");
    },
  });
};

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { type?: string; id: string | number }) => {
      const { type = "goal", id } = payload;
      if (type === "company")
        return participantAPI.declineCompanyInvitation(id);
      if (type === "department")
        return participantAPI.declineDepartmentInvitation(id);
      return participantAPI.declineInvitation(String(id));
    },
    onSuccess: () => {
      // Invalidate multiple queries to ensure UI refreshes properly
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });

      // Invalidate all goal-related queries to ensure participant data is refreshed
      // This will invalidate all queries that start with "goals"
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return (
            Array.isArray(queryKey) &&
            queryKey.length > 0 &&
            queryKey[0] === "goals"
          );
        },
      });
      queryClient.invalidateQueries({ queryKey: ["goal-participants"] });

      toast.success("Invitation declined");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to decline invitation");
    },
  });
};

export const useUpdateMilestoneStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      milestoneId,
      status,
    }: {
      milestoneId: number;
      status: string;
    }) => participantAPI.updateMilestoneStatus(milestoneId, status),
    onSuccess: () => {
      // Invalidate all goal-related queries to ensure progress updates
      queryClient.invalidateQueries({ queryKey: ["participant-milestones"] });
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-status-breakdown"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-participant-counts"],
      });
      // Invalidate goal-specific queries to ensure goal status updates
      queryClient.invalidateQueries({ queryKey: ["goals", "active"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "completed"] });
      // Invalidate activity feed
      queryClient.invalidateQueries({ queryKey: ["goal-activity-feed"] });
      toast.success("Milestone status updated!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update milestone status");
    },
  });
};

export const useSubmitMilestone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      milestoneId,
      submissionData,
    }: {
      milestoneId: number;
      submissionData: any;
    }) => participantAPI.submitMilestone(milestoneId, submissionData),
    onSuccess: () => {
      // Invalidate all goal-related queries to ensure progress updates
      queryClient.invalidateQueries({ queryKey: ["participant-milestones"] });
      queryClient.invalidateQueries({ queryKey: ["participant-goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-status-breakdown"],
      });
      queryClient.invalidateQueries({
        queryKey: ["goals", "milestone-participant-counts"],
      });
      // Invalidate goal-specific queries to ensure goal status updates
      queryClient.invalidateQueries({ queryKey: ["goals", "active"] });
      queryClient.invalidateQueries({ queryKey: ["goals", "completed"] });
      // Invalidate activity feed
      queryClient.invalidateQueries({ queryKey: ["goal-activity-feed"] });
      // Toast and redirect handled in component
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit milestone");
    },
  });
};

export const useRedeemReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: number) => participantAPI.redeemReward(rewardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-rewards"] });
      queryClient.invalidateQueries({ queryKey: ["participant-points"] });
      toast.success("Reward accepted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to accept reward");
    },
  });
};

export const useMarkRewardAsReceived = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: number) =>
      participantAPI.markRewardAsReceived(rewardId),
    onSuccess: (_, rewardId) => {
      // Invalidate both the rewards list and the specific reward details
      queryClient.invalidateQueries({ queryKey: ["participant-rewards"] });
      queryClient.invalidateQueries({
        queryKey: ["participant-reward-details", rewardId],
      });
      toast.success("Reward marked as received!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to mark reward as received");
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { recognitionId: number; message: string }) =>
      recognitionAPI.addComment(data.recognitionId, { message: data.message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognition-feed"] });
      toast.success("Comment posted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to post comment");
    },
  });
};

export const useGetComments = (recognitionId: number) => {
  return useQuery({
    queryKey: ["recognition-comments", recognitionId],
    queryFn: () => recognitionAPI.listComments(recognitionId),
    enabled: !!recognitionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSetReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { recognitionId: number; reactionType: string }) =>
      recognitionAPI.setUserReaction(data.recognitionId, data.reactionType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognition-feed"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add reaction");
    },
  });
};

export const useRemoveReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recognitionId: number) =>
      recognitionAPI.removeUserReaction(recognitionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognition-feed"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove reaction");
    },
  });
};

// Department mutations
export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepartmentCreate) =>
      departmentAPI.createDepartment(data),
    onSuccess: () => {
      // Invalidate all related queries to ensure proper refresh
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["available-users"] });
      toast.success("Department created successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create department");
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      departmentId,
      data,
    }: {
      departmentId: number;
      data: { name?: string; company_name?: string };
    }) => departmentAPI.updateDepartment(departmentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update department");
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (departmentId: number) =>
      departmentAPI.deleteDepartment(departmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success("Department deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete department");
    },
  });
};

export const useAssignUserToDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      departmentId,
      userId,
    }: {
      departmentId: number;
      userId: number;
    }) => departmentAPI.assignUserToDepartment(departmentId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      // Invalidate department-specific queries
      queryClient.invalidateQueries({
        queryKey: ["department-users", variables.departmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["department-user-details", variables.departmentId],
      });
      toast.success("User assigned to department successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to assign user to department");
    },
  });
};

export const useRemoveUserFromDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      departmentId,
      userId,
    }: {
      departmentId: number;
      userId: number;
    }) => departmentAPI.removeUserFromDepartment(departmentId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      // Invalidate department-specific queries
      queryClient.invalidateQueries({
        queryKey: ["department-users", variables.departmentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["department-user-details", variables.departmentId],
      });
      toast.success("User removed from department successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove user from department");
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, newRole }: { userId: number; newRole: string }) =>
      participantAPI.updateUserRole(userId, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      toast.success("User role updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update user role");
    },
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({
      recipientId,
      messageTitle,
      messageBody,
    }: {
      recipientId: number;
      messageTitle: string;
      messageBody: string;
    }) => participantAPI.sendMessage(recipientId, messageTitle, messageBody),
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message");
    },
  });
};

// Bulk Upload Hooks
export const useDownloadCSVTemplate = () => {
  return useMutation({
    mutationFn: async () => {
      const blob = await participantAPI.downloadCSVTemplate();
      return blob;
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "teammates_template.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("CSV template downloaded successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to download template");
    },
  });
};

export const useUploadCSVPreview = () => {
  return useMutation({
    mutationFn: (file: File) => participantAPI.uploadCSVPreview(file),
    onError: (error: any) => {
      toast.error(error.message || "Failed to preview CSV");
    },
  });
};

export const useBulkUploadTeammates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teammates: any[]) =>
      participantAPI.bulkUploadTeammates(teammates),
    onSuccess: (data) => {
      toast.success(
        `Bulk upload started! Processing ${data.total_count} teammates.`,
      );
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["company-users"] });
      queryClient.invalidateQueries({ queryKey: ["team-stats"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to start bulk upload");
    },
  });
};

export const useBulkUploadStatus = (uploadId: string | null) => {
  return useQuery({
    queryKey: ["bulk-upload-status", uploadId],
    queryFn: () => participantAPI.getBulkUploadStatus(uploadId!),
    enabled: !!uploadId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Stop polling when upload is completed or failed
      if (
        data?.progress?.status === "completed" ||
        data?.progress?.status === "completed_with_errors" ||
        data?.progress?.status === "failed"
      ) {
        return false;
      }

      // More frequent polling during initial stages, slower as progress increases
      const progress = data?.progress?.processed_count || 0;
      const total = data?.progress?.total_count || 1;
      const progressPercentage = (progress / total) * 100;

      if (progressPercentage < 25) {
        return 1000; // Poll every 1 second during first 25%
      } else if (progressPercentage < 75) {
        return 1500; // Poll every 1.5 seconds during 25-75%
      } else {
        return 2000; // Poll every 2 seconds during final 25%
      }
    },
    staleTime: 0, // Always fetch fresh data
  });
};
