import React, { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "./EmployeeService";
import "./App.css";

function EmployeeComponent() {

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees().then(res => setEmployees(res.data));
  };

  const saveEmployee = () => {
    addEmployee({ name, email, password })
      .then(() => {
        loadEmployees();
        setName("");
        setEmail("");
        setPassword("");
      });
  };

  const removeEmployee = (id) => {
    deleteEmployee(id).then(() => loadEmployees());
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={saveEmployee}>Add Employee</button>

      <hr />

      {employees.map(emp => (
        <div key={emp.id} className="employee-item">
          <span>
            {emp.name} | {emp.email}
          </span>
          <button
            className="delete-btn"
            onClick={() => removeEmployee(emp.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeComponent;

