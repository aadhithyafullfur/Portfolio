import React from 'react';
import BackgroundGrid from './BackgroundGrid';

/**
 * TestGridScan Component
 * 
 * Simple test component to verify GridScan background is working
 */
const TestGridScan = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Grid */}
      <BackgroundGrid />
      
      {/* Test Content - Should appear above background */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center space-y-6 p-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-purple-500/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            GridScan Background Test
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            If you can see the animated grid background behind this text, 
            the GridScan component is working correctly!
          </p>
          <div className="pt-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-purple-300 font-medium">GridScan Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGridScan;
