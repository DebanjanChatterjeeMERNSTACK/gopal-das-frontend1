import React, { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    fetch(`${URL}/admin_login`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       
        if (data.status == 200) {
          setloading(false);
          localStorage.setItem("token", data.token);
          Swal.fire({
            title: data.text,
            icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });

          navigate("/admin");
        } else {
          setloading(false);
          Swal.fire({
            title: data.text,
            icon: data.mess, // 'success', 'error', 'warning', 'info', or 'question'
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className=" mb-3">
            <label htmlFor="email">Email Id</label>
            <input
              className="form-control"
              type="text"
              // placeholder="Email"
              aria-label="default input example"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className=" mb-3">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (
            <button type="submit" className="login-button" disabled>
              <div className="spinner-border text-light" role="status"></div>
            </button>
          ) : (
            <button type="submit" className="login-button">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
