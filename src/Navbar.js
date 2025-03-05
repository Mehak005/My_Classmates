import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar({ view, setView, darkMode, toggleDarkMode }) {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-primary"} mb-3`}>
      <div className="container-fluid">
        {/* Website Name on the Left */}
        <a className="navbar-brand fw-bold text-white" href="#">Student Connect</a>

        {/* Right-aligned View Options & Dark Mode Toggle */}
        <div className="ms-auto d-flex align-items-center">
          {/* View as Cards */}
          <button
            className={`btn ${view === "cards" ? "btn-light" : "btn-outline-light"} mx-2`}
            onClick={() => setView("cards")}
          >
            View as Cards
          </button>

          {/* View as Table */}
          <button
            className={`btn ${view === "table" ? "btn-light" : "btn-outline-light"} mx-2`}
            onClick={() => setView("table")}
          >
            View as Table
          </button>

          {/* Dark Mode Toggle */}
          <button className="btn btn-dark mx-2" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
