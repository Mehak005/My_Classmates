/**
 * App Component
 * This is the main component that manages the Student Connect application.
 * It allows users to view profiles in card or table format, add/edit/delete profiles,
 * like profiles, and toggle dark mode.
 */

import './App.css'; // Import custom styles
import React, { useState, useEffect } from 'react'; // Import React hooks
import Navbar from "./Navbar"; // Import Navbar component
import Card from "./Card"; // Import Card component to display profiles
import TableView from "./TableView"; // Import TableView for tabular display of profiles
import ProfileForm from "./ProfileForm"; // Import ProfileForm for adding/editing profiles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

function App() {
  /**
   * Initial profiles to be displayed when the application first loads.
   * These are preloaded and will be available unless deleted by the user.
   */
  const initialProfiles = [
    { id: 1, name: 'Mehak', favouriteColor: 'Black', favouriteFood: 'French Fries', likes: 0 },
    { id: 2, name: 'Nikhil', favouriteColor: 'Red', favouriteFood: 'Burger', likes: 0 },
    { id: 3, name: 'Srinivas', favouriteColor: 'Purple', favouriteFood: 'Pizza', likes: 0 }
  ];

  /**
   * State to store profiles.
   * Loads from localStorage if available; otherwise, uses initialProfiles.
   */
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles"));
    return savedProfiles && savedProfiles.length > 0 ? savedProfiles : initialProfiles;
  });

  /**
   * Saves profiles to localStorage whenever the profiles state changes.
   */
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  /**
   * State to control whether the profiles are displayed as Cards or Table.
   */
  const [view, setView] = useState("cards");

  /**
   * State to control whether the ProfileForm modal is open or closed.
   */
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  /**
   * State to track whether dark mode is enabled.
   * Loads from localStorage.
   */
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  /**
   * Saves the dark mode setting to localStorage whenever it changes.
   */
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  }, [darkMode]);

  /**
   * Toggles dark mode on and off.
   */
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  /**
   * Adds a new profile to the list.
   */
  const addProfile = (newProfile) => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1, likes: 0 }]);
  };

  /**
   * Edits an existing profile.
   */
  const editProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)));
  };

  /**
   * Deletes a profile by filtering it out of the state.
   */
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  /**
   * Increments the like count for a profile.
   */
  const handleLike = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, likes: profile.likes + 1 } : profile
      )
    );
  };

  return (
    <div className={`container-fluid ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Navigation bar with view and dark mode toggles */}
      <Navbar view={view} setView={setView} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container">
        {/* Page Title */}
        <h2 className="text-center mt-4 mb-4">My Classmates</h2>

        {/* Conditional Rendering: Show Cards or Table */}
        {view === "cards" ? (
          <div className="row mt-3">
            {/* Render Profile Cards */}
            {profiles.length > 0 ? (
              profiles.map((person) => (
                <div className="col-md-4 mb-4" key={person.id}>
                  <Card
                    person={person}
                    onDelete={deleteProfile}
                    onEdit={() => { setEditingProfile(person); setShowModal(true); }}
                    onLike={handleLike}
                    darkMode={darkMode}
                  />
                </div>
              ))
            ) : (
              <p className="text-center">No classmates added yet.</p>
            )}
          </div>
        ) : (
          /* Render Table View */
          <TableView
            profiles={profiles}
            onEdit={setEditingProfile}
            onDelete={deleteProfile}
            setShowModal={setShowModal}
            darkMode={darkMode}
          />
        )}

        {/* Button to Add a New Profile */}
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Profile
          </button>
        </div>

        {/* ProfileForm Modal for Adding/Editing Profiles */}
        {showModal && (
          <ProfileForm
            show={showModal}
            handleClose={() => setShowModal(false)}
            addProfile={addProfile}
            editProfile={editProfile}
            editingProfile={editingProfile}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
}

export default App;
