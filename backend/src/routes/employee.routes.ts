import { Router } from "express";
import { prisma } from "../lib/prisma";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  employeeQuerySchema,
} from "../validations/employee.validation";
import { asyncHandler } from "../middleware/async.middleware";

const router = Router();

// GET all employees
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, limit, search } =
      employeeQuerySchema.parse(req.query);

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              position: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              department: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : undefined;

    const employees = await prisma.employee.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: "asc",
      },
    });

    const totalEmployees = await prisma.employee.count({
      where,
    });

    const totalPages = Math.ceil(
      totalEmployees / limit
    );

    res.json({
      data: employees,
      pagination: {
        page,
        limit,
        totalEmployees,
        totalPages,
      },
    });
  })
);

// GET one employee
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: {
        id: id,
      },
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json(employee);
  })
);

// CREATE employee
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const validatedData = createEmployeeSchema.parse(req.body);

    const employee = await prisma.employee.create({
      data: validatedData,
    });

    res.status(201).json(employee);
  })
);

// UPDATE employee
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const validatedData = updateEmployeeSchema.parse(req.body);

    const employee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: validatedData,
    });

    res.json(employee);
  })
);

// DELETE employee
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const employee = await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Employee deleted successfully",
      employee,
    });
  })
);

export default router;