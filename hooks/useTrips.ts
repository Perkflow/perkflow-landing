"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TripAPI,
  TripCreate,
  TripUpdate,
  ParticipantCreate,
} from "@/connection/trip-api";
import { toast } from "sonner";

const tripAPI = new TripAPI();

export function useTrips() {
  return useQuery({
    queryKey: ["trips"],
    queryFn: () => tripAPI.getTrips(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTrip(tripId: number) {
  return useQuery({
    queryKey: ["trips", tripId],
    queryFn: () => tripAPI.getTripDetails(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TripCreate) => tripAPI.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      toast.success("Trip created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create trip");
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, data }: { tripId: number; data: TripUpdate }) =>
      tripAPI.updateTrip(tripId, data),
    onSuccess: (_, { tripId }) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", tripId] });
      toast.success("Trip updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update trip");
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripId: number) => tripAPI.deleteTrip(tripId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      toast.success("Trip deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete trip");
    },
  });
}

export function useTripParticipants(tripId: number) {
  return useQuery({
    queryKey: ["trips", tripId, "participants"],
    queryFn: () => tripAPI.getTripParticipants(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllParticipants() {
  return useQuery({
    queryKey: ["participants"],
    queryFn: () => tripAPI.getParticipants(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useInviteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ParticipantCreate) => tripAPI.inviteParticipant(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["trips", variables.trip_id, "participants"],
      });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant invited successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to invite participant");
    },
  });
}

export function useUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participantId,
      data,
    }: {
      participantId: number;
      data: { role?: string; status?: string };
    }) => tripAPI.updateParticipant(participantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update participant");
    },
  });
}

export function useRemoveParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (participantId: number) =>
      tripAPI.removeParticipant(participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant removed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove participant");
    },
  });
}
