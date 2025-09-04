// Example rewrite of Header.js
import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 w-full bg-black bg-opacity-70 backdrop-blur-md shadow-md z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-3xl font-extrabold tracking-wide">My Portfolio</h1>
        <ul className="flex space-x-8 text-lg">
          {['about', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="hover:text-yellow-400 transition-colors duration-300 uppercase tracking-wide font-semibold"
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