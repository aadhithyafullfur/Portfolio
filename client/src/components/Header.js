// Example rewrite of Header.js
import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">&lt;/&gt;</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white hidden sm:block">Portfolio</h1>
        </div>
        <ul className="flex space-x-1 sm:space-x-2">
          {['Home', 'Projects', 'Skills', 'Contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;