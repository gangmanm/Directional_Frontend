import apiClient from "../lib/api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authAPI = {
  /**
   * 로그인 API
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 토큰과 사용자 정보
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const requestBody: LoginRequest = { email, password };
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      requestBody
    );
    return response.data;
  },
};
