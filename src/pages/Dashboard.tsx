import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Dashboard() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-xl px-gutter max-w-[1280px] mx-auto w-full">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg w-full">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full max-w-4xl mb-lg">
          <div className="p-sm bg-white rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-sm mb-xs">
              <span className="material-symbols-outlined text-secondary">description</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Active Applications</span>
            </div>
            <p className="font-headline-lg text-headline-lg text-secondary">1</p>
          </div>
          <div className="p-sm bg-white rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-sm mb-xs">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Approved</span>
            </div>
            <p className="font-headline-lg text-headline-lg text-secondary">0</p>
          </div>
          <div className="p-sm bg-white rounded-xl border border-outline-variant shadow-sm">
            <div className="flex items-center gap-sm mb-xs">
              <span className="material-symbols-outlined text-secondary">pending</span>
              <span className="font-label-md text-label-md text-on-surface-variant">In Review</span>
            </div>
            <p className="font-headline-lg text-headline-lg text-secondary">0</p>
          </div>
        </div>
        <div className="w-full max-w-4xl bg-white rounded-xl border border-outline-variant shadow-sm p-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-md">My Loan Applications</h2>
          <div className="flex flex-col items-center justify-center py-xl text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-md" style={{ fontSize: '64px' }}>
              note_add
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Start Your Application</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
              Begin your loan application process in just a few minutes.
            </p>
            <button
              className="bg-secondary text-on-secondary px-xl py-sm rounded-lg font-bold hover:brightness-90 active:scale-95 transition-all shadow-sm"
              onClick={() => window.location.href = '/'}
            >
              <span className="flex items-center gap-xs">
                <span className="material-symbols-outlined">add</span>
                Apply Now
              </span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}