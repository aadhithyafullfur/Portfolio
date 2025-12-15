import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Ignore Chrome extension messaging errors
    if (error && error.message && error.message.includes('A listener indicated an asynchronous response')) {
      console.warn('Suppressed extension messaging error:', error.message);
      return;
    }
    
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-black text-white flex items-center justify-center">
          <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-300 mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 p-4 bg-gray-900 rounded-lg text-left">
                <summary className="cursor-pointer text-gray-400 hover:text-gray-200">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 text-red-400 text-sm overflow-auto max-h-64">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
