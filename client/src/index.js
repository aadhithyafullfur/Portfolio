import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary.js';

// Suppress Chrome extension messaging errors
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Extensions expect a response - provide a dummy one to prevent error
    sendResponse({ status: 'received' });
    return false; // Indicate synchronous response
  });
}

// Listen for any unhandled runtime errors from extensions and suppress them
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('A listener indicated an asynchronous response')) {
    event.preventDefault();
    return false;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);