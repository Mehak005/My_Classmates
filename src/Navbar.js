/**
 * Navbar Component
 * This component provides navigation with options for switching views and toggling dark mode.
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

/**
 * Navbar Component
 *
 * Props:
 * @param {String} view - Current view mode ("cards" or "table")
 * @param {Function} setView - Function to change the view mode
 * @param {Boolean} darkMode - Determines if dark mode is enabled
 * @param {Function} toggleDarkMode - Function to toggle dark mode
 */
function Navbar({ view, setView, darkMode, toggleDarkMode }) {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-primary navbar-light"}`}>
      <div className="container-fluid">
        {/* Application Title */}
        <span className="navbar-brand text-white">Student Connect</span>

        {/* View Mode Toggle Buttons */}
        <div className="d-flex">
          <button className={`btn ${view === "cards" ? "btn-light text-dark" : "btn-outline-light"} mx-2`} onClick={() => setView("cards")}>
            View as Cards
          </button>
          <button className={`btn ${view === "table" ? "btn-light text-dark" : "btn-outline-light"} mx-2`} onClick={() => setView("table")}>
            View as Table
          </button>

          {/* Dark Mode Toggle Button */}
          <button className="btn btn-secondary mx-2" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
