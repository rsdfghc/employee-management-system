import express from "express";
import employeeRoutes from "./routes/employee.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

// Centralized error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});