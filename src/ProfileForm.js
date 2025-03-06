/**
 * ProfileForm Component
 *
 * This component provides a modal form for adding and editing student profiles.
 * Users can input:
 * - Name
 * - Favorite Color
 * - Favorite Food
 *
 * When submitting:
 * - If editing, updates the existing profile.
 * - If adding a new profile, it is created and added to the list.
 */

import React, { useState, useEffect } from "react"; // Import React hooks
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

/**
 * ProfileForm Component
 *
 * Props:
 * @param {Boolean} show - Determines if the modal is displayed
 * @param {Function} handleClose - Function to close the modal
 * @param {Function} addProfile - Function to add a new profile
 * @param {Function} editProfile - Function to edit an existing profile
 * @param {Object|null} editingPeople - The profile being edited (if any)
 */
function ProfileForm({ show, handleClose, addProfile, editProfile, editingPeople }) {
  /**
   * State for managing people input fields.
   * Initially set to empty values.
   */
  const [people, setPeople] = useState({ name: "", favoriteColor: "", favoriteFood: "" });

  /**
   * When editing an existing profile, populate form fields with existing data.
   */
  useEffect(() => {
    if (editingPeople) {
      setPeople(editingPeople);
    } else {
      setPeople({ name: "", favoriteColor: "", favoriteFood: "" });
    }
  }, [editingPeople]);

  /**
   * Handles changes in input fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeople((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission.
   * - If editing, updates the profile.
   * - If adding a new profile, creates it with 0 likes.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!people.name.trim() || !people.favoriteColor.trim() || !people.favoriteFood.trim()) {
      alert("All fields are required!");
      return;
    }

    if (editingPeople) {
      editProfile(people); // Update existing profile
    } else {
      addProfile({ ...people, likes: 0 }); // Add new profile
    }

    handleClose(); // Close modal after submission
  };

  return (
    <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* Title dynamically changes based on whether adding or editing */}
            <h5 className="modal-title">{editingPeople ? "Edit Profile" : "Add Profile"}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Name Input Field */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={people.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Favorite Color Input Field */}
              <div className="mb-3">
                <label className="form-label">Favorite Color</label>
                <input
                  type="text"
                  className="form-control"
                  name="favoriteColor"
                  value={people.favoriteColor}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Favorite Food Input Field */}
              <div className="mb-3">
                <label className="form-label">Favorite Food</label>
                <input
                  type="text"
                  className="form-control"
                  name="favoriteFood"
                  value={people.favoriteFood}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                {editingPeople ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
