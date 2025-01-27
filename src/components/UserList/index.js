import React, { Component } from "react"; 
import axios from "axios";
import UserForm from "../UserForm"; // Import UserForm component for user input
import SideBar from "../SideBar"; // Import SideBar component for navigation
import ErrorBoundary from "../ErrorBoundary"; // Import the ErrorBoundary component to catch errors
import "./index.css";

class UserList extends Component {
  state = {
    users: [], // Store the list of users
    isLoading: true, // Loading state
    error: null, // Error state for fetching data
    editingUser: null, // Store the user currently being edited
    showForm: false, // Boolean to control whether the form is shown
    actionError: null, // Error state for specific actions like delete
  };

  // Fetch users when the component is mounted
  componentDidMount() {
    this.fetchUsers();
  }

  // Function to fetch user data from the API
  fetchUsers = async () => {
    this.setState({ isLoading: true, error: null }); // Reset error and loading state
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      this.setState({ users: response.data, isLoading: false }); // Store the fetched users
    } catch (error) {
      // Set error state if the request fails
      this.setState({
        error:
          error.response?.status === 404
            ? "Failed to fetch users: API not found"
            : "Network error: Unable to fetch data",
        isLoading: false,
      });
    }
  };

  // Function to handle adding a new user
  handleAddUser = (newUser) => {
    this.setState((prevState) => {
      const nextId =
        prevState.users.length > 0
          ? Math.max(...prevState.users.map((user) => user.id)) + 1
          : 1;

      const userWithId = { ...newUser, id: nextId };

      return {
        users: [...prevState.users, userWithId], // Add new user to the list
        showForm: false, // Close the form after submission
      };
    });
  };

  // Function to handle editing an existing user
  handleEditUser = (updatedUser) => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ), // Update the user in the list
      editingUser: null, // Reset the editing user state
      showForm: false, // Close the form after submission
    }));
  };

  // Function to handle deleting a user
  handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id), // Remove user from the list
        actionError: null, // Clear any previous error
      }));
    } catch (error) {
      this.setState({
        actionError: "Failed to delete user. Please try again.", // Error state if delete fails
      });
    }
  };

  render() {
    const { users, isLoading, error, editingUser, showForm, actionError } =
      this.state;

    // Loading state
    if (isLoading) return <p>Loading...</p>;

    // Error state
    if (error)
      return (
        <div>
          <p>{error}</p>
          <button onClick={this.fetchUsers}>Retry</button> {/* Retry Button */}
        </div>
      );

    return (
      <ErrorBoundary> {/* ErrorBoundary to catch any errors in child components */}
        <div className="dashboard-container">
          <SideBar /> {/* Sidebar for navigation */}
          <div className="content">
            <button
              className="add-user-btn"
              onClick={() =>
                this.setState({ showForm: true, editingUser: null })
              }
            >
              Add User {/* Button to show the user form */}
            </button>

            {showForm && (
              <ErrorBoundary>
                <UserForm
                  onSubmit={
                    editingUser ? this.handleEditUser : this.handleAddUser
                  } // Determine whether to add or edit user
                  user={editingUser} // Pass the user to be edited
                  onCancel={() => this.setState({ showForm: false })} // Handle cancel button
                />
              </ErrorBoundary>
            )}

            {actionError && ( // Show specific error for delete action
              <p style={{ color: "red" }}>{actionError}</p>
            )}

            <ErrorBoundary>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name.split(" ")[0]}</td>
                      <td>{user.name.split(" ")[1] || ""}</td>
                      <td>{user.email}</td>
                      <td>{user.company.name}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() =>
                            this.setState({
                              showForm: true,
                              editingUser: user,
                            })
                          }
                        >
                          Edit {/* Button to edit the user */}
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => this.handleDeleteUser(user.id)}
                        >
                          Delete {/* Button to delete the user */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ErrorBoundary>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default UserList;
