/**
 * App Component
 *
 * This is the main component that manages the Student Connect application.
 * Features:
 * - View profiles in either Card or Table format.
 * - Create, edit, and delete student profiles.
 * - Like profiles to increase engagement.
 * - Toggle dark mode for better user experience.
 * - Persist data using localStorage for profile and dark mode settings.
 */

import './App.css'; // Import custom CSS styles
import React, { useState, useEffect } from 'react'; // Import React hooks
import Navbar from "./Navbar"; // Import the Navbar component
import Card from "./Card"; // Import the Card component to display profiles
import TableView from "./TableView"; // Import TableView to display profiles in a table
import ProfileForm from "./ProfileForm"; // Import ProfileForm for adding/editing profiles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

function App() {
  /**
   * Predefined list of profiles when the application first loads.
   * These profiles are set by default and will remain unless removed by the user.
   */
  const initialProfiles = [
    { id: 1, name: 'Mehak', favouriteColor: 'Black', favouriteFood: 'French Fries', likes: 0 },
    { id: 2, name: 'Nikhil', favouriteColor: 'Red', favouriteFood: 'Burger', likes: 0 },
    { id: 3, name: 'Srinivas', favouriteColor: 'Purple', favouriteFood: 'Pizza', likes: 0 }
  ];

  /**
   * State: Profiles List
   * - Loads profiles from localStorage if available, otherwise initializes with `initialProfiles`.
   * - Updates localStorage whenever profiles change.
   */
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles"));
    return savedProfiles && savedProfiles.length > 0 ? savedProfiles : initialProfiles;
  });

  /**
   * Effect Hook: Sync profiles state with localStorage
   * - Every time `profiles` changes, update localStorage.
   */
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  /**
   * State: View Mode
   * - Determines whether profiles are displayed as Cards or in a Table.
   */
  const [view, setView] = useState("cards");

  /**
   * State: Profile Form Modal
   * - `showModal` controls the visibility of the ProfileForm.
   * - `editingProfile` holds the profile being edited, if applicable.
   */
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  /**
   * State: Dark Mode Toggle
   * - Loads user preference from localStorage.
   * - Updates localStorage when changed.
   */
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  /**
   * Effect Hook: Apply Dark Mode
   * - Updates the document body class to match the dark mode state.
   * - Saves the dark mode preference to localStorage.
   */
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  }, [darkMode]);

  /**
   * Function: Toggle Dark Mode
   * - Switches between light and dark themes.
   */
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  /**
   * Function: Add a New Profile
   * - Adds a new profile to the list and assigns it an incremental ID.
   */
  const addProfile = (newProfile) => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1, likes: 0 }]);
  };

  /**
   * Function: Edit an Existing Profile
   * - Updates a profile in the list by matching the ID.
   */
  const editProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)));
  };

  /**
   * Function: Delete a Profile
   * - Removes a profile from the list based on its ID.
   */
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  /**
   * Function: Like a Profile
   * - Increments the like count for a profile.
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
      {/* Navbar with View Mode Toggle and Dark Mode Toggle */}
      <Navbar view={view} setView={setView} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container">
        {/* Page Title */}
        <h2 className="text-center mt-4 mb-4">My Classmates</h2>

        {/* Conditional Rendering: Show Profiles as Cards or Table */}
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
