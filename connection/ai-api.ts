import axios, { AxiosInstance } from "axios";

export interface AIChatRequest {
  message: string;
  context?: string | { milestones?: any[]; [key: string]: any };
  model?: string;
  goalId?: number;
}

export interface AIChatResponse {
  response?: string;
  message?: string;
  model?: string;
  timestamp?: string;
}

export class AIAPI {
  private static instance: AIAPI;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): AIAPI {
    if (!AIAPI.instance) {
      AIAPI.instance = new AIAPI();
    }
    return AIAPI.instance;
  }

  public async chatWithAI(request: AIChatRequest): Promise<AIChatResponse> {
    try {
      const response = await this.axiosInstance.post<AIChatResponse>(
        "/ai/chat",
        request
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to communicate with AI"
      );
    }
  }

  public async getGoalAdvice(request: AIChatRequest): Promise<{ message: string }> {
    try {
      const response = await this.axiosInstance.post<{ message: string }>(
        "/ai/goal-advice",
        request
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get goal advice"
      );
    }
  }
}
