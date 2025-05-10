"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { usePathname } from 'next/navigation'; // Add this






const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [LoggedIn, setLoggedIn] = useState(false);
  const checkAuth = async () => {
    try { 
      const response = await axios.get('/api/users/check-auth', { withCredentials: true });
      if (response.data.authenticated) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      setLoggedIn(false);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    checkAuth(); 
  }, [pathname]);

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/Login');
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <>
     
      <header className="bg-blue-950 text-amber-50 p-4 sticky top-0 z-50 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <div>Academicians</div>
            <div className="text-sm font-bold text-center">Think Tank</div>
          </h1>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="hover:text-amber-200">
              Home
            </Link>
            <Link href="/About" className="hover:text-amber-200">
              About
            </Link>
            <Link href="/Blog" className="hover:text-amber-200">
              Blog
            </Link> 
            <Link href="/Contact" className="hover:text-amber-200">
              Contact
            </Link>
            {LoggedIn ? "" : <Link href="/Login" className="hover:text-amber-200">
              Login
            </Link>}
              {LoggedIn ? <Link onClick={() => { logout(); checkAuth(); }} href="/Logout" className="hover:text-amber-200">
              Logout
            </Link> : ""}
            
          </nav>
          <button onClick={toggleMenu} className="md:hidden z-50">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

    
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-400 text-amber-50 flex flex-col items-center justify-center space-y-6 text-xl md:hidden z-40">
          <nav className="flex flex-col space-y-4 text-center">
            <Link href="/" className="hover:text-amber-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/About" className="hover:text-amber-200" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/Blog" className="hover:text-amber-200" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/Contact" className="hover:text-amber-200" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
