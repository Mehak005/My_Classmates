/**
 * ProfileForm Component
 *
 * This component provides a modal form for adding and editing student profiles.
 * Users can input:
 * - Name
 * - Favorite Color
 * - Favorite Food
 *
 * Features:
 * - Validates input fields to prevent empty submissions and incorrect formats.
 * - Displays Bootstrap validation feedback for incorrect inputs.
 * - Supports dark mode styling dynamically.
 * - Handles both adding and editing profiles.
 */

import React, { useState, useEffect } from "react"; // Import React hooks
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling

/**
 * ProfileForm Component
 *
 * Props:
 * @param {Boolean} show - Determines if the modal is displayed.
 * @param {Function} handleClose - Function to close the modal.
 * @param {Function} addProfile - Function to add a new profile.
 * @param {Function} editProfile - Function to edit an existing profile.
 * @param {Object|null} editingProfile - The profile being edited (if any).
 * @param {Boolean} darkMode - Determines if dark mode is enabled.
 */
function ProfileForm({ show, handleClose, addProfile, editProfile, editingProfile, darkMode }) {

  /**
   * State to manage user input fields.
   * If editingProfile exists, it initializes with the existing data;
   * otherwise, it starts with empty values.
   */
  const [profile, setProfile] = useState({ name: "", favouriteColor: "", favouriteFood: "" });

  /**
   * State to manage form validation errors.
   * Each key corresponds to an input field and holds validation messages.
   */
  const [errors, setErrors] = useState({});

  /**
   * Effect Hook: Populate form fields when editing a profile.
   * If editing an existing profile, load its data into the form.
   * If adding a new profile, reset form fields.
   */
  useEffect(() => {
    if (editingProfile) {
      setProfile(editingProfile);
    } else {
      setProfile({ name: "", favouriteColor: "", favouriteFood: "" });
    }
  }, [editingProfile]);

  /**
   * Handles changes in input fields.
   * Updates the state when users type in the input fields.
   *
   * @param {Object} e - The event object from the input field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validates form fields before submission.
   * Ensures fields are not empty and contain valid text.
   * - Name must only contain letters and spaces.
   * - Favorite Color and Favorite Food must not contain numbers or special characters.
   *
   * @returns {Boolean} - Returns true if the form is valid, otherwise false.
   */
  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    const textRegex = /^[A-Za-z\s]+$/; // Ensures favorite color and food do not contain numbers/special characters

    // **Validate Name**
    if (!profile.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (!nameRegex.test(profile.name)) {
      newErrors.name = "Name can only contain letters and spaces!";
    }

    // **Validate Favorite Color**
    if (!profile.favouriteColor.trim()) {
      newErrors.favouriteColor = "Favorite color is required!";
    } else if (!textRegex.test(profile.favouriteColor)) {
      newErrors.favouriteColor = "Color can only contain letters!";
    }

    // **Validate Favorite Food**
    if (!profile.favouriteFood.trim()) {
      newErrors.favouriteFood = "Favorite food is required!";
    } else if (!textRegex.test(profile.favouriteFood)) {
      newErrors.favouriteFood = "Food can only contain letters!";
    }

    // **Set Errors and Return Validation Status**
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission.
   * Prevents submission if validation fails.
   * Calls addProfile() if adding a new profile, or editProfile() if editing.
   *
   * @param {Object} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    if (editingProfile) {
      editProfile(profile);
    } else {
      addProfile({ ...profile, likes: 0 }); // New profiles start with 0 likes
    }

    handleClose(); // Close the modal after successful submission
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className={`modal-content ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
          <div className="modal-header">
            {/* Title dynamically changes based on whether adding or editing */}
            <h5 className="modal-title">{editingProfile ? "Edit Profile" : "Add Profile"}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>

              {/* Name Input Field */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* Favorite Color Input Field */}
              <div className="mb-3">
                <label className="form-label">Favorite Color</label>
                <input
                  type="text"
                  className={`form-control ${errors.favouriteColor ? "is-invalid" : ""}`}
                  name="favouriteColor"
                  value={profile.favouriteColor}
                  onChange={handleChange}
                  required
                />
                {errors.favouriteColor && <div className="invalid-feedback">{errors.favouriteColor}</div>}
              </div>

              {/* Favorite Food Input Field */}
              <div className="mb-3">
                <label className="form-label">Favorite Food</label>
                <input
                  type="text"
                  className={`form-control ${errors.favouriteFood ? "is-invalid" : ""}`}
                  name="favouriteFood"
                  value={profile.favouriteFood}
                  onChange={handleChange}
                  required
                />
                {errors.favouriteFood && <div className="invalid-feedback">{errors.favouriteFood}</div>}
              </div>

              {/* Modal Footer with Buttons */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProfile ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
