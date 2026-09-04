import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import SelvedgeDivider from '../components/SelvedgeDivider.jsx';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, phone);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page py-20 max-w-md mx-auto">
      <p className="eyebrow mb-2 text-center">Join us</p>
      <h1 className="font-display text-3xl text-center mb-5">Create Account</h1>
      <SelvedgeDivider align="center" className="mb-8" />

      <form onSubmit={submit} className="space-y-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="input-field"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="input-field"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number (optional)"
          className="input-field"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min. 6 characters)"
          className="input-field"
        />
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Creating Account…' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-center mt-8 text-ink/70">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
