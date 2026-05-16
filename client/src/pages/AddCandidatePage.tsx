import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { candidateApi } from '../services/api';

const AddCandidatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: 0,
    github: '',
    linkedin: '',
    portfolio: '',
    bio: '',
    projects: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await candidateApi.create({
        ...form,
        skills: form.skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        projects: form.projects.split(',').filter(Boolean).map((title) => ({ title, description: '' }))
      });
      toast.success('Candidate added successfully');
      navigate('/candidates');
    } catch (error) {
      toast.error('Unable to add candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-8 flex flex-col gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Candidates</p>
              <h1 className="text-4xl font-semibold">Add new talent</h1>
            </div>
            <div className="glass-card rounded-[40px] p-8">
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Full name
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Email
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                  </label>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="grid gap-2 text-sm text-slate-300">
                    Phone
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Experience (years)
                    <input required type="number" min="0" value={form.experience} onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })} className="input-field" />
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-slate-300">
                  Skills (comma separated)
                  <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="input-field" />
                </label>
                <div className="grid gap-4 lg:grid-cols-3">
                  <label className="grid gap-2 text-sm text-slate-300">
                    GitHub
                    <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="input-field" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    LinkedIn
                    <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="input-field" />
                  </label>
                  <label className="grid gap-2 text-sm text-slate-300">
                    Portfolio
                    <input value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} className="input-field" />
                  </label>
                </div>
                <label className="grid gap-2 text-sm text-slate-300">
                  Bio
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="input-field min-h-[120px]" />
                </label>
                <label className="grid gap-2 text-sm text-slate-300">
                  Projects (comma separated)
                  <input value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} className="input-field" />
                </label>
                <button type="submit" disabled={loading} className="btn-primary rounded-3xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? 'Saving candidate...' : 'Save candidate'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCandidatePage;
