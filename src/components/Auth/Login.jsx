import React, { useState } from "react";
import restaurantImage from "../../assets/loginimage1.jpg";
import { useLoginMutation } from "../../api/services/authapi";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = ({ role = "admin", onRoleChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: role === "admin" ? "RESTAURANT_ADMIN" : "SUB_ADMIN",
    };

    try {
      const response = await login(payload).unwrap();
      // Token is now handled in authapi onQueryStarted
      // optional: rememberMe logic
      if (formData.rememberMe) {
        localStorage.setItem("rememberMeEmail", formData.email);
      }
      navigate("/"); // redirect to dashboard
    } catch (err) {
      setError(err?.data?.message || err?.error || "Login failed");
    }
  };

  return (
    <div style={styles.container} >
      {/* Background Elements */}
      <div style={styles.backgroundAnimation}></div>

      <div style={{
        ...styles.card,
        flexDirection: isMobile ? "column" : "row",
        maxWidth: "1000px",
        height: isMobile ? "auto" : "600px"
      }}>
        {/* LEFT IMAGE */}
        <div style={{
          ...styles.imageSection,
          flex: isMobile ? "none" : 1,
          height: isMobile ? "200px" : "100%"
        }}>
          <div style={styles.imageOverlay}></div>
          <img src={restaurantImage} alt="Restaurant" style={styles.image} />
          <div style={styles.imageContent}>
            {isMobile ? (
              // Simplified header for mobile image section
              <>
                <div style={{ ...styles.restaurantLogo, fontSize: "40px", marginBottom: "5px" }}>🍽️</div>
                <h2 style={{ ...styles.restaurantTitle, fontSize: "24px" }}>Fine Dining Pro</h2>
              </>
            ) : (
              <>
                <div style={styles.restaurantLogo}>🍽️</div>
                <h2 style={styles.restaurantTitle}>Fine Dining Pro</h2>
                <p style={styles.restaurantTagline}>Elevating Restaurant Management</p>
              </>
            )}

          </div>
        </div>

        {/* RIGHT FORM */}
        <div style={{
          ...styles.formSection,
          padding: isMobile ? "30px 20px" : "40px"
        }}>

          <div style={styles.formContent}>
            <div style={styles.header}>
              <div style={styles.welcomeBack}>
                <div style={styles.welcomeIcon}>👨‍🍳</div>
                <h1 style={styles.title}>Welcome Back</h1>
              </div>
              <p style={styles.subtitle}>Sign in to manage your restaurant</p>
            </div>

            {/* ROLE SWITCHER */}
            <div style={styles.roleSwitcher}>
              <button
                onClick={() => onRoleChange && onRoleChange("admin")}
                style={{
                  ...styles.roleButton,
                  ...(role === "admin" ? styles.roleButtonActive : {}),
                  padding: isMobile ? "10px" : "15px",
                  gap: isMobile ? "8px" : "12px"
                }}
              >
                <span style={{ ...styles.roleIcon, fontSize: isMobile ? "20px" : "24px" }}>👑</span>
                <div>
                  <div style={{ ...styles.roleName, fontSize: isMobile ? "13px" : "14px" }}>Admin</div>
                  <div style={{ ...styles.roleDesc, fontSize: isMobile ? "11px" : "12px" }}>Full Access</div>

                </div>
              </button>
              <button
                onClick={() => onRoleChange && onRoleChange("subadmin")}
                style={{
                  ...styles.roleButton,
                  ...(role === "subadmin" ? styles.roleButtonActive : {}),
                  padding: isMobile ? "10px" : "15px",
                  gap: isMobile ? "8px" : "12px"
                }}
              >
                <span style={{ ...styles.roleIcon, fontSize: isMobile ? "20px" : "24px" }}>👥</span>
                <div>
                  <div style={{ ...styles.roleName, fontSize: isMobile ? "13px" : "14px" }}>Sub-Admin</div>
                  <div style={{ ...styles.roleDesc, fontSize: isMobile ? "11px" : "12px" }}>Limited Access</div>
                </div>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* EMAIL */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputContainer}>
                  <span style={styles.inputIcon}>📧</span>
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
              </div>

              {/* PASSWORD */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputContainer}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}
              <div style={styles.rememberContainer}>
                <label style={styles.rememberLabel}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={styles.checkboxInput}
                  />
                  <span style={styles.customCheckbox}>
                    {formData.rememberMe && <span style={styles.checkIcon}>✓</span>}
                  </span>
                  <span style={styles.rememberText}>Remember me for 30 days</span>
                </label>
              </div>

              {/* ERROR */}
              {error && (
                <div style={styles.errorMessage}>
                  <span style={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                style={styles.loginButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span style={styles.spinner}></span>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>

              {/* FOOTER */}
              <div style={styles.footer}>
                <p style={styles.footerText}>
                  Need help?{" "}
                       <button
                    type="button"
                    style={styles.supportLink}
                    onClick={() => navigate("/support")}
                  >
                    Contact Support
                  </button>
                </p>
                <p style={styles.copyright}>&copy; 2024 Restaurant Dashboard</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(45deg, rgba(220, 38, 38, 0.05) 25%, transparent 25%, transparent 50%, rgba(239, 68, 68, 0.05) 50%, rgba(239, 68, 68, 0.05) 75%, transparent 75%, transparent)",
    backgroundSize: "50px 50px",
    animation: "move 20s linear infinite",
  },
  card: {
    display: "flex",
    background: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    maxWidth: "1000px",
    width: "100%",
    boxShadow: "0 20px 40px rgba(220, 38, 38, 0.15)",
    zIndex: 1,
    minHeight: "600px",
    border: "1px solid #fed7d7",
  },
  imageSection: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "brightness(0.9)",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to right, rgba(220, 38, 38, 0.8), rgba(200, 55, 55, 0.3))",
    zIndex: 1,
  },
  imageContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    padding: "40px",
    textAlign: "center",
  },
  restaurantLogo: {
    fontSize: "60px",
    marginBottom: "20px",
    animation: "bounce 2s ease-in-out infinite",
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
  },
  restaurantTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
  },
  restaurantTagline: {
    fontSize: "16px",
    opacity: 0.9,
    maxWidth: "300px",
    lineHeight: 1.5,
    fontWeight: "500",
  },
  formSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "#ffffff",
  },
  formContent: {
    width: "100%",
    maxWidth: "400px",
  },
  header: {
    marginBottom: "30px",
  },
  welcomeBack: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  welcomeIcon: {
    fontSize: "32px",
    color: "#dc2626",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    margin: 0,
  },
  roleSwitcher: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  roleButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    border: "2px solid #e5e7eb",
    background: "#f9fafb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#374151",
  },
  roleButtonActive: {
    background: "#dc2626",
    borderColor: "#dc2626",
    color: "#ffffff",
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(220, 38, 38, 0.2)",
  },
  roleIcon: {
    fontSize: "24px",
  },
  roleName: {
    fontSize: "14px",
    fontWeight: "600",
  },
  roleDesc: {
    fontSize: "12px",
    opacity: 0.8,
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "18px",
    color: "#9ca3af",
    zIndex: 1,
  },
  input: {
    width: "100%",
    padding: "15px 45px 15px 45px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    background: "#f9fafb",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#111827",
    "&:focus": {
      borderColor: "#dc2626",
      background: "#ffffff",
      boxShadow: "0 0 0 3px rgba(220, 38, 38, 0.1)",
    }
  },
  eyeButton: {
    position: "absolute",
    right: "15px",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "#dc2626",
    }
  },
  rememberContainer: {
    marginBottom: "20px",
  },
  rememberLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  checkboxInput: {
    display: "none",
  },
  customCheckbox: {
    width: "20px",
    height: "20px",
    border: "2px solid #d1d5db",
    borderRadius: "6px",
    background: "#f9fafb",
    position: "relative",
    transition: "all 0.3s ease",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkIcon: {
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "bold",
  },
  rememberText: {
    fontSize: "14px",
    color: "#4b5563",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #fecaca",
  },
  errorIcon: {
    fontSize: "16px",
    flexShrink: 0,
  },
  loginButton: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 15px rgba(220, 38, 38, 0.25)",
    marginBottom: "20px",
    "&:hover:not(:disabled)": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(220, 38, 38, 0.35)",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
      transform: "none",
    }
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid #f3f4f6",
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "5px",
  },
  supportLink: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
    fontSize: "14px",
    "&:hover": {
      textDecoration: "underline",
    }
  },
  copyright: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "10px",
  },
};

// Add CSS animations
if (typeof document !== 'undefined') {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes move {
      0% { background-position: 0 0; }
      100% { background-position: 50px 50px; }
    }
  `);

  styleSheet.insertRule(`
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `);

  styleSheet.insertRule(`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `);
}

export default LoginForm;