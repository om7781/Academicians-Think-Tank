"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
        {/* Header */}
        <header className="bg-blue-950 text-amber-50 p-4 sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold"> <div>Academicians</div> 
            <div className="text-sm font-bold text-center">Think Tank</div></h1>
            <nav className="hidden md:flex space-x-4">
              <a href="/" className="hover:text-amber-200">Home</a>
              <a href="/Menu" className="hover:text-amber-200">Menu</a>
              <a href="/About" className="hover:text-amber-200">About</a>
              <a href="/Contact" className="hover:text-amber-200">Contact</a>
            </nav>
            <button onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-amber-800 text-amber-50 p-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="hover:text-amber-200" onClick={toggleMenu}>Home</a>
              <a href="/Menu" className="hover:text-amber-200" onClick={toggleMenu}>Menu</a>
              <a href="/About" className="hover:text-amber-200" onClick={toggleMenu}>About</a>
              <a href="/Contact" className="hover:text-amber-200" onClick={toggleMenu}>Contact</a>
            </nav>
          </div>
        )}
    </>
  );
};

export default Navbar;
