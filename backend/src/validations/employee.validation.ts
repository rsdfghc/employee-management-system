import { z } from "zod";

export const createEmployeeSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .min(1, "Last name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),

  position: z
    .string()
    .min(1, "Position is required"),

  department: z
    .string()
    .min(1, "Department is required"),

  salary: z
    .number()
    .positive("Salary must be greater than 0"),

  hireDate: z
    .string()
    .datetime("Invalid hire date"),

  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export const updateEmployeeSchema =
  createEmployeeSchema.partial();

// Pagination + Search
export const employeeQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  search: z
    .string()
    .trim()
    .optional(),
});