import api from "./api";
import type { LoginResponse } from "../types/auth";

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};