import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProfileForm({ show, handleClose, addProfile, editProfile, editingProfile }) {
  const [profile, setProfile] = useState({ name: "", favouriteColor: "", favouriteFood: "" });

  useEffect(() => {
    if (editingProfile) {
      setProfile(editingProfile);
    } else {
      setProfile({ name: "", favouriteColor: "", favouriteFood: "" });
    }
  }, [editingProfile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input Validation
    if (!profile.name.trim() || !profile.favouriteColor.trim() || !profile.favouriteFood.trim()) {
      alert("All fields are required!");
      return;
    }

    if (editingProfile) {
      editProfile(profile);
    } else {
      addProfile(profile);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingProfile ? "Edit Profile" : "Add Profile"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="favouriteColor" className="mt-2">
            <Form.Label>Favourite Color</Form.Label>
            <Form.Control
              type="text"
              name="favouriteColor"
              value={profile.favouriteColor}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="favouriteFood" className="mt-2">
            <Form.Label>Favourite Food</Form.Label>
            <Form.Control
              type="text"
              name="favouriteFood"
              value={profile.favouriteFood}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center mt-3">
            <Button variant="primary" type="submit">
              {editingProfile ? "Update Profile" : "Add Profile"}
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileForm;


