import React from "react";
import "./Error.css";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <NavLink to={"/"} >
        <button className="btn5">
          ⬅ Back to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
