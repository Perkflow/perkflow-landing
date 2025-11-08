import { useMutation } from "@tanstack/react-query";
import { AIAPI, AIChatRequest, AIChatResponse } from "@/connection/ai-api";
import { toast } from "sonner";

const aiAPI = AIAPI.getInstance();

export const useAIChat = () => {
  return useMutation({
    mutationFn: async (request: AIChatRequest): Promise<AIChatResponse> => {
      return await aiAPI.chatWithAI(request);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to get AI response");
    },
  });
};
