import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  RecognitionAPI,
  RecognitionCreate,
  RecognitionOut,
  RecognitionCommentCreate,
  RecognitionCommentOut,
} from "@/connection/recognition-api";

export function useRecognitions() {
  return useQuery<RecognitionOut[]>({
    queryKey: ["recognitions"],
    queryFn: async () => {
      const api = new RecognitionAPI();
      return api.listRecognitions();
    },
  });
}

export function useCreateRecognition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RecognitionCreate) => {
      const api = new RecognitionAPI();
      return api.createRecognition(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}

export function useRecognitionComments(recognitionId: number) {
  return useQuery<RecognitionCommentOut[]>({
    queryKey: ["recognition-comments", recognitionId],
    queryFn: async () => {
      const api = new RecognitionAPI();
      return api.listComments(recognitionId);
    },
    enabled: !!recognitionId,
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      recognitionId,
      data,
    }: {
      recognitionId: number;
      data: RecognitionCommentCreate;
    }) => {
      const api = new RecognitionAPI();
      return api.addComment(recognitionId, data);
    },
    onSuccess: (_, { recognitionId }) => {
      // Invalidate both the comments and the recognition list
      queryClient.invalidateQueries({
        queryKey: ["recognition-comments", recognitionId],
      });
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: number) => {
      const api = new RecognitionAPI();
      return api.deleteComment(commentId);
    },
    onSuccess: () => {
      // Invalidate all recognition-related queries
      queryClient.invalidateQueries({ queryKey: ["recognition-comments"] });
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}

export function useUpdateReaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      reaction,
      increment,
    }: {
      id: number;
      reaction: string;
      increment?: number;
    }) => {
      const api = new RecognitionAPI();
      return api.updateReaction(id, reaction, increment ?? 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}

export function useSetUserReaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      reaction_type,
    }: {
      id: number;
      reaction_type: string;
    }) => {
      const api = new RecognitionAPI();
      return api.setUserReaction(id, reaction_type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}

export function useRemoveUserReaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const api = new RecognitionAPI();
      return api.removeUserReaction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitions"] });
    },
  });
}
