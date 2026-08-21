import type { Employee } from "../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  deletingId,
}: EmployeeTableProps) {
    if (employees.length === 0) {
    return (
        <div>
        <p>No employees found.</p>

        <p>
            Try changing your search or filters.
        </p>
        </div>
    );
    }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>

            <td>
              {employee.firstName}{" "}
              {employee.lastName}
            </td>

            <td>{employee.email}</td>

            <td>{employee.position}</td>

            <td>{employee.department}</td>

            <td>₱{employee.salary}</td>

            <td>{employee.status}</td>

            <td>
              <button
                onClick={() => onEdit(employee)}
              >
                Edit
              </button>

                <button
                onClick={() => onDelete(employee.id)}
                disabled={deletingId === employee.id}
                >
                {deletingId === employee.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;