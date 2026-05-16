import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-semibold tracking-tight">HireGenius AI</div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-100 transition hover:bg-white/5">Login</Link>
          <Link to="/register" className="btn-primary rounded-full px-5 py-3 text-sm font-semibold">Start free</Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">Investor-ready HR SaaS · AI candidate ranking</span>
            <h1 className="text-5xl font-semibold leading-tight text-white">Build your recruitment pipeline with predictive candidate shortlisting.</h1>
            <p className="max-w-2xl text-slate-400">HireGenius AI blends candidate management, job matching, and powerful OpenRouter intelligence into a premium HR dashboard.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">Get started</Link>
              <a href="#features" className="rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 transition hover:bg-white/5">See features</a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-card relative overflow-hidden rounded-[40px] border border-white/10 p-8 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Hiring pulse</p>
                <h2 className="text-3xl font-semibold text-white">Candidate AI Score</h2>
              </div>
              <div className="rounded-3xl bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">Live</div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Shortlisted</p>
                <p className="mt-3 text-3xl font-semibold text-white">128</p>
              </article>
              <article className="rounded-3xl bg-slate-900/80 p-5">
                <p className="text-sm text-slate-400">Average AI score</p>
                <p className="mt-3 text-3xl font-semibold text-white">88.2</p>
              </article>
            </div>
          </motion.div>
        </section>
        <section id="features" className="mt-20 grid gap-6 lg:grid-cols-3">
          {[
            { title: 'AI Shortlisting', body: 'Rank candidates with resume analysis and skill overlap scoring.', icon: Sparkles },
            { title: 'Premium dashboard', body: 'Glassmorphism UI, charts, and recruiter workflows in one app.', icon: TrendingUp },
            { title: 'Secure team hiring', body: 'JWT auth, protected APIs, role-aware access, and audit-ready workflows.', icon: ShieldCheck }
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass-card rounded-[30px] border border-white/10 p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-600/10 text-violet-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.body}</p>
              </div>
            );
          })}
        </section>
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-slate-500">Built for HR teams and startup founders.</footer>
    </div>
  );
};

export default LandingPage;
