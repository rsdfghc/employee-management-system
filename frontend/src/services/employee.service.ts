import api from "./api";
import type { Employee, EmployeeResponse } from "../types/employee";

export interface EmployeeQuery {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export const getEmployees = async (
  params?: EmployeeQuery
): Promise<EmployeeResponse> => {
  const response = await api.get<EmployeeResponse>(
    "/employees",
    {
      params,
    }
  );

  return response.data;
};

export const getEmployee = async (
  id: number
): Promise<Employee> => {
  const response = await api.get<Employee>(
    `/employees/${id}`
  );

  return response.data;
};

export const deleteEmployee = async (
  id: number
): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

export const createEmployee = async (
  data: Omit<Employee, "id" | "createdAt" | "updatedAt">
): Promise<Employee> => {
  const response = await api.post<Employee>(
    "/employees",
    data
  );

  return response.data;
};

export const updateEmployee = async (
  id: number,
  data: Partial<
    Omit<Employee, "id" | "createdAt" | "updatedAt">
  >
): Promise<Employee> => {
  const response = await api.put<Employee>(
    `/employees/${id}`,
    data
  );

  return response.data;
};

export interface EmployeeQuery {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: "ACTIVE" | "INACTIVE";
}

