import { useState, useEffect } from 'react';
import { Bookmark, Plus, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { candidateApi } from '../services/api';
import { Candidate } from '../types';

const SavedShortlistPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    candidateApi.list({})
      .then((res) => setCandidates(res.data.filter((candidate: Candidate) => candidate.shortlist)))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 py-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Saved shortlist</p>
            <h1 className="text-4xl font-semibold">Pipeline highlights</h1>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="glass-card rounded-[40px] p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Bookmarked candidates</p>
                  <h2 className="text-2xl font-semibold text-white">Saved for interviews</h2>
                </div>
                <button className="rounded-full bg-violet-600/20 px-4 py-2 text-sm text-violet-200 transition hover:bg-violet-600/30"><Plus className="inline h-4 w-4" /> New list</button>
              </div>
              <div className="space-y-4">
                {candidates.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 p-8 text-slate-400">
                    No shortlisted candidates yet. Mark a candidate to save the best matches.
                  </div>
                ) : candidates.map((candidate) => (
                  <div key={candidate._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">{candidate.name}</p>
                        <p className="text-sm text-slate-400">{candidate.skills?.slice(0, 4).join(', ')}</p>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">AI {candidate.aiScore || 0}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                      {candidate.experience} yrs exp
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[40px] p-6">
              <div className="flex items-center gap-3 text-slate-200">
                <FileText className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Export candidate report</h2>
              </div>
              <p className="mt-4 text-sm text-slate-400">Download your shortlist as a branded PDF report for hiring meetings and executive reviews.</p>
              <button className="btn-primary mt-6 rounded-3xl px-6 py-3 text-sm font-semibold">Export PDF report</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedShortlistPage;
