import React, { useState } from "react";
import restaurantImage from "../../assets/loginimage1.jpg";

const LoginForm = ({ role, onRoleChange }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    setTimeout(() => {
      console.log({ role, ...formData });
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* LEFT IMAGE SECTION */}
        <div style={styles.imageSection}>
          <img src={restaurantImage} alt="Restaurant" style={styles.image} />
        </div>

        {/* RIGHT FORM SECTION */}
        <div style={styles.formSection}>
          <div style={styles.header}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>Login to your admin panel</p>
          </div>

          {/* ROLE SWITCH */}
          <div style={styles.roleSwitcher}>
            <button
              type="button"
              style={{
                ...styles.roleButton,
                ...(role === "admin" ? styles.roleButtonActive : {})
              }}
              onClick={() => onRoleChange("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              style={{
                ...styles.roleButton,
                ...(role === "sub_admin" ? styles.roleButtonActive : {})
              }}
              onClick={() => onRoleChange("sub_admin")}
            >
              Sub Admin
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input
                  type="email"
                  style={styles.input}
                  placeholder={role === "admin" ? "admin@restaurant.com" : "subadmin@restaurant.com"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <div style={styles.inputWrapper}>
                <svg style={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  type="password"
                  style={styles.input}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                <svg style={styles.errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={styles.loginButton}>
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Logging in...
                </>
              ) : (
                `Login as ${role === "admin" ? "Admin" : "Sub Admin"}`
              )}
            </button>
          </form>

          {/* FOOTER */}
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
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc", // Changed from black to light gray-blue
    padding: "1rem",
  },
  card: {
    display: "flex",
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Lighter shadow
    maxWidth: "900px",
    width: "100%",
    minHeight: "500px",
  },
  imageSection: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    background: "#f1f5f9", // Changed from dark blue to light blue-gray
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.9, // Slightly increased opacity
  },
  formSection: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  roleSwitcher: {
    display: "flex",
    background: "#f3f4f6",
    borderRadius: "8px",
    padding: "4px",
    marginBottom: "1.5rem",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
  },
  roleButton: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "transparent",
    color: "#6b7280",
  },
  roleButtonActive: {
    background: "white",
    color: "#1f2937",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
  },
  formGroup: {
    marginBottom: "1.25rem",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "1rem",
    height: "1rem",
    color: "#9ca3af",
  },
  input: {
    width: "100%",
    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    background: "white",
    color: "#1f2937",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "0.8rem",
    marginBottom: "1rem",
  },
  errorIcon: {
    width: "1rem",
    height: "1rem",
    flexShrink: 0,
  },
  loginButton: {
    width: "100%",
    padding: "0.75rem",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  loadingSpinner: {
    width: "1rem",
    height: "1rem",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "0.8rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
};

export default LoginForm;