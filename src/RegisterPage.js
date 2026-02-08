import { useState } from "react";
import { registerUser } from "./EmployeeService";
import "./RegisterPage.css";

function RegisterPage({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      setMsg("All fields are required");
      return;
    }

    registerUser({ name, email, password })
      .then(() => {
        setMsg("Account created successfully");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        setMsg("Registration failed");
      });
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>

        {msg && <p className="msg">{msg}</p>}

        <button className="back-btn" onClick={onBack}>
          ← Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
