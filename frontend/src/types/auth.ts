export type Role = "ADMIN" | "HR" | "USER";

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
}