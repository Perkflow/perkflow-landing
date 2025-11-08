import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProposalItem } from "@/types/rewards.d";

export function useProposals(rewardId?: number) {
  return useQuery({
    queryKey: ["proposals", rewardId],
    queryFn: async () => {
      if (!rewardId) return [];
      const { data } = await axios.get<ProposalItem[]>(
        `/api/rewards/${rewardId}/proposals`,
      );
      return data;
    },
    enabled: !!rewardId,
  });
}
