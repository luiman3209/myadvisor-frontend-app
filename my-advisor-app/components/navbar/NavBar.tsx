// components/Navbar.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {

  User,
  UserCog,

} from "lucide-react"


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-cyan-500">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/myadvisor-logo.png"
            alt="Picture of the author"
            width={50}
            height={50}
            className="flex-shrink-0"
          />
          <span className="text-white text-2xl font-medium">MyAdvisor</span>
        </div>

        {/* Desktop Menu */}

        <div className="hidden lg:flex space-x-1 items-center">
          <Link href="/data-processing-policy" className="nav-link">
            Data processing policy
          </Link>
          {!user || user.role === 'investor' && (
            <Link href="/ask-an-advisor" className="nav-link">
              Ask an Advisor
            </Link>
          )}
          {user ? (
            <>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="nav-link">Register for free</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="nav-menu"><User className="mr-2 h-4 w-4" /><span>I'm an investor</span></DropdownMenuItem>
                  <DropdownMenuItem className="nav-menu"><UserCog className="mr-2 h-4 w-4" /><span>I'm an advisor</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/auth/login" className="nav-link">
                Login
              </Link>
            </>
          )}
          {/*!user && (
            <button className="nav-link">Are you a financial advisor?</button>
          )*/}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="flex flex-col items-center space-y-4 p-4 bg-cyan-500">
            <Link href="/data-processing-policy" className="nav-link">
              Data processing policy
            </Link>
            {user && user.role === 'investor' && (
              <Link href="/ask-an-advisor" className="nav-link" onClick={closeMenu}>
                Ask an Advisor
              </Link>
            )}
            {user ? (
              <>
                <Link href="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link href="/profile" className="nav-link" onClick={closeMenu}>
                  Profile
                </Link>
                <button onClick={logout} className="nav-link">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/register/investor" className="nav-link" onClick={closeMenu}>
                  I'm an investor
                </Link>
                <Link href="/auth/register/advisor" className="nav-link" onClick={closeMenu}>
                  I'm an advisor
                </Link>
                <Link href="/auth/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
              </>
            )}
            {/*!user && (
              <button className="nav-link">Are you a financial advisor?</button>
            )*/}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
