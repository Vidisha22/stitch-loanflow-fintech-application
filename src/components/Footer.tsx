export function Footer() {
  return (
    <footer className="w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center gap-sm max-w-[1280px] mx-auto bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex flex-col items-center md:items-start gap-xs">
        <span className="text-label-md font-label-md font-bold text-secondary">LoanFlow</span>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          &copy; 2024 LoanFlow Financial Services. All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-md">
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
          Terms of Service
        </a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
          Security Disclosure
        </a>
        <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
          Contact Us
        </a>
      </div>
    </footer>
  );
}