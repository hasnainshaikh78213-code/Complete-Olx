import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";

function Signup({ onSwitch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", form);
      console.log("Signup Response:", res.data);

      setMessage(res.data.msg);

      if (res.status === 201 || res.status === 200) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/"; // redirect to home
      }

      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>

        {message && <p className="msg">{message}</p>}

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={onSwitch}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
