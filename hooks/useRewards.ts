"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  RewardAPI,
  RewardCreate,
  RewardUpdate,
  ProposalCreate,
} from "@/connection/reward-api";
import { toast } from "sonner";

const rewardAPI = new RewardAPI();

export function useRewards(goalId: number) {
  return useQuery({
    queryKey: ["rewards", goalId],
    queryFn: () => rewardAPI.getRewards(goalId),
    enabled: !!goalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAllRewards() {
  return useQuery({
    queryKey: ["rewards", "all"],
    queryFn: () => rewardAPI.getAllRewards(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useReward(rewardId: number) {
  return useQuery({
    queryKey: ["rewards", rewardId],
    queryFn: () => rewardAPI.getReward(rewardId),
    enabled: !!rewardId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RewardCreate) => rewardAPI.assignReward(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["rewards", variables.goal_id],
      });
      // Remove automatic toast - let calling component handle it
    },
    onError: (error: any) => {
      // Keep error toast for debugging purposes
      console.error("Reward creation error:", error);
    },
  });
}

export function useUpdateReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      data,
    }: {
      rewardId: number;
      data: RewardUpdate;
    }) => rewardAPI.updateReward(rewardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      // Remove automatic toast - let calling component handle it
    },
    onError: (error: any) => {
      // Keep error toast for debugging purposes
      console.error("Reward update error:", error);
    },
  });
}

export function useDeleteReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: number) => rewardAPI.deleteReward(rewardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      // Remove automatic toast - let calling component handle it
    },
    onError: (error: any) => {
      // Keep error toast for debugging purposes
      console.error("Reward deletion error:", error);
    },
  });
}

export function useRewardStatus(rewardId: number) {
  return useQuery({
    queryKey: ["rewards", rewardId, "status"],
    queryFn: () => rewardAPI.getRewardStatus(rewardId),
    enabled: !!rewardId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Reward Participant Management Hooks
export function useRewardParticipants(rewardId: number) {
  return useQuery({
    queryKey: ["rewards", rewardId, "participants"],
    queryFn: () => rewardAPI.getRewardParticipants(rewardId),
    enabled: !!rewardId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useAddParticipantToReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      participantId,
    }: {
      rewardId: number;
      participantId: number;
    }) => rewardAPI.addParticipantToReward(rewardId, participantId),
    onSuccess: (_, { rewardId }) => {
      queryClient.invalidateQueries({
        queryKey: ["rewards", rewardId, "participants"],
      });
      queryClient.invalidateQueries({ queryKey: ["rewards", rewardId] });
      toast.success("Participant added to reward successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add participant to reward");
    },
  });
}

export function useRemoveParticipantFromReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      participantId,
    }: {
      rewardId: number;
      participantId: number;
    }) => rewardAPI.removeParticipantFromReward(rewardId, participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      toast.success("Participant removed from reward successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove participant from reward");
    },
  });
}

export function useBulkAssignParticipantsToReward() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      participantIds,
    }: {
      rewardId: number;
      participantIds: number[];
    }) => {
      toast.info(
        `Starting to assign ${participantIds.length} participant(s) to reward...`,
      );
      return rewardAPI.bulkAssignParticipantsToReward(rewardId, participantIds);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      queryClient.invalidateQueries({ queryKey: ["rewards", "all"] });
      toast.success(
        data.message || "Participants assigned to reward successfully!",
      );
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to assign participants to reward");
    },
  });
}

export function useMarkParticipantAsWinner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      rewardId,
      participantId,
    }: {
      rewardId: number;
      participantId: number;
    }) => rewardAPI.markParticipantAsWinner(rewardId, participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      toast.success("Participant marked as winner successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to mark participant as winner");
    },
  });
}

export function useProposals(goalId: number) {
  return useQuery({
    queryKey: ["proposals", goalId],
    queryFn: () => rewardAPI.getProposals(goalId),
    enabled: !!goalId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllProposals() {
  return useQuery({
    queryKey: ["proposals", "all"],
    queryFn: () => rewardAPI.getAllProposals(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProposal(proposalId: number) {
  return useQuery({
    queryKey: ["proposals", proposalId],
    queryFn: () => rewardAPI.getProposal(proposalId),
    enabled: !!proposalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposalCreate) => rewardAPI.createProposal(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["proposals", variables.goal_id],
      });
      toast.success("Proposal created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create proposal");
    },
  });
}

export function useUpdateProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      proposalId,
      data,
    }: {
      proposalId: number;
      data: Partial<ProposalCreate>;
    }) => rewardAPI.updateProposal(proposalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast.success("Proposal updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update proposal");
    },
  });
}

export function useDeleteProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (proposalId: number) => rewardAPI.deleteProposal(proposalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      toast.success("Proposal deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete proposal");
    },
  });
}

export function useDownloadProposal() {
  return useMutation({
    mutationFn: (proposalId: number) => rewardAPI.downloadProposal(proposalId),
    onSuccess: (blob, proposalId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `proposal-${proposalId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Proposal downloaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to download proposal");
    },
  });
}
