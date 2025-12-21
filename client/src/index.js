import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary.js';

// Suppress Chrome extension messaging errors
if (typeof chrome !== 'undefined' && chrome.runtime) {
  try {
    // Handle incoming messages from extensions
    if (chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
          // Extensions expect a response - provide one synchronously
          if (typeof sendResponse === 'function') {
            sendResponse({ status: 'received', data: null });
          }
        } catch (err) {
          // Ignore sendResponse errors (happens when context is destroyed)
        }
        return false; // Indicate synchronous response
      });
    }
  } catch (err) {
    // Ignore errors from extension API setup
  }

  // Suppress runtime errors from extension messaging
  try {
    if (chrome.runtime.lastError) {
      void chrome.runtime.lastError; // Acknowledge the error
    }
  } catch (err) {
    // Ignore lastError access errors
  }
}

// Suppress console errors/warnings from Chrome extensions and Three.js
const originalError = console.error;
const originalWarn = console.warn;

console.error = function(...args) {
  const message = args[0]?.toString?.() || '';
  const fullMessage = args.map(arg => arg?.toString?.() || '').join(' ');
  
  // Suppress Chrome extension errors
  if (fullMessage.includes('chrome-extension://') ||
      message.includes('A listener indicated an asynchronous response') || 
      message.includes('Unchecked runtime.lastError') ||
      message.includes('message channel closed') ||
      (message.includes('is not a function') && fullMessage.includes('chrome-extension://')) ||
      (message.includes('Cannot read property') && fullMessage.includes('chrome-extension://')) ||
      (message.includes('Cannot read properties') && fullMessage.includes('chrome-extension://'))) {
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
  const filename = event.filename?.toString() || '';
  const source = event.source?.toString() || '';
  
  // Suppress Chrome extension errors
  if (filename.includes('chrome-extension://') || 
      source.includes('chrome-extension://') ||
      message.includes('chrome-extension://')) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  
  // Suppress common extension messaging errors
  if (message.includes('A listener indicated an asynchronous response') || 
      message.includes('Unchecked runtime.lastError') ||
      message.includes('message channel closed') ||
      message.includes('is not a function') && filename.includes('chrome-extension://') ||
      message.includes('Cannot read property') && filename.includes('chrome-extension://') ||
      message.includes('Cannot read properties') && filename.includes('chrome-extension://')) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}, true); // Use capture phase to catch errors early

// Suppress unhandled promise rejections from extension messaging
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString?.() || '';
  const stack = event.reason?.stack?.toString() || '';
  
  // Suppress Chrome extension promise rejections
  if (stack.includes('chrome-extension://') || 
      reason.includes('chrome-extension://')) {
    event.preventDefault();
    return;
  }
  
  // Suppress common extension messaging errors
  if (reason.includes('A listener indicated an asynchronous response') ||
      reason.includes('message channel closed') ||
      reason.includes('runtime.lastError') ||
      reason.includes('is not a function')) {
    event.preventDefault();
  }
});

// Global error handler to catch and suppress Chrome extension errors
const originalOnError = window.onerror;
window.onerror = function(message, source, lineno, colno, error) {
  // Suppress Chrome extension errors
  if (typeof source === 'string' && source.includes('chrome-extension://')) {
    return true; // Suppress the error
  }
  
  // Suppress specific extension error patterns
  if (typeof message === 'string') {
    if (message.includes('is not a function') && 
        typeof source === 'string' && source.includes('chrome-extension://')) {
      return true;
    }
    if (message.includes('Cannot read property') && 
        typeof source === 'string' && source.includes('chrome-extension://')) {
      return true;
    }
    if (message.includes('Cannot read properties') && 
        typeof source === 'string' && source.includes('chrome-extension://')) {
      return true;
    }
  }
  
  // Call original handler for non-extension errors
  if (originalOnError) {
    return originalOnError.call(this, message, source, lineno, colno, error);
  }
  return false;
};

// Protect window.onload from extension interference
const originalOnLoad = window.onload;
window.onload = function(event) {
  try {
    if (originalOnLoad && typeof originalOnLoad === 'function') {
      originalOnLoad.call(this, event);
    }
  } catch (err) {
    // Suppress errors from extension interference
    if (!err.message || !err.message.includes('chrome-extension://')) {
      console.error('Error in onload handler:', err);
    }
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);