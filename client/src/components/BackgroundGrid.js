import React, { useState, useEffect } from 'react';
import { GridScan } from './gridscan';

/**
 * BackgroundGrid Component
 * 
 * A premium, professional full-screen grid scan background for portfolio websites.
 * Optimized for performance with smooth animations and subtle visual effects.
 * 
 * Design Philosophy:
 * - Clean, ambient animation that doesn't distract from content
 * - Strict purple color palette (rgb(120, 50, 180) primary)
 * - Low opacity to ensure content readability
 * - GPU-optimized for smooth performance on mid-range devices
 * 
 * Usage:
 * <BackgroundGrid />
 * 
 * Features:
 * - Fixed full-viewport positioning
 * - Behind all content (z-index: -10)
 * - No pointer events interference
 * - Mobile-friendly with graceful degradation
 * - Radial glow overlay for premium feel
 */
const BackgroundGrid = () => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
    
    // Log to console when component mounts
    console.log('BackgroundGrid component mounted');
    
    // Check if required dependencies are available
    if (typeof window === 'undefined') {
      setError('Window object not available');
      return;
    }
    
    try {
      // Test if WebGL is supported
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported - GridScan may not work');
      }
    } catch (err) {
      console.warn('Error checking WebGL support:', err);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  if (error) {
    console.error('BackgroundGrid error:', error);
    return (
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none" />
    );
  }

  try {
    return (
      <>
        {/* Main Grid Scan Background */}
        <div 
          className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(120, 50, 180, 0.03) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
        >
          <GridScan
            // Performance Optimizations
            enableWebcam={false}        // Disable webcam tracking for background use
            showPreview={false}          // No preview needed
            enableGyro={false}           // Disable gyro for static background
            scanOnClick={false}          // Disable click interactions
            
            // Grid Appearance
            lineThickness={0.8}          // Thinner lines for subtlety (was 1)
            linesColor="rgb(120, 50, 180)"  // Primary Purple - dominant color
            gridScale={0.15}             // Larger grid cells = less density, better performance (was 0.1)
            lineStyle="solid"            // Clean solid lines (no dashed/dotted)
            lineJitter={0.05}            // Minimal jitter for subtle movement (was 0.1)
            
            // Scan Animation
            scanColor="rgb(170, 120, 220)"  // Glow Highlights - lighter purple for scan
            scanOpacity={0.25}           // Low opacity for ambient feel (was 0.4)
            scanDirection="pingpong"     // Smooth back-and-forth motion
            scanDuration={4.0}           // Slower scan = smoother, less distracting (was 2.0)
            scanDelay={3.0}              // Longer delay between scans (was 2.0)
            scanGlow={0.6}               // Moderate glow (was 0.5)
            scanSoftness={2.5}           // Softer edges (was 2.0)
            scanPhaseTaper={0.85}        // Smooth fade in/out (was 0.9)
            
            // Post-Processing Effects
            enablePost={true}            // Enable bloom & chromatic aberration
            bloomIntensity={0.15}        // Subtle bloom for premium feel (was 0)
            bloomThreshold={0.7}         // Only bright areas bloom (was 0)
            bloomSmoothing={0.5}         // Smooth bloom transition (was 0)
            chromaticAberration={0.0008} // Minimal aberration for depth (was 0.002)
            
            // Additional Effects
            noiseIntensity={0.005}       // Very subtle noise texture (was 0.01)
            sensitivity={0.4}            // Lower sensitivity since no interaction (was 0.55)
            snapBackDelay={250}          // Not used (no interaction)
            
            // Container Styling
            className="w-full h-full opacity-40" // Low overall opacity for background use
          />
        </div>

        {/* Radial Glow Overlay - Adds depth and premium feel */}
        <div 
          className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse 80% 50% at 50% 50%, 
                rgba(170, 120, 220, 0.08) 0%, 
                rgba(75, 30, 120, 0.04) 40%, 
                rgba(0, 0, 0, 0) 70%
              )
            `
          }}
        />

        {/* Subtle Vignette - Draws focus to center content */}
        <div 
          className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at center, 
                transparent 0%, 
                rgba(0, 0, 0, 0.4) 100%
              )
            `
          }}
        />

        {/* Mobile Fallback - Simple gradient for performance on mobile devices */}
        <div className="fixed inset-0 w-screen h-screen -z-20 bg-black md:hidden pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(
                  ellipse at center top, 
                  rgba(120, 50, 180, 0.15) 0%, 
                  rgba(75, 30, 120, 0.08) 40%, 
                  rgba(0, 0, 0, 1) 100%
                )
              `
            }}
          />
        </div>
      </>
    );
  } catch (err) {
    console.error('Error rendering BackgroundGrid:', err);
    // Fallback to simple gradient if GridScan fails
    return (
      <div className="fixed inset-0 w-screen h-screen -z-10 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none" />
    );
  }
};

export default BackgroundGrid;
