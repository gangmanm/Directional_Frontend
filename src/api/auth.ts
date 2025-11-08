import apiClient from "../lib/api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const requestBody: LoginRequest = { email, password };
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      requestBody
    );
    return response.data;
  },
};
