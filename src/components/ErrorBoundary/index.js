import React, { Component } from "react";
import "./index.css";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null };

  // This lifecycle method is invoked when an error is thrown in a child component.
  static getDerivedStateFromError(error) {
    return { hasError: true, error }; // Set the error state to display the fallback UI
  }

  // This method is invoked when an error is caught by the component.
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Optional: You can log errors to an external service like Sentry for further analysis
    // logErrorToService(error, errorInfo);

    // Save the error details in the state to display to the user
    this.setState({ errorInfo });
  }

  // Handle retrying the error boundary by resetting the error state
  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>We apologize for the inconvenience.</p>

          {/* Display error details if available */}
          {error && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
              <summary>Click to view error details</summary>
              <p>{error.toString()}</p>
              {errorInfo && <p>{errorInfo.componentStack}</p>}
            </details>
          )}

          {/* Retry button to reset the error state */}
          <button className="retry-button" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }

    // If no error, render the children components normally
    return this.props.children;
  }
}

export default ErrorBoundary;
