
// Import statements:

// The CSS file for custom styling
import './App.css';
// Import React so we can use JSX and components
import React from 'react';
// Import the Card component which displays individual person information
import Card from "./Card";
// Import Bootstrap's CSS for styling and layout classes
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * App Component
 * This is the main component of the application.
 * It holds an array of people and renders a list of Card components,
 * each displaying the details of one person.
 */
function App() {

  // Creating an array named People containing objects.
  // Each object represents a classmate with their name, favourite color, and favourite food.
  const People = [
    { name: 'Mehak', favouriteColor: 'Black', favouriteFood: 'French Fries' },
    { name: 'Nikhil', favouriteColor: 'Red', favouriteFood: 'Burger' },
    { name: 'Srinivas', favouriteColor: 'Purple', favouriteFood: 'Pizza' }
  ];

  // The component returns JSX that renders the following:
  // - A container for proper layout (Bootstrap 'container' class)
  // - A heading for the page title
  // - A row that contains columns (using Bootstrap grid) for each Card component.
  return (
    <div className="container mt-3">
      {/* Heading for the page */}
      <h1>My Classmates</h1>
      {/* Bootstrap row to organize cards in a responsive grid */}
      <div className="row">
        {People.map((person, index) => (
          // For each person in the People array, create a column that holds a Card component.
          // 'col-md-4' makes each card occupy 1/3 of the row on medium+ screens.
          // 'key' is used to give each element a unique identifier.
          <div className="col-md-4" key={index}>
            {/* Pass the person object as a prop to the Card component */}
            <Card person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the App component so it can be imported and used in other parts of the app (e.g., in index.js)
export default App;

