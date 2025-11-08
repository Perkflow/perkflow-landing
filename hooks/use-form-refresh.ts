import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UseFormRefreshOptions {
  /**
   * Whether to refresh the page after successful form submission
   * @default true
   */
  shouldRefresh?: boolean;

  /**
   * Delay in milliseconds before refreshing the page
   * @default 1000
   */
  refreshDelay?: number;

  /**
   * Whether to use router.refresh() instead of window.location.reload()
   * @default true
   */
  useRouterRefresh?: boolean;
}

/**
 * Custom hook that provides form submission with automatic page refresh
 * to ensure real-time updates are reflected immediately
 */
export function useFormRefresh(options: UseFormRefreshOptions = {}) {
  const router = useRouter();
  const {
    shouldRefresh = true,
    refreshDelay = 1000,
    useRouterRefresh = true,
  } = options;

  const refreshPage = useCallback(() => {
    if (!shouldRefresh) return;

    setTimeout(() => {
      if (useRouterRefresh) {
        router.refresh();
      } else {
        window.location.reload();
      }
    }, refreshDelay);
  }, [shouldRefresh, refreshDelay, useRouterRefresh, router]);

  const handleFormSuccess = useCallback(
    (callback?: () => void) => {
      // Execute the provided callback first
      if (callback) {
        callback();
      }

      // Then refresh the page
      refreshPage();
    },
    [refreshPage],
  );

  return {
    refreshPage,
    handleFormSuccess,
  };
}
