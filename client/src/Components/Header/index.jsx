import React from "react";

export const Header = () => {
  return (
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span className="fs-4" style={{color: "#fd7e14"}}>eCommerce App</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <a href="#" className="nav-link" style={{color: "#fd7e14"}}>
            Sign In
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-light" style={{backgroundColor: "#fd7e14"}}>
            Sign Up
          </a>
        </li>
      </ul>
    </header>
  );
};
