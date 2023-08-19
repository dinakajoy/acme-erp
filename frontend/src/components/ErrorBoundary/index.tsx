import React from 'react';

import FatalErrorPage from './FatalErrorPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  component: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps;

  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error
    });
  }

  render() {
    const { error } = this.state;
    const { children, component } = this.props;

    if (error) {
      return component;
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  component: <FatalErrorPage />
};

export default ErrorBoundary;
