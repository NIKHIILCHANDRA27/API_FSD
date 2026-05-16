import { useEffect, useState } from 'react';
import { BarChart2, PieChart, TrendingUp, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { candidateApi, jobApi } from '../services/api';
import { Candidate, JobRequirement } from '../types';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts';

const dashboardStats = [
  { label: 'Total Candidates', value: 82, icon: TrendingUp, accent: 'from-violet-500 to-cyan-400' },
  { label: 'Shortlisted', value: 24, icon: Sparkles, accent: 'from-sky-500 to-cyan-400' },
  { label: 'Interviews', value: 14, icon: BarChart2, accent: 'from-fuchsia-500 to-violet-500' }
];

const chartData = [
  { name: 'Week 1', score: 62 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 91 }
];

const pieData = [
  { name: 'Excellent', value: 12 },
  { name: 'Good', value: 34 },
  { name: 'Average', value: 25 },
  { name: 'Weak', value: 11 }
];
const COLORS = ['#7c3aed', '#38bdf8', '#f472b6', '#0ea5e9'];

const DashboardPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<JobRequirement[]>([]);

  useEffect(() => {
    candidateApi.list().then((res) => setCandidates(res.data)).catch(() => {});
    jobApi.list().then((res) => setJobs(res.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold">Recruiter command center</h1>
            </div>
            <div className="rounded-3xl bg-white/5 px-5 py-4 text-slate-300">
              <p className="text-sm text-slate-400">Live analytics update</p>
              <p className="mt-2 text-xl font-semibold text-white">AI-driven hiring intelligence</p>
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-3">
            {dashboardStats.map((item) => (
              <div key={item.label} className="glass-card rounded-[32px] p-6 text-white">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${item.accent} text-white`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="mt-3 text-4xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-card rounded-[40px] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Match score trends</p>
                  <h2 className="text-2xl font-semibold text-white">Recruitment performance</h2>
                </div>
              </div>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155' }} />
                    <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-card rounded-[40px] p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-400">Candidate distribution</p>
                <h2 className="text-2xl font-semibold text-white">Applicant quality</h2>
              </div>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart data={pieData} innerRadius={60} outerRadius={100}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="glass-card rounded-[40px] p-6">
              <h2 className="text-xl font-semibold text-white">Recent candidates</h2>
              <div className="mt-6 space-y-4">
                {candidates.slice(0, 3).map((candidate) => (
                  <div key={candidate._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <p className="text-base font-semibold text-white">{candidate.name}</p>
                    <p className="text-sm text-slate-400">{candidate.skills?.slice(0, 3).join(', ')}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                      <span className="rounded-full bg-white/5 px-3 py-1">{candidate.experience} yrs exp</span>
                      <span className="rounded-full bg-white/5 px-3 py-1">AI {candidate.aiScore || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[40px] p-6">
              <h2 className="text-xl font-semibold text-white">Open roles</h2>
              <div className="mt-6 grid gap-4">
                {jobs.slice(0, 3).map((job) => (
                  <div key={job.title} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <p className="text-base font-semibold text-white">{job.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{job.location} • {job.type}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                      {job.requiredSkills?.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-white/5 px-3 py-1">{skill}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
