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

  const addProfile = (newProfile) => {
    newProfile.id = profiles.length + 1;
    setProfiles([...profiles, newProfile]);
  };

  const editProfile = (updatedProfile) => {
    setProfiles(profiles.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile)));
  };

  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">Student Connect</h1>
      <div className="d-flex justify-content-center mb-3">
        <button className={`btn ${view === "cards" ? "btn-primary" : "btn-outline-primary"} mx-2`} onClick={() => setView("cards")}>
          View as Cards
        </button>
        <button className={`btn ${view === "table" ? "btn-primary" : "btn-outline-primary"} mx-2`} onClick={() => setView("table")}>
          View as Table
        </button>
      </div>

      {view === "cards" ? (
        <div className="row">
          {profiles.length > 0 && profiles.map((profile) => (
            <div className="col-md-4" key={profile.id}>
              <Card person={profile} onDelete={deleteProfile} onEdit={() => { setEditingProfile(profile); setShowModal(true); }} />
            </div>
          ))}
        </div>
      ) : (
        <TableView profiles={profiles} onEdit={setEditingProfile} onDelete={deleteProfile} setShowModal={setShowModal} />
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

