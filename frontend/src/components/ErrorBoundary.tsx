// src/components/ErrorBoundary.tsx
import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    // Log to error monitoring (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || <DefaultFallback error={this.state.error} />
      );
    }
    return this.props.children;
  }
}

// Default fallback if none provided
const DefaultFallback = ({ error }: { error?: Error }) => (
  <div>
    <h2>An unexpected error occurred</h2>
    {error && <pre>{error.message}</pre>}
  </div>
);

export default ErrorBoundary;
