import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/ic_monogram_logo_v2_1773476654071-removebg-preview.png";

function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // 'email' or 'signup'
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleProceed = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStep("signup");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    alert(`Welcome, ${name}! Account created successfully.`);
    navigate("/");
  };

  return (
    <div className="login-page">
      {/* Left decorative panel */}
      <div className="login-left-panel">
        <div className="login-brand-tagline">
          <h1>Beauty is</h1>
          <h1>for Everyone</h1>
          <p>Premium makeup & skincare delivered to your door.</p>
        </div>
        <div className="login-cosmetic-circles">
          <div className="circle c1"></div>
          <div className="circle c2"></div>
          <div className="circle c3"></div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right-panel">
        <button className="login-skip-btn" onClick={() => navigate("/")}>
          Skip
        </button>

        <div className="login-form-wrapper">
          {/* Brand logo */}
          <div className="login-logo">
            <img src={logoImg} alt="InCosmetic" />
            <span className="login-logo-text">
              <span className="logo-top-text">InCos</span>
              <span className="logo-bottom-text">Metic</span>
            </span>
          </div>

          <h2 className="login-title">Login or Signup</h2>
          <p className="login-subtitle">
            {step === "email"
              ? "Get started & grab best offers on top brands!"
              : "Complete your profile to get 2000 reward points!"}
          </p>

          {error && <div className="login-error">{error}</div>}

          {step === "email" ? (
            /* Step 1 — Email input */
            <form onSubmit={handleProceed} className="login-form">
              <div className="login-input-row">
                <input
                  id="login-email"
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  autoFocus
                />
                <button type="submit" className="login-proceed-btn">
                  Proceed
                </button>
              </div>

              <div className="login-divider">
                <span></span>
                <p>Or sign in using</p>
                <span></span>
              </div>

              <button
                type="button"
                className="login-social-btn google-btn pink-btn"
                onClick={() => alert("Google sign-in coming soon!")}
              >
                <div className="google-icon-wrapper">
                  <img
                    src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                    alt="Google"
                    className="login-google-icon"
                  />
                </div>
                <span>Continue With Google</span>
              </button>
            </form>
          ) : (
            /* Step 2 — Signup details */
            <form onSubmit={handleSignup} className="login-form">
              <div className="login-email-edit-group">
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="login-input-readonly"
                />
                <button
                  type="button"
                  className="login-change-email-btn"
                  onClick={() => { setStep("email"); setError(""); }}
                >
                  Change
                </button>
              </div>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="login-input login-input-full"
                autoFocus
              />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input login-input-full"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-input login-input-full"
              />

              <button type="submit" className="login-proceed-btn login-proceed-full">
                Create Account
              </button>

              <p className="login-terms">
                By continuing, you agree to our{" "}
                <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
