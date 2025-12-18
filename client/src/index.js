import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary.js';

// Suppress Chrome extension messaging errors
if (typeof chrome !== 'undefined' && chrome.runtime) {
  // Handle incoming messages from extensions
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
      // Extensions expect a response - provide one synchronously
      sendResponse({ status: 'received', data: null });
    } catch (err) {
      // Ignore sendResponse errors (happens when context is destroyed)
    }
    return false; // Indicate synchronous response
  });

  // Suppress runtime errors from extension messaging
  if (chrome.runtime.lastError) {
    void chrome.runtime.lastError; // Acknowledge the error
  }
}

// Suppress console errors/warnings from Chrome extensions and Three.js
const originalError = console.error;
const originalWarn = console.warn;

console.error = function(...args) {
  const message = args[0]?.toString?.() || '';
  if (message.includes('A listener indicated an asynchronous response') || 
      message.includes('Unchecked runtime.lastError') ||
      message.includes('message channel closed')) {
    return; // Suppress extension messaging errors
  }
  originalError.apply(console, args);
};

console.warn = function(...args) {
  const message = args[0]?.toString?.() || '';
  if (message.includes('Property .outputEncoding has been removed')) {
    return; // Suppress Three.js deprecation warning
  }
  originalWarn.apply(console, args);
};

// Listen for unhandled runtime errors and suppress extension-related ones
window.addEventListener('error', (event) => {
  const message = event.message?.toString?.() || '';
  if (message.includes('A listener indicated an asynchronous response') || 
      message.includes('Unchecked runtime.lastError') ||
      message.includes('message channel closed')) {
    event.preventDefault();
    return false;
  }
});

// Suppress unhandled promise rejections from extension messaging
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString?.() || '';
  if (reason.includes('A listener indicated an asynchronous response') ||
      reason.includes('message channel closed') ||
      reason.includes('runtime.lastError')) {
    event.preventDefault();
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