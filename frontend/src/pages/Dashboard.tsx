import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";

import {
  getEmployees,
  deleteEmployee,
} from "../services/employee.service";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState<
    "" | "ACTIVE" | "INACTIVE"
  >("");

  // Pagination
  const [page, setPage] = useState(1);

  const [limit] = useState(5);

  const [totalPages, setTotalPages] = useState(0);

  const [deletingId, setDeletingId] =
  useState<number | null>(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmployees({
        page,
        limit,
        search: search || undefined,
        department: department || undefined,
        status: status || undefined,
      });

      setEmployees(response.data);

      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error(error);

      setError("Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, search, department, status]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteEmployee(id);

      await loadEmployees();
    } catch (error) {
      console.error(error);

      setError("Failed to delete employee.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingEmployee(null);

    await loadEmployees();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);

    // Return to first page when searching
    setPage(1);
  };

  const handleDepartmentChange = (
    value: string
  ) => {
    setDepartment(value);

    setPage(1);
  };

  const handleStatusChange = (
    value: "" | "ACTIVE" | "INACTIVE"
  ) => {
    setStatus(value);

    setPage(1);
  };

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div>
      <h1>Employee Management System</h1>

      <h2>Dashboard</h2>

      {user && (
        <p>
          Welcome, {user.email} ({user.role})
        </p>
      )}

      <hr />

      <div>
        <h2>Employees</h2>

        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
        >
          Add Employee
        </button>
      </div>

      <br />

      {/* Search */}
      <div>
        <label>Search: </label>

        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(event) =>
            handleSearchChange(event.target.value)
          }
        />
      </div>

      <br />

      {/* Department Filter */}
      <div>
        <label>Department: </label>

        <select
          value={department}
          onChange={(event) =>
            handleDepartmentChange(event.target.value)
          }
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Human Resources">
            Human Resources
          </option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <br />

      {/* Status Filter */}
      <div>
        <label>Status: </label>

        <select
          value={status}
          onChange={(event) =>
            handleStatusChange(
              event.target.value as
                | ""
                | "ACTIVE"
                | "INACTIVE"
            )
          }
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <br />

      {/* Employee Form */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {loading && <Loading />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={loadEmployees}
        />
      )}

      {!loading && !error && (
        <>
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />

          {/* Pagination */}
          <div>
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((currentPage) =>
                  currentPage - 1
                )
              }
            >
              Previous
            </button>

            <span>
              {" "}
              Page {page} of {totalPages}{" "}
            </span>

            <button
              disabled={
                page === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setPage((currentPage) =>
                  currentPage + 1
                )
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;