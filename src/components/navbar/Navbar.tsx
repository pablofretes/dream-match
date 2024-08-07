'use client';
import { useState } from 'react';
import Links from './links/Links';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Dream Match</div>
      </div>
      <div className="hidden md:flex">
        <Links />
      </div>
      <div className="md:hidden flex items-center">
        <button
          type="button"
          onClick={toggleMenu}
          className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 right-0 w-1/2 bg-gray-800 rounded-lg shadow-lg p-4">
          <Links />
        </div>
      )}
    </nav>
  );
}
