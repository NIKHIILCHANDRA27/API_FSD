import { useEffect, useState } from 'react';
import { Search, Filter, Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { candidateApi } from '../services/api';
import { Candidate } from '../types';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  const loadCandidates = () => {
    candidateApi.list({ search, skill: skillFilter }).then((res) => setCandidates(res.data)).catch(() => {});
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await candidateApi.remove(id);
    toast.success('Candidate removed');
    loadCandidates();
  };

  const handleSearch = () => loadCandidates();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Candidate management</p>
              <h1 className="text-4xl font-semibold">Team pipeline</h1>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={handleSearch} className="btn-primary rounded-3xl px-5 py-3 text-sm font-semibold">Refresh list</button>
            </div>
          </div>
          <div className="glass-card rounded-[40px] p-6">
            <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_1fr_180px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates" className="input-field pl-11" />
              </label>
              <label className="relative block">
                <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} placeholder="Filter by skill" className="input-field pl-11" />
              </label>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-white/10">
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-100">
                <thead className="bg-slate-950/90 text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Candidate</th>
                    <th className="px-6 py-4">Skills</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">AI Score</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate._id} className="border-t border-white/10 hover:bg-slate-900/80">
                      <td className="px-6 py-4">{candidate.name}</td>
                      <td className="px-6 py-4">{candidate.skills?.slice(0, 3).join(', ')}</td>
                      <td className="px-6 py-4">{candidate.experience} yrs</td>
                      <td className="px-6 py-4">{candidate.aiScore ?? 0}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button className="rounded-3xl bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:bg-white/10"><Pencil className="inline h-4 w-4" /></button>
                        <button onClick={() => handleDelete(candidate._id)} className="rounded-3xl bg-rose-500/10 px-4 py-2 text-xs text-rose-200 transition hover:bg-rose-500/20"><Trash2 className="inline h-4 w-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidatesPage;
