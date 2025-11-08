import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUser(userId?: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
}
