import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="text-9xl font-bold text-violet-500/90">404</div>
        <div>
          <h1 className="text-4xl font-semibold">Page not found</h1>
          <p className="mt-3 text-slate-400">The route you tried to reach does not exist. Return to the dashboard to continue your hiring workflow.</p>
        </div>
        <Link to="/dashboard" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">Go back to dashboard</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
