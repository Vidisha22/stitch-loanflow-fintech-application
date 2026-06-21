import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Notifications() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-xl px-gutter max-w-[1280px] mx-auto w-full">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg w-full">Notifications</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl w-full max-w-4xl">
          Stay updated on your loan application status.
        </p>
        <div className="w-full max-w-4xl space-y-sm">
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold">Application Submitted</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Your loan application has been received and is being reviewed.</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex-shrink-0 ml-sm">2 min ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">info</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold">Documents Required</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Please upload your income verification documents to proceed.</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex-shrink-0 ml-sm">1 hour ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm opacity-60">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">task_alt</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold">Profile Updated</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Your profile information has been successfully updated.</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex-shrink-0 ml-sm">2 days ago</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-md flex items-start gap-sm opacity-60">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">security</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface font-bold">Security Alert</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">New login detected from a trusted device. If this wasn't you, please contact support.</p>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex-shrink-0 ml-sm">1 week ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}