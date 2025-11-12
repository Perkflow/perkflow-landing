import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AIAPI, AIChatRequest, AIChatResponse } from "@/connection/ai-api";
import { toast } from "sonner";

const aiAPI = AIAPI.getInstance();

// Cache for storing goal advice
const goalAdviceCache = new Map<
  string,
  { advice: string; timestamp: number; milestoneHash: string }
>();

// Generate a hash for milestones to detect changes
const generateMilestoneHash = (milestones: any[]): string => {
  return milestones.map((m) => `${m.id}-${m.status}-${m.weight}`).join("|");
};

// Function to clear cache for a specific goal
export const clearGoalAdviceCache = (goalId?: number) => {
  if (goalId) {
    goalAdviceCache.delete(goalId.toString());
  } else {
    goalAdviceCache.clear();
  }
};

export const useGoalAdvice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      request: AIChatRequest,
    ): Promise<AIChatResponse> => {
      const goalId = request.goalId;
      const context = typeof request.context === 'object' ? request.context : {};
      const milestones = context.milestones || [];
      const milestoneHash = generateMilestoneHash(milestones);

      // Check cache first
      if (goalId && goalAdviceCache.has(goalId.toString())) {
        const cached = goalAdviceCache.get(goalId.toString())!;
        const cacheAge = Date.now() - cached.timestamp;
        const cacheValid = cacheAge < 5 * 60 * 1000; // 5 minutes cache
        const milestonesUnchanged = cached.milestoneHash === milestoneHash;

        if (cacheValid && milestonesUnchanged) {
          return { message: cached.advice };
        }
      }

      // Generate new advice
      const response = await aiAPI.getGoalAdvice(request);

      // Cache the result
      if (goalId) {
        goalAdviceCache.set(goalId.toString(), {
          advice: response.message,
          timestamp: Date.now(),
          milestoneHash,
        });
      }

      return response;
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to get goal advice");
    },
  });
};
