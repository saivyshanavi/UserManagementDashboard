import React from "react"; // Importing React to use JSX syntax
import "./index.css"; // Importing the CSS file for styling

// Sidebar component definition
const Sidebar = () => {
  return (
    // Sidebar container div
    <div className="sidebar">
      {/* Dashboard heading with an icon */}
      <h2><i className="fas fa-home"></i> Dashboard</h2>
      
      {/* List of main navigation items */}
      <ul>
        {/* User Management section */}
        <li>
          <i className="fas fa-users"></i> User Management
        </li>
        {/* Reports section */}
        <li>
          <i className="fas fa-chart-bar"></i> Reports
        </li>
        {/* Analytics section */}
        <li>
          <i className="fas fa-chart-line"></i> Analytics
        </li>
        {/* Calendar section */}
        <li>
          <i className="fas fa-calendar-alt"></i> Calendar
        </li>
      </ul>

      {/* Settings section */}
      <div className="settings">
        <ul>
          {/* Settings item */}
          <li>
            <i className="fas fa-cog"></i> Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

// Exporting Sidebar component for use in other parts of the app
export default Sidebar;
