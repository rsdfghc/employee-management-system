import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";

import {
  createEmployee,
  updateEmployee,
} from "../services/employee.service";

import type { Employee } from "../types/employee";

interface EmployeeFormProps {
  employee?: Employee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

function EmployeeForm({
  employee,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
  const isEditing = Boolean(employee);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [status, setStatus] = useState<
    "ACTIVE" | "INACTIVE"
  >("ACTIVE");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setPhone(employee.phone);
      setPosition(employee.position);
      setDepartment(employee.department);
      setSalary(String(employee.salary));

      setHireDate(
        new Date(employee.hireDate)
          .toISOString()
          .split("T")[0]
      );

      setStatus(employee.status);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setDepartment("");
      setSalary("");
      setHireDate("");
      setStatus("ACTIVE");
    }
  }, [employee]);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = {
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        salary: Number(salary),
        hireDate: new Date(hireDate).toISOString(),
        status,
      };

      if (employee) {
        await updateEmployee(employee.id, data);
      } else {
        await createEmployee(data);
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      setError(
        isEditing
          ? "Failed to update employee."
          : "Failed to create employee."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>
        {isEditing ? "Edit Employee" : "Add Employee"}
      </h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>

          <input
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Last Name</label>

          <input
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="text"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Position</label>

          <input
            type="text"
            value={position}
            onChange={(event) =>
              setPosition(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Department</label>

          <input
            type="text"
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Salary</label>

          <input
            type="number"
            value={salary}
            onChange={(event) =>
              setSalary(event.target.value)
            }
            min="1"
            required
          />
        </div>

        <div>
          <label>Hire Date</label>

          <input
            type="date"
            value={hireDate}
            onChange={(event) =>
              setHireDate(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Status</label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | "ACTIVE"
                  | "INACTIVE"
              )
            }
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Employee"
              : "Create Employee"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;