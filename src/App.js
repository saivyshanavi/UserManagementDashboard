import React, { Component } from "react"; 
import UserList from "./components/UserList"; // Import the UserList component for displaying users
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary to catch errors in child components
import "./App.css"; // Import the main styling for the app

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Wrapping the dashboard title inside an ErrorBoundary to handle potential errors */}
        <ErrorBoundary>
          <h1 className="dashboard-title">User Management</h1> {/* Title of the dashboard */}
        </ErrorBoundary>
        
        {/* Wrapping the UserList component inside an ErrorBoundary to handle errors related to user fetching */}
        <ErrorBoundary>
          <UserList /> {/* Component for listing and managing users */}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App; // Export the App component to be used in the main entry point
