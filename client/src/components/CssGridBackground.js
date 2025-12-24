import React from 'react';

const CssGridBackground = () => {
  return (
    <>
      {/* CSS Grid Background */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none opacity-30"
        style={{
          background: `
            linear-gradient(rgba(120, 50, 180, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120, 50, 180, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'moveGrid 20s linear infinite'
        }}
      >
        <style>{`
          @keyframes moveGrid {
            0% { background-position: 0 0; }
            100% { background-position: 40px 40px; }
          }
          
          @media (max-width: 768px) {
            div.fixed.inset-0.w-screen.h-screen.-z-10.pointer-events-none.opacity-30 {
              opacity: 0.2;
              background-size: 60px 60px;
            }
          }
        `}</style>
      </div>

      {/* Radial Glow Overlay */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center, 
              rgba(170, 120, 220, 0.1) 0%, 
              rgba(75, 30, 120, 0.05) 50%,
              transparent 100%
            )
          `
        }}
      />

      {/* Simple Scan Line Animation */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(170, 120, 220, 0.1) 50%, transparent 100%)',
          animation: 'scanLine 4s linear infinite',
          opacity: 0.3
        }}
      >
        <style>{`
          @keyframes scanLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
        `}</style>
      </div>
    </>
  );
};

export default CssGridBackground;