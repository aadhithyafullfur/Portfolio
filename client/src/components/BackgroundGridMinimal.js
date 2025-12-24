import React from 'react';
import { GridScan } from './gridscan';

/**
 * BackgroundGridMinimal Component
 * 
 * Ultra-lightweight version of BackgroundGrid for maximum performance.
 * Use this if you experience any issues with the standard version.
 */
const BackgroundGridMinimal = () => {
  return (
    <>
      {/* Simplified Grid Scan Background */}
      <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
        <GridScan
          // Essential Performance Settings
          enableWebcam={false}
          showPreview={false}
          enableGyro={false}
          scanOnClick={false}
          enablePost={false}  // Disable all post-processing for better performance
          
          // Minimal Grid Settings
          lineThickness={0.6}
          linesColor="rgb(120, 50, 180)"
          gridScale={0.2}  // Larger grid = better performance
          lineStyle="solid"
          lineJitter={0}  // No jitter = less computation
          
          // Slow, Ambient Scan
          scanColor="rgb(170, 120, 220)"
          scanOpacity={0.2}
          scanDirection="pingpong"
          scanDuration={5.0}  // Slower = smoother
          scanDelay={4.0}
          scanGlow={0.4}
          scanSoftness={2.0}
          scanPhaseTaper={0.8}
          
          // Disabled Effects
          noiseIntensity={0}
          bloomIntensity={0}
          bloomThreshold={0}
          bloomSmoothing={0}
          chromaticAberration={0}
          
          // Low Sensitivity
          sensitivity={0.3}
          
          // Container Styling
          className="w-full h-full opacity-35"
        />
      </div>

      {/* Simple Gradient Overlay */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center, 
              rgba(120, 50, 180, 0.05) 0%, 
              transparent 70%
            )
          `
        }}
      />

      {/* Mobile Fallback - Even simpler */}
      <div className="fixed inset-0 w-screen h-screen -z-20 bg-black lg:hidden pointer-events-none" />
    </>
  );
};

export default BackgroundGridMinimal;
