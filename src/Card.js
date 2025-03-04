import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Card({ person, onLike, onEdit, onDelete, darkMode }) {
  return (
    <div className={`card mb-3 p-3 shadow-sm ${darkMode ? "bg-secondary text-light" : "bg-light text-dark"}`}>
      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>
        <p className="card-text"><strong>Favourite Color:</strong> {person.favouriteColor}</p>
        <p className="card-text"><strong>Favourite Food:</strong> {person.favouriteFood}</p>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-outline-primary" onClick={() => onLike(person.id)}>
            Like ({person.likes})
          </button>
          <button className="btn btn-warning mx-2" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(person.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
