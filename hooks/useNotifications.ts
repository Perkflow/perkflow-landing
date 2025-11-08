"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  NotificationAPI,
  NotificationCreate,
} from "@/connection/notification-api";
import { toast } from "sonner";

const notificationAPI = new NotificationAPI();

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationAPI.getNotifications(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: () =>
      notificationAPI
        .getNotifications()
        .then((notifications) =>
          notifications.filter((n) => n.status === "UNREAD"),
        ),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationAPI.getUnreadCount(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useSendNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NotificationCreate) =>
      notificationAPI.sendNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification sent successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send notification");
    },
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      notificationAPI.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to mark notification as read");
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationAPI.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
      toast.success("All notifications marked as read");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to mark all notifications as read");
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      notificationAPI.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });
      toast.success("Notification deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete notification");
    },
  });
}
