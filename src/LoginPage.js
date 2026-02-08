import { useState } from "react";
import { loginUser, adminLogin } from "./EmployeeService";
import "./LoginPage.css";

function LoginPage({
  onUserLogin,
  onAdminLogin,
  onRegister,
  onBack
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------- USER LOGIN ----------
  const userLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    loginUser({ email, password })
      .then((res) => {
        if (res.data) {
          onUserLogin(res.data); // ✅ go back to dashboard
        } else {
          setError("Invalid user credentials");
        }
      })
      .catch(() => setError("Login failed"))
      .finally(() => setLoading(false));
  };

  // ---------- ADMIN LOGIN ----------
  const adminLoginClick = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    adminLogin({ email, password })
      .then((res) => {
        if (res.data === "ADMIN_SUCCESS") {
          onAdminLogin(); // ✅ go to admin dashboard
        } else {
          setError("Invalid admin credentials");
        }
      })
      .catch(() => setError("Admin login failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>

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

        <button
          className="user-btn"
          onClick={userLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "User Login"}
        </button>

        <button
          className="admin-btn"
          onClick={adminLoginClick}
          disabled={loading}
        >
          {loading ? "Checking..." : "Admin Login"}
        </button>

        {error && <p className="error-text">{error}</p>}

        <div className="login-actions">
          <span className="create-link" onClick={onRegister}>
            Create account
          </span>

          <span className="back-link" onClick={onBack}>
            ← Back to Shop
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
