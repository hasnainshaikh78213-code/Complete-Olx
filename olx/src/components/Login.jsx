import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";

function Login({ onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      console.log("Login Response:", res.data);

      setMessage(res.data.msg);
      localStorage.setItem("token", res.data.token);

      window.location.href = "/";  

    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {message && <p className="msg">{message}</p>}

        <p className="switch-text">
          Don’t have an account?{" "}
          <span onClick={onSwitch}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
