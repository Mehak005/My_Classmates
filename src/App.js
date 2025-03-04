import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";
import TableView from "./TableView";
import ProfileForm from "./ProfileForm";

function App() {
  const [profiles, setProfiles] = useState(
    JSON.parse(localStorage.getItem("profiles")) || []
  );

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const [view, setView] = useState("cards");
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const addProfile = (newProfile) => {
    newProfile.id = profiles.length + 1;
    newProfile.likes = 0; // Initialize likes count
    setProfiles([...profiles, newProfile]);
  };

  const editProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleLike = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, likes: profile.likes + 1 } : profile
      )
    );
  };

  return (
    <div className={`container mt-3 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h1 className="text-center">Student Connect</h1>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <button className={`btn ${view === "cards" ? "btn-primary" : "btn-outline-primary"} mx-2`} onClick={() => setView("cards")}>
            View as Cards
          </button>
          <button className={`btn ${view === "table" ? "btn-primary" : "btn-outline-primary"} mx-2`} onClick={() => setView("table")}>
            View as Table
          </button>
        </div>
        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {view === "cards" ? (
        <div className="row">
          {profiles.length > 0 && profiles.map((profile) => (
            <div className="col-md-4" key={profile.id}>
              <Card person={profile} onDelete={deleteProfile} onEdit={() => { setEditingProfile(profile); setShowModal(true); }} onLike={handleLike} darkMode={darkMode} />
            </div>
          ))}
        </div>
      ) : (
        <TableView profiles={profiles} onEdit={setEditingProfile} onDelete={deleteProfile} setShowModal={setShowModal} darkMode={darkMode} />
      )}

      <div className="text-center mt-3">
        <button className="btn btn-success" onClick={() => { setEditingProfile(null); setShowModal(true); }}>
          Add Profile
        </button>
      </div>

      {showModal && (
        <ProfileForm
          show={showModal}
          handleClose={() => setShowModal(false)}
          addProfile={addProfile}
          editProfile={editProfile}
          editingProfile={editingProfile}
        />
      )}
    </div>
  );
}

export default App;



