import React, { Component } from "react"; // Import React and Component class from 'react' package
import "./index.css"; // Importing the CSS file for styling

// UserForm component definition (class-based)
class UserForm extends Component {
  // Initial state to hold form data and validation errors
  state = {
    id: this.props.user?.id || "", // Pre-filling user ID if available from props, else empty
    firstName: this.props.user?.name.split(" ")[0] || "", // Pre-filling first name from props if available
    lastName: this.props.user?.name.split(" ")[1] || "", // Pre-filling last name from props if available
    email: this.props.user?.email || "", // Pre-filling email from props if available
    department: this.props.user?.company?.name || "", // Pre-filling department from props if available
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    }, // Object to hold validation error messages
  };

  // Handle change in form input fields
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); // Updates the specific field based on input name
  };

  // Validate the form fields before submission
  validateForm = () => {
    const { firstName, lastName, email, department } = this.state;
    let isValid = true; // Flag to track form validity
    let errors = {}; // Object to store error messages for each field

    // Validate firstName: should start with a letter and contain only letters
    if (!firstName) {
      errors.firstName = "First Name is required."; // Error if the first name is missing
      isValid = false; // Form is invalid
    } else if (!/^[A-Za-z]/.test(firstName)) {
      errors.firstName = "First Name must start with a letter."; // Error if first name does not start with a letter
      isValid = false; // Form is invalid
    }

    // Validate lastName: required but no additional specific checks for this field
    if (!lastName) {
      errors.lastName = "Last Name is required."; // Error if the last name is missing
      isValid = false; // Form is invalid
    }

    // Validate email: required and must be in correct email format
    if (!email) {
      errors.email = "Email is required."; // Error if email is missing
      isValid = false; // Form is invalid
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email."; // Error if email is not in valid format
      isValid = false; // Form is invalid
    }

    // Validate department: should start with a letter and contain only letters
    if (!department) {
      errors.department = "Department is required."; // Error if department is missing
      isValid = false; // Form is invalid
    } else if (!/^[A-Za-z]/.test(department)) {
      errors.department = "Department must start with a letter."; // Error if department does not start with a letter
      isValid = false; // Form is invalid
    }

    this.setState({ errors }); // Update the state with error messages

    return isValid; // Return the form validity
  };

  // Handle form submission
  handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate the form before submission
    if (!this.validateForm()) {
      return; // Stop form submission if validation fails
    }

    // Create a new user object from the form data
    const newUser = {
      id: this.state.id || Date.now(), // If no ID is provided, generate a unique ID based on the current timestamp
      name: `${this.state.firstName} ${this.state.lastName}`, // Combine first and last name
      email: this.state.email, // Get email from form data
      company: { name: this.state.department }, // Get department from form data
    };

    this.props.onSubmit(newUser); // Pass the new user data to the parent component via onSubmit callback
  };

  render() {
    // Extract form values and error messages from state
    const { firstName, lastName, email, department, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* First Name input */}
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChange} // Call handleChange on input change
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>} {/* Display error message if any */}
        </div>

        {/* Last Name input */}
        <div>
          <input
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChange} // Call handleChange on input change
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>} {/* Display error message if any */}
        </div>

        {/* Email input */}
        <div>
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange} // Call handleChange on input change
          />
          {errors.email && <p className="error">{errors.email}</p>} {/* Display error message if any */}
        </div>

        {/* Department input */}
        <div>
          <input
            name="department"
            placeholder="Department"
            value={department}
            onChange={this.handleChange} // Call handleChange on input change
          />
          {errors.department && <p className="error">{errors.department}</p>} {/* Display error message if any */}
        </div>

        {/* Submit and Cancel buttons */}
        <div>
          <button type="submit">Submit</button> {/* Submit form */}
          <button type="button" onClick={this.props.onCancel}> {/* Call onCancel function passed as prop */}
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm; // Export the UserForm component for use in other parts of the app
