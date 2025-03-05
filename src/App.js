import './App.css'; // Import global styles (if you have them)
import React, { useState, useEffect } from 'react'; // Import React hooks
import Navbar from "./Navbar"; // Import Navbar component
import Card from "./Card"; // Import Card component for profile display
import TableView from "./TableView"; // Import TableView component for list view
import ProfileForm from "./ProfileForm"; // Import ProfileForm component for adding/editing profiles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

function App() {
  // Initial profiles that will be displayed on first load
  const initialProfiles = [
    { id: 1, name: 'Mehak', favouriteColor: 'Black', favouriteFood: 'French Fries', likes: 0 },
    { id: 2, name: 'Nikhil', favouriteColor: 'Red', favouriteFood: 'Burger', likes: 0 },
    { id: 3, name: 'Srinivas', favouriteColor: 'Purple', favouriteFood: 'Pizza', likes: 0 }
  ];

  // Load profiles from localStorage if available, otherwise start with initialProfiles
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles"));
    return savedProfiles && savedProfiles.length > 0 ? savedProfiles : initialProfiles;
  });

  // Save profiles to localStorage whenever the profiles list is updated
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  // State for controlling the view (Card or Table)
  const [view, setView] = useState("cards");

  // Modal state for adding/editing profiles
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  // Dark mode state (Loaded from localStorage)
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Save dark mode setting to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Function to add a new profile
  const addProfile = (newProfile) => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1, likes: 0 }]);
  };

  // Function to edit an existing profile
  const editProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)));
  };

  // Function to delete a profile
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  // Function to handle "Like" button clicks
  const handleLike = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, likes: profile.likes + 1 } : profile
      )
    );
  };

  return (
    <div className={`container-fluid ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>

      {/* Navbar (Includes Dark Mode Toggle and View Switch) */}
      <Navbar view={view} setView={setView} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container">
        {/* Main heading */}
        <h2 className="text-center mt-4 mb-4">My Classmates</h2>

        {/* ✅ Render Cards or Table View based on the selected view */}
        {view === "cards" ? (
          <div className="row mt-3">
            {/* Loop through profiles and display them as Cards */}
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
          // Table View (Shows all profiles in a structured table)
          <TableView
            profiles={profiles}
            onEdit={setEditingProfile}
            onDelete={deleteProfile}
            setShowModal={setShowModal}
            darkMode={darkMode}
          />
        )}

        {/* Button to Add New Profile */}
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Add Profile
          </button>
        </div>

        {/* Profile Form Modal (For Adding & Editing Profiles) */}
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
