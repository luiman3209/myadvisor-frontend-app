// components/Navbar.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

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
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div>
          <img src="/images/myadvisor-logo.png" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.links}>
          {user && user.role === 'investor' && (
            <Link href="/ask-an-advisor">
              <span className={styles.link}>Ask an Advisor</span>
            </Link>
          )}
          {user ? (
            <>
              <button onClick={logout} className={styles.button}>Logout</button>
              <Link href="/profile">
                <span className={styles.link}>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <button onClick={toggleMenu} className={styles.button}>Register for free</button>
              {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                  <Link href="/auth/register/investor">
                    <div onClick={closeMenu} className={styles.dropdownItem}>I'm an investor</div>
                  </Link>
                  <Link href="/auth/register/advisor">
                    <div onClick={closeMenu} className={styles.dropdownItem}>I'm an advisor</div>
                  </Link>
                </div>
              )}
              <Link href="/auth/login">
                <span className={styles.link}>Login</span>
              </Link>
            </>
          )}
          {!user && (
            <button className={styles.button}>Are you a financial advisor?</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
