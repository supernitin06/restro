import React, { useState, useEffect } from "react";
import { showPromiseToast } from "../../utils/toastAlert";
import restaurantImage from "../../assets/image.png";
import grandmaLogo from "../../assets/grandma.webp";
import { useLoginMutation } from "../../api/services/authapi";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock, FiAlertTriangle, FiUser, FiUsers, FiChevronRight } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const LoginForm = ({ role = "admin", onRoleChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState([]);

  const navigate = useNavigate();

  // Floating particles effect
  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
      }));
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsAnimating(true);

    const payload = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: role === "admin" ? "RESTAURANT_ADMIN" : "SUB_ADMIN",
    };

    try {
      await showPromiseToast(
        login(payload).unwrap(),
        {
          loading: 'Logging in...',
          success: 'Login successful! Redirecting...',
          error: (err) => err?.data?.message || err?.error || "Login failed"
        }
      );
      
      if (formData.rememberMe) {
        localStorage.setItem("rememberMeEmail", formData.email);
      }
      
      // Add success animation before navigation
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err?.data?.message || err?.error || "Login failed");
      setIsAnimating(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            ...styles.particle,
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}

      {/* Floating Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      <div style={{
        ...styles.card,
        flexDirection: isMobile ? "column" : "row",
        maxWidth: "1000px",
        height: isMobile ? "auto" : "600px",
        animation: `${isAnimating ? 'successPulse 1.5s ease' : 'slideIn 0.8s ease-out'}`
      }}>
        {/* LEFT IMAGE SECTION */}
        <div style={{
          ...styles.imageSection,
          flex: isMobile ? "none" : 1,
          height: isMobile ? "200px" : "100%",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={styles.imageGradient}></div>
          <img 
            src={restaurantImage} 
            alt="Restaurant" 
            style={{
              ...styles.image,
              transform: isAnimating ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease"
            }} 
          />
          
          {/* Animated overlay elements */}
          <div style={styles.floatingCutlery}>🍴</div>
          <div style={styles.floatingPlate}>🍽️</div>
          
          <div style={styles.imageContent}>
            {isMobile ? (
              <>
                <div style={styles.mobileLogoContainer}>
                  <img 
                    src={grandmaLogo} 
                    alt="Restaurant Logo" 
                    style={{
                      ...styles.mobileLogoImage,
                      animation: "logoFloat 3s ease-in-out infinite"
                    }} 
                  />
                </div>
                <h2 style={{
                  ...styles.restaurantTitle,
                  fontSize: "24px",
                  background: "linear-gradient(45deg, #fff, #fed7d7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Fine Dining Pro</h2>
              </>
            ) : (
              <>
                <div style={styles.restaurantLogo}>
                  <img 
                    src={grandmaLogo} 
                    alt="Restaurant Logo" 
                    style={{
                      ...styles.restaurantLogoImage,
                      animation: "logoFloat 3s ease-in-out infinite",
                      filter: "drop-shadow(0 8px 32px rgba(255, 255, 255, 0.4))"
                    }} 
                  />
                </div>
                <h2 style={{
                  ...styles.restaurantTitle,
                  background: "linear-gradient(45deg, #fff, #fed7d7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Fine Dining Pro</h2>
                <p style={styles.restaurantTagline}>Elevating Restaurant Management</p>
                <div style={styles.animatedLine}></div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div style={{
          ...styles.formSection,
          padding: isMobile ? "30px 20px" : "40px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Form background pattern */}
          <div style={styles.formPattern}></div>
          
          <div style={styles.formContent}>
            {/* Header with animated icon */}
            <div style={styles.header}>
              <div style={styles.welcomeBack}>
                <div style={{
                  ...styles.welcomeIcon,
                  animation: "iconFloat 2s ease-in-out infinite"
                }}>
                  <FiUser />
                </div>
                <div style={styles.titleContainer}>
                  <h1 style={styles.title}>Welcome Back</h1>
                  {/* <div style={styles.subtitleAnimation}>
                    <span>Sign in to continue</span>
                    <span style={styles.arrowAnimation}><FiChevronRight /></span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* ROLE SWITCHER with enhanced animation */}
            <div style={styles.roleSwitcher}>
              <button
                onClick={() => {
                  if (onRoleChange) {
                    onRoleChange("admin");
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                style={{
                  ...styles.roleButton,
                  ...(role === "admin" ? styles.roleButtonActive : {}),
                  padding: isMobile ? "10px" : "15px",
                  gap: isMobile ? "8px" : "12px",
                  transform: role === "admin" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span style={{
                  ...styles.roleIcon,
                  fontSize: isMobile ? "20px" : "24px",
                  animation: role === "admin" ? "crownShine 2s infinite" : "none"
                }}>
                  <FaCrown />
                </span>
                <div>
                  <div style={{
                    ...styles.roleName,
                    fontSize: isMobile ? "13px" : "14px",
                  }}>Admin</div>
                  <div style={styles.roleDesc}>Full Access</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  if (onRoleChange) {
                    onRoleChange("subadmin");
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                style={{
                  ...styles.roleButton,
                  ...(role === "subadmin" ? styles.roleButtonActive : {}),
                  padding: isMobile ? "10px" : "15px",
                  gap: isMobile ? "8px" : "12px",
                  transform: role === "subadmin" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <span style={{
                  ...styles.roleIcon,
                  fontSize: isMobile ? "20px" : "24px",
                }}>
                  <FiUsers />
                </span>
                <div>
                  <div style={styles.roleName}>Sub-Admin</div>
                  <div style={styles.roleDesc}>Limited Access</div>
                </div>
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* EMAIL FIELD with focus animation */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email Address
                  <span style={styles.requiredDot}>•</span>
                </label>
                <div style={styles.inputContainer}>
                  <span style={styles.inputIcon}><FiMail /></span>
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
                    style={{
                      ...styles.input,
                      background: formData.email ? "linear-gradient(90deg, #fef2f2 0%, #ffffff 100%)" : "#f9fafb"
                    }}
                    onFocus={(e) => {
                      e.target.parentElement.style.transform = "translateY(-2px)";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement.style.transform = "translateY(0)";
                    }}
                  />
                </div>
              </div>

              {/* PASSWORD FIELD with animated eye */}
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Password
                  <span style={styles.requiredDot}>•</span>
                </label>
                <div style={styles.inputContainer}>
                  <span style={styles.inputIcon}><FiLock /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                      ...styles.input,
                      background: formData.password ? "linear-gradient(90deg, #fef2f2 0%, #ffffff 100%)" : "#f9fafb"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword(!showPassword);
                      setIsAnimating(true);
                      setTimeout(() => setIsAnimating(false), 300);
                    }}
                    style={{
                      ...styles.eyeButton,
                      transform: showPassword ? "rotate(360deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* ERROR MESSAGE with shake animation */}
              {error && (
                <div style={{
                  ...styles.errorMessage,
                  animation: "shake 0.5s ease",
                }}>
                  <span style={styles.errorIcon}><FiAlertTriangle /></span>
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON with loading animation */}
              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  position: "relative",
                  overflow: "hidden",
                }}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                <span style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  {isLoading ? (
                    <>
                      <span style={styles.spinner}></span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <span>Log In</span>
                      <span style={styles.buttonArrow}><FiChevronRight /></span>
                    </>
                  )}
                </span>
                
                {/* Button hover effect */}
                <span style={styles.buttonHoverEffect}></span>
                
                {/* Button shine effect */}
                <span style={styles.buttonShine}></span>
              </button>

              {/* FOOTER */}
              <div style={styles.footer}>
                {/* <p style={styles.footerText}>
                  Need help?{" "}
                  <button
                    type="button"
                    style={styles.supportLink}
                    onClick={() => navigate("/support")}
                    onMouseEnter={(e) => e.target.style.transform = "translateX(5px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateX(0)"}
                  >
                    Contact Support
                  </button>
                </p> */}
                <div style={styles.copyrightContainer}>
                  <p style={styles.copyright}>&copy; 2024 Restaurant Dashboard</p>
                  <div style={styles.securityBadge}>
                    🔒 Secure Login
                  </div>
                </div>
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
  particle: {
    position: "absolute",
    background: "rgba(220, 38, 38, 0.1)",
    borderRadius: "50%",
    pointerEvents: "none",
    animation: "float 20s infinite linear",
  },
  orb1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(255,245,245,0.3) 0%, rgba(254,215,215,0) 70%)",
    borderRadius: "50%",
    top: "-150px",
    left: "-150px",
    animation: "orbFloat 20s infinite ease-in-out",
  },
  orb2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, rgba(220,38,38,0) 70%)",
    borderRadius: "50%",
    bottom: "-100px",
    right: "-100px",
    animation: "orbFloat 25s infinite ease-in-out reverse",
  },
  orb3: {
    position: "absolute",
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
    borderRadius: "50%",
    top: "50%",
    right: "10%",
    animation: "orbFloat 30s infinite ease-in-out",
  },
  card: {
    display: "flex",
    background: "#ffffff",
    borderRadius: "24px",
    overflow: "hidden",
    maxWidth: "1000px",
    width: "100%",
    boxShadow: `
      0 25px 50px rgba(220, 38, 38, 0.15),
      0 10px 30px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.5)
    `,
    zIndex: 1,
    minHeight: "600px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
  },
  imageSection: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  imageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(200, 55, 55, 0.4) 100%)",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  floatingCutlery: {
    position: "absolute",
    fontSize: "40px",
    top: "20%",
    left: "10%",
    animation: "floatItem 8s infinite ease-in-out",
    zIndex: 3,
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
  },
  floatingPlate: {
    position: "absolute",
    fontSize: "50px",
    bottom: "20%",
    right: "10%",
    animation: "floatItem 10s infinite ease-in-out reverse",
    zIndex: 3,
    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
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
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  restaurantLogoImage: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid rgba(255, 255, 255, 0.9)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
  },
  mobileLogoContainer: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
  mobileLogoImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(255, 255, 255, 0.9)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
  },
  restaurantTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  restaurantTagline: {
    fontSize: "16px",
    opacity: 0.9,
    maxWidth: "300px",
    lineHeight: 1.5,
    fontWeight: "500",
    marginBottom: "20px",
  },
  animatedLine: {
    width: "100px",
    height: "3px",
    background: "linear-gradient(90deg, transparent, #fff, transparent)",
    marginTop: "10px",
    animation: "lineGrow 3s infinite",
  },
  formSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)",
    position: "relative",
  },
  formPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "radial-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    opacity: 0.5,
    pointerEvents: "none",
  },
  formContent: {
    width: "100%",
    maxWidth: "400px",
    zIndex: 2,
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
    padding: "10px",
    background: "rgba(220, 38, 38, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
    background: "linear-gradient(45deg, #dc2626, #ef4444)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    
  },
  subtitleAnimation: {
    fontSize: "15px",
    color: "#6b7280",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  arrowAnimation: {
    animation: "arrowBounce 2s infinite",
    display: "inline-flex",
    alignItems: "center",
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
    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    color: "#374151",
    position: "relative",
    overflow: "hidden",
  },
  roleButtonActive: {
    background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    borderColor: "#dc2626",
    color: "#ffffff",
    boxShadow: "0 8px 25px rgba(220, 38, 38, 0.25)",
  },
  roleIcon: {
    fontSize: "24px",
    position: "relative",
    zIndex: 2,
  },
  roleName: {
    fontSize: "14px",
    fontWeight: "600",
    position: "relative",
    zIndex: 2,
  },
  roleDesc: {
    fontSize: "12px",
    opacity: 0.8,
    position: "relative",
    zIndex: 2,
  },
  form: {
    width: "100%",
  },
  formGroup: {
    marginBottom: "25px",
    animation: "fadeInUp 0.6s ease-out",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },
  requiredDot: {
    color: "#dc2626",
    fontSize: "10px",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.3s ease",
  },
  inputIcon: {
    position: "absolute",
    left: "15px",
    fontSize: "18px",
    color: "#9ca3af",
    zIndex: 1,
    transition: "color 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "16px 45px 16px 45px",
    borderRadius: "14px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    background: "#f9fafb",
    transition: "all 0.3s ease",
    outline: "none",
    color: "#111827",
    fontFamily: "inherit",
    "&:focus": {
      borderColor: "#dc2626",
      boxShadow: "0 0 0 4px rgba(220, 38, 38, 0.1), 0 0 20px rgba(220, 38, 38, 0.05)",
    },
    "&:focus + span": {
      color: "#dc2626",
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
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#dc2626",
      transform: "scale(1.1)",
    }
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    color: "#dc2626",
    padding: "14px 18px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #fca5a5",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.1)",
  },
  errorIcon: {
    fontSize: "16px",
    flexShrink: 0,
  },
  loginButton: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 8px 25px rgba(220, 38, 38, 0.3)",
    marginBottom: "25px",
    position: "relative",
    overflow: "hidden",
    "&:hover:not(:disabled)": {
      boxShadow: "0 12px 35px rgba(220, 38, 38, 0.4)",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
    }
  },
  buttonHoverEffect: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "0",
    height: "0",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    transform: "translate(-50%, -50%)",
    transition: "width 0.6s, height 0.6s",
  },
  buttonShine: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
    transform: "rotate(45deg)",
    animation: "shine 3s infinite",
  },
  buttonArrow: {
    transition: "transform 0.3s ease",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  footer: {
    textAlign: "center",
    paddingTop: "25px",
    borderTop: "1px solid rgba(243, 244, 246, 0.5)",
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "15px",
  },
  supportLink: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontWeight: "600",
    cursor: "pointer",
    padding: 0,
    fontSize: "14px",
    transition: "all 0.3s ease",
    position: "relative",
    "&:hover": {
      textDecoration: "underline",
    }
  },
  copyrightContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  copyright: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  securityBadge: {
    fontSize: "11px",
    color: "#10b981",
    background: "rgba(16, 185, 129, 0.1)",
    padding: "4px 10px",
    borderRadius: "20px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    animation: "pulse 2s infinite",
  },
};

// Enhanced animations
const styleSheet = typeof document !== 'undefined' ? document.createElement('style') : null;
if (styleSheet) {
  styleSheet.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -30px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
    }
    
    @keyframes logoFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes iconFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(5deg); }
    }
    
    @keyframes arrowBounce {
      0%, 20%, 50%, 80%, 100% { transform: translateX(0); }
      40% { transform: translateX(5px); }
      60% { transform: translateX(3px); }
    }
    
    @keyframes crownShine {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.5) drop-shadow(0 0 8px rgba(255, 215, 0, 0.5)); }
    }
    
    @keyframes floatItem {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(10px, -15px) rotate(5deg); }
      66% { transform: translate(-5px, 10px) rotate(-5deg); }
    }
    
    @keyframes lineGrow {
      0% { width: 0; opacity: 0; }
      50% { width: 100px; opacity: 1; }
      100% { width: 0; opacity: 0; }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes successPulse {
      0% { transform: scale(1); box-shadow: 0 25px 50px rgba(220, 38, 38, 0.15); }
      50% { transform: scale(1.02); box-shadow: 0 35px 70px rgba(16, 185, 129, 0.3); }
      100% { transform: scale(1); box-shadow: 0 25px 50px rgba(220, 38, 38, 0.15); }
    }
    
    @keyframes shine {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .login-button:hover .button-hover-effect {
      width: 300px;
      height: 300px;
    }
  `;
  if (typeof document !== 'undefined') {
    document.head.appendChild(styleSheet);
  }
}

export default LoginForm;