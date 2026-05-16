import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success('Welcome to HireGenius AI!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-soft backdrop-blur-xl">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Recruiter signup</p>
          <h1 className="text-4xl font-semibold">Create your hiring control center.</h1>
          <p className="text-slate-400">Launch your talent acquisition journey with AI-assisted shortlisting.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2 text-sm text-slate-300">
            Full Name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required type="text" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Company
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} type="text" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Email
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            Password
            <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" className="rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500" />
          </label>
          <button type="submit" disabled={loading} className="btn-primary rounded-3xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          Already a recruiter? <Link to="/login" className="text-violet-300 hover:text-violet-100">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
