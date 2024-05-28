import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.email || 'Guest'}</h1>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div>
          <a href="/auth/login">Login</a>
          <a href="/auth/register" style={{ marginLeft: '10px' }}>Register</a>
        </div>
      )}
    </div>
  );
}
