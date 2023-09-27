import React, { useState } from "react";
import { loginUser } from "../../api/auth";
import { validateEmail } from "../../utils/validation";
import ShowEyeIcon from "../../assets/imgs/show-eye.svg";
import HideEyeIcon from "../../assets/imgs/hide-eye.svg";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    let emailError = formErrors.email;
    let passwordError = formErrors.password;

    if (name === "email") {
      emailError = !validateEmail(value) ? "Valid email is: a@b.co" : "";
    }

    if (name === "password") {
      passwordError = !value.trim() ? "Enter password" : "";
    }

    if (!emailError && !passwordError) {
      setError("");
    } else {
      setError("Fix errors below");
    }

    setFormErrors({
      email: emailError,
      password: passwordError,
    });
  };

  const handleLogin = async () => {
    let hasErrors = false;

    const emailError = !validateEmail(formData.email)
      ? "Valid email is: a@b.co"
      : "";
    const passwordError = !formData.password.trim() ? "Enter password" : "";

    if (emailError || passwordError) {
      setError("Fix errors below");
      hasErrors = true;
    } else {
      setError("");
    }

    setFormErrors({
      email: emailError,
      password: passwordError,
    });

    if (hasErrors) {
      return;
    }

    setLoading(true);
    try {
      await loginUser(formData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-form">
      <form
        className="login-form__container"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <legend className="login-form__title">
          <h2>Login</h2>
        </legend>
        <div className="login-form__status">
          {error && <div className="login-form__alert">{error}</div>}
          {loading && <div className="login-form__loading">Loading...</div>}
          {success && (
            <div className="login-form__success">Login successful!</div>
          )}
        </div>
        <fieldset className="login-form__fieldset">
          <div className="login-form__input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              aria-required="true"
              className="login-form__input"
              placeholder=" "
              autoComplete="off"
            />
            <label htmlFor="email" className="login-form__label">
              Email
            </label>
            <div
              className={`login-form__error ${
                formErrors.email ? "visible" : ""
              }`}
            >
              {formErrors.email}
            </div>
          </div>

          <div className="login-form__input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              aria-required="true"
              className="login-form__input"
              placeholder=" "
            />
            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <img
              src={showPassword ? HideEyeIcon : ShowEyeIcon}
              alt="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="login-form__toggle-icon"
            />
            <div
              className={`login-form__error ${
                formErrors.password ? "visible" : ""
              }`}
            >
              {formErrors.password}
            </div>
          </div>
        </fieldset>

        <div className="login-form__btn-group">
          <button
            type="submit"
            disabled={formErrors.email || formErrors.password}
            className="login-form__submit-btn"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
