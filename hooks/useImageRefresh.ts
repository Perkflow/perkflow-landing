import { useState, useCallback } from "react";

/**
 * Custom hook to handle image refresh with cache-busting
 */
export const useImageRefresh = (initialImageUrl?: string | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null,
  );

  /**
   * Add cache-busting parameter to force image refresh
   */
  const addCacheBusting = useCallback((url: string) => {
    if (!url) return url;
    return url.includes("?")
      ? `${url}&t=${Date.now()}`
      : `${url}?t=${Date.now()}`;
  }, []);

  /**
   * Set image URL with cache-busting
   */
  const setImageWithRefresh = useCallback(
    (url: string | null) => {
      if (!url) {
        setImageUrl(null);
        return;
      }
      setImageUrl(addCacheBusting(url));
    },
    [addCacheBusting],
  );

  /**
   * Force refresh the current image
   */
  const refreshImage = useCallback(() => {
    if (imageUrl) {
      // Remove existing cache-busting parameters and add new ones
      const baseUrl = imageUrl.split("?")[0];
      setImageUrl(addCacheBusting(baseUrl));
    }
  }, [imageUrl, addCacheBusting]);

  /**
   * Update image after successful upload
   */
  const updateImageAfterUpload = useCallback(
    (uploadedUrl: string) => {
      const refreshedUrl = addCacheBusting(uploadedUrl);
      setImageUrl(refreshedUrl);

      // Force a re-render after a short delay
      setTimeout(() => {
        setImageUrl(refreshedUrl);
      }, 100);
    },
    [addCacheBusting],
  );

  return {
    imageUrl,
    setImageUrl,
    setImageWithRefresh,
    refreshImage,
    updateImageAfterUpload,
  };
};
