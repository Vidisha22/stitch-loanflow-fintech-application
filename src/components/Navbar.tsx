import { useNavigate } from '../hooks/useNavigate';

export function Navbar() {
  const { goToPage } = useNavigate();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-gutter py-xs w-full max-w-[1280px] mx-auto bg-surface-container-lowest border-b border-outline-variant shadow-sm">
      <div className="flex items-center gap-md">
        <span className="text-headline-md font-headline-md text-secondary">LoanFlow</span>
        <div className="hidden md:flex items-center gap-sm ml-lg">
          <button
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
            onClick={() => goToPage('dashboard')}
          >
            Dashboard
          </button>
          <button
            className="font-body-md text-body-md text-secondary font-bold border-b-2 border-secondary pb-1"
          >
            My Applications
          </button>
          <button
            className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
            onClick={() => goToPage('support')}
          >
            Support
          </button>
        </div>
      </div>
      <div className="flex items-center gap-sm">
        <button
          className="p-base rounded-full hover:bg-surface-container-low transition-all active:scale-95"
          onClick={() => goToPage('notifications')}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <button
          className="p-base rounded-full hover:bg-surface-container-low transition-all active:scale-95"
          onClick={() => goToPage('support')}
          aria-label="Help"
        >
          <span className="material-symbols-outlined text-on-surface-variant">help</span>
        </button>
        <div
          className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant cursor-pointer"
          onClick={() => goToPage('profile')}
          role="button"
          tabIndex={0}
          aria-label="Profile"
          onKeyDown={(e) => e.key === 'Enter' && goToPage('profile')}
        >
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJB97HfTlgtDSMc4xlzLAb9knq_VtRQx0wHDk4tpihLYTlhmM1Hd3ABezAzDxET3fvwUWfb-36MoFEU0Z9KtwESyT2Ys1KNt9X5HEmtKH3W4q19bLh_cflFAX84FiV_l7qWL6R2ru5D9l-5CHYUfVQN1Sbugrj81c89f1Rv4mIUDM22xN4kydjnZJhdG8YFIqjkP0WQeDNKCYmhPBkWH6LV7vYZSN2rqUgyoQPxFMMcuyrCTorKYW4ZLQZJIm7gzcxv2H_ImvK2OQT"
          />
        </div>
      </div>
    </nav>
  );
}