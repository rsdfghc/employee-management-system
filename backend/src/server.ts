import express from "express";
import employeeRoutes from "./routes/employee.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Employee Management API is running",
  });
});

// Centralized error handling middleware
// This must be placed AFTER all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});