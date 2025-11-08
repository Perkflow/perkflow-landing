import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useRewardActivity(rewardId?: number) {
  return useQuery({
    queryKey: ["reward-activity", rewardId],
    queryFn: async () => {
      if (!rewardId) return [];
      const { data } = await axios.get(`/api/rewards/${rewardId}/activity`);
      return data;
    },
    enabled: !!rewardId,
  });
}
