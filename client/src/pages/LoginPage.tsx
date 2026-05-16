import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-soft backdrop-blur-xl">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Recruiter login</p>
          <h1 className="text-4xl font-semibold">Access your hiring dashboard.</h1>
          <p className="text-slate-400">Sign in to manage candidates, generate AI rankings and launch interviews.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Password
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <button type="submit" disabled={loading} className="btn-primary rounded-3xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          New recruiter? <Link to="/register" className="text-violet-300 hover:text-violet-100">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
