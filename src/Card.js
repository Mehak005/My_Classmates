// Import statements:

// React and the useState hook from the React library.
// React is used for building UI components, and useState helps manage component state.
import React, { useState } from "react";

// Bootstrap's CSS file to use Bootstrap classes for styling.
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Card Component
 *
 * This component displays a card with details about a person.
 * It shows the person's name, favourite color, and favourite food.
 * It also includes a Like button that increments a counter each time it is clicked.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.person - The person object containing:
 *   - name: {string} The person's name.
 *   - favouriteColor: {string} The person's favourite color.
 *   - favouriteFood: {string} The person's favourite food.
 * @returns {JSX.Element} A styled card displaying the person's details and a Like button.
 */
function Card({ person = {}
}) {
  // useState hook: 'likes' holds the current like count.
  // 'setlikes' is a function that updates the like count.
  const [likes, setlikes] = useState(0);

  // Event handler for the Like button.
  // When invoked, it increments the 'likes' count by 1.
  const handleLike = () => {
    setlikes(likes + 1);
  };

  // Return the JSX for the card.
  // The div is styled with Bootstrap classes and an inline background style.
  return (
    <div className="card mb-3 p-3" style={{ background: '#f0f0f0' }}>
      {/* Display the person's name */}
      <p><strong>Name:</strong> {person.name}</p>
      {/* Display the person's favourite color */}
      <p><strong>Favourite Color:</strong> {person.favouriteColor}</p>
      {/* Display the person's favourite food */}
      <p><strong>Favourite Food:</strong> {person.favouriteFood}</p>

      {/* Button that triggers the handleLike function on click and displays the current like count */}
      <button
        className="btn btn-danger"
        onClick={handleLike}
      >
        Like ({likes})
      </button>
    </div>
  );
}

// Export the Card component so it can be imported and used in other files.
export default Card;

