"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  SupportAPI,
  SupportTicketCreate,
  SupportTicketUpdate,
  EmailSupportRequest,
} from "@/connection/support-api";

const supportAPI = SupportAPI.getInstance();

// Create a new support ticket
export function useCreateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SupportTicketCreate) => supportAPI.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      toast.success("Support ticket submitted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to submit support ticket";
      toast.error(errorMessage);
    },
  });
}

// Get user's support tickets
export function useUserSupportTickets() {
  return useQuery({
    queryKey: ["support-tickets"],
    queryFn: () => supportAPI.getUserTickets(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get all support tickets (admin only)
export function useAllSupportTickets() {
  return useQuery({
    queryKey: ["support-tickets-all"],
    queryFn: () => supportAPI.getAllTickets(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get a specific support ticket
export function useSupportTicket(ticketId: number) {
  return useQuery({
    queryKey: ["support-ticket", ticketId],
    queryFn: () => supportAPI.getTicket(ticketId),
    enabled: !!ticketId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Update a support ticket
export function useUpdateSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      data,
    }: {
      ticketId: number;
      data: SupportTicketUpdate;
    }) => supportAPI.updateTicket(ticketId, data),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["support-ticket", ticketId] });
      queryClient.invalidateQueries({ queryKey: ["support-tickets-all"] });
      toast.success("Support ticket updated successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update support ticket";
      toast.error(errorMessage);
    },
  });
}

// Delete a support ticket
export function useDeleteSupportTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId: number) => supportAPI.deleteTicket(ticketId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["support-tickets-all"] });
      toast.success("Support ticket deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to delete support ticket";
      toast.error(errorMessage);
    },
  });
}

// Send email support request
export function useSendEmailSupport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmailSupportRequest) =>
      supportAPI.sendEmailSupport(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      toast.success(`Email support request sent successfully!`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to send email support request";
      toast.error(errorMessage);
    },
  });
}
