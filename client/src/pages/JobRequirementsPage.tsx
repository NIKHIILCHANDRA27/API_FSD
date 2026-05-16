import { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { jobApi, matchApi, candidateApi } from '../services/api';
import { Candidate, JobRequirement } from '../types';

const JobRequirementsPage = () => {
  const [job, setJob] = useState<JobRequirement>({ title: '', requiredSkills: [], preferredSkills: [], minExperience: 0, salary: '', location: '', type: 'Remote', description: '' });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const createRole = async () => {
    setLoading(true);
    try {
      const payload = { ...job, requiredSkills: job.requiredSkills.map((skill) => skill.trim()).filter(Boolean), preferredSkills: job.preferredSkills.map((skill) => skill.trim()).filter(Boolean) };
      await jobApi.create(payload);
      const candidateRes = await candidateApi.list();
      setCandidates(candidateRes.data);
      const response = await matchApi.basic({ job: payload });
      setResults(response.data.slice(0, 5));
      toast.success('Job created and candidates ranked');
    } catch (error) {
      toast.error('Unable to create job or rank candidates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Job requirements</p>
            <h1 className="text-4xl font-semibold">Build role briefs</h1>
          </div>
          <div className="glass-card rounded-[40px] p-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Job title
                <input value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} className="input-field" />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Salary range
                <input value={job.salary} onChange={(e) => setJob({ ...job, salary: e.target.value })} className="input-field" />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Location
                <input value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} className="input-field" />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Work type
                <select value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })} className="input-field">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
              </label>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 mt-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Required skills
                <input value={job.requiredSkills.join(', ')} onChange={(e) => setJob({ ...job, requiredSkills: e.target.value.split(',') })} className="input-field" placeholder="React, Node, MongoDB" />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Preferred skills
                <input value={job.preferredSkills.join(', ')} onChange={(e) => setJob({ ...job, preferredSkills: e.target.value.split(',') })} className="input-field" placeholder="TypeScript, AWS" />
              </label>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 mt-4">
              <label className="grid gap-2 text-sm text-slate-300">
                Minimum experience
                <input type="number" value={job.minExperience} onChange={(e) => setJob({ ...job, minExperience: Number(e.target.value) })} className="input-field" />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-slate-300 mt-4">
              Job description
              <textarea value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} rows={4} className="input-field min-h-[140px]" />
            </label>
            <button onClick={createRole} disabled={loading} className="btn-primary mt-6 rounded-3xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Analyzing candidates...' : 'Save job & rank candidates'}
            </button>
          </div>
          {results.length > 0 && (
            <div className="mt-8 glass-card rounded-[40px] p-6">
              <h2 className="text-2xl font-semibold text-white">Top matched candidates</h2>
              <div className="mt-6 space-y-4">
                {results.map((item, index) => (
                  <div key={index} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-white">{item.candidate.name}</p>
                      <span className="rounded-full bg-violet-600/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-200">Score {item.score}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">Skills: {item.candidate.skills?.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobRequirementsPage;
