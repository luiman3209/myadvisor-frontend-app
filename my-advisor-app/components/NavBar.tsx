// components/Navbar.tsx
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

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
    <nav style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <img src="/images/myadvisor-logo.png" alt="Logo" style={{ height: '50px' }} />
        </div>
        <div style={{ position: 'relative' }}>
        {user && user.role === 'investor' && (
            <Link href="/ask-an-advisor" style={{ marginLeft: '15px' }}>Ask an Advisor</Link>
          )}
          {user ? (
            <button onClick={logout} style={{ marginLeft: '15px' }}>Logout</button>
          ) : (
            <>
              <button onClick={toggleMenu} style={{ marginLeft: '15px' }}>Register for free</button>
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  zIndex: 1000
                }}>
                  <Link href="/auth/register-investor">
                    <div onClick={closeMenu} style={{ display: 'block', padding: '10px', cursor: 'pointer', textDecoration: 'none', color: '#333' }}>I'm an investor</div>
                  </Link>
                  <Link href="/auth/register-advisor">
                    <div onClick={closeMenu} style={{ display: 'block', padding: '10px', cursor: 'pointer', textDecoration: 'none', color: '#333' }}>I'm an advisor</div>
                  </Link>
                </div>
              )}
              <Link href="/auth/login" style={{ marginLeft: '15px' }}>Login</Link>
            </>
          )}
          {!user && (
            <button style={{ marginLeft: '15px' }}>Are you a financial advisor?</button>
          )}
          {user && (
            <Link href="/profile" style={{ marginLeft: '15px' }}>Profile</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
