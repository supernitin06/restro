import React, { useState } from "react";
import restaurantImage from "../../assets/loginimage1.jpg";

const LoginForm = ({ role = "admin", onRoleChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      console.log("LOGIN DATA 👉", { role, ...formData });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* LEFT IMAGE */}
        <div style={styles.imageSection}>
          <img src={restaurantImage} alt="Restaurant" style={styles.image} />
        </div>

        {/* RIGHT FORM */}
        <div style={styles.formSection}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>
              Login as {role === "admin" ? "Admin" : "Sub Admin"}
            </p>
          </div>

          {/* ROLE SWITCH */}
          <div style={styles.roleSwitcher}>
            <button
              type="button"
              style={{
                ...styles.roleButton,
                ...(role === "admin" ? styles.roleButtonActive : {}),
              }}
              onClick={() => onRoleChange("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              style={{
                ...styles.roleButton,
                ...(role === "sub_admin" ? styles.roleButtonActive : {}),
              }}
              onClick={() => onRoleChange("sub_admin")}
            >
              Sub Admin
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* EMAIL */}
            <div style={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder={
                  role === "admin"
                    ? "admin@restaurant.com"
                    : "subadmin@restaurant.com"
                }
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* PASSWORD */}
            <div style={styles.formGroup}>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* REMEMBER */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span style={{ fontSize: "0.85rem", color: "#374151" }}>
                Remember me
              </span>
            </div>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button type="submit" style={styles.loginButton} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div style={styles.footer}>
            <p>&copy; 2026 Restaurant Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    padding: "1rem",
  },
  card: {
    display: "flex",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  imageSection: { flex: 1 },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  formSection: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: { textAlign: "center", marginBottom: "1.5rem" },
  title: { fontSize: "1.75rem", fontWeight: 700 },
  subtitle: { color: "#6b7280", fontSize: "0.9rem" },
  roleSwitcher: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    background: "#f3f4f6",
    borderRadius: "8px",
    padding: "4px",
  },
  roleButton: {
    padding: "0.5rem 1rem",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600,
    color: "#6b7280",
  },
  roleButtonActive: {
    background: "#fff",
    borderRadius: "6px",
    color: "#111827",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  form: { maxWidth: "320px", margin: "0 auto" },
  formGroup: { marginBottom: "1rem" },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  loginButton: {
    marginTop: "1rem",
    width: "100%",
    padding: "0.75rem",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  errorMessage: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "0.5rem",
    borderRadius: "6px",
    marginTop: "0.5rem",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
};

export default LoginForm;
