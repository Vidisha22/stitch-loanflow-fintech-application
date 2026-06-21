import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function Profile() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-xl px-gutter max-w-[1280px] mx-auto w-full">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-lg w-full">My Profile</h1>
        <div className="w-full max-w-4xl bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="bg-secondary p-lg text-on-secondary">
            <div className="flex items-center gap-md">
              <div className="w-20 h-20 rounded-full bg-on-secondary/20 flex items-center justify-center overflow-hidden ring-4 ring-on-secondary/30">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJB97HfTlgtDSMc4xlzLAb9knq_VtRQx0wHDk4tpihLYTlhmM1Hd3ABezAzDxET3fvwUWfb-36MoFEU0Z9KtwESyT2Ys1KNt9X5HEmtKH3W4q19bLh_cflFAX84FiV_l7qWL6R2ru5D9l-5CHYUfVQN1Sbugrj81c89f1Rv4mIUDM22xN4kydjnZJhdG8YFIqjkP0WQeDNKCYmhPBkWH6LV7vYZSN2rqUgyoQPxFMMcuyrCTorKYW4ZLQZJIm7gzcxv2H_ImvK2OQT"
                />
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md">Applicant</h2>
                <p className="font-body-md text-body-md opacity-80">—</p>
              </div>
            </div>
          </div>
          <div className="p-lg space-y-lg">
            <section>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">First Name</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Last Name</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Email Address</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Phone Number</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Date of Birth</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Gender</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
              </div>
            </section>
            <section>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="md:col-span-2">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Street Address</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">City</p>
                  <p className="font-body-md text-body-md font-medium">—</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">State / ZIP</p>
                  <p className="font-body-md text-body-md font-medium">— —</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}