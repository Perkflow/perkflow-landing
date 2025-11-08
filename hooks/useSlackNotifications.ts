import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  sendSlackNotification,
  sendSuccessNotification,
  sendErrorNotification,
  sendWarningNotification,
  sendInfoNotification,
  sendUserActivityNotification,
  sendSystemNotification,
  SlackNotificationOptions,
} from "@/utils/slack-notifications";

export interface UseSlackNotificationsReturn {
  // State
  isLoading: boolean;
  lastError: Error | null;
  lastSuccess: boolean;

  // Methods
  sendNotification: (options: SlackNotificationOptions) => Promise<boolean>;
  sendSuccess: (
    message: string,
    options?: Partial<SlackNotificationOptions>,
  ) => Promise<boolean>;
  sendError: (
    message: string,
    error?: Error,
    options?: Partial<SlackNotificationOptions>,
  ) => Promise<boolean>;
  sendWarning: (
    message: string,
    options?: Partial<SlackNotificationOptions>,
  ) => Promise<boolean>;
  sendInfo: (
    message: string,
    options?: Partial<SlackNotificationOptions>,
  ) => Promise<boolean>;
  sendUserActivity: (
    activity: string,
    userId: string,
    details?: Record<string, string>,
  ) => Promise<boolean>;
  sendSystemNotification: (
    event: string,
    details: Record<string, string>,
    type?: SlackNotificationOptions["type"],
  ) => Promise<boolean>;

  // Utility methods
  clearError: () => void;
  reset: () => void;
}

export interface UseSlackNotificationsOptions {
  showToast?: boolean;
  toastOnSuccess?: boolean;
  toastOnError?: boolean;
  defaultUserId?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
}

/**
 * React hook for sending Slack notifications with state management
 */
export const useSlackNotifications = (
  options: UseSlackNotificationsOptions = {},
): UseSlackNotificationsReturn => {
  const {
    showToast = true,
    toastOnSuccess = true,
    toastOnError = true,
    defaultUserId,
    onSuccess,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [lastSuccess, setLastSuccess] = useState(false);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setLastError(null);
    setLastSuccess(false);
  }, []);

  const handleNotification = useCallback(
    async (
      notificationFn: () => Promise<boolean>,
      successMessage?: string,
      errorMessage?: string,
    ): Promise<boolean> => {
      setIsLoading(true);
      setLastError(null);
      setLastSuccess(false);

      try {
        const result = await notificationFn();

        if (result) {
          setLastSuccess(true);
          if (showToast && toastOnSuccess && successMessage) {
            toast.success(successMessage);
          }
          if (onSuccess && successMessage) {
            onSuccess(successMessage);
          }
        } else {
          const error = new Error(
            errorMessage || "Failed to send Slack notification",
          );
          setLastError(error);
          if (showToast && toastOnError) {
            toast.error(error.message);
          }
          if (onError) {
            onError(error);
          }
        }

        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setLastError(err);

        if (showToast && toastOnError) {
          toast.error(`Slack notification failed: ${err.message}`);
        }

        if (onError) {
          onError(err);
        }

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, toastOnSuccess, toastOnError, onSuccess, onError],
  );

  const sendNotification = useCallback(
    async (options: SlackNotificationOptions): Promise<boolean> => {
      const enhancedOptions = {
        ...options,
        userId: options.userId || defaultUserId,
      };

      return handleNotification(
        () => sendSlackNotification(enhancedOptions),
        "Notification sent to Slack",
        "Failed to send notification to Slack",
      );
    },
    [defaultUserId, handleNotification],
  );

  const sendSuccess = useCallback(
    async (
      message: string,
      options?: Partial<SlackNotificationOptions>,
    ): Promise<boolean> => {
      const enhancedOptions = {
        ...options,
        userId: options?.userId || defaultUserId,
      };

      return handleNotification(
        () => sendSuccessNotification(message, enhancedOptions),
        "Success notification sent to Slack",
        "Failed to send success notification to Slack",
      );
    },
    [defaultUserId, handleNotification],
  );

  const sendError = useCallback(
    async (
      message: string,
      error?: Error,
      options?: Partial<SlackNotificationOptions>,
    ): Promise<boolean> => {
      const enhancedOptions = {
        ...options,
        userId: options?.userId || defaultUserId,
      };

      return handleNotification(
        () => sendErrorNotification(message, error, enhancedOptions),
        "Error notification sent to Slack",
        "Failed to send error notification to Slack",
      );
    },
    [defaultUserId, handleNotification],
  );

  const sendWarning = useCallback(
    async (
      message: string,
      options?: Partial<SlackNotificationOptions>,
    ): Promise<boolean> => {
      const enhancedOptions = {
        ...options,
        userId: options?.userId || defaultUserId,
      };

      return handleNotification(
        () => sendWarningNotification(message, enhancedOptions),
        "Warning notification sent to Slack",
        "Failed to send warning notification to Slack",
      );
    },
    [defaultUserId, handleNotification],
  );

  const sendInfo = useCallback(
    async (
      message: string,
      options?: Partial<SlackNotificationOptions>,
    ): Promise<boolean> => {
      const enhancedOptions = {
        ...options,
        userId: options?.userId || defaultUserId,
      };

      return handleNotification(
        () => sendInfoNotification(message, enhancedOptions),
        "Info notification sent to Slack",
        "Failed to send info notification to Slack",
      );
    },
    [defaultUserId, handleNotification],
  );

  const sendUserActivity = useCallback(
    async (
      activity: string,
      userId: string,
      details?: Record<string, string>,
    ): Promise<boolean> => {
      return handleNotification(
        () => sendUserActivityNotification(activity, userId, details),
        "User activity notification sent to Slack",
        "Failed to send user activity notification to Slack",
      );
    },
    [handleNotification],
  );

  const sendSystemNotification = useCallback(
    async (
      event: string,
      details: Record<string, string>,
      type?: SlackNotificationOptions["type"],
    ): Promise<boolean> => {
      return handleNotification(
        () => sendSystemNotification(event, details, type),
        "System notification sent to Slack",
        "Failed to send system notification to Slack",
      );
    },
    [handleNotification],
  );

  return {
    // State
    isLoading,
    lastError,
    lastSuccess,

    // Methods
    sendNotification,
    sendSuccess,
    sendError,
    sendWarning,
    sendInfo,
    sendUserActivity,
    sendSystemNotification,

    // Utility methods
    clearError,
    reset,
  };
};

// Re-export types for convenience
export type { SlackNotificationOptions } from "@/utils/slack-notifications";
