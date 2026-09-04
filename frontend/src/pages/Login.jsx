import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';

const Login = () => {
  const [email, setEmail] = useState('demo@modihandloom.test');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page py-20 max-w-md mx-auto">
      <p className="eyebrow mb-2 text-center">Welcome back</p>
      <h1 className="font-display text-3xl text-center mb-5">Sign In</h1>
      <SelvedgeDivider align="center" className="mb-8" />

      <form onSubmit={submit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="input-field"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Signing In…' : 'Sign In'}
        </button>
      </form>

      <p className="text-sm text-center mt-8 text-ink/70">
        New to Modi Handloom?{' '}
        <Link to="/signup" className="text-indigo hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
