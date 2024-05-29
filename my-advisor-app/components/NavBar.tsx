// components/Navbar.tsx
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <img src="/images/myadvisor-logo.png" alt="Logo" style={{ height: '50px' }} />
        </div>
        <div>
          <Link href="/ask-an-advisor" style={{ marginLeft: '15px' }}>Ask an Advisor</Link>
          {user ? (
            <button onClick={logout} style={{ marginLeft: '15px' }}>Logout</button>
          ) : (
            <>
              <Link href="/auth/register" style={{ marginLeft: '15px' }}>Register for free</Link>
              <Link href="/auth/login" style={{ marginLeft: '15px' }}>Login</Link>
            </>
          )}
          <button style={{ marginLeft: '15px' }}>Are you a financial advisor?</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
